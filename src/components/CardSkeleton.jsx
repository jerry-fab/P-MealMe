export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse flex flex-col justify-between">
      <div className="aspect-[4/3] bg-slate-200 rounded-xl mb-3" />
      <div className="h-4 bg-slate-200 rounded w-16 mb-2" />
      <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-slate-200 rounded w-full mb-1" />
      <div className="h-3 bg-slate-200 rounded w-2/3 mb-4" />
      <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
      <div className="flex gap-2 pt-3 border-t border-slate-100">
        <div className="h-8 bg-slate-200 rounded flex-1" />
        <div className="h-8 bg-slate-200 rounded flex-1" />
      </div>
    </div>
  );
};
