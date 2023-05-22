import { Link } from "@remix-run/react";
import classNames from "classnames";
import { defaultTo } from "ramda";
import type { ReactNode } from "react";
import React from "react";

type Props = {
  to: string;
  shape?: "circle" | "square" | undefined;
  size?: "lg" | "md" | "sm" | "xs" | undefined;
  variant?: "outline" | "link" | undefined;
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "info"
    | "success"
    | "warning"
    | "error"
    | undefined;
  wide?: boolean | undefined;
  fullWidth?: boolean | undefined;
  responsive?: boolean | undefined;
  animation?: boolean | undefined;
  loading?: boolean | undefined;
  active?: boolean | undefined;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean | undefined;

  children: ReactNode;
  prefetch?: "intent" | "render" | "none";
};

export const ButtonLink: React.FC<Props> = ({
  to,
  shape,
  size,
  variant,
  color,
  wide,
  fullWidth,
  responsive,
  animation,
  loading,
  active,
  disabled,
  startIcon,
  endIcon,
  children,
  prefetch,
}) => {
  const classes = classNames(
    "btn",
    {
      "btn-lg": size === "lg",
      "btn-md": size === "md",
      "btn-sm": size === "sm",
      "btn-xs": size === "xs",
    },
    {
      "btn-circle": shape === "circle",
      "btn-square": shape === "square",
      "btn-outline": variant === "outline",
      "btn-link": variant === "link",
    },
    {
      "btn-primary": color === "primary",
      "btn-secondary": color === "secondary",
      "btn-accent": color === "accent",
      "btn-info": color === "info",
      "btn-success": color === "success",
      "btn-warning": color === "warning",
      "btn-error": color === "error",
      "btn-ghost": color === "ghost",
    },
    {
      "btn-wide": wide,
      "btn-block": fullWidth,
      "btn-xs md:btn-sm lg:btn-md xl:btn-lg": responsive,
    },
    {
      "no-animation": !animation,
      "btn-active": active,
      "btn-disabled": disabled,
      loading: loading,
    }
  );

  return (
    <Link to={to} className={classes} prefetch={defaultTo("intent", prefetch)}>
      {startIcon && startIcon}
      {children}
      {endIcon && endIcon}
    </Link>
  );
};

ButtonLink.defaultProps = {};

export default ButtonLink;
