"use client";

import { PortfolioHome } from "../components/PortfolioHome";
import { PhotoCollage } from "../components/PhotoCollage";
import { MeasureGuide } from "../components/MeasureGuide";
import { CONTENT_OFFSET_LEFT_PX } from "@/lib/design-tokens";
import { FANIME_COLLAGE_ITEMS } from "./fanime-collage";

export default function Fanime2027Home() {
  return (
    <PortfolioHome
      heroTagline="I design brand, illustrations, and doodles"
      resumeHref={null}
      clockZone="PT"
    >
      <section className="relative overflow-visible">
        <MeasureGuide label="DIV" className="h-full" />
        <div style={{ marginLeft: CONTENT_OFFSET_LEFT_PX }}>
          <PhotoCollage items={FANIME_COLLAGE_ITEMS} label="Photo collage" />
        </div>
      </section>
    </PortfolioHome>
  );
}
