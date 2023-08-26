import { Link } from "@remix-run/react";
import classNames from "classnames";
import React from "react";
import { match, P } from "ts-pattern";

type Props = {
  children: React.ReactNode;
} & WithAction;

export const MenuItem: React.FC<Props> = ({ children, to, onClick }) => {
  const classes = classNames("px-4 py-2 hover:bg-primary/20 transition w-full");

  const content = match({ to, onClick } as WithAction)
    .with({ to: P.string }, ({ to }) => (
      <Link to={to} prefetch="intent" className={classes}>
        {children}{" "}
      </Link>
    ))
    .otherwise(({ onClick }) => (
      <button onClick={onClick} type="button" className={classes}>
        {" "}
        {children}{" "}
      </button>
    ));

  return (
    <>
      <li className="flex">{content}</li>
    </>
  );
};

MenuItem.defaultProps = {};

export default MenuItem;
