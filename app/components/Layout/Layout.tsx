import { isNotNilOrEmpty } from "ramda-adjunct";
import React from "react";

type Props = {
  children: React.ReactNode;
  nav?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children, nav, footer }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {isNotNilOrEmpty(nav) && nav}
        <div className="flex-grow">{children}</div>
        {isNotNilOrEmpty(footer) && footer}
      </div>
    </>
  );
};

Layout.defaultProps = {};

export default Layout;
