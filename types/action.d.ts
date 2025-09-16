interface CreatePostParams {
  title: string;
  content: string;
  summary?: string;
  categories: string[];
  published?: boolean;
}

interface EditPostParams extends CreatePostParams {
  slug: string;
}

interface GetPostParams {
  slug: string;
}

interface IncrementViewsParams {
  postId: number;
}
