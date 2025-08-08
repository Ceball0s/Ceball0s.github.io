import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.scss']
})
export class Projects {
  techIcons: { [key: string]: string } = {
    'React Native': 'fab fa-react',
    'Figma': 'fab fa-figma',
    'Excel Integration': 'fas fa-file-excel',
    'React Navigation': 'fab fa-react',
    'Spring Boot': 'fas fa-leaf',
    'JWT': 'fas fa-key',
    'PostgreSQL': 'fas fa-database',
    'React': 'fab fa-react',
    'Python': 'fab fa-python',
    'Algoritmo Minimax': 'fas fa-chess',
    'Interfaz gráfica': 'fas fa-desktop',
    'Flask': 'fas fa-flask',
    'Docker': 'fab fa-docker',
    'Jinja2': 'fas fa-code'
  };

  projects = [
    {
      title: 'UnivalleMatriculaApp',
      role: 'Líder de Desarrollo',
      description: 'Aplicación de matrículas para la Universidad del Valle',
      technologies: ['React Native', 'Figma', 'Excel Integration', 'React Navigation'],
      achievements: [
        'Arquitectura modular para mejor escalabilidad',
        'Implementación de temas claro/oscuro',
        'Gestor de materias con carga desde Excel'
      ]
    },
    {
      title: 'SubastALL',
      role: 'Líder de Desarrollo y Backend',
      description: 'Plataforma de subastas en línea',
      technologies: ['Spring Boot', 'JWT', 'PostgreSQL', 'React'],
      achievements: [
        'Backend completo con autenticación JWT',
        'Documentación de 20+ endpoints REST',
        'Optimización de consultas SQL'
      ]
    },
    {
      title: 'IA Ajedrez de Alicia',
      role: 'Desarrollador Principal',
      description: 'Inteligencia artificial para jugar ajedrez',
      technologies: ['Python', 'Algoritmo Minimax', 'Interfaz gráfica'],
      achievements: [
        'Implementación de algoritmo de decisión',
        'Interfaz de usuario intuitiva',
        'Pruebas exhaustivas de rendimiento'
      ]
    },
    {
      title: 'DulceriaWeb',
      role: 'Desarrollador Principal',
      description: 'Sistema de gestión para dulcería',
      technologies: ['Flask', 'PostgreSQL', 'Docker', 'Jinja2'],
      achievements: [
        'API RESTful con autenticación',
        'Operaciones CRUD completas',
        'Despliegue con Docker Compose'
      ]
    }
  ];

  getTechIcon(tech: string): string {
    return this.techIcons[tech] || 'fas fa-code'; // Icono por defecto
  }
}