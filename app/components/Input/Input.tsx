import { Input } from "../ui/input";
import { Label } from "../ui/label";
import classNames from "classnames";
import { Asterisk } from "lucide-react";
import { always, propOr } from "ramda";
import React, { ForwardedRef, useId } from "react";
import { useRemixFormContext } from "remix-hook-form";

export type InputProps = Omit<
  {
    addon?: React.ReactNode;
    label: string;
  } & React.HTMLProps<HTMLInputElement>,
  "ref"
>;

export const BaseInput: React.FC<InputProps> = ({ addon, label, ...props }) => {
  const id = useId();
  const { register, getFieldState } = useRemixFormContext();

  const fieldstate = getFieldState(props.name!);

  const inputProps = {
    placeholder: props.placeholder ?? label,
    id,
    className: classNames("px-2 py-2 rounded-lg bg-base-200 w-full flex-grow", {
      "invalid:border-destructive invalid:bg-destructive-50 invalid:text-destructive":
        fieldstate.isTouched,
    }),
    ...props,
    ...register(props.name!, {
      required: props.required,
    }),
  };
  return (
    <>
      <div className="flex flex-col gap-0">
        <Label htmlFor={id} className="flex gap-2 items-center mt-2">
          {label}
          {props.required && (
            <span className="text-destructive">
              <Asterisk />
            </span>
          )}
        </Label>
        {addon ? (
          <div className="w-full flex gap-1">
            <Input {...inputProps} />
            {addon && <div className="flex-shrink">{addon}</div>}
          </div>
        ) : (
          <Input {...inputProps} />
        )}
      </div>
    </>
  );
};

BaseInput.defaultProps = {};

export default BaseInput;
