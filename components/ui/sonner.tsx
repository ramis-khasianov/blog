"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group [&_[data-sonner-toast][data-type=success]_[data-icon]]:text-primary-500 [&_[data-sonner-toast][data-type=error]_[data-icon]]:text-danger-500 [&_button[data-button][data-action]]:bg-primary-500 [&_button[data-button][data-action]]:text-white"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
