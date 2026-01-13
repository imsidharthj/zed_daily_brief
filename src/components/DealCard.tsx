import React from 'react';
import { AlertTriangle, Clock, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import type { EnrichedDeal } from '../types';
import { MetricBadge } from './MetricBadge';
import { clsx } from 'clsx';

interface DealCardProps {
  deal: EnrichedDeal;
}

export const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const getTimeLabel = () => {
    if (deal.timeStatus === 'today') return 'Today';
    if (deal.timeStatus === 'stale') return `Stale · ${deal.last_action_days}d`;
    return `${deal.last_action_days}d ago`;
  };

  const getConfidenceBadge = () => {
    if (deal.confidence === 'high') {
      return <MetricBadge label="High" variant="gray" icon={<CheckCircle size={10} />} />;
    }
    if (deal.confidence === 'medium') {
      return <MetricBadge label="Medium" variant="neutral" icon={<HelpCircle size={10} />} />;
    }
    return <MetricBadge label="Verify" variant="yellow" icon={<AlertTriangle size={10} />} />;
  };

  const isUrgent = deal.priorityType === 'urgent';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-shadow">
      {/* Row 1: Who + Badges */}
      <div className="flex justify-between items-start gap-4 mb-2">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-900 truncate">{deal.sender}</h3>
          <p className="text-sm text-slate-500 font-medium truncate">{deal.company}</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 flex-shrink-0">
          {isUrgent && (
            <MetricBadge label="Urgent" variant="red" icon={<AlertCircle size={10} />} />
          )}
          {!isUrgent && deal.priorityType === 'important' && (
            <MetricBadge label="Important" variant="yellow" icon={<AlertTriangle size={10} />} />
          )}
          {getConfidenceBadge()}
        </div>
      </div>

      {/* Row 2: Why it matters */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-3">
        <p className="text-sm font-medium text-blue-700">
          {deal.whyItMatters}
        </p>
      </div>

      {/* Row 3: Summary */}
      <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
        {deal.summary}
      </p>

      {/* Row 4: Time + CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className={clsx(
          "flex items-center gap-1.5 text-xs font-semibold",
          deal.timeStatus === 'today' && "text-emerald-600",
          deal.timeStatus === 'waiting' && "text-slate-500",
          deal.timeStatus === 'stale' && "text-red-500"
        )}>
          <Clock size={14} />
          {getTimeLabel()}
        </div>

        <button className={clsx(
          "px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95",
          isUrgent
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        )}>
          {deal.suggestedAction}
        </button>
      </div>
    </div>
  );
};
