import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-light-850 px-4 py-10 dark:bg-dark-100">
      {children}
    </main>
  );
};

export default AuthLayout;
