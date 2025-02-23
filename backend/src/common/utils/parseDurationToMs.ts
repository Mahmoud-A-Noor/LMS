export function parseDurationToMs(duration: string): number {
    const match = duration.match(/^(\d+)(m|h|d)$/);
    if (!match) {
      throw new Error(`Invalid duration format: ${duration}`);
    }
  
    const value = parseInt(match[1], 10);
    const unit = match[2];
  
    switch (unit) {
      case 'm': return value * 60 * 1000;         
      case 'h': return value * 60 * 60 * 1000;    
      case 'd': return value * 24 * 60 * 60 * 1000;
      default: throw new Error(`Unsupported time unit: ${unit}`);
    }
  }