import type { GamesCaseProject } from "../_components/games-case-project-types";
import type { ScopeItem } from "@/app/components/ScopeDetails";
import {
  COURSE_CATALOG_BACKEND_MEDIA,
  COURSE_CATALOG_FRONTEND_MEDIA,
  PROFILE_PAGE_MEDIA,
  UNIVERSITY_PAGE_MEDIA,
} from "./adobe-media";

/** At least Web Design; optional second skill (max 2). */
function adobeSkills(second?: string): string {
  return second ? `Web Design, ${second}` : "Web Design";
}

const adobePlaceholderScope: ScopeItem[] = [
  { label: "Timeline", value: "4 months" },
  { label: "Team", value: "2 Designers (me!)" },
  { label: "Skills", value: adobeSkills() },
];

function adobeProject(
  scopeLabel: string,
  description: string,
  options?: {
    mediaItems?: GamesCaseProject["mediaItems"];
    scopeItems?: ScopeItem[];
    descriptionPreface?: string;
    descriptionPrefaceItalic?: boolean;
    descriptionItalic?: boolean;
  },
): GamesCaseProject {
  return {
    scopeLabel,
    description,
    descriptionPreface: options?.descriptionPreface,
    descriptionPrefaceItalic: options?.descriptionPrefaceItalic,
    descriptionItalic: options?.descriptionItalic,
    scopeItems: options?.scopeItems ?? adobePlaceholderScope,
    mediaItems: options?.mediaItems,
  };
}

export const ADOBE_GAMES_PROJECTS: GamesCaseProject[] = [
  adobeProject(
    "Course (and Exam) Catalog, Front-end",
    "Front-end design for the course and exam catalog. Discovery, filtering, and detail views for learners.",
    {
      scopeItems: [
        { label: "Timeline", value: "3 weeks" },
        {
          label: "Team",
          value:
            "2 Designers (me!), 1 UX Researcher (me!), 2 Devs, 2 Instructional Designers, 3 Exam Developers",
        },
        { label: "Skills", value: adobeSkills("Interaction Design") },
      ],
      mediaItems: COURSE_CATALOG_FRONTEND_MEDIA,
    },
  ),
  adobeProject(
    "Course Module Catalog, Back-end",
    "Back-end admin flows for organizing course modules, metadata, and catalog structure.",
    {
      scopeItems: [
        { label: "Timeline", value: "3 weeks" },
        {
          label: "Team",
          value: "2 Designers (me!), 1 Dev, 2 Instructional Designers",
        },
        { label: "Skills", value: adobeSkills("Internal Product") },
      ],
      mediaItems: COURSE_CATALOG_BACKEND_MEDIA,
    },
  ),
  adobeProject(
    "Certification Renewals, Front-end and Back-end",
    "This was the high-impact project for our business KPIs. Renewal journeys for expiring certifications, including reminders, eligibility, and re-certification paths. I ran User Acceptance Testing sprints with our developers, serving as the final gate before launch.",
    {
      descriptionPreface: "Renewals design work is unviewable due to NDA.",
      descriptionPrefaceItalic: true,
      scopeItems: [
        { label: "Timeline", value: "2 months" },
        {
          label: "Team",
          value:
            "2 Designers (me!), UX Researcher and Tester (me!), 3 Devs, 2 Instructional Designers, 3 Exam Developers, Program Manager, 3 Marketing Managers (me!)",
        },
        { label: "Skills", value: adobeSkills("Internal Product") },
      ],
    },
  ),
  adobeProject("University Page", "University partner experience for browsing programs and credentials.", {
    scopeItems: [
      { label: "Timeline", value: "1 week" },
      {
        label: "Team",
        value: "2 Designers (me!), 1 Dev, 2 University Outreach Managers",
      },
      { label: "Skills", value: adobeSkills() },
    ],
    mediaItems: UNIVERSITY_PAGE_MEDIA,
  }),
  adobeProject(
    "Profile",
    "Profile and account settings for learners. Progress, certifications, and preferences in one place.",
    {
      scopeItems: [
        { label: "Timeline", value: "1 week" },
        { label: "Team", value: "2 Designers (me!)" },
        { label: "Skills", value: adobeSkills() },
      ],
      mediaItems: PROFILE_PAGE_MEDIA,
    },
  ),
];
