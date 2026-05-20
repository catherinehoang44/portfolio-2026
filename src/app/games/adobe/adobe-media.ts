import type { GamesCaseMediaItem } from "../_components/games-case-media-types";

const ADOBE_MEDIA_BASE = "/work/adobe-learning-portal";

export const COURSE_CATALOG_FRONTEND_MEDIA: GamesCaseMediaItem[] = [
  {
    kind: "image",
    src: `${ADOBE_MEDIA_BASE}/course-catalog-frontend.png`,
    caption: "Course catalog",
    tag: "Image",
    aspectRatio: "1024/834",
    objectFit: "contain",
  },
];

const LMS_ASPECT = "1024/588";

/** Course module catalog (LMS) — screens LMS 1–5 in order. */
export const COURSE_CATALOG_BACKEND_MEDIA: GamesCaseMediaItem[] = [
  {
    kind: "image",
    src: `${ADOBE_MEDIA_BASE}/lms-1.png`,
    caption: "Content library",
    tag: "Image",
    aspectRatio: LMS_ASPECT,
    objectFit: "contain",
  },
  {
    kind: "image",
    src: `${ADOBE_MEDIA_BASE}/lms-2.png`,
    caption: "Content details",
    tag: "Image",
    aspectRatio: LMS_ASPECT,
    objectFit: "contain",
  },
  {
    kind: "image",
    src: `${ADOBE_MEDIA_BASE}/lms-3.png`,
    caption: "Versioning",
    tag: "Image",
    aspectRatio: LMS_ASPECT,
    objectFit: "contain",
  },
  {
    kind: "image",
    src: `${ADOBE_MEDIA_BASE}/lms-4.png`,
    caption: "Course assignment",
    tag: "Image",
    aspectRatio: LMS_ASPECT,
    objectFit: "contain",
  },
  {
    kind: "image",
    src: `${ADOBE_MEDIA_BASE}/lms-5.png`,
    caption: "Publish history",
    tag: "Image",
    aspectRatio: "1024/590",
    objectFit: "contain",
  },
];

export const UNIVERSITY_PAGE_MEDIA: GamesCaseMediaItem[] = [
  {
    kind: "image",
    src: `${ADOBE_MEDIA_BASE}/university-page.png`,
    caption: "University outreach",
    tag: "Image",
    aspectRatio: "565/1024",
    objectFit: "contain",
  },
];

export const PROFILE_PAGE_MEDIA: GamesCaseMediaItem[] = [
  {
    kind: "image",
    src: `${ADOBE_MEDIA_BASE}/profile-page.png`,
    caption: "User profile",
    tag: "Image",
    aspectRatio: "702/1024",
    objectFit: "contain",
  },
];
