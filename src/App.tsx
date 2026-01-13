import { mockData } from './mockData';
import { processDeals } from './logic';
import { DealCard } from './components/DealCard';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

function App() {
  const sections = processDeals(mockData);
  const totalUrgent = sections
    .flatMap(s => s.deals)
    .filter(d => d.priorityType === 'urgent').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-8 px-4">
      {/* Centered App Shell */}
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <header className="bg-white rounded-2xl shadow-sm px-6 py-5 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">ZED Daily Brief</h1>
              <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-1">
                <Calendar size={14} />
                {new Date(mockData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
            </div>
            <div className="text-center bg-red-50 px-4 py-2 rounded-xl border border-red-100">
              <span className="block text-3xl font-black text-red-600 leading-none">{totalUrgent}</span>
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Urgent</span>
            </div>
          </div>
        </header>

        {/* Main Content — Sections */}
        <main className="space-y-6 pb-8">
          {sections.map(section => (
            <section
              key={section.id}
              className={clsx(
                "rounded-2xl border overflow-hidden shadow-sm",
                section.colorTheme === 'red' && "bg-red-50/30 border-red-200",
                section.colorTheme === 'yellow' && "bg-amber-50/30 border-amber-200",
                section.colorTheme === 'gray' && "bg-slate-50/50 border-slate-200",
              )}
            >
              {/* Section Header */}
              <div className={clsx(
                "px-5 py-4 border-b",
                section.colorTheme === 'red' && "bg-red-50 border-red-100",
                section.colorTheme === 'yellow' && "bg-amber-50 border-amber-100",
                section.colorTheme === 'gray' && "bg-slate-100 border-slate-200",
              )}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={clsx(
                      "text-base font-bold",
                      section.colorTheme === 'red' && "text-red-800",
                      section.colorTheme === 'yellow' && "text-amber-800",
                      section.colorTheme === 'gray' && "text-slate-700",
                    )}>
                      {section.title}
                    </h2>
                    <p className={clsx(
                      "text-xs mt-0.5",
                      section.colorTheme === 'red' && "text-red-600",
                      section.colorTheme === 'yellow' && "text-amber-600",
                      section.colorTheme === 'gray' && "text-slate-500",
                    )}>
                      {section.subtitle}
                    </p>
                  </div>
                  <span className={clsx(
                    "text-sm font-bold px-3 py-1 rounded-full",
                    section.colorTheme === 'red' && "bg-red-100 text-red-700",
                    section.colorTheme === 'yellow' && "bg-amber-100 text-amber-700",
                    section.colorTheme === 'gray' && "bg-slate-200 text-slate-600",
                  )}>
                    {section.deals.length}
                  </span>
                </div>
              </div>

              {/* Cards Container */}
              <div className="p-4 space-y-3">
                {section.deals.map(deal => (
                  <DealCard key={deal.thread_id} deal={deal} />
                ))}
              </div>
            </section>
          ))}

          {/* Empty State */}
          {sections.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm text-center py-12 px-6">
              <div className="mx-auto bg-emerald-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="text-emerald-500" size={28} />
              </div>
              <h3 className="text-slate-900 font-bold text-lg">You're all caught up!</h3>
              <p className="text-slate-500 text-sm mt-1">No priority items right now.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
