import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const page = () => {
  return (
    <div className="min-w-100 max-w-180">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription className="mt-2">
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href="/sign-in">
              <Button variant="link">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" type="name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <Button variant="outline" className="w-full">
            <Image
              src="/icons/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
            Sign Up with Google
          </Button>
          <Button variant="outline" className="w-full">
            <Image
              src="/icons/github.svg"
              alt="Github Logo"
              width={20}
              height={20}
              className="invert-colors"
            />
            Sign Up with Github
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
