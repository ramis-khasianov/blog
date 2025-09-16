import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  icon: LucideIcon;
  value: string | number;
  title: string;
  href?: string;
  textStyles: string;
  iconStyles?: string;
  titleStyles?: string;
}

const Metric = ({
  icon: Icon,
  value,
  title,
  href,
  textStyles,
  iconStyles,
  titleStyles,
}: Props) => {
  const metricContent = (
    <>
      <Icon size={20} className={`rounded-full object-contain ${iconStyles}`} />

      <p className={`${textStyles} flex items-center  gap-1`}>
        {value}

        {title ? (
          <span className={cn(`line-clamp-1`, titleStyles)}>{title}</span>
        ) : null}
      </p>
    </>
  );

  return href ? (
    <Link href={href} className="flex justify-center items-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex justify-center items-center gap-1">
      {metricContent}
    </div>
  );
};

export default Metric;
