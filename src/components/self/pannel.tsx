import { cn } from '@/lib/utils';

//eslint-disable-next-line
function Pannel({ className, children }: { className?: string; children: any }) {
    return (
        <div className={cn(`bg-system_card_background rounded-md border-[2px] border-system_border `, className)}>
            {children}
        </div>
    );
}

export default Pannel;
