import React from "react";

import BaseInput, { InputProps } from "./Input";

type Props = Omit<InputProps, "type">;

export const InputUrl: React.FC<Props> = (props) => {
  return (
    <>
      <BaseInput {...props} type={"url"} />
    </>
  );
};

InputUrl.defaultProps = {};

export default InputUrl;
