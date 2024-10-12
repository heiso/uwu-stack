import assert from 'assert'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: string
      PORT: string
      PUBLIC_URL: string
      DATABASE_URL: string
      SESSION_COOKIE_DOMAIN: string | undefined
      SESSION_SECRET: string
      FLY_IMAGE_REF: string | undefined
      FLY_APP_NAME: string | undefined
      BUILD_VERSION: string
      SHOULD_REFRESH_BROWSER_IF_VERSION_MISMATCH: string | undefined
    }
  }
}

assert(process.env.ENV, 'ENV must be defined')
assert(process.env.PORT, 'PORT must be defined')
assert(process.env.PUBLIC_URL, 'PUBLIC_URL must be defined')
assert(process.env.SESSION_SECRET, 'SESSION_SECRET must be defined')
assert(process.env.DATABASE_URL, 'DATABASE_URL must be defined')

if (process.env.FLY_IMAGE_REF) {
  process.env.BUILD_VERSION = process.env.FLY_IMAGE_REF.replace(/^registry\.fly\.io\/.*:/, '')
} else {
  process.env.BUILD_VERSION = process.env.NODE_ENV
}
