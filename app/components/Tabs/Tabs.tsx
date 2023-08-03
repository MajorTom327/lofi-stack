import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Tabs: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="flex w-full border-collapse">
        {children}
        <div className="flex-grow border-b"></div>
      </div>
    </>
  );
};

Tabs.defaultProps = {};

export default Tabs;
