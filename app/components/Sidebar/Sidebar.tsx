import classNames from "classnames";
import React from "react";

type Props = {
  content: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
};

export const Sidebar: React.FC<Props> = ({ children, content, isOpen }) => {
  return (
    <>
      <div
        className={classNames("grid gap-2 h-full", {
          "grid-cols-1": !isOpen,
          "grid-cols-4": isOpen,
        })}
      >
        {isOpen && (
          <div className="min-h-screen bg-secondary text-secondary-foreground shadow">
            {children}
          </div>
        )}
        <div
          className={classNames("p-2", {
            "col-span-3": isOpen,
          })}
        >
          {content}
        </div>
      </div>
    </>
  );
};

Sidebar.defaultProps = {};

export default Sidebar;
