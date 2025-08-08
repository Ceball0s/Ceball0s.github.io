// links.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './links.html',
  styleUrls: ['./links.scss']
})
export class Links {
  // Links con clases de Font Awesome
  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/miguel-angel-ceballos-914970284/',
      iconClass: 'fab fa-linkedin',
      color: '#0A66C2'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Ceball0s',
      iconClass: 'fab fa-github',
      color: '#181717'
    },
    {
      name: 'Correo electrónico',
      url: 'mailto:miguel.yate@correounivalle.edu.co',
      iconClass: 'fas fa-envelope',
      color: '#EA4335'
    }
  ];
}