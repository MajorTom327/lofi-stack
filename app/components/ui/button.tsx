import { Slot } from "@radix-ui/react-slot";
import { Link } from "@remix-run/react";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { P, match } from "ts-pattern";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        info: "bg-info text-info-foreground hover:bg-info/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        error: "bg-error text-error-foreground hover:bg-error/90",

        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface WithVariantProps extends VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  to?: string;
}

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export type ButtonProps = (BaseButtonProps | ButtonLinkProps) &
  WithVariantProps;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = match({ asChild, to: props.to })
    .with({ to: P.string }, () => Link)
    .with({ asChild: true }, () => Slot)
    .otherwise(() => "button");

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      // @ts-ignore
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
