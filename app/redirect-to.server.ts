export const REDIRECT_TO_PARAM_NAME = 'redirectTo'

export function getURLWithRedirectTo(
  path: string,
  redirectPathOrURL: string | URL | null,
  absoluteURL: boolean = false,
) {
  const resolvedPath = absoluteURL ? new URL(path, process.env.PUBLIC_URL).toString() : path
  if (!redirectPathOrURL) {
    return resolvedPath
  }

  const redirectPath =
    redirectPathOrURL instanceof URL ? redirectPathOrURL.pathname : redirectPathOrURL

  return `${resolvedPath}?${new URLSearchParams({
    [REDIRECT_TO_PARAM_NAME]: redirectPath,
  }).toString()}`
}

export function getRedirectPath(request: Request) {
  return new URL(request.url).searchParams.get(REDIRECT_TO_PARAM_NAME)
}
