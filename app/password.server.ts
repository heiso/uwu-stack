import { randomBytes, scryptSync, timingSafeEqual, type ScryptOptions } from 'crypto'

const SEPARATOR = ':'

/**
 * We want to have a computation time ~500ms to prevent fast bruteforce attacks.
 * But when testing and developing, we want it to be fast.
 * Memory required (bytes) = 128 * N * r * p
 */
const OPTIONS = {
  N: 16384,
  r: 8,
  p: 1,
} satisfies ScryptOptions

const FAKE_HASH = generateHash('Est-ce que vous êtes classé dans la catégorie humain')

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64, OPTIONS).toString('hex')
}

export function generateHash(password: string) {
  const salt = randomBytes(16).toString('hex')
  return `${hashPassword(password, salt)}${SEPARATOR}${salt}`
}

export function safeCompare(password: string, hash: string) {
  const [hashedPassword, salt] = hash.split(SEPARATOR)

  if (!salt) {
    throw new Error("Can't compare password, salt is undefined")
  }

  return timingSafeEqual(Buffer.from(hashedPassword), Buffer.from(hashPassword(password, salt)))
}

/**
 * In any case, we still want to take approximately the same time to respond.
 * The purpose is to avoid timing attack, the request would be fast when no user is found and >500ms if a user is found
 * and then an attacker could easyly scan our user's emails
 */
export const fakePasswordTest = () => {
  safeCompare('Négatif, je suis une mite en pull-over', FAKE_HASH)
}
