import { routerPaths } from '../../routes.ts'
import { LinkPrimary } from '../ui/button.tsx'

export default function Index() {
  return (
    <div>
      <LinkPrimary to={routerPaths['/login']}>Login</LinkPrimary>
    </div>
  )
}
