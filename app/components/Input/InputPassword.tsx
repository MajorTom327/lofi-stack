import Button from "../Button";
import Input, { InputProps } from "./Input";
import { Eye, EyeOff } from "lucide-react";
import { not } from "ramda";
import React from "react";

type Props = Omit<InputProps, "type" | "addon">;

export const InputPassword: React.FC<Props> = (props) => {
  const [isVisibile, setIsVisible] = React.useState(false);

  return (
    <>
      <Input
        {...props}
        type={isVisibile ? "text" : "password"}
        addon={
          <Button
            className="flex-shrink"
            onClick={() => setIsVisible(not)}
            color="secondary"
          >
            {isVisibile ? <EyeOff /> : <Eye />}
          </Button>
        }
      />
    </>
  );
};

InputPassword.defaultProps = {};

export default InputPassword;
