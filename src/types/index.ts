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

// types/index.ts
export interface Project {
  title: string;
  role: string;
  description: string;
  technologies: string[];
  achievements: string[]; // En tu JSON siempre existe como array
  url?: string; // Hacer opcional si no todos tienen
  github?: string; // Agregar si algunos proyectos lo tienen
  icon?: string; // Para futuros usos
  date?: string; // Para futuros usos
  id?: string; // Para futuros usos
}