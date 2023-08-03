import Button from "../Button/Button";
import classNames from "classnames";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  X as CloseIcon,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { match } from "ts-pattern";
import { Colors } from "~/refs";

type Props = {
  children?: React.ReactNode;
  title?: string;
  color: Colors;
  closable?: boolean;
};

export const Alert: React.FC<Props> = ({
  children,
  color,
  title,
  closable,
}) => {
  const [show, setShow] = useState(true);

  const classes = classNames("my-2 p-2 rounded-lg drop-shadow-lg", {
    "bg-error text-error-content": color === "error",
    "bg-success text-success-content": color === "success",
    "bg-warning text-warning-content": color === "warning",
    "bg-info text-info-content": color === "info",
    "bg-primary text-primary-content": color === "primary",
    "bg-secondary text-secondary-content": color === "secondary",
  });

  const size = 48;

  const icon = match(color)
    .with("error", () => <XCircle size={size} />)
    .with("warning", () => <AlertTriangle size={size} />)
    .with("info", () => <Info size={size} />)
    .with("success", () => <CheckCircle size={size} />)
    .otherwise(() => null);

  if (!show) return null;

  return (
    <>
      <div className={classes}>
        <div className="flex gap-6 items-center px-4 py-2 relative">
          <div className="flex-shrink-0  h-full text-6xl">{icon}</div>
          <div className="flex flex-col ">
            {title && <div className="text-xl font-semibold">{title}</div>}
            {children && <div>{children}</div>}
          </div>

          {closable && (
            <Button
              circle
              onClick={() => setShow(false)}
              className="absolute top-0 right-0 text-lg text-opacity-25 hover:text-opacity-75"
            >
              <CloseIcon />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

Alert.defaultProps = {};

export default Alert;
