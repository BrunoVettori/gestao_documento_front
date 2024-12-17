import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function ComboboxTipoDocumento({
    setTipo,
    default_value,
    empresarial = false,
    ativo = false,
}: {
    setTipo: (tipo: string) => void;
    default_value?: string;
    empresarial?: boolean;
    ativo?: boolean;
}) {
    // eslint-disable-next-line
    const [tipos, setTipos] = useState<Array<any>>([]);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(default_value ? default_value : undefined);

    useEffect(() => {
        setValue(default_value);
    }, [default_value]);

    let query_url = '/tipo_documento';

    if (empresarial) {
        query_url += '?empresarial=true';
    } else {
        query_url += '?empresarial=false';
    }

    if (ativo) {
        query_url += '&ativo=true';
    }

    const { isPending, isError, data } = useQuery({
        queryKey: ['lista_tipos_combo'],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + query_url, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!isPending && !isError && data) {
            setTipos(data);
        }
    }, [data]);

    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    disabled={tipos.length === 0}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? tipos.find((tipo) => tipo.id === value)?.nome : 'Selecione uma tipo...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Selecione um tipo..." />
                    <CommandList>
                        <CommandEmpty>tipo não encontada</CommandEmpty>
                        <CommandGroup>
                            {tipos.map((tipo) => (
                                <CommandItem
                                    key={tipo.nome}
                                    value={tipo.nome}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === tipo.nome ? tipo.id : '');
                                        setTipo(tipo.id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn('mr-2 h-4 w-4', value === tipo.id ? 'opacity-100' : 'opacity-0')} />
                                    {tipo.nome}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default ComboboxTipoDocumento;
