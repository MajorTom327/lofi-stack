import React from "react";

import BaseInput, { InputProps } from "./Input";

type Props = Omit<InputProps, "type">;

export const InputDate: React.FC<Props> = (props) => {
  return (
    <>
      <BaseInput {...props} type={"date"} />
    </>
  );
};

InputDate.defaultProps = {};

export default InputDate;
