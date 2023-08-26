import BaseInput, { InputProps } from "./Input";
import React from "react";

type Props = Omit<InputProps, "type">;

export const InputPhone: React.FC<Props> = (props) => {
  return (
    <>
      <BaseInput {...props} type={"phone"} />
    </>
  );
};

InputPhone.defaultProps = {};

export default InputPhone;
