import { Asterisk } from "lucide-react";
import { isNil } from "ramda";
import React, { useId } from "react";
import { useRemixFormContext } from "remix-hook-form";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type Props = Omit<
  {
    label: string;
  } & React.HTMLProps<HTMLInputElement>,
  "ref" | "type"
>;

export const InputCheckbox: React.FC<Props> = (props) => {
  const id = useId();
  const { register, getValues } = useRemixFormContext();

  const registerValue = register(props.name!, {
    required: props.required,
  });
  const value = getValues(props.name!);

  const checkboxProps = {
    id,
    checked: isNil(value) ? props.defaultChecked : value,
    onCheckedChange: (checked: boolean) => {
      const event = {
        target: {
          name: props.name,
          value: checked,
        },
      };
      registerValue.onChange(event);
    },
  };
  return (
    <>
      <div className="flex gap-1 items-center">
        <Checkbox {...checkboxProps} />
        <Label htmlFor={id} className="flex gap-2 items-center">
          {props.label}
          {props.required && (
            <span className="text-destructive">
              <Asterisk />
            </span>
          )}
        </Label>
      </div>
    </>
  );
};

InputCheckbox.defaultProps = {};

export default InputCheckbox;
