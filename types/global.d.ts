interface Author {
  id: string;
  name: string;
  image: string;
}

interface Post {
  id: string;
  title: string;
  createdAt: Date;
  content: string;
  summary: string;
  published: boolean;
  author: Author;
}
