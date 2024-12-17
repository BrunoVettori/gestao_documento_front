import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function ComboboxEstadosCivis({
    setEstadoCivil,
    default_value,
}: {
    setEstadoCivil: (estado_civil: string) => void;
    default_value?: string;
}) {
    // eslint-disable-next-line
    const [estados_civis] = useState<Array<any>>([
        { id: 'solteiro', nome: 'Solteiro' },
        { id: 'casado', nome: 'Casado' },
        { id: 'separado', nome: 'Separado' },
        { id: 'viuvo', nome: 'Viúvo' },
        { id: 'amasiado', nome: 'Amasiado' },
    ]);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(default_value ? default_value : undefined);

    useEffect(() => {
        if (default_value) {
            setEstadoCivil(default_value);
        }
    }, [default_value]);

    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    disabled={estados_civis.length === 0}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? estados_civis.find((estado_civil) => estado_civil.id === value)?.nome
                        : 'Selecione uma estado_civil...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Selecione um estado civíl..." />
                    <CommandList>
                        <CommandEmpty>estado_civil não encontada</CommandEmpty>
                        <CommandGroup>
                            {estados_civis.map((estado_civil) => (
                                <CommandItem
                                    key={estado_civil.id}
                                    value={estado_civil.nome}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === estado_civil.nome ? estado_civil.id : '');
                                        setEstadoCivil(estado_civil.id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn('mr-2 h-4 w-4', value === estado_civil.id ? 'opacity-100' : 'opacity-0')}
                                    />
                                    {estado_civil.nome}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default ComboboxEstadosCivis;
