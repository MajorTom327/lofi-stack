import React from "react";

type Props = {};

export const Loader: React.FC<Props> = ({}) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="border-x-2 border-primary h-16 w-16 rounded-full animate-spin"></div>
      </div>
    </>
  );
};

Loader.defaultProps = {};

export default Loader;
