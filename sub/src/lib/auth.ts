import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'

export function signAdminToken(): string {
  return jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '8h' })
}

export function verifyAdminToken(token: string): boolean {
  try {
    const payload = jwt.verify(token, SECRET) as { role: string }
    return payload.role === 'admin'
  } catch {
    return false
  }
}
