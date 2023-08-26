import BaseInput, { InputProps } from "./Input";
import React from "react";

type Props = Omit<InputProps, "type">;

export const InputEmail: React.FC<Props> = (props) => {
  return (
    <>
      <BaseInput {...props} type={"email"} />
    </>
  );
};

InputEmail.defaultProps = {};

export default InputEmail;
