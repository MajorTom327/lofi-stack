import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Navbar: React.FC<Props> = ({ children }) => {
  return (
    <>
      <nav className="py-2 px-4 bg-primary text-primary-content flex gap-2 justify-between shadow text-lg">
        {children}
      </nav>
    </>
  );
};

Navbar.defaultProps = {};

export default Navbar;
