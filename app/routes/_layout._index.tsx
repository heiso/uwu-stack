import { Link as RemixLink } from '@remix-run/react'
import { type PropsWithChildren } from 'react'
import { routerPaths } from '../../routes.ts'
import { Button } from '../ui/button.tsx'
import { Logo } from '../ui/logo.tsx'

export default function Index() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row items-center justify-center">
        <Logo />
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-100">
            <span className="font-bold">Remix</span> Stacks
          </h1>

          <RemixLink
            target="_blank"
            to="https://github.com/topics/remix-stack"
            className="text-lg font-semibold text-gray-400 transition hover:brightness-125"
          >
            Open Source Template
          </RemixLink>
        </div>
      </div>

      <p className="text-6xl bg-gradient-to-r from-gray-50 to-pink-200 bg-clip-text text-transparent font-bold">
        Meet UwU-chwan, the only stack you need.
      </p>

      <div className="flex flex-row justify-center gap-6">
        <Button as="link" to="https://github.com/heiso/uwu-stack" target="_blank">
          GitHub
        </Button>
        <Button primary as="link" to={routerPaths['/login']}>
          Let's twy it !
        </Button>
      </div>

      <div className="text-xl">
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
    </div>
  )
}

type TechnoProps = PropsWithChildren
function Techno({ children }: TechnoProps) {
  return <div className="px-2 py-1 backdrop-blur-md rounded-md bg-slate-900">{children}</div>
}
