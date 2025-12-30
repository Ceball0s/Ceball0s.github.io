// core/logs.ts
import { setTarget, clear, write } from './screen';
import { wait, randomDelay } from './timing';

const logs = [
    '[ OK ] Mounted proc-sys-fs-binfmt_misc.mount – Arbitrary Executable File Formats.',
    '[ OK ] Finished plymouth-read-write.service – Tell Plymouth To Write Out Runtime Data.',
    '[ OK ] Mounted proc-sys-fs-binfmt_misc.mount – Arbitrary Executable File Formats.',
    '[ OK ] Finished systemd-binfmt.service – Set Up Additional Binary Formats.',
    '[ OK ] Finished systemd-journald-flush.service – Flush Journal to Persistent Storage.',
    '[ OK ] Started systemd-tmpfiles-setup.service – Create System Files and Directories.',
    '[ OK ] Mounted run-rpc_pipefs.mount – RPC Pipe File System.',
    '[ OK ] Started haveged.service – Entropy Daemon.',
    '[ OK ] Started systemd-udevd.service – Rule-based Manager for Device Events.',
    '[ OK ] Reached target sysinit.target – System Initialization.',
    '[ OK ] Started apt-daily.timer – Daily apt download activities.',
    '[ OK ] Started apt-daily-upgrade.timer – Daily apt upgrade and clean activities.',
    '[ OK ] Started dpkg-db-backup.timer – Daily dpkg database backup timer.',
    '[ OK ] Started e2scrub_all.timer – Periodic ext4 Online Metadata Check.',
    '[ OK ] Started fstrim.timer – Discard unused filesystem blocks.',
    '[ OK ] Started logrotate.timer – Daily rotation of log files.',
    '[ OK ] Started man-db.timer – Daily man-db regeneration.',
    '[ OK ] Started systemd-tmpfiles-clean.timer – Daily Cleanup of Temporary Directories.',
    '[ OK ] Reached target timers.target – Timer Units.',
    '[ OK ] Listening on dbus.socket – D-Bus System Message Bus Socket.',
    '[ OK ] Listening on ssh.socket – OpenSSH Server Socket.',
    '[ OK ] Reached target sockets.target – Socket Units.',
    '[ OK ] Started plymouth-start.service – Show Plymouth Boot Screen.',
    '[ OK ] Reached target basic.target – Basic System.',
    '[ OK ] Started accounts-daemon.service – Accounts Service.',
    '[ OK ] Started polkit.service – Authorization Manager.',
    '[ OK ] Started systemd-logind.service – User Login Management.',
    '[ OK ] Started NetworkManager.service – Network Manager.',
    '[ OK ] Reached target network.target – Network.',
    '[ OK ] Reached target graphical.target – Graphical Interface.'
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