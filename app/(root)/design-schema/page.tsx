"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/cards/PostCard";
import { Sun } from "lucide-react";
import React from "react";

const DesignSchema = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {/* Buttons */}
      <div className="w-full h-full border rounded p-6">
        <div className="h2-bold mb-4">Buttons</div>
        <div className="base-regular mb-4">Various shadcn buttons</div>
        <div className="flex items-center justify-start gap-2 flex-wrap ">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="lg">Large</Button>
          <Button size="sm">Small</Button>
          <Button size="icon">
            <Sun />
          </Button>
        </div>
      </div>
      {/* Cards */}
      <div className="w-full h-full border rounded p-6">
        <div className="h2-bold mb-4">Cards</div>
        <div className="base-regular mb-4">Cards from shadcn</div>
        <div className="flex items-center justify-start gap-2 ">
          <PostCard />
        </div>
      </div>
      {/* Toast */}
      <div className="w-full h-full border rounded p-6">
        <div className="h2-bold mb-4">Toaster (Sonner)</div>
        <div className="base-regular mb-4">Toaster from shadcn</div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              toast("Something happened", {
                description: "Some extra Info",
                position: "top-center",
                action: {
                  label: "Do something",
                  onClick: () => console.log("Something is done"),
                },
                actionButtonStyle: {
                  backgroundColor: "var(--color-primary-500)",
                },
              });
            }}
          >
            Toast from top with action
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              toast.success("Something Good", {
                duration: 8000,
                description: "Some extra Info",
                position: "bottom-right",
              });
            }}
          >
            Long success toast from bottom right
          </Button>

          <Button
            variant="destructive"
            onClick={() => {
              toast.error("Something Bad", {
                description: "Some extra Info",
                position: "bottom-right",
              });
            }}
          >
            Failure toast from bottom right
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignSchema;
