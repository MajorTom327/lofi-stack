import { Link } from "@remix-run/react";
import classNames from "classnames";
import React from "react";
import { match, P } from "ts-pattern";

type Props = {
  children: React.ReactNode;
} & WithAction;

export const MenuItem: React.FC<Props> = ({ children, to, onClick }) => {
  const classes = classNames(
    "p-2 hover:bg-neutral/20 transition cursor-pointer"
  );

  const content = match({ to, onClick } as WithAction)
    .with({ to: P.string }, ({ to }) => (
      <Link to={to} prefetch="intent">
        {" "}
        {children}{" "}
      </Link>
    ))
    .with({ onClick: P.not(P.nullish) }, ({ onClick }) => (
      <button onClick={onClick} type="button">
        {" "}
        {children}{" "}
      </button>
    ))
    .exhaustive();

  return (
    <>
      <li className={classes}>{content}</li>
    </>
  );
};

MenuItem.defaultProps = {};

export default MenuItem;
