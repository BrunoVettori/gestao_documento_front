import { Skeleton } from '@/components/ui/skeleton';

import TableSkeleton from '@/components/skeletons/table';

function FuncionarioSkeleton() {
    return (
        <>
            <div className="flex p-5 gap-5 relative">
                <Skeleton className="absolute w-[150px] h-[50px] top-0 right-0 bg-system_gray_300" />

                <div>
                    <Skeleton className="h-[250px] w-[225px] bg-system_gray_300" />

                    <Skeleton className=" mt-2 h-[30px] w-[225px] bg-system_gray_300" />
                </div>

                <div className="flex flex-col gap-5">
                    <Skeleton className="h-[50px] w-[300px] bg-system_gray_300" />
                    <Skeleton className="h-[20px] w-[225px] bg-system_gray_300" />

                    <div className="flex gap-5">
                        <div>
                            <div className="mt-5 flex flex-col gap-5">
                                <Skeleton className="h-[20px] w-[75px] bg-system_gray_300" />
                                <Skeleton className="h-[30px] w-[300px] bg-system_gray_300" />
                            </div>
                            <div className="mt-5 flex flex-col gap-5">
                                <Skeleton className="h-[20px] w-[75px] bg-system_gray_300" />
                                <Skeleton className="h-[30px] w-[300px] bg-system_gray_300" />
                            </div>
                        </div>

                        <div>
                            <div className="mt-5 flex flex-col gap-5">
                                <Skeleton className="h-[20px] w-[75px] bg-system_gray_300" />
                                <Skeleton className="h-[30px] w-[300px] bg-system_gray_300" />
                            </div>
                            <div className="mt-5 flex flex-col gap-5">
                                <Skeleton className="h-[20px] w-[75px] bg-system_gray_300" />
                                <Skeleton className="h-[30px] w-[300px] bg-system_gray_300" />
                            </div>
                        </div>

                        <div>
                            <div className="mt-5 flex flex-col gap-5">
                                <Skeleton className="h-[20px] w-[75px] bg-system_gray_300" />
                                <Skeleton className="h-[30px] w-[300px] bg-system_gray_300" />
                            </div>
                            <div className="mt-5 flex flex-col gap-5">
                                <Skeleton className="h-[20px] w-[75px] bg-system_gray_300" />
                                <Skeleton className="h-[30px] w-[300px] bg-system_gray_300" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ml-auto mt-auto">
                    <Skeleton className="w-[200px] h-[50px] bg-system_gray_300" />
                    <Skeleton className="mt-5 w-[200px] h-[50px] bg-system_gray_300" />
                </div>
            </div>

            <div className="p-5 mt-5 flex items-center justify-around">
                <Skeleton className="w-[400px] h-[150px] bg-system_gray_300" />
                <Skeleton className="w-[400px] h-[150px] bg-system_gray_300" />
                <Skeleton className="w-[400px] h-[150px] bg-system_gray_300" />
            </div>

            <div className="mt-5">
                <div className="flex mb-5">
                    <Skeleton className="ml-auto w-[50px] h-[50px] bg-system_gray_300" />
                    <Skeleton className="ml-5 w-[200px] h-[50px] bg-system_gray_300" />
                </div>

                <TableSkeleton />
            </div>
        </>
    );
}

export default FuncionarioSkeleton;
