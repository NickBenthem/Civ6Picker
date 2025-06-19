export interface ReconnectionConfig {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  jitterFactor?: number;
  onRetry?: (attempt: number, delay: number) => void;
  onMaxRetriesReached?: () => void;
}

export class ReconnectionManager {
  private attempt = 0;
  private timeoutId: NodeJS.Timeout | null = null;
  private isRetrying = false;

  constructor(private config: ReconnectionConfig = {}) {
    this.config = {
      maxRetries: 10,
      baseDelay: 1000, // 1 second
      maxDelay: 30000, // 30 seconds
      jitterFactor: 0.1, // 10% jitter
      ...config
    };
  }

  private calculateDelay(attempt: number): number {
    // Exponential backoff: baseDelay * 2^attempt
    const exponentialDelay = this.config.baseDelay! * Math.pow(2, attempt);
    
    // Cap at maxDelay
    const cappedDelay = Math.min(exponentialDelay, this.config.maxDelay!);
    
    // Add jitter to prevent thundering herd
    const jitter = cappedDelay * this.config.jitterFactor! * Math.random();
    
    return Math.floor(cappedDelay + jitter);
  }

  public scheduleRetry(callback: () => void): void {
    if (this.isRetrying || this.attempt >= this.config.maxRetries!) {
      if (this.attempt >= this.config.maxRetries!) {
        this.config.onMaxRetriesReached?.();
      }
      return;
    }

    this.isRetrying = true;
    const delay = this.calculateDelay(this.attempt);
    
    this.config.onRetry?.(this.attempt + 1, delay);
    
    this.timeoutId = setTimeout(() => {
      this.attempt++;
      this.isRetrying = false;
      callback();
    }, delay);
  }

  public reset(): void {
    this.attempt = 0;
    this.isRetrying = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  public cancel(): void {
    this.reset();
  }

  public getAttempt(): number {
    return this.attempt;
  }

  public isRetryingNow(): boolean {
    return this.isRetrying;
  }
}

// Utility function to create a reconnection manager with common defaults
export function createReconnectionManager(config?: Partial<ReconnectionConfig>): ReconnectionManager {
  return new ReconnectionManager(config);
} 