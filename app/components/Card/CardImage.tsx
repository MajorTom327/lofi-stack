import { getImageUrl } from "../Image/Image";
import { useLocation } from "@remix-run/react";
import React, { useMemo } from "react";

type Props = {
  src: string;
  alt: string;
};

export const CardImage: React.FC<Props> = ({ src, alt }) => {
  const cleanSrc = useMemo(() => {
    return getImageUrl(src);
  }, [src]);
  return (
    <>
      <div className="relative w-full h-48">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={cleanSrc}
          alt={alt}
        />
      </div>
    </>
  );
};

CardImage.defaultProps = {};

export default CardImage;
