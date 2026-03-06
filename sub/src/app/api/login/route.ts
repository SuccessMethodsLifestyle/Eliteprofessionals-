import { NextRequest, NextResponse } from 'next/server'
import { signAdminToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const ADMIN_PW = process.env.ADMIN_PASSWORD || 'EliteAdmin2026!'

    if (password !== ADMIN_PW) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
    }

    const token = signAdminToken()

    const res = NextResponse.json({ success: true })
    res.cookies.set('ep_admin', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    })
    return res
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
