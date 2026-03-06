import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'
import { store } from '@/lib/store'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('ep_admin')?.value
  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const leads = store.getAllLeads()
  const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Industry', 'Goal', 'Ref', 'IP', 'Joined At']
  const rows = leads.map(l => [
    l.id, l.firstName, l.lastName, l.email, l.phone,
    l.industry, l.goal, l.ref || '', l.ip || '', l.createdAt
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))

  const csv = [headers.join(','), ...rows].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="elitepro-leads-${new Date().toISOString().slice(0,10)}.csv"`,
    }
  })
}
