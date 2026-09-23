import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Verteiltes Rate-Limiting ueber Upstash, aktiv sobald
// UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN gesetzt sind.
// Ohne Konfiguration greift ein In-Memory-Fallback (pro Server-Instanz,
// best effort), kombiniert mit Honeypot/Timing genuegt das als Baseline.

const WINDOW_MS = 60_000;
const LIMIT = 5; // Anfragen pro IP / 60 s

let upstash: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  upstash = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(LIMIT, "60 s"),
    prefix: "smarterfinanz:lead",
    analytics: false,
  });
}

const hits = new Map<string, number[]>();

function memoryLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length <= LIMIT;
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (!ip) return true;
  if (upstash) {
    try {
      const { success } = await upstash.limit(ip);
      return success;
    } catch {
      return memoryLimit(ip);
    }
  }
  return memoryLimit(ip);
}
