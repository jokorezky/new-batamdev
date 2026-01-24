export interface SocialLinkInput {
  platform: string;
  url: string;
}

export interface PortfolioInput {
  title: string;
  description?: string;
  url: string;
  image?: string;
}

export interface CreateOnboardingInput {
  province: string;
  city: string;
  socialLinks?: SocialLinkInput[];
  portfolios?: PortfolioInput[];
  selectedSkills?: string[];
  resumeUrl?: string;
  bio?: string;
  profileImage?: string;
}

export interface UpdateOnboardingInput {
  province?: string;
  city?: string;
  socialLinks?: SocialLinkInput[];
  portfolios?: PortfolioInput[];
  selectedSkills?: string[];
  resumeUrl?: string;
  bio?: string;
  isCompleted?: boolean;
  profileImage?: string;
}

export interface OnboardingStatusResponse {
  hasOnboarding: boolean;
  isCompleted: boolean;
}

export interface Onboarding {
  _id: string;
  userId: string;
  province: string;
  city: string;
  socialLinks: SocialLink[];
  portfolios: Portfolio[];
  selectedSkills: string[];
  resumeUrl?: string;
  bio?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Portfolio {
  title: string;
  description?: string;
  url: string;
  image?: string;
}
