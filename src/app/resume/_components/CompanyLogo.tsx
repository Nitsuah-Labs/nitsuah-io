"use client";

import Image from "next/image";
import { useState, type FC, type CSSProperties } from "react";

interface CompanyLogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

export const CompanyLogo: FC<CompanyLogoProps> = ({
  src,
  alt,
  width = 48,
  height = 48,
  className,
  style,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={className}
        style={{
          width,
          height,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        {alt.slice(0, 1).toUpperCase()}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setHasError(true)}
      className={className}
      style={style}
    />
  );
};
