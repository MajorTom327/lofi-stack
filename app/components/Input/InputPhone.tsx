import Input, { InputProps } from "./Input";
import React from "react";

type Props = Omit<InputProps, "type">;

export const InputPhone: React.FC<Props> = (props) => {
  return (
    <>
      <Input {...props} type={"phone"} />
    </>
  );
};

InputPhone.defaultProps = {};

export default InputPhone;
