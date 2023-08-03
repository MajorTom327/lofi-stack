import { NavLink } from "@remix-run/react";
import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  end?: boolean;
  to: string;
};

export const Tab: React.FC<Props> = ({ children, to, end }) => {
  const getClasses = ({ isActive }: { isActive: boolean }): string => {
    return classNames(
      "border-t border-l border-r rounded-t py-2 px-4 font-semibold",
      {
        "bg-primary text-primary-content": isActive,
        "border-b shadow-[0_0_-5px_0_rgba(0,0,0,0.3)] shadow-inner ": !isActive,
      }
    );
  };
  return (
    <>
      <NavLink to={to} end={end} className={getClasses}>
        {children}
      </NavLink>
    </>
  );
};

Tab.defaultProps = {};

export default Tab;
