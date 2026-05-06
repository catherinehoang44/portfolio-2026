"use client";

import Rive, { Alignment, Fit, Layout } from "@rive-app/react-canvas";

const RIVE_SRC = "/work/adobe-learning-portal/adobe-cert-portal-cover.riv";

/** Promotional motion: local .riv (replaces hosted Rive embed). */
export function AdobeCertPortalCoverRive({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Rive
      src={RIVE_SRC}
      className={className}
      style={style}
      layout={new Layout({ fit: Fit.Cover, alignment: Alignment.Center })}
      shouldResizeCanvasToContainer
    />
  );
}
