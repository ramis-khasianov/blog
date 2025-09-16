import { DEFAULT_EMPTY, DEFAULT_ERROR } from "@/constants/states";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props<T> {
  success: boolean;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  data: T[] | null | undefined;
  empty: {
    title: string;
    message: string;
    button?: {
      text: string;
      href: string;
    };
  };
  render: (data: T[]) => React.ReactNode;
}

interface StateSkeletonProps {
  title: string;
  message: string;
  button?: {
    text: string;
    href: string;
  };
}

const StateSkeleton = ({ title, message, button }: StateSkeletonProps) => (
  <div className="mt-16 flex w-full flex-col items-center justify-center sm:mt-36">
    <h2 className="h3-bold text-dark-200 dark:text-light-900 mt-8">{title}</h2>
    <p className="base-regular text-dark-500 dark:text-light-700 my-3.5 max-w-md text-center">
      {message}
    </p>
    {button && (
      <Link href={button.href}>
        <Button>{button.text}</Button>
      </Link>
    )}
  </div>
);

const DataRenderer = <T,>({
  success,
  error,
  data,
  empty = DEFAULT_EMPTY,
  render,
}: Props<T>) => {
  if (!success) {
    return (
      <StateSkeleton
        title={error?.message || DEFAULT_ERROR.title}
        message={
          error?.details
            ? JSON.stringify(error.details, null, 2)
            : DEFAULT_ERROR.message
        }
        button={DEFAULT_ERROR.button}
      />
    );
  }

  if (!data || data.length === 0)
    return (
      <StateSkeleton
        title={empty.title}
        message={empty.message}
        button={empty.button}
      />
    );

  return <div>{render(data)}</div>;
};

export default DataRenderer;
