import { Skeleton } from '../ui/skeleton';

function HeaderSkeleton() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex gap-5 items-center">
                    <Skeleton className="w-[250px] h-[30px] bg-system_gray_300" />
                </div>

                <div className="flex mb-5">
                    <Skeleton className="ml-auto w-[50px] h-[30px] bg-system_gray_300" />
                    <Skeleton className="ml-5 w-[100px] h-[30px] bg-system_gray_300" />
                    <Skeleton className="ml-5 w-[100px] h-[30px] bg-system_gray_300" />
                    <Skeleton className="ml-5 w-[100px] h-[30px] bg-system_gray_300" />
                </div>
            </div>
        </div>
    );
}

export default HeaderSkeleton;
