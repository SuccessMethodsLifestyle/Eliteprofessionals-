import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, firstName, lastName, phone, industry, goal, ref } = body

    // Basic validation
    if (!email || !firstName || !lastName || !industry || !goal) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }
    if (store.emailExists(email)) {
      return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 })
    }

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || null

    const lead = store.addLead({ email, firstName, lastName, phone: phone || '', industry, goal, ref: ref || null, ip })

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
