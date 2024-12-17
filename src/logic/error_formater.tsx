// eslint-disable-next-line
export function ErrorFormater(default_string: string, error: any) {
    if (error) {
        return (
            default_string +
            '' +
            'border-[1px] border-system_red_600 focus-visible:border-system_orange_600 text-system_orange_600'
        );
    } else {
        return default_string;
    }
}
