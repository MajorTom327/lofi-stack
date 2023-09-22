import classNames from "classnames";
import { Asterisk } from "lucide-react";
import React, { useId, useState } from "react";
import { useRemixFormContext } from "remix-hook-form";
import { PromptEnum } from "~/refs/prompts";

import useGpt from "~/hooks/useGpt";

import AiCompletionButton from "../AiCompletionButton";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { InputProps } from "./Input";

type Props = Omit<InputProps, "type"> & {
  prompt?: PromptEnum;
} & React.HTMLProps<HTMLTextAreaElement>;

export const InputTextArea: React.FC<Props> = ({
  addon,
  label,
  prompt,
  ...props
}) => {
  const id = useId();
  const { register, setValue, getValues } = useRemixFormContext();
  const { complete, completion } = useGpt(prompt);
  const [showCompletion, setShowCompletion] = useState(false);

  const handleAskCompletion = () => {
    const value = getValues(props.name!);
    complete(value);
    setShowCompletion(true);
  };

  const handleAcceptCompletion = () => {
    setValue(props.name!, completion);
    setShowCompletion(false);
  };

  const handleRefuseCompletion = () => {
    setShowCompletion(false);
  };

  const textareaProps = {
    id,
    placeholder: props.placeholder ?? label,
    rows: 5,
    ...props,
    ...register(props.name!, {
      required: props.required,
    }),
    className: classNames({
      "bg-base-200/20 cursor-not-allowed text-neutral/70 border-none ring ring-accent/50 focus:outline-none":
        showCompletion,
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

        <div className="relative">
          <Textarea {...textareaProps} />

          {prompt && (
            <AiCompletionButton
              completion={completion}
              onAskCompletion={handleAskCompletion}
              onAccept={handleAcceptCompletion}
              onRefuse={handleRefuseCompletion}
            />
          )}
        </div>
      </div>
    </>
  );
};

InputTextArea.defaultProps = {};

export default InputTextArea;
