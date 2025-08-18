import { auth } from "@/auth";
import GithubAuthForm from "@/components/forms/GithubAuthForm";
import GoogleAuthForm from "@/components/forms/GoogleAuthForm";
import { SignOutButton } from "@/components/SignOutButton";

export default async function Debugging() {
  const session = await auth();

  console.log(session);

  return (
    <div className="w-full h-full border rounded p-6">
      <div className="flex flex-col gap-4">
        <GithubAuthForm className="w-60" />
        <GoogleAuthForm className="w-60" />
        <h1>Session Debug:</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <SignOutButton className="w-60" />
      </div>
    </div>
  );
}
