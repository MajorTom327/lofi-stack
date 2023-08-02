import React from "react";

type Props = {
  children: React.ReactNode;
};

export const NavbarBrand: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="capitalize">{children}</div>
    </>
  );
};

NavbarBrand.defaultProps = {};

export default NavbarBrand;
