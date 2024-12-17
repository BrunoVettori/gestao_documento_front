import TableSkeleton from '@/components/skeletons/table';
import HeaderSkeleton from '@/components/skeletons/header';

function EmpresaSkeleton() {
    return (
        <div>
            <HeaderSkeleton />

            <div className="w-full h-[2px] mb-5 rounded-full bg-gradient-to-r from-system_gray_700 to-system_teal_500" />

            <TableSkeleton />
        </div>
    );
}

export default EmpresaSkeleton;
