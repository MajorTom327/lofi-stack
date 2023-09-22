import { Asterisk } from "lucide-react";
import React, { useId } from "react";
import { useRemixFormContext } from "remix-hook-form";

import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { InputProps } from "./Input";

type Props = Omit<
  InputProps,
  "type"
> & {} & React.HTMLProps<HTMLTextAreaElement>;

export const InputTextArea: React.FC<Props> = ({ addon, label, ...props }) => {
  const id = useId();
  const { register } = useRemixFormContext();

  const textareaProps = {
    id,
    placeholder: props.placeholder ?? label,
    rows: 5,
    ...props,
    ...register(props.name!, {
      required: props.required,
    }),
  };
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor={id} className="flex gap-2 items-center mt-2">
          {label}
          {props.required && (
            <span className="text-destructive">
              <Asterisk />
            </span>
          )}
        </Label>

        <Textarea {...textareaProps} />
      </div>
    </>
  );
};

InputTextArea.defaultProps = {};

export default InputTextArea;
