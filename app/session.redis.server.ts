import type { User } from '@prisma/client'
import {
  createCookie,
  createSessionStorage,
  type Cookie,
  type CookieOptions,
} from '@remix-run/node'
import { randomUUID } from 'crypto'
import { getUnixTime, hoursToSeconds } from 'date-fns'
import { redis } from '../archives/redis.server.ts'

export const COOKIE_NAME = 'session'
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: hoursToSeconds(24 * 7),
  secrets: [process.env.SESSION_SECRET],
  // domain: process.env.SESSION_COOKIE_DOMAIN,
} satisfies CookieOptions

type SessionData = {
  userId: User['id']
}

type SessionFlashData = {
  error: string
}

function createRedisSessionStorage({ cookie }: { cookie?: Cookie }) {
  return createSessionStorage<SessionData, SessionFlashData>({
    cookie,

    async createData(data, expires) {
      const id = randomUUID()

      await redis.set(`${COOKIE_NAME}:${id}`, JSON.stringify(data), {
        ...(expires && { EXAT: getUnixTime(expires) }),
      })
      return id
    },

    async readData(id) {
      try {
        const data = await redis.get(`${COOKIE_NAME}:${id}`)
        if (!data) return null
        return JSON.parse(data)
      } catch (err) {
        return null
      }
    },

    async updateData(id, data, expires) {
      await redis.set(`${COOKIE_NAME}:${id}`, JSON.stringify(data), {
        ...(expires && { EXAT: getUnixTime(expires) }),
      })
    },

    async deleteData(id) {
      await redis.del(`${COOKIE_NAME}:${id}`)
    },
  })
}

const { getSession, commitSession, destroySession } = createRedisSessionStorage({
  cookie: createCookie(COOKIE_NAME, COOKIE_OPTIONS),
})

export { commitSession, destroySession, getSession }
