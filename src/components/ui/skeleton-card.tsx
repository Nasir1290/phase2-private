import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  showTitle?: boolean;
  className?: string;
}

export function SkeletonCard({ showTitle = false, className }: SkeletonCardProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-2 border border-gray-100", className)}>
      <div className="flex gap-4">
        {/* Left square placeholder */}
        <div className={cn("w-40 min-h-max bg-gray-300/90 rounded-md flex-shrink-0 animate-pulse", showTitle || "w-28")} />

        {/* Content area */}
        <div className="flex-1 flex flex-col justify-between py-1">
          {/* Title section (only for first card) */}
          {showTitle ? (
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Il tuo annuncio</h3>
              <div className="h-3 bg-gray-300/90 rounded w-24 animate-pulse" />
            </div>
          ) : (
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900"></h3>
              <div className="h-3 bg-gray-300/90 rounded w-24 animate-pulse" />
            </div>
          )}

          {/* Skeleton lines */}
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-gray-300/90 rounded w-44 animate-pulse" />
            <div className="h-3 bg-gray-300/90 rounded w-20 animate-pulse" />
            <div className="flex items-center justify-between gap-2">
              <div className="h-3 bg-gray-300/90 rounded w-[130px] animate-pulse" />
              {/* Bottom section with button */}
              <div className="flex items-end gap-2">
                <div className=" bg-gray-300/90 h-3 w-14 animate-pulse" />
                {showTitle ? <div className="h-3 w-14 bg-red-500  animate-pulse" /> :        <div className=" bg-gray-300/90  h-3 w-14 animate-pulse" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
