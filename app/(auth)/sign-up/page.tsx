import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignUpForm from "@/components/forms/SignUpForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ROUTES from "@/constants/routes";
import GoogleAuthForm from "@/components/forms/GoogleAuthForm";
import GithubAuthForm from "@/components/forms/GithubAuthForm";
import KeycloakAuthForm from "@/components/forms/KeycloakAuthForm";

const page = async () => {
  const session = await auth();

  if (session?.user) {
    redirect(ROUTES.HOME);
  }

  return (
    <div className="min-w-100 max-w-180">
      <div>
        <Card className="w-full max-w-m py-6">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpForm />
            <p className="base-regular text-center w-full pt-4 pb-2"> or</p>
            <div className="flex flex-col w-full gap-2 mt-2">
              <GoogleAuthForm />
              <GithubAuthForm />
              <KeycloakAuthForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
