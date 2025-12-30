// core/logs.ts
import { setTarget, clear, write } from './screen';
import { wait, randomDelay } from './timing';

const logs = [
  '[ OK ] Started Power Management Service – Power Management Service',
  '[ OK ] Started Window Management Service – Window Management Service',
  '[ OK ] Started Network Manager – Network Manager',
  '[ OK ] Started Plymouth Update – Plymouth Update',
  '[ OK ] Started CUPS Scheduler – CUPS Scheduler',
  '[ OK ] Started ACPI Events Check – ACPI Events Check',
  '[ OK ] Started Avahi mDNS/DNS-SD Stack – Avahi mDNS/DNS-SD Stack',
  '[ OK ] Started Bluetooth service – Bluetooth service',
  '[ OK ] Started OpenSSH server – OpenSSH server',
  '[ OK ] Started Snap Daemon – Snap Daemon',
  '[ OK ] Started PackageKit Daemon – PackageKit Daemon',
  '[ OK ] Started User Manager for UID 1000 – User Runtime Directory',
  '[ OK ] Started Disk Manager – Disk Manager',
  '[ OK ] Started GNOME Display Manager – GNOME Display Manager',
  '[ OK ] Started Getty on tty1 – Getty on tty1',
  '[ OK ] Started GNOME Settings Daemon – GNOME Settings Daemon',
  '[ OK ] Started GNOME Shell – GNOME Shell',
  '[ OK ] Started PulseAudio Sound System – PulseAudio Sound System',
  '[ OK ] Started Snap Communication Socket – Snap Communication Socket',
  '[ OK ] Started SystemD Resolver – SystemD Resolver',
  '[ OK ] Started Thermal Daemon Service – Thermal Daemon Service',
  '[ OK ] Started Update UTMP about System RunLevel Changes – Update UTMP',
  '[ OK ] Started User Session Slice – User Session Slice',
  '[ OK ] Started SystemD Journal Service – SystemD Journal Service',
  '[ OK ] Started WPA Supplicant – WPA Supplicant',
  '[ OK ] Started XDG Desktop Portal Service – XDG Desktop Portal Service',
  '[ OK ] Started GNOME Keyring Daemon – GNOME Keyring Daemon',
  '[ OK ] Started IBus Daemon – IBus Daemon',
  '[ OK ] Started Network Manager Dispatcher – Network Manager Dispatcher',
  '[ OK ] Started Print Service – Print Service',
  '[ OK ] Started SSH Agent – SSH Agent',
  '[ OK ] Started SystemD User Session – SystemD User Session',
  '[ OK ] Started Update Notification Service – Update Notification Service',
  '[ OK ] Started Virtual Filesystem Service – Virtual Filesystem Service',
  '[ OK ] Started X11 Server – X11 Server',
  '[ OK ] Started Window Manager – Window Manager',
  '[ OK ] Started User Login – User Login',
  '[ OK ] Started Update Notification Service – Update Notification Service',
  '[ OK ] Started GNOME Terminal Server – GNOME Terminal Server',
];


function formatLog(line: string) {
  // El regex captura el bloque de servicio y la descripción
  const match = line.match(/^\[\s*OK\s*\]\s*(.+?)\s*[–-]\s*(.+)$/);

  if (!match) {
    return `<span class="desc">${line}</span><br>`;
  }

  const [, fullService, desc] = match;

  // Dividimos el servicio para "saltar" la primera palabra
  const firstSpaceIndex = fullService.indexOf(' ');
  const firstWord = fullService.substring(0, firstSpaceIndex); // "Started", "Mounted"...
  const restOfService = fullService.substring(firstSpaceIndex); // El resto del nombre

  return (
    `<span class="bracket">[</span> <span class="ok">OK</span> <span class="bracket">]</span> ` +
    `<span class="desc">${firstWord}</span>` + // La primera palabra en gris
    `<span class="service">${restOfService}</span>` + // El resto en blanco resaltado
    `<span class="desc"> – ${desc}</span><br>` // La descripción final en gris
  );
}


export async function renderBootLogs() {
  setTarget('bootlogs');
  clear();

  for (const line of logs) {
    write(formatLog(line));
    await wait(randomDelay());
  }
}