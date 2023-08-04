import React from "react";

type Props = {};

export const Divider: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="w-full border-b border-neutral/20"></div>
    </>
  );
};

Divider.defaultProps = {};

export default Divider;
