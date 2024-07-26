import React from "react";

interface ButtonComponentProps {
  type?: "submit" | "reset" | "button";
  id?: string;
  className?: string;
  onClick: () => void;
  buttonText?: string;
  icon?: JSX.Element | null;
  name?: string;
  disabled?: boolean;
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
}: ButtonComponentProps) => {
  return (
    <button
      type={type}
      name={name}
      id={id}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {icon ?? null}
      {buttonText ?? null}
    </button>
  );
};
