import classNames from "classnames";
import { propOr } from "ramda";
import { isNilOrEmpty } from "ramda-adjunct";
import React from "react";

type ImageWidth = 640 | 750 | 828 | 1080 | 1200;

const imageWidths: ImageWidth[] = [640, 750, 828, 1080, 1200];

type Props = {
  src: string;
  alt?: string;
  className?: string | string[] | { [key: string]: boolean };
};

type Options = Partial<{
  width: ImageWidth;
  quality: number;
}>;

export const getImageUrl = (src: string, options?: Options) => {
  let origin = "";
  try {
    origin = window.location.origin.toString();
  } catch (e) {}

  if (origin.includes("localhost") || isNilOrEmpty(origin)) {
    return src;
  }

  const url = new URL("/_vercel/image", origin);

  url.searchParams.append("url", src);

  const width: ImageWidth = propOr(1200, "width", options);
  const quality: number = propOr(75, "quality", options);

  url.searchParams.append("w", width.toString());
  url.searchParams.append("q", quality.toString());

  return url.toString();
};

export const Image: React.FC<Props> = ({ src, alt, className }) => {
  const classes = classNames(className);
  return (
    <>
      <picture>
        {imageWidths.map((width) => (
          <source
            key={width}
            srcSet={getImageUrl(src, { width })}
            media={`(min-width: ${width}px)`}
            className={classes}
          />
        ))}
        <img src={getImageUrl(src)} alt={alt} className={classes} />
      </picture>
    </>
  );
};

Image.defaultProps = {};

export default Image;
