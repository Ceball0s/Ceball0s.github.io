// types/index.ts
export interface SocialLink {
  name: string;
  url: string;
  iconClass: string;
  color: string;
}

export interface UserInfo {
  title: string;
  name: string;
  role: string;
  location: string;
  skills: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  date: string;
  url?: string;
  github?: string;
  icon?: string;
}