import classNames from "classnames";
import React, { useMemo } from "react";

import { getImageUrl } from "../Image/Image";

type Props = {
  imgSrc?: string;
  imgAlt?: string;
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<Props> = ({
  children,
  className,
  imgSrc,
  imgAlt,
}) => {
  const classes = classNames("border rounded-lg shadow", className);

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
