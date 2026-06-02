import type { TaskKey } from "@/lib/site-config";

export const slot4TaskSupport = {
  article: false,
  classified: true,
  sbm: false,
  profile: false,
  pdf: false,
  listing: false,
  image: false,
} satisfies Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Local guide pages and detail views",
  classified: "Classified ad pages and detail views",
  sbm: "Saved resource pages and detail views",
  profile: "Profile/user pages",
  pdf: "PDF/document pages and detail views",
  listing: "Business listing pages and detail views",
  image: "Image/gallery pages and detail views",
} satisfies Record<TaskKey, string>;
