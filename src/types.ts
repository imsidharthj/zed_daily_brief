export type DealCategory =
  | 'new_lead'
  | 'follow_up'
  | 'at_risk';

export type UrgencyLevel = 'high' | 'medium' | 'low';
export type ConfidenceLevel = 'high' | 'medium' | 'weak';

export type PriorityType = 'urgent' | 'important';

export type TimeStatus = 'today' | 'waiting' | 'stale';

export interface Deal {
  thread_id: string;
  sender: string;
  company: string;
  category: DealCategory;
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: UrgencyLevel;
  confidence: ConfidenceLevel;
  summary: string;
  last_action_days: number;
}

export interface EnrichedDeal extends Deal {
  priorityType: PriorityType;
  whyItMatters: string;
  suggestedAction: string;
  timeStatus: TimeStatus;
  score: number;
}
