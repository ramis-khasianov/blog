import Link from "next/link";

const SiteLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
        Raports <span className="text-primary-gradient ">Blog</span>
      </p>
    </Link>
  );
};

export default SiteLogo;
