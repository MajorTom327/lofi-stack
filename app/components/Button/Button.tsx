import { Link } from "@remix-run/react";
import classNames from "classnames";
import { isNotNilOrEmpty } from "ramda-adjunct";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  to?: string;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "danger"
    | "info"
    | "success"
    | "warning"
    | "ghost";
};

export const Button: React.FC<Props> = ({
  children,
  className,
  type,
  disabled,
  to,
  onClick,
  color,
}) => {
  const classes = classNames(
    "py-2 px-4 text-center rounded border",
    "transition",
    {
      "bg-primary text-primary-content border-primary hover:bg-primary-active":
        color === "primary",
      "bg-secondary text-secondary-content border-secondary hover:bg-secondary-active":
        color === "secondary",
      "bg-accent text-accent-content border-accent hover:bg-accent-active":
        color === "accent",
      "bg-danger text-danger-content border-danger hover:bg-danger-active":
        color === "danger",
      "bg-info text-info-content border-info hover:bg-info-active":
        color === "info",
      "bg-success text-success-content border-success hover:bg-success-active":
        color === "success",
      "bg-warning text-warning-content border-warning hover:bg-warning-active":
        color === "warning",
      "bg-base-100 text-base-content border-base-100 hover:bg-base-200":
        color === "ghost" || !color,
    },
    className
  );

  if (isNotNilOrEmpty(to)) {
    return (
      <Link to={to!} prefetch="intent" className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <>
      <button
        className={classes}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

Button.defaultProps = {};

export default Button;
