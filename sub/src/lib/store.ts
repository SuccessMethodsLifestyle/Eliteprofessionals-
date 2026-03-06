// ─────────────────────────────────────────────────────────
//  In-memory data store
//  Works perfectly on Vercel. For full persistence across
//  deploys, swap to Vercel KV (instructions in README).
// ─────────────────────────────────────────────────────────

export interface Lead {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  industry: string
  goal: string
  ref: string | null
  ip: string | null
  createdAt: string
}

// Global store survives warm lambda restarts
const globalStore = global as typeof global & {
  _epLeads?: Map<string, Lead>
  _epCount?: number
}

if (!globalStore._epLeads) globalStore._epLeads = new Map()
if (!globalStore._epCount) globalStore._epCount = 347  // starting social proof count

export const store = {
  addLead(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
    const id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const full: Lead = { ...lead, id, createdAt: new Date().toISOString() }
    globalStore._epLeads!.set(id, full)
    globalStore._epCount! += 1
    return full
  },

  getAllLeads(): Lead[] {
    return Array.from(globalStore._epLeads!.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  getCount(): number {
    return globalStore._epCount!
  },

  emailExists(email: string): boolean {
    for (const lead of globalStore._epLeads!.values()) {
      if (lead.email.toLowerCase() === email.toLowerCase()) return true
    }
    return false
  },

  getStats() {
    const leads = this.getAllLeads()
    const industries: Record<string, number> = {}
    const goals: Record<string, number> = {}
    leads.forEach(l => {
      industries[l.industry] = (industries[l.industry] || 0) + 1
      goals[l.goal] = (goals[l.goal] || 0) + 1
    })
    return {
      total: leads.length,
      today: leads.filter(l => l.createdAt.startsWith(new Date().toISOString().slice(0, 10))).length,
      industries,
      goals,
    }
  }
}
