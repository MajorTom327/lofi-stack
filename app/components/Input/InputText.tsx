import BaseInput, { InputProps } from "./Input";
import React from "react";

type Props = Omit<InputProps, "type">;

export const InputText: React.FC<Props> = (props) => {
  return (
    <>
      <BaseInput {...props} type={"text"} />
    </>
  );
};

InputText.defaultProps = {};

export default InputText;
