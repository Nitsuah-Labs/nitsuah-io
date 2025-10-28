// Minimal ambient declaration to satisfy Next-generated type imports
// (e.g. .next/types/validator.ts imports from "next/types.js").
// Keep this intentionally small to avoid coupling to Next's internal types.
declare module "next/types.js" {
  // These are used by the generated validator file. Keep as 'any' to avoid
  // pulling heavy Next types into the project typing surface during CI.
  export type ResolvingMetadata = any;
  export type ResolvingViewport = any;
}
