// SHA-256 of the shared reports password ("ypocampfiredata"). The plaintext is
// never stored in the (public) repo; the gate hashes the submitted password and
// compares. Low-stakes shared gate, not per-user auth.
export const REPORTS_HASH =
  "85ec249d9698cb9cc40db9ebcb2696ae07acdefc3926103d8b509e4e61f04529";
export const REPORTS_COOKIE = "ypo_reports_auth";
