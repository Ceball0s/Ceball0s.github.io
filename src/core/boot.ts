import { renderBootLogs } from './logs';
//import { renderTerminal } from './terminal';
import { setView, setTarget, clear, setBackground } from './screen';
import { wait } from './timing';

export async function boot() {

  setBackground('var(--bg-grub)');
  setView('grub');
  await wait(600);

  setView('kernel');
  await wait(400);

  setBackground('var(--bg-logs)');
  setView('logs');
  setTarget('bootlogs');
  await renderBootLogs();
  await wait(400);
  clear();

  setBackground('var(--bg-terminal)');
  setView('terminal');
  redirectToDesktop();


}

function redirectToDesktop() {
  setTimeout(() => {
    window.location.href = '/desktop';
  }, 500);
}

boot();
