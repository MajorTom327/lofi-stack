import { Link } from "@remix-run/react";
import classNames from "classnames";
import { isNotNilOrEmpty } from "ramda-adjunct";
import React from "react";
import { P, match } from "ts-pattern";
import { Colors } from "~/refs";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  color?: Colors;
  circle?: boolean;
  ariaLabel?: string;
} & WithAction;

export const Button: React.FC<Props> = ({
  children,
  className,
  type,
  disabled,
  to,
  onClick,
  color,
  circle,
  ariaLabel,
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
      "bg-error text-error-content border-error hover:bg-error-active":
        color === "error",
      "bg-info text-info-content border-info hover:bg-info-active":
        color === "info",
      "bg-success text-success-content border-success hover:bg-success-active":
        color === "success",
      "bg-warning text-warning-content border-warning hover:bg-warning-active":
        color === "warning",
      "text-neutral-content border-none hover:bg-base-200/30":
        color === "ghost" || !color,
      "w-10 h-10 rounded-full text-center items-center justify-center !p-0 flex":
        circle,
    },
    className
  );

  const actions = { to, onClick } as WithAction;

  const content = match(actions)
    .with({ to: P.string }, ({ to }) => (
      <Link
        to={to!}
        prefetch="intent"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    ))
    .with({ onClick: P.not(P.nullish) }, ({ onClick }) => (
      <button
        className={classes}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {children}
      </button>
    ))
    .exhaustive();

  return isNotNilOrEmpty(content) ? content : null;
};

Button.defaultProps = {};

export default Button;
