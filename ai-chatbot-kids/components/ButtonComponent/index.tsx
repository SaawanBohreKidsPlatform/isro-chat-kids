import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonComponentProps {
  type?: "submit" | "reset" | "button";
  id?: string;
  className?: string;
  onClick?: () => void;
  buttonText?: string;
  icon?: JSX.Element | null;
  name?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const ButtonComponent = ({
  type,
  id,
  className,
  onClick,
  buttonText,
  icon,
  name,
  disabled,
  loading,
}: ButtonComponentProps) => {
  return (
    <button
      type={type}
      name={name}
      id={id}
      className={cn(className, "flex items-center", loading && "opacity-50")}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon ?? null}
      {buttonText ?? null}
      {loading && <Loader2 className="size-4 animate-spin ml-2" />}
    </button>
  );
};
