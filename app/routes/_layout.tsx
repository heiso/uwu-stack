import { json } from '@remix-run/node'
import { NavLink, Outlet, Link as RemixLink, useLoaderData } from '@remix-run/react'
import { version } from '../../package.json'
import { routerPaths } from '../../routes.ts'
import { Icon } from '../ui/icon.tsx'
import { Link } from '../ui/link.tsx'

export async function loader() {
  return json({
    version,
  })
}

export default function Index() {
  const { version } = useLoaderData<typeof loader>()

  return (
    <div className="h-full w-full flex flex-col">
      <header className="w-full px-6 py-4 flex flex-row items-center justify-between mb-10">
        <RemixLink
          to={routerPaths['/']}
          className="text-xl font-light text-gray-400 transition hover:text-gray-100 active:opacity-80"
        >
          <span className="font-bold text-gray-200">UwU</span>&nbsp;Stack
          <small className="ml-2 self-end text-sm font-extrabold text-pink-50-200">
            v{version}
          </small>
        </RemixLink>

        <div className="flex flex-row items-center gap-6">
          <NavLink
            to={routerPaths['/ui']}
            className={({ isActive }) =>
              `transition hover:text-gray-100 active:text-pink-200 ${
                isActive ? 'text-gray-100 pointer-events-none' : 'text-gray-400'
              }`
            }
          >
            UI
          </NavLink>
          <NavLink
            to={routerPaths['/signup']}
            className={({ isActive }) =>
              `transition hover:text-gray-100 active:text-pink-200 ${
                isActive ? 'text-gray-100 pointer-events-none' : 'text-gray-400'
              }`
            }
          >
            Signup
          </NavLink>
          <NavLink
            to={routerPaths['/login']}
            className={({ isActive }) =>
              `transition hover:text-gray-100 active:text-pink-200 ${
                isActive ? 'text-gray-100 pointer-events-none' : 'text-gray-400'
              }`
            }
          >
            Login
          </NavLink>
          <div className="h-6 w-0.5 bg-slate-700"></div>
          <RemixLink
            to="https://github.com/heiso/uwu-stack"
            target="_blank"
            className="fill-gray-400 transition hover:fill-gray-200 active:fill-pink-200"
          >
            <Icon id="github-logo" />
          </RemixLink>
        </div>
      </header>

      <main className="mb-auto mx-auto px-4 h-full max-w-[80ch]">
        <Outlet />
      </main>

      <footer className="px-6 py-4 text-sm text-center">
        Had a good{' '}
        <Link
          target="_blank"
          to="https://www.reddit.com/r/ProgrammerHumor/comments/ll34yc/would_you_merge_with_them/"
        >
          laugh
        </Link>
        , therefore a stupid project had to be done. With sooper dooper lowve by{' '}
        <Link target="_blank" to="https://github.com/heiso">
          heiso
        </Link>
      </footer>
    </div>
  )
}
