const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  NEW_POST: "/new-post",
  POST: (slug: string) => `/posts/${slug}`,
  POST_EDIT: (slug: string) => `/posts/${slug}/edit`,
  AUTHOR: (id: string) => `/author/${id}`,
  PROFILE: (id: string) => `/profile/${id}`,
};

export default ROUTES;
