import { Skeleton } from '../ui/skeleton';

function TableSkeleton() {
    return (
        <div className="h-full flex flex-col rounded-lg overflow-hidden">
            <Skeleton className="h-[50px] border-b-[1px] border-system_gray_300 rounded-none w-full bg-system_gray_300" />
            <Skeleton className="h-[50px] border-b-[1px] border-system_gray_300 rounded-none w-full" />
            <Skeleton className="h-[50px] border-b-[1px] border-system_gray_300 rounded-none w-full bg-system_gray_200" />
            <Skeleton className="h-[50px] border-b-[1px] border-system_gray_300 rounded-none w-full" />
            <Skeleton className="h-[50px] border-b-[1px] border-system_gray_300 rounded-none w-full bg-system_gray_200" />
            <Skeleton className="h-[50px] border-b-[1px] border-system_gray_300 rounded-none w-full" />
            <Skeleton className="h-[50px] border-b-[1px] border-system_gray_300 rounded-none w-full bg-system_gray_200" />
            <Skeleton className="h-[50px] border-b-[1px] border-system_gray_300 rounded-none w-full" />
            <Skeleton className="h-[50px] border-system_gray_600 rounded-none w-full bg-system_gray_200" />
        </div>
    );
}

export default TableSkeleton;
