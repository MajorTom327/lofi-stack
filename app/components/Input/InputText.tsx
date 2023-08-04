import Input, { InputProps } from "./Input";
import React from "react";

type Props = Omit<InputProps, "type">;

export const InputText: React.FC<Props> = (props) => {
  return (
    <>
      <Input {...props} type={"text"} />
    </>
  );
};

InputText.defaultProps = {};

export default InputText;
