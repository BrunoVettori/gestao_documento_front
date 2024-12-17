import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function ComboboxStatusMult({ setStatus, default_value }: { setStatus: (status: string) => void; default_value?: string }) {
    // eslint-disable-next-line
    const [status_mult, setStatusMult] = useState<Array<any>>([]);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(default_value ? default_value : undefined);

    useEffect(() => {
        if (default_value) {
            setStatus(default_value);
        }
    }, [default_value]);

    const { isPending, isError, data } = useQuery({
        queryKey: ['lista_status_mult_combobox'],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + '/status?ativo=true', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!isPending && !isError && data) {
            setStatusMult(data);
        }
    }, [data]);

    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    disabled={status_mult.length === 0}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? status_mult.find((status) => status.id === value)?.nome : 'Selecione uma status...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Selecione um status..." />
                    <CommandList>
                        <CommandEmpty>status não encontada</CommandEmpty>
                        <CommandGroup>
                            {status_mult.map((status) => (
                                <CommandItem
                                    key={status.id}
                                    value={status.nome}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === status.nome ? status.id : '');
                                        setStatus(status.id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn('mr-2 h-4 w-4', value === status.id ? 'opacity-100' : 'opacity-0')} />
                                    {status.nome}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default ComboboxStatusMult;
