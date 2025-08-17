import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <article className="space-y-2">
        <div className="h3-semibold">{post.title}</div>
        <p>by {post.author.name}</p>
        <div className="prose prose-gray mt-4">
          {post.content || "No content available."}
        </div>
      </article>
    </div>
  );
}
