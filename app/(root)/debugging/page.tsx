import { auth } from "@/auth";
import GithubAuthForm from "@/components/forms/GithubAuthForm";
import GoogleAuthForm from "@/components/forms/GoogleAuthForm";
import KeycloakAuthForm from "@/components/forms/KeycloakAuthForm";
import SignInForm from "@/components/forms/SignInForm";
import SignUpForm from "@/components/forms/SignUpForm";
import { SignOutButton } from "@/components/SignOutButton";

export default async function Debugging() {
  const session = await auth();

  console.log(session);

  return (
    <div className="w-full h-full border rounded p-6 flex justify-between items-start gap-0">
      <div className="flex flex-col gap-4 w-80">
        <GithubAuthForm className="w-60" />
        <GoogleAuthForm className="w-60" />
        <KeycloakAuthForm className="w-60" />
        <h1>Session Debug:</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <SignOutButton className="w-60" />
      </div>
      <div className="w-80">
        <SignUpForm />
      </div>
      <div className="w-80">
        <SignInForm />
      </div>
    </div>
  );
}
