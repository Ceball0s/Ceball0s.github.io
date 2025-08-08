import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TypewriterService {
  constructor() {}

  async typeText(
    fullText: string,
    speed: number,
    callback: (text: string) => void
  ): Promise<void> {
    return new Promise(resolve => {
      let currentIndex = 0;
      
      const type = () => {
        if (currentIndex <= fullText.length) {
          callback(fullText.substring(0, currentIndex));
          currentIndex++;
          setTimeout(type, speed);
        } else {
          resolve();
        }
      };
      
      type();
    });
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}