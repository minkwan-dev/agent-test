export type ProfileDto = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  onboarding_completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PatchProfileDto = {
  full_name?: string;
};
