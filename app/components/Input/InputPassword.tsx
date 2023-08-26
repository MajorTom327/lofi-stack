import { Toggle } from "../ui/toggle";
import BaseInput, { InputProps } from "./Input";
import { Eye, EyeOff } from "lucide-react";
import { not } from "ramda";
import React from "react";

type Props = Omit<InputProps, "type" | "addon"> & { togglable?: boolean };

export const InputPassword: React.FC<Props> = (props) => {
  const [isVisibile, setIsVisible] = React.useState(false);

  return (
    <>
      <BaseInput
        {...props}
        type={isVisibile ? "text" : "password"}
        addon={
          props.togglable && (
            <Toggle
              pressed={isVisibile}
              onPressedChange={() => setIsVisible(not)}
            >
              {isVisibile ? <EyeOff /> : <Eye />}
            </Toggle>
          )
        }
      />
    </>
  );
};

InputPassword.defaultProps = {};

export default InputPassword;
