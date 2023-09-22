import { Asterisk } from "lucide-react";
import { isEmpty } from "ramda";
import React, { useId } from "react";
import { useRemixFormContext } from "remix-hook-form";

import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { InputProps } from "./Input";

type Props = Omit<InputProps, "type"> & {
  options: Array<{ label: string; value: string }>;
};

export const InputTextArea: React.FC<Props> = ({ addon, label, ...props }) => {
  const id = useId();
  const { register } = useRemixFormContext();

  const selectProps = {
    id,
    placeholder: props.placeholder ?? label,
    ...register(props.name!, {
      required: props.required,
      disabled: props.disabled || isEmpty(props.options),
    }),
  };

  const options = props.options;

  const handleChange = (value: string) => {
    const event: React.ChangeEvent<HTMLSelectElement> = {
      // @ts-ignore
      target: {
        name: props.name!,
        value,
      },
    };
    selectProps.onChange(event);
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

        <Select {...selectProps} onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

InputTextArea.defaultProps = {};

export default InputTextArea;
