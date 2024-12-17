import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function ComboboxEmpresas({ setEmpresa, default_value }: { setEmpresa: (empresa: string) => void; default_value?: string }) {
    // eslint-disable-next-line
    const [empresas, setEmpresas] = useState<Array<any>>([]);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(default_value ? default_value : undefined);

    const { isPending, isError, data } = useQuery({
        queryKey: ['lista_empresas_combo'],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + '/empresas', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!isPending && !isError && data) {
            setEmpresas(data);
        }
    }, [data]);

    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    disabled={empresas.length === 0}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? empresas.find((empresa) => empresa.id === value)?.nome : 'Selecione uma empresa...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Selecione um empresa..." />
                    <CommandList>
                        <CommandEmpty>empresa não encontada</CommandEmpty>
                        <CommandGroup>
                            {empresas.map((empresa) => (
                                <CommandItem
                                    key={empresa.nome}
                                    value={empresa.nome}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === empresa.nome ? empresa.id : '');
                                        setEmpresa(empresa);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn('mr-2 h-4 w-4', value === empresa.id ? 'opacity-100' : 'opacity-0')} />
                                    {empresa.nome}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default ComboboxEmpresas;
