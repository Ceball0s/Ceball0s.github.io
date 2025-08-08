import { ChangeDetectorRef, Component, HostListener, NgZone } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
// import { Welcome } from '../welcome/welcome';
import { About } from '../about/about';
import { Projects } from '../projects/projects';
import { Links } from '../links/links';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule, About, Projects, Links],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss'
})
export class Terminal implements AfterViewInit {
  
  // Referencia al contenedor de scroll
  @ViewChild('terminalContainer', { static: false }) 
  private terminalContainer!: ElementRef<HTMLDivElement>;
  // Control de scroll automático
  private autoScrollEnabled = true;
  private scrollSubscription?: Subscription;
  private scrollCheckTimeout: any;

  // funcionamiento terminal
  commandHistory: { command: string, output: any[] }[] = [];
  currentCommand = '';
  isTyping = true;
  typingComplete = false;
  asciiArt = `...`; // Tu arte ASCII aquí

  constructor() {}

  // ngAfterViewInit() {
  //   this.autoTypeCommand('whoami', () => {
  //     setTimeout(() => {
  //       // this.executeCommand('whoami');
  //       this.isTyping = false;
  //       this.typingComplete = true;
  //       // this.inputField.nativeElement.focus();
  //     }, 1000);
  //     setTimeout(() => {}, 1000);
      
  //   });
  // }
  ngAfterViewInit() {
    this.autoTypeCommand('whoami', () => {
      setTimeout(() => {
        this.executeCommand('whoami'); // Presiona enter
        this.isTyping = false;
        this.typingComplete = true;
  
        // Segundo comando
        this.autoTypeCommand('projects', () => {
          setTimeout(() => {
            this.executeCommand('projects');
            this.isTyping = false;
            this.typingComplete = true;
  
            // Tercer comando
            this.autoTypeCommand('links', () => {
              setTimeout(() => {
                this.executeCommand('links');
                this.isTyping = false;
                this.typingComplete = true;
              }, 9800);
            });
  
          }, 5000);
        });
  
      }, 500);
    });
  }
  

  isComponent(output: any): boolean {
    return output && typeof output === 'object' && 'component' in output;
  }

  getComponentType(output: any): any {
    return output.component;
  }

  autoTypeCommand(command: string, callback: () => void) {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < command.length) {
        this.currentCommand += command.charAt(i);
        i++;
      } else {
        clearInterval(typingInterval);
        callback();
      }
    }, 100);
  }

  executeCommand(commandInput: string) {
    const command = commandInput.trim();
    if (!command) return;
  
    let output: any[] = [];
  
    if (command === 'whoami') {
      output = ['about'];
      this.scrollTime(100);
    } else if (command === 'projects') {
      output = ['projects'];
      this.scrollTime(9800);
    } else if (command === 'links') {
      output = ['links'];
      this.scrollTime(100);
    } else if (command === 'clear') {
      this.commandHistory = [];
      this.currentCommand = '';
      return;
    } else if (command === 'ls' || command === 'ls -l') {
      output = [
        'drwxr-xr-x  user user 4.0 KB  📁  Desktop',
        'drwxr-xr-x  user user 4.0 KB  📁  Documents',
        'drwxr-xr-x  user user 4.0 KB  📁  Downloads',
        '-rw-r--r--  user user  12 KB  📄  resume.pdf'
      ];
    } else if (command === 'help') {
      output = [
        'Comandos disponibles:',
        'ls       - Listar archivos',
        'clear    - Limpiar terminal',
        'help     - Mostrar ayuda',
        'whoami   - Mostrar información sobre mí'
      ];
    } else {
      output = [`Comando no encontrado: ${command}`];
    }
  
    this.commandHistory.push({
      command: `user@portfolio:~$ ${command}`,
      output: output
    });
  
    this.currentCommand = '';
    // this.cdr.detectChanges();
    // this.startAutoScroll(); // Reactivar scroll automático
  }

  scrollTime(tiempo: any){
    this.startAutoScroll(); 
      setTimeout(() => {
        this.stopAutoScroll()
      }, tiempo);
  }

  // scroll
  scrollToBottom() {
    console.log("estoy bajando papu :V");
    if (!this.terminalContainer?.nativeElement) return;
    
    const container = this.terminalContainer.nativeElement;
    // Scroll al fondo del contenedor
    container.scrollTop = container.scrollHeight;
  }

  // Iniciar scroll automático
  startAutoScroll() {
    this.autoScrollEnabled = true;
    
    // Limpiar cualquier subscripción previa
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
    
    // Crear nuevo intervalo
    this.scrollSubscription = interval(100).subscribe(() => {
      if (this.autoScrollEnabled) {
        this.scrollToBottom();
      }
    });
    
    // Detectar scroll manual del usuario
    this.detectManualScroll();
  }

  // Detener scroll automático
  stopAutoScroll() {
    this.autoScrollEnabled = false;
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
      this.scrollSubscription = undefined;
    }
  }

  // Detectar cuando el usuario hace scroll manualmente
  private detectManualScroll() {
    if (!this.terminalContainer?.nativeElement || this.scrollCheckTimeout) return;
    
    const container = this.terminalContainer.nativeElement;
    let lastScrollTop = container.scrollTop;
    
    const checkScroll = () => {
      if (!this.autoScrollEnabled) return;
      
      // Si el usuario ha hecho scroll manualmente
      if (container.scrollTop !== lastScrollTop) {
        // Detener scroll automático si el usuario se mueve hacia arriba
        if (container.scrollTop < lastScrollTop) {
          this.stopAutoScroll();
          return;
        }
        lastScrollTop = container.scrollTop;
      }
      
      // Continuar verificando
      this.scrollCheckTimeout = setTimeout(checkScroll, 100);
    };
    
    // Iniciar la verificación
    this.scrollCheckTimeout = setTimeout(checkScroll, 100);
  }
}