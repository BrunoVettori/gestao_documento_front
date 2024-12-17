import { forwardRef } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface loading {
    loading?: string;
}

type ButtonProps = React.HTMLProps<HTMLButtonElement> & loading;

// eslint-disable-next-line
export const LoadingButton = forwardRef<HTMLButtonElement, ButtonProps>((props: any, forwardedRef: any) => {
    if (props.loading && props.loading === 'true') {
        return (
            <Button
                variant="ghost"
                className={cn(
                    `bg-system_aqua_600 hover:bg-system_aqua_700 p-8 text-white hover:text-white`,
                    props.className
                )}
                {...props}
                ref={forwardedRef}
            >
                <svg
                    className="animate-spin w-8 stroke-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>

                {props.children}
            </Button>
        );
    } else {
        return (
            <Button
                variant="ghost"
                className={cn(
                    `bg-system_aqua_600 hover:bg-system_aqua_700 p-8 text-white hover:text-white`,
                    props.className
                )}
                {...props}
                ref={forwardedRef}
            >
                {props.children}
            </Button>
        );
    }
});

export default LoadingButton;
