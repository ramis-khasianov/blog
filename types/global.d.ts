interface Author {
  id: string;
  name: string;
  image: string;
}

interface Category {
  id: number;
  name: string;
}

interface PostCategory {
  id: number;
  postId: number;
  categoryId: number;
  category: Category;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  featuredImage?: string;
  published: boolean;
  views: number;
  author: Author;
  createdAt: Date;
  categories: PostCategory[];
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
  authorId?: string;
}
