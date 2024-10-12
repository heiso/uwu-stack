import type { OneTimePassword } from '@prisma/client'
import { randomBytes } from 'crypto'
import { add, minutesToSeconds } from 'date-fns'
import { prisma } from './prisma.server'

const OTP_LENGTH = 6
const TTL = minutesToSeconds(30)

function generateCode(): string {
  let code = ''

  do {
    code += Number.parseInt(randomBytes(3).toString('hex'), 16)
  } while (code.length < OTP_LENGTH)

  return code.slice(0, OTP_LENGTH)
}

export async function generateAndStoreOTP(
  email: string,
  expiresInMinutes = TTL,
): Promise<OneTimePassword['code']> {
  const code = generateCode()
  await prisma.oneTimePassword.upsert({
    where: { email },
    create: { email, code, expiresAt: add(new Date(), { minutes: expiresInMinutes }) },
    update: { code, expiresAt: add(new Date(), { minutes: expiresInMinutes }) },
  })
  return code
}

export async function destroyOTP(email: string) {
  return prisma.oneTimePassword.delete({ where: { email } })
}

/**
 * @description Will perform several cheks and security:
 * - check if code format is valid
 * - check if email has an existing code
 * - compare given code and stored one
 * If at least of these check fails, an attempt is recorded, after 3 failed attempts, the code is deleted.
 * If email doesn't exists we still set a row in sqlite with no code for the tested email. Hence no timing attack is possible here
 */
export async function checkOTP(
  email: OneTimePassword['email'],
  code: string,
): Promise<OneTimePassword | null> {
  if (code.length !== OTP_LENGTH) {
    return null
  }

  let otp = await prisma.oneTimePassword.findUnique({
    where: { email, expiresAt: { lt: new Date() } },
  })

  /**
   * Delete old otp in background
   * we do not want to wait for its resolution to return the result to the user
   */
  prisma.oneTimePassword.deleteMany({ where: { expiresAt: { lt: new Date() } } })

  if (!otp || otp.code !== code) {
    const attempts = (otp?.attempts || 0) + 1

    if (attempts > 3) {
      await prisma.oneTimePassword.delete({ where: { email } })
      return null
    }

    await prisma.oneTimePassword.upsert({
      where: { email },
      update: { attempts },
      create: {
        email,
        attempts,
        code: 'email-invalid',
        expiresAt: add(new Date(), { minutes: TTL }),
      },
    })
    return null
  }

  return otp
}
