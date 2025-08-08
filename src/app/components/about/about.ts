import { Component, OnInit, inject } from '@angular/core';
import { TypewriterService } from '../../services/typewriter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class About implements OnInit {
  private typewriter = inject(TypewriterService);

  // Textos completos
  fullTexts = {
    title: "SOBRE MÍ",
    name: "Miguel Angel Ceballos",
    role: "Desarrollador Full Stack con experiencia en diseño y desarrollo de aplicaciones web, móviles y soluciones en la nube. Apasionado por aprender nuevas tecnologías y enfrentar desafíos técnicos. Especializado en arquitecturas limpias y escalables.",
    location: "Tuluá, Colombia",
    skills: []
  };

  // Propiedades para mostrar
  displayTitle = "";
  displayName = "";
  displayRole = "";
  displayLocation = "";
  skills: string[] = [];

  // Texto actual en proceso
  private textsToType: string[] = [];

  // Categorías de habilidades con iconos
  skillCategories = [
    {
      name: "Lenguajes",
      skills: ["C++", "Python", "Java", "JavaScript", "TypeScript", "Kotlin", "Scala", "SQL"]
    },
    {
      name: "Frontend",
      skills: ["HTML", "CSS", "React", "Angular", "Figma"]
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "Flask", "Spring Boot", "APIs RESTful"]
    },
    {
      name: "Datos",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Análisis de datos"]
    },
    {
      name: "DevOps",
      skills: ["Docker", "AWS", "Git", "Linux", "CI/CD"]
    },
    {
      name: "Móvil",
      skills: ["Android Studio", "React Native", "Kotlin"]
    }
  ];



  // Iconos para categorías (emojis minimalistas)
  categoryIcons: { [key: string]: string } = {
    "Lenguajes": "{}",
    "Frontend": "</>",
    "Backend": "⚙️",
    "Datos": "📊",
    "DevOps": "🔄",
    "Móvil": "📱"
  };

  async ngOnInit() {
    this.prepareTexts();
    await this.typeContent();
  }

  private prepareTexts() {
    this.textsToType = [
      `NOMBRE: ${this.fullTexts.name}`,
      `DESCRIPCION: ${this.fullTexts.role}`,
      `LOCALIZACIÓN: ${this.fullTexts.location}`
    ];
  }

  async typeContent() {
    await this.typewriter.typeText(this.fullTexts.title, 10, (content) => {
      this.displayTitle = content;
    });
    
    // await this.showSkillsGradually();
    
    for (const text of this.textsToType) {
      await this.typewriter.typeText(text, 10, (content) => {
        this.updateDisplay(content);
      });
      
      // Manejo especial para habilidades
      if (text.startsWith('HABILIDADES')) {
        let posicion = 0;
        for (const skill of this.fullTexts.skills) {
          await this.typewriter.typeText(`${skill}`, 30, (content) => {
            this.skills.splice(posicion, 1, content)
            // this.skills = [...this.skills, content];
          });
          posicion = posicion + 1
        }
      }
      
      await this.typewriter.delay(5);

    }
  }

  private updateDisplay(content: string) {
    const [prefix, ...value] = content.split(': ');
    const cleanValue = value.join(': ');

    switch(prefix) {
      case 'NOMBRE':
        this.displayName = cleanValue;
        break;
      case 'DESCRIPCION':
        this.displayRole = cleanValue;
        break;
      case 'LOCALIZACIÓN':
        this.displayLocation = cleanValue;
        break;
      case 'HABILIDADES':
        this.displayTitle = this.fullTexts.title;
        break;
    }
  }

  
}