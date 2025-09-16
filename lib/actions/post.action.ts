"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";
import action from "@/lib/handlers/action";
import handleError from "@/lib/handlers/error";
import {
  CreatePostSchema,
  EditPostSchema,
  GetPostSchema,
  IncrementViewsSchema,
  PaginatedSearchParamsSchema,
} from "@/lib/validations";
import logger from "../logger";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function createPost(
  params: CreatePostParams
): Promise<ActionResponse<Post>> {
  const validationResult = await action({
    params,
    schema: CreatePostSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, summary, categories } = validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  if (!userId) {
    return handleError(
      new Error("User ID not found in session")
    ) as ErrorResponse;
  }

  try {
    const slug = `${generateSlug(title)}-${Date.now()}`;

    // Use Prisma transaction to handle post and tags atomically
    const result = await prisma.$transaction(async (prisma) => {
      // Create the post
      const post = await prisma.post.create({
        data: {
          title: title,
          slug: slug,
          content: content,
          summary: summary,
          published: false,
          authorId: userId,
        },
      });

      if (!post) {
        throw new Error("Failed to create post");
      }

      // Handle categories
      const categoryConnections: { postId: number; categoryId: number }[] = [];

      for (const categoryName of categories) {
        // Find or create category (upsert)
        const category = await prisma.category.upsert({
          where: { name: categoryName.toLowerCase() },
          update: { postCount: { increment: 1 } },
          create: {
            name: categoryName.toLowerCase(),
            postCount: 1,
          },
        });

        // Prepare PostCategory relationship
        categoryConnections.push({
          postId: post.id,
          categoryId: category.id,
        });
      }

      // Create all PostCategory relationships
      if (categoryConnections.length > 0) {
        await prisma.postCategory.createMany({
          data: categoryConnections,
        });
      }

      return post;
    });

    logger.info("result");

    return { success: true, data: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function editPost(
  params: EditPostParams
): Promise<ActionResponse<Post>> {
  const validationResult = await action({
    params,
    schema: EditPostSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, summary, categories, slug, published } =
    validationResult.params!;
  const userId = validationResult?.session?.user?.id;

  if (!userId) {
    return handleError(
      new Error("User ID not found in session")
    ) as ErrorResponse;
  }

  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Find the existing post with its categories
      const existingPost = await prisma.post.findUnique({
        where: { slug },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      });

      if (!existingPost) {
        throw new Error("Post not found");
      }

      if (existingPost.authorId !== userId) {
        throw new Error("Unauthorized");
      }

      // Update post basic fields
      const updateData: Prisma.PostUpdateInput = {};

      if (existingPost.title !== title) {
        updateData.title = title;
        updateData.slug = `${generateSlug(title)}-${Date.now()}`;
      }

      if (existingPost.content !== content) {
        updateData.content = content;
      }

      if (summary !== undefined && existingPost.summary !== summary) {
        updateData.summary = summary;
      }

      if (published !== undefined && existingPost.published !== published) {
        updateData.published = published;
      }

      // Update post if there are changes
      if (Object.keys(updateData).length > 0) {
        await prisma.post.update({
          where: { id: existingPost.id },
          data: updateData,
        });
      }

      // Handle category changes
      const currentCategories = existingPost.categories.map((pc) =>
        pc.category.name.toLowerCase()
      );
      const newCategories = categories.map((category) => category.toLowerCase());

      const categoriesToAdd = newCategories.filter((category) => !currentCategories.includes(category));
      const categoriesToRemove = currentCategories.filter((category) => !newCategories.includes(category));

      // Remove old categories
      if (categoriesToRemove.length > 0) {
        const categoriesToRemoveIds = existingPost.categories
          .filter((pc) => categoriesToRemove.includes(pc.category.name.toLowerCase()))
          .map((pc) => pc.category.id);

        // Delete PostCategory relationships
        await prisma.postCategory.deleteMany({
          where: {
            postId: existingPost.id,
            categoryId: { in: categoriesToRemoveIds },
          },
        });

        // Decrement postCount for removed categories
        await prisma.category.updateMany({
          where: { id: { in: categoriesToRemoveIds } },
          data: { postCount: { decrement: 1 } },
        });
      }

      // Add new categories
      if (categoriesToAdd.length > 0) {
        const newCategoryConnections = [];

        for (const categoryName of categoriesToAdd) {
          // Find or create category
          const category = await prisma.category.upsert({
            where: { name: categoryName },
            update: { postCount: { increment: 1 } },
            create: {
              name: categoryName,
              postCount: 1,
            },
          });

          newCategoryConnections.push({
            postId: existingPost.id,
            categoryId: category.id,
          });
        }

        // Create new PostCategory relationships
        if (newCategoryConnections.length > 0) {
          await prisma.postCategory.createMany({
            data: newCategoryConnections,
          });
        }
      }

      // Return updated post with categories
      const finalPost = await prisma.post.findUnique({
        where: { id: existingPost.id },
        include: {
          author: true,
          categories: {
            include: {
              category: true,
            },
          },
        },
      });

      return finalPost;
    });

    return { success: true, data: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getPost(
  params: GetPostParams
): Promise<ActionResponse<Post>> {
  const validationResult = await action({
    params,
    schema: GetPostSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { slug } = validationResult.params!;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return { success: true, data: JSON.parse(JSON.stringify(post)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getPosts(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ posts: Post[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: Prisma.PostWhereInput = {};

  if (filter === "recommended") {
    return { success: true, data: { posts: [], isNext: false } };
  }

  if (query) {
    filterQuery.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { content: { contains: query, mode: "insensitive" } },
    ];
  }

  let sortCriteria: Prisma.PostOrderByWithRelationInput = {};

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: "desc" };
      break;
    case "popular":
      sortCriteria = { upvotes: "desc" };
      break;
    default:
      sortCriteria = { createdAt: "desc" };
      break;
  }

  try {
    const totalPosts = await prisma.post.count({ where: filterQuery });

    const posts = await prisma.post.findMany({
      where: filterQuery,
      include: {
        author: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: sortCriteria,
      skip,
      take: limit,
    });

    const isNext = totalPosts > skip + posts.length;

    return {
      success: true,
      data: { posts: JSON.parse(JSON.stringify(posts)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function incrementViews(
  params: IncrementViewsParams
): Promise<ActionResponse<{ views: number }>> {
  const validationResult = await action({
    params,
    schema: IncrementViewsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { postId } = validationResult.params!;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });

    return {
      success: true,
      data: { views: updatedPost.views },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
