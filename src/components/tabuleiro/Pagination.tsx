'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const dots = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full flex items-center justify-between mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 panel-emboss rounded-lg font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-copper-400 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
      >
        ← Anterior
      </button>

      <div className="flex gap-2">
        {dots.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-2 h-2 rounded-full transition-all ${
              page === currentPage 
                ? 'bg-copper-400 scale-125 shadow-[0_0_8px_rgba(192,94,53,0.5)]' 
                : 'bg-slate-700 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 panel-emboss rounded-lg font-mono text-[10px] uppercase tracking-widest text-slate-400 hover:text-copper-400 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
      >
        Próxima →
      </button>
    </div>
  );
}
