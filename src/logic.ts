import type { Deal, EnrichedDeal } from './types';

function calculateScore(deal: Deal): number {
  let score = 0;

  if (deal.category === 'new_lead') score += 50;
  if (deal.category === 'at_risk') score += 40;
  if (deal.category === 'follow_up') score += 30;

  if (deal.urgency === 'high') score += 25;
  if (deal.urgency === 'medium') score += 10;

  if (deal.last_action_days >= 3) score += 15;

  if (deal.confidence === 'weak') score -= 10;

  return score;
}

function getTimeStatus(days: number): EnrichedDeal['timeStatus'] {
  if (days === 0) return 'today';
  if (days >= 5) return 'stale';
  return 'waiting';
}

function getWhyItMatters(deal: Deal): string {
  if (deal.category === 'new_lead') {
    return 'New inbound — high intent';
  }
  if (deal.category === 'at_risk') {
    return 'Negative signal — risk of churn';
  }
  return 'Waiting on your response';
}

function getSuggestedAction(deal: Deal): string {
  if (deal.category === 'new_lead') return 'Reply today';
  if (deal.category === 'at_risk') return 'Schedule call';
  return 'Follow up';
}

export function processDeals(data: { items: Deal[] }) {
  const enriched: EnrichedDeal[] = data.items.map(deal => {
    const score = calculateScore(deal);
    const priorityType = deal.urgency === 'high' ? 'urgent' : 'important';

    return {
      ...deal,
      score,
      priorityType,
      whyItMatters: getWhyItMatters(deal),
      suggestedAction: getSuggestedAction(deal),
      timeStatus: getTimeStatus(deal.last_action_days),
    };
  });

  const sorted = [...enriched].sort((a, b) => b.score - a.score);

  return [
    {
      id: 'new_leads',
      title: 'New Inbound Leads',
      subtitle: 'Respond quickly before interest drops',
      colorTheme: 'red',
      deals: sorted.filter(d => d.category === 'new_lead'),
    },
    {
      id: 'waiting',
      title: 'Deals Waiting on Me',
      subtitle: 'Momentum blocked by response delay',
      colorTheme: 'yellow',
      deals: sorted.filter(d => d.category === 'follow_up'),
    },
    {
      id: 'risk',
      title: 'At-Risk / Negative Signals',
      subtitle: 'Immediate attention recommended',
      colorTheme: 'gray',
      deals: sorted.filter(d => d.category === 'at_risk'),
    },
  ];
}
