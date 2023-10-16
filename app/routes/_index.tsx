import { json } from '@remix-run/node'
import { Link as RemixLink, useLoaderData } from '@remix-run/react'
import type { PropsWithChildren } from 'react'
import { version } from '../../package.json'
import { routerPaths } from '../../routes.ts'
import { Button } from '../ui/button.tsx'
import { Link } from '../ui/link.tsx'
import { Logo } from '../ui/logo.tsx'

export function loader() {
  return json({
    version,
  })
}

export default function Index() {
  const { version } = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col h-full justify-between">
      <header className="w-full px-6 py-4 flex flex-row items-center justify-between">
        <RemixLink
          to={routerPaths['/']}
          aria-label="homepage"
          className="text-xl font-light text-gray-400 transition hover:text-gray-100 active:opacity-80"
        >
          <span className="font-bold text-gray-200">UwU</span>&nbsp;Stack
          <small className="ml-2 self-end text-sm font-extrabold text-pink-50-200">
            v{version}
          </small>
        </RemixLink>

        <RemixLink
          to="https://github.com/heiso"
          target="_blank"
          aria-label="heiso's github"
          className="h-6 w-6 fill-gray-400 transition hover:fill-gray-200 active:fill-pink-200"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path>
          </svg>
        </RemixLink>
      </header>

      <main className="mb-auto mx-auto px-4 max-w-[80ch] text-center">
        <div className="flex flex-row items-center justify-center">
          <Logo />
          <div className="text-center">
            <h1 className="text-3xl font-light text-gray-100">
              <span className="font-bold">Remix</span> Stacks
            </h1>

            <RemixLink
              target="_blank"
              to="https://github.com/topics/remix-stack"
              aria-label="remix-stack topic on github"
              className="text-lg font-semibold text-gray-400 transition hover:brightness-125"
            >
              Open Source Template
            </RemixLink>
          </div>
        </div>

        <p className="mt-20 mb-40 text-6xl bg-gradient-to-r from-gray-50 to-pink-200 bg-clip-text text-transparent font-bold">
          Meet UwU-chwan, the only stack you need.
        </p>

        <div className="text-xl mb-20">
          <p>Made with a lowts of gweat technologies !</p>
          <div className="mt-10 flex flex-row flex-wrap justify-center gap-2">
            <Techno>Remix</Techno>
            <Techno>Fly.io</Techno>
            <Techno>Prisma</Techno>
            <Techno>Tailwindcss</Techno>
            <Techno>Typescript</Techno>
            <Techno>Stripe</Techno>
            <Techno>Prettier</Techno>
            <Techno>Docker</Techno>
            <Techno>Sentry</Techno>
            <Techno>Lowve</Techno>
          </div>
        </div>

        <div className="flex flex-row justify-center gap-6">
          <Button as="link" to="https://github.com/heiso/uwu-stack" target="_blank">
            GitHub
          </Button>
          <Button primary as="link" to={routerPaths['/login']}>
            Let's twy it !
          </Button>
        </div>
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

type TechnoProps = PropsWithChildren
function Techno({ children }: TechnoProps) {
  return <div className="px-2 py-1 backdrop-blur-md rounded-md bg-slate-900">{children}</div>
}
