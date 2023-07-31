import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  center?: boolean;
};

export const CardTitle: React.FC<Props> = ({ children, className, center }) => {
  const classes = classNames("my-2 text-3xl", className, {
    "text-center": center,
  });

  return (
    <>
      <div className={classes}>{children}</div>
    </>
  );
};

CardTitle.defaultProps = {};

export default CardTitle;
