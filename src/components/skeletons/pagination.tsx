import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

function PaginationSkeleton() {
    return (
        <div className="flex items-center justify-end gap-5 mt-5">
            <div>
                <ChevronLeft />
            </div>

            <Skeleton className="h-8 w-8 rounded-full bg-system_gray_400" />

            <div>
                <ChevronRight />
            </div>
        </div>
    );
}

export default PaginationSkeleton;
