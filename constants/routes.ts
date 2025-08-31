const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  POST: (id: string) => `/post/${id}`,
  AUTHOR: (id: string) => `/author/${id}`,
};

export default ROUTES;
