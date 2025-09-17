"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { togglePublishPost } from "@/lib/actions/post.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Eye, EyeOff } from "lucide-react";

interface PublishToggleProps {
  slug: string;
  isPublished: boolean;
}

const PublishToggle = ({ slug, isPublished }: PublishToggleProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleTogglePublish = () => {
    startTransition(async () => {
      const result = await togglePublishPost({ slug });

      if (result.success) {
        const action = isPublished ? "unpublished" : "published";
        toast.success("Success", {
          description: `Post ${action} successfully`,
        });
        router.refresh();
      } else {
        toast.error(`Error ${result.status}`, {
          description: result.error?.message || "Something went wrong",
        });
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-2"
      onClick={handleTogglePublish}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <ReloadIcon className="size-4 animate-spin" />
          {isPublished ? "Unpublishing..." : "Publishing..."}
        </>
      ) : (
        <>
          {isPublished ? (
            <>
              <EyeOff size={16} />
              Unpublish
            </>
          ) : (
            <>
              <Eye size={16} />
              Publish
            </>
          )}
        </>
      )}
    </Button>
  );
};

export default PublishToggle;
