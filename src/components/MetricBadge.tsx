import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MetricBadgeProps {
  label: string;
  variant: 'red' | 'yellow' | 'gray' | 'neutral';
  icon?: React.ReactNode;
}

export const MetricBadge: React.FC<MetricBadgeProps> = ({ label, variant, icon }) => {
  const styles = {
    red: 'bg-red-50 text-red-700 border-red-200',
    yellow: 'bg-amber-50 text-amber-700 border-amber-200',
    gray: 'bg-slate-50 text-slate-600 border-slate-200',
    neutral: 'bg-white text-slate-500 border-slate-200',
  };

  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
        styles[variant]
      )}
    >
      {icon}
      {label}
    </span>
  );
};
