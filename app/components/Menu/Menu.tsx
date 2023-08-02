import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Menu: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ul>{children}</ul>
    </>
  );
};

Menu.defaultProps = {};

export default Menu;
