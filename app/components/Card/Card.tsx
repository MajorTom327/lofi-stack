import { getImageUrl } from "../Image/Image";
import classNames from "classnames";
import React, { useMemo } from "react";
import { Colors } from "~/refs";

type Props = {
  imgSrc?: string;
  imgAlt?: string;
  children: React.ReactNode;
  className?: string;
  color?: Colors;
};

export const Card: React.FC<Props> = ({
  children,
  className,
  imgSrc,
  imgAlt,
  color,
}) => {
  const classes = classNames(
    "border rounded-lg shadow",
    {
      "border-primary bg-primary text-primary-content": color === "primary",
      "border-secondary bg-secondary text-secondary-content":
        color === "secondary",
      "border-accent bg-accent text-accent-content": color === "accent",
      "border-danger bg-danger text-danger-content": color === "danger",
      "border-info bg-info text-info-content": color === "info",
      "border-success bg-success text-success-content": color === "success",
      "border-warning bg-warning text-warning-content": color === "warning",
      "border-base-100 bg-base-100 text-base-content":
        color === "ghost" || !color,
    },
    className
  );

  const src = useMemo(() => {
    if (!imgSrc) {
      return null;
    }
    return getImageUrl(imgSrc);
  }, [imgSrc]);

  return (
    <>
      <div className={classes}>
        {src && (
          <div className="relative w-full h-48">
            <img
              className="w-full h-full object-cover rounded-t-lg"
              src={src}
              alt={imgAlt}
            />
          </div>
        )}
        <div className="flex flex-col gap-2 py-2 px-4">{children}</div>
      </div>
    </>
  );
};

Card.defaultProps = {};

export default Card;
