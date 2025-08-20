import Link from "next/link";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const AuthButtons = () => {
  return (
    <div className="flex items-center gap-2 ml-4">
      <Link href={ROUTES.SIGN_IN}>
        <Button variant="default">Sign In</Button>
      </Link>
      <Link href={ROUTES.SIGN_UP}>
        <Button variant="secondary">Sign Up</Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
