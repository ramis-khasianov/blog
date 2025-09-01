import Link from "next/link";
import React from "react";

import { X } from "lucide-react";
import { Badge } from "../ui/badge";

import { Button } from "@/components/ui/button";

interface Props {
  _id: string;
  name: string;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({ name, compact, remove, isButton, handleRemove }: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge className="subtle-medium bg-light-700 dark:bg-dark-300 text-light-400 dark:text-light-500 flex flex-row gap-2 rounded-md border-none px-4 py-2 capitalize">
        <div className="flex-center space-x-2">
          <span>{name}</span>
        </div>

        {remove && (
          <div onClick={handleRemove}>
            <X className=" size-[1rem]" />
          </div>
        )}
      </Badge>
    </>
  );

  if (compact) {
    return isButton ? (
      <button onClick={handleClick} className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href="" className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }
};

export default TagCard;
