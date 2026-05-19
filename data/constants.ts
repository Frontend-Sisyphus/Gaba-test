export const USER_ROLES = ["admin", "moderator", "user"] as const;

export const ROLE_VARIANTS: Record<string, "success" | "warning" | "info"> = {
  admin: "success",
  moderator: "warning",
  user: "info",
};

export const GENDER_OPTIONS = ["male", "female"] as const;