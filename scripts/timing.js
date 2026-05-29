// core/timing.ts
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export function randomDelay(base = 20, variance = 40) {
  let delay = base + Math.random() * variance;

  if (Math.random() < 0.2) delay += 25 + Math.random() * 50;
  if (Math.random() < 0.08) delay += 50 + Math.random() * 75;

  return delay;
}
