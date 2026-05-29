// core/screen.ts
const screen = document.getElementById('screen');

let target = null;

export function setBackground(bg) {
  // Cambiamos de .backgroundColor a .background para que acepte imágenes
  screen.style.background = bg; 
  
  // Si usas variables CSS en el estilo del elemento, asegúrate de que background-size se mantenga
  screen.style.backgroundSize = "cover";
}

export function setTarget(id) {
  target = document.getElementById(id);
}

// En core/screen.ts
export function clear() {
  if (!target) return;
  target.innerHTML = ''; // Usa innerHTML para limpiar, no textContent
}

export function write(html) {
  if (!target) return;
  target.insertAdjacentHTML('beforeend', html);
}

export function html(text) {
  screen.innerHTML += text;
}

export function set(text) {
  screen.innerHTML = text;
}

export function setView(name) {
  document.querySelectorAll('[data-view]').forEach(el => {
    el.style.display = 'none';
  });

  const view = document.querySelector(`[data-view="${name}"]`);
  if (view) view.style.display = 'block';
}
