import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const MenuTitle: React.FC<Props> = ({ children }) => {
  const classes = classNames(
    "flex px-4 pt-2 transition w-full text-md font-bold cursor-default"
  );

  return (
    <>
      <li className={classes}>{children}</li>
    </>
  );
};

MenuTitle.defaultProps = {};

export default MenuTitle;
