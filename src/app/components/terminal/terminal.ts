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
  

  // intervalo de tipeo
  private typingInterval?: number;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

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
    // secuencia de ejemplo (usa playSequence)
    this.playSequence([
      { cmd: 'whoami', after: 1200 },
      { cmd: 'projects', after: 6400 },
      { cmd: 'links', after: 500 }
    ]);
  }

  // ngOnDestroy() {
  //   this.destroyed = true;
  //   this.stopAutoScroll();
  //   if (this.typingIntervalId) clearInterval(this.typingIntervalId);
  //   if (this.scrollCheckTimeout) clearTimeout(this.scrollCheckTimeout);
  //   if (this.scrollSubscription) this.scrollSubscription.unsubscribe();
  // }
  // Play sequence: mantiene el flujo sin anidar callbacks
  playSequence(commands: { cmd: string; after?: number }[]) {
    let idx = 0;
    const next = () => {
      if (idx >= commands.length) {
        this.typingComplete = true;
        this.cdr.detectChanges();
        return;
      }
      const { cmd, after = 500 } = commands[idx++];
      this.autoTypeCommand(cmd, () => {
        // pequeño yield para asegurar render final del tipeo
        setTimeout(() => {
          this.executeCommand(cmd);
          // esperar "after" ms antes del siguiente
          setTimeout(next, after);
        }, 40);
      });
    };
    next();
  }


  // autoType con callbacks y forzando detectChanges
  autoTypeCommand(command: string, callback: () => void) {
    this.clearTypingInterval();
    this.currentCommand = '';
    let i = 0;
    this.isTyping = true;
    this.cdr.detectChanges();

    // correr intervalo dentro de la zona para que detecte cambios
    this.ngZone.run(() => {
      this.typingInterval = window.setInterval(() => {
        if (i < command.length) {
          this.currentCommand += command.charAt(i);
          i++;
          this.cdr.detectChanges();
          this.scrollToBottom();
        } else {
          this.clearTypingInterval();
          this.isTyping = false;
          this.cdr.detectChanges();
          callback();
        }
      }, 140); // velocidad de tipeo (ajusta)
    });
  }

  private clearTypingInterval() {
    if (this.typingInterval !== undefined) {
      clearInterval(this.typingInterval);
      this.typingInterval = undefined;
    }
  }

  // isComponent(output: any): boolean {
  //   return output && typeof output === 'object' && 'component' in output;
  // }

  // getComponentType(output: any): any {
  //   return output.component;
  // }

  executeCommand(commandInput: string) {
    const command = commandInput.trim();
    if (!command) return;
  
    let output: any[] = [];
  
    if (command === 'whoami') {
      output = [{ component: 'about' }];
      this.scrollTime(100);
    } else if (command === 'projects') {
      output = [{ component: 'projects' }];
      this.scrollTime(6400);
    } else if (command === 'links') {
      output = [{ component: 'links' }];
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
      this.scrollTime(50);
    } else if (command === 'help') {
      output = [
        'Comandos disponibles:',
        'ls       - Listar archivos',
        'clear    - Limpiar terminal',
        'help     - Mostrar ayuda',
        'whoami   - Mostrar información sobre mí',
        'links    - Links a mis redes sociales',
        'projects - Mostrar mis proyectos'
      ];
    } else {
      output = [`Comando no encontrado: ${command}`];
    }
  
    this.commandHistory = [
      ...this.commandHistory,
      { command: `user@portfolio:~$ ${command}`, output }
    ];

    this.currentCommand = '';
    this.cdr.detectChanges();

  }
  

  scrollTime(tiempo: any){
    this.startAutoScroll(); 
      setTimeout(() => {
        this.stopAutoScroll()
      }, tiempo);
  }

  // scroll
  scrollToBottom() {
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