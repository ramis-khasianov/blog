import prisma from "@/lib/prisma";

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div>
      <h1 className="h1-bold mb-4">Posts</h1>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id}>
            <span className="h3-semibold mr-2">{post.title}</span>
            <span className="base-regular">by {post.author.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
