import { redirect, type DataFunctionArgs } from '@remix-run/node'
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

export async function getCurrentUser(request: DataFunctionArgs['request']) {
  const session = await getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  if (!userId) {
    throw await redirectToLogin(session, request)
  }

  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      id: true,
      isEmailValidated: true,
      email: true,
    },
  })
  if (!user || !user.isEmailValidated) {
    throw await redirectToLogin(session, request)
  }

  return {
    ...user,
    session,
  }
}

export async function assertAnonymous(request: DataFunctionArgs['request']) {
  const session = await getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  if (userId) {
    throw redirect(routerPaths['/'])
  }
}
