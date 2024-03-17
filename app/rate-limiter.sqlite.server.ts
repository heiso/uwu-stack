import { add, isBefore } from 'date-fns'

const store: Record<string, { count: number; ttl: Date }> = {}

/**
 * Implement a sqlite rate limiter for a given index
 * <index> is allowed to perform <limit> requests per <timeRange> seconds
 * See example here https://redis.io/commands/INCR#pattern-rate-limiter-2
 *
 * @param label
 * @param index What we want to track (ip, email...)
 * @param limit How many it can run without throwing
 * @param timeRange For how long the limit will stack itslef
 * @example if (await isRateLimited('login-by-ip', ctx.ip, 10, 60)) {
 *     log.warn('too many request per ip per minute')
 * }
 */
export async function isRateLimited(label: string, index: string, limit = 10, timeRange = 60) {
  const now = new Date()

  const key = `rate-limiter:${label}:${index.replace(/:/g, '-')}`

  if (store[key] && isBefore(store[key].ttl, now)) {
    delete store[key]
  }

  store[key] = { count: (store[key]?.count ?? 0) + 1, ttl: store[key]?.ttl ?? now }

  if (store[key].count === 1) {
    store[key].ttl = add(store[key].ttl, { seconds: timeRange })
  }

  return store[key].count > limit
}
