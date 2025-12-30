// core/timing.ts
export const wait = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export function randomDelay(base = 40, variance = 80) {
  let delay = base + Math.random() * variance;

  if (Math.random() < 0.2) delay += 50 + Math.random() * 100;
  if (Math.random() < 0.08) delay += 100 + Math.random() * 150;

  return delay;
}
