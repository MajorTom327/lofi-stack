import React from "react";

type Props = {
  children: React.ReactNode;
};

export const NavbarBrand: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

NavbarBrand.defaultProps = {};

export default NavbarBrand;
