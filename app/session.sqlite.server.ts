import type { Session } from '@prisma/client'
import {
  createCookie,
  createSessionStorage,
  type Cookie,
  type CookieOptions,
} from '@remix-run/node'
import { randomUUID } from 'crypto'
import { hoursToSeconds } from 'date-fns'
import { prisma } from './prisma.server'

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
  userId: Session['userId']
}

type SessionFlashData = {
  error: string
}

function createSqliteSessionStorage({ cookie }: { cookie?: Cookie }) {
  return createSessionStorage<SessionData, SessionFlashData>({
    cookie,

    async createData(data, expires) {
      const id = randomUUID()

      await prisma.session.create({
        data: {
          id,
          expiresAt: expires,
          userId: data.userId,
        },
      })

      return id
    },

    async readData(id) {
      try {
        const data = await prisma.session.findUnique({
          where: { id, expiresAt: { gt: new Date() } },
          select: { userId: true },
        })

        /**
         * Delete old sessions in background
         * we do not want to wait for its resolution to return the session to the user
         */
        prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } })

        if (!data) return null
        return { userId: data.userId }
      } catch (err) {
        return null
      }
    },

    async updateData(id, data, expires) {
      await prisma.session.update({
        where: { id },
        data: {
          userId: data.userId,
          expiresAt: expires,
        },
      })
    },

    async deleteData(id) {
      await prisma.session.delete({ where: { id } })
    },
  })
}

const { getSession, commitSession, destroySession } = createSqliteSessionStorage({
  cookie: createCookie(COOKIE_NAME, COOKIE_OPTIONS),
})

export { commitSession, destroySession, getSession }
