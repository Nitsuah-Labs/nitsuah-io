"use client";

import Image from "next/image";
import { useState } from "react";

interface CompanyLogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  src,
  alt,
  width = 48,
  height = 48,
  className,
  style,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized // Required for external logo.dev API - Next.js Image optimization doesn't support this domain
      onError={() => setHasError(true)}
      className={className}
      style={style}
    />
  );
};
