import type { Deal } from './types';

export const mockData: { date: string; items: Deal[] } = {
  date: '2026-01-12',
  items: [
    {
      thread_id: 't_001',
      sender: 'John Smith',
      company: 'Acme Inc',
      category: 'new_lead',
      sentiment: 'positive',
      urgency: 'high',
      confidence: 'high',
      summary: 'Asked for pricing and onboarding timeline',
      last_action_days: 0,
    },
    {
      thread_id: 't_002',
      sender: 'Sarah Conner',
      company: 'Skynet Systems',
      category: 'at_risk',
      sentiment: 'negative',
      urgency: 'high',
      confidence: 'medium',
      summary: 'Upset about SLA breach, wants escalation',
      last_action_days: 3,
    },
    {
      thread_id: 't_003',
      sender: 'VP Sales',
      company: 'Beta Corp',
      category: 'follow_up',
      sentiment: 'neutral',
      urgency: 'medium',
      confidence: 'medium',
      summary: 'Waiting on revised proposal',
      last_action_days: 4,
    },
  ],
};
