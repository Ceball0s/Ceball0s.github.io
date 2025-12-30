// core/screen.ts
const screen = document.getElementById('screen') as HTMLElement;

let target: HTMLElement | null = null;

export function setBackground(bg: string) {
  // Cambiamos de .backgroundColor a .background para que acepte imágenes
  screen.style.background = bg; 
  
  // Si usas variables CSS en el estilo del elemento, asegúrate de que background-size se mantenga
  screen.style.backgroundSize = "cover";
}

export function setTarget(id: string) {
  target = document.getElementById(id);
}

// En core/screen.ts
export function clear() {
  if (!target) return;
  target.innerHTML = ''; // Usa innerHTML para limpiar, no textContent
}

export function write(html: string) {
  if (!target) return;
  target.insertAdjacentHTML('beforeend', html);
}

export function html(text: string) {
  screen.innerHTML += text;
}

export function set(text: string) {
  screen.innerHTML = text;
}

export function setView(name: string) {
  document.querySelectorAll('[data-view]').forEach(el => {
    (el as HTMLElement).style.display = 'none';
  });

  const view = document.querySelector(`[data-view="${name}"]`) as HTMLElement;
  if (view) view.style.display = 'block';
}
