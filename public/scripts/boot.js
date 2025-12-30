const screen = document.getElementById('screen');

const wait = (ms) => new Promise(r => setTimeout(r, ms));

function renderGrub() {
  return `
<div class="grub">
  <div class="grub-content">
UBUNTU GNU/GRUB

> Ubuntu
  Advanced options for Ubuntu
  </div>
</div>
`;
}


function renderKernel() {
  return `
Loading Linux 6.8.0-generic ...
Loading initial ramdisk ...
`;
}

async function renderBootLogs() {
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

  for (const line of logs) {
    screen.textContent += line + '\n';

    // delay base normal
    let delay = 30 + Math.random() * 80;

    // 20% chance de quedarse "pensando"
    if (Math.random() < 0.2) {
      delay += 60 + Math.random() * 160;
    }

    // 8% chance de freeze tipo disco lento
    if (Math.random() < 0.08) {
      delay += 100 + Math.random() * 240;
    }

    await wait(delay);
  }
}

function renderNeofetch() {
  return `

                             ....            
              .',:clooo:  .:looooo:.         
           .;looooooooc  .oooooooooo'        
        .;looooool:,''.  :ooooooooooc        
       ;looool;.         'oooooooooo,        
      ;clool'             .cooooooc.  ,,     
         ...                ......  .:oo,    
  .;clol:,.                        .loooo'   
 :ooooooooo,                        'ooool   
'ooooooooooo.                        loooo.  
'ooooooooool                         coooo.  
 ,loooooooc.                        .loooo.  
   .,;;;'.                          ;ooooc   
       ...                         ,ooool.   
    .cooooc.              ..',,'.  .cooo.    
      ;ooooo:.           ;oooooooc.  :l.     
       .coooooc,..      coooooooooo.         
         .:ooooooolc:. .ooooooooooo'         
           .':loooooo;  ,oooooooooc          
               ..';::c'  .;loooo:'           

</span>
<span class="user">ceballos@ubuntu</span>
<span class="sep">-------------</span>
<span class="key">OS:</span> <span class="val">Ubuntu 24.04 LTS x86_64</span>
<span class="key">Kernel:</span> <span class="val">Linux 6.8.0-generic</span>
<span class="key">Shell:</span> <span class="val">bash</span>
<span class="key">Terminal:</span> <span class="val">retro-term</span>
<span class="key">CPU:</span> <span class="val">Intel Xeon</span>
<span class="key">Memory:</span> <span class="val">748MiB / 2GiB</span>
                                                                       
`;
}

async function clearScreen() {
  await wait(300);
  screen.textContent = '';
}


function renderTerminal() {
  return `

Ceballos@ubuntu:~$ █
`;
}

async function boot() {
  screen.innerHTML = renderGrub();
  //screen.textContent = renderGrub();
  await wait(1200);

  screen.innerHTML = renderKernel();
  await wait(800);

  screen.innerHTML = '';
  await renderBootLogs();
  await wait(600);
  await clearScreen();

  await wait(500);
  //screen.textContent += renderNeofetch();
  screen.innerHTML += renderNeofetch();


  await wait(800);
  screen.innerHTML += renderTerminal();
}

boot();
