import classNames from "classnames";
import { Asterisk } from "lucide-react";
import React, { ForwardedRef, useId } from "react";

export type InputProps = Omit<
  {
    addon?: React.ReactNode;
    label: string;
  } & React.HTMLProps<HTMLInputElement>,
  "ref"
>;

export const Input: React.FC<InputProps> = React.forwardRef(
  ({ addon, label, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();

    const inputProps = {
      placeholder: props.placeholder ?? label,
      id,
      className: classNames(
        "px-2 py-2 rounded-lg bg-base-200 w-full flex-grow",
        "invalid:border-error"
      ),
      ...props,
    };
    return (
      <>
        <div className="flex flex-col">
          <label htmlFor={id} className="flex gap-1 items-center">
            {label}
            {props.required && (
              <span className="text-accent">
                <Asterisk size={20} />
              </span>
            )}
          </label>
          {addon ? (
            <div className="w-full flex gap-1">
              <input {...inputProps} ref={ref} />
              {addon && <div className="flex-shrink">{addon}</div>}
            </div>
          ) : (
            <input {...inputProps} />
          )}
        </div>
      </>
    );
  }
);

Input.defaultProps = {};

export default Input;
