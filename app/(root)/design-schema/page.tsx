import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import React from "react";

const DesignSchema = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <div className="w-full h-full border rounded p-6">
        <div className="h2-bold mb-4">Buttons</div>
        <div className="base-regular mb-4">Various shadcn buttons</div>
        <div className="flex items-center justify-start gap-2 ">
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
    </div>
  );
};

export default DesignSchema;
