import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/components/forms/SignInForm";
import GoogleAuthForm from "@/components/forms/GoogleAuthForm";
import GithubAuthForm from "@/components/forms/GithubAuthForm";
import KeycloakAuthForm from "@/components/forms/KeycloakAuthForm";

const page = () => {
  return (
    <div className="min-w-100 max-w-180">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <p className="base-regular text-center w-full pt-4 pb-2"> or</p>
          <div className="flex flex-col w-full gap-2 mt-2">
            <GoogleAuthForm />
            <GithubAuthForm />
            <KeycloakAuthForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
