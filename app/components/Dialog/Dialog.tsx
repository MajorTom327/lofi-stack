import Button from "../Button";
import classNames from "classnames";
import { X as CloseIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";

type Props = {
  children?: React.ReactNode;
  open?: boolean;
  onClose: () => void;
};

export const Dialog: React.FC<Props> = ({ open, children, onClose }) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  const dialogClasses = classNames(
    "relative container mx-auto bg-base-100 text-base-content rounded-lg p-4 max-w-lg w-full",
    "drop-shadow-xl"
  );
  return (
    <>
      <dialog ref={ref} className={dialogClasses}>
        <Button
          ariaLabel="Close dialog"
          color="neutral"
          circle
          onClick={onClose}
          className="absolute top-0 right-0 text-lg text-opacity-25 hover:text-opacity-75"
        >
          <CloseIcon />
        </Button>
        {children}
      </dialog>
    </>
  );
};

Dialog.defaultProps = {};

export default Dialog;
