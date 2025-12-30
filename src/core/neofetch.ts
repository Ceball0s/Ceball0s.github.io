import { setTarget, write } from './screen';

export async function renderNeofetch() {
  setTarget('neofetch');

  write(`
      _.-'''''-._
   .-'  Ubuntu  '-.
OS: Ubuntu 24.04 LTS
Kernel: Linux 6.8.0
Shell: bash
Terminal: retro-term
CPU: Intel Xeon
Memory: 748MiB / 2GiB
`);
}
