import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const CardActions: React.FC<Props> = ({ children, className }) => {
  const classes = classNames("flex justify-end gap-2", className);

  return (
    <>
      <div className={classes}>{children}</div>
    </>
  );
};

CardActions.defaultProps = {};

export default CardActions;
