import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function ComboboxCargos({ setCargo, default_value }: { setCargo: (cargo: string) => void; default_value?: string }) {
    // eslint-disable-next-line
    const [cargos, setCargos] = useState<Array<any>>([]);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(default_value ? default_value : undefined);

    useEffect(() => {
        if (default_value) {
            setCargo(default_value);
        }
    }, [default_value]);

    const { isPending, isError, data } = useQuery({
        queryKey: ['lista_cargos_combobox'],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + '/cargos?ativo=true', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!isPending && !isError && data) {
            setCargos(data);
        }
    }, [data]);

    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    disabled={cargos.length === 0}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? cargos.find((cargo) => cargo.id === value)?.nome : 'Selecione uma cargo...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Selecione um cargo..." />
                    <CommandList>
                        <CommandEmpty>cargo não encontada</CommandEmpty>
                        <CommandGroup>
                            {cargos.map((cargo) => (
                                <CommandItem
                                    key={cargo.id}
                                    value={cargo.nome}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === cargo.nome ? cargo.id : '');
                                        setCargo(cargo.id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn('mr-2 h-4 w-4', value === cargo.id ? 'opacity-100' : 'opacity-0')} />
                                    {cargo.nome}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default ComboboxCargos;
