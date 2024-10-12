import type { User } from '@prisma/client'
import { randomBytes } from 'crypto'
import { minutesToMilliseconds } from 'date-fns'
import { redis } from './redis.server.ts'

const OTP_LENGTH = 6
const TTL = minutesToMilliseconds(30)

export type OTP = {
  code: string
  attempts: number
}

function getKey(email: string) {
  return `otp:${email.replace(/:/g, '-')}`
}

function generateCode(): string {
  let code = ''

  do {
    code += Number.parseInt(randomBytes(3).toString('hex'), 16)
  } while (code.length < OTP_LENGTH)

  return code.slice(0, OTP_LENGTH)
}

export async function generateAndStoreOTP(email: string, ttl = TTL): Promise<OTP['code']> {
  const code = generateCode()
  await redis.set(getKey(email), JSON.stringify({ code, attempts: 0 }), { PX: ttl })
  return code
}

export async function destroyOTP(email: string) {
  return redis.del(getKey(email))
}

/**
 * @description Will perform several cheks and security:
 * - check if code format is valid
 * - check if email has an existing code
 * - compare given code and stored one
 * If at least of these check fails, an attempt is recorded, after 3 failed attempts, the code is deleted.
 * If email doesn't exists we still set a row in redis with no code for the tested email. Hence no timing attack is possible here
 */
export async function checkOTP(email: User['email'], code: string): Promise<OTP | null> {
  if (code.length !== OTP_LENGTH) {
    return null
  }

  const json = await redis.get(getKey(email))

  const otp: OTP = json ? JSON.parse(json) : { attempts: 0 }

  if (otp.code !== code) {
    otp.attempts = (otp.attempts || 0) + 1

    if (otp.attempts > 3) {
      await redis.del(getKey(email))
      return null
    }

    await redis.set(getKey(email), JSON.stringify(otp), { PX: TTL })
    return null
  }

  return otp
}
