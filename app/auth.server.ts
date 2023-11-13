import { redirect } from '@remix-run/node'
import { routerPaths } from '../routes.ts'
import { prisma } from './prisma.server.ts'
import { getURLWithRedirectTo } from './redirect-to.server.ts'
import { destroySession, getSession } from './session.server.ts'

async function redirectToLogin(session: Awaited<ReturnType<typeof getSession>>, request: Request) {
  const originUrl = new URL(request.url)
  const path =
    originUrl.pathname !== '/'
      ? getURLWithRedirectTo(routerPaths['/login'], originUrl)
      : routerPaths['/login']

  return redirect(path, {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}

export async function assertAnonymous(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  if (userId) {
    throw redirect(routerPaths['/'])
  }
}

export async function assertAuthenticated(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  const me = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          isEmailValidated: true,
        },
      })
    : null

  if (!me || !me.isEmailValidated) {
    throw await redirectToLogin(session, request)
  }
}
