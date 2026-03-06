import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'
import { store } from '@/lib/store'

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get('ep_admin')?.value
  return !!token && verifyAdminToken(token)
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ leads: store.getAllLeads(), stats: store.getStats() })
}
