import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function ComboboxTiposContrato({
    setTipoContrato,
    default_value,
}: {
    setTipoContrato: (tipo_contrato: string) => void;
    default_value?: string;
}) {
    // eslint-disable-next-line
    const [tipos_contrato] = useState<Array<any>>([
        { id: 'clt', nome: 'CLT' },
        { id: 'terceiro', nome: 'Terceiro' },
    ]);

    const [open, setOpen] = useState(false);

    const [value, setValue] = useState(default_value ? default_value : undefined);

    useEffect(() => {
        if (default_value) {
            setTipoContrato(default_value);
        }
    }, [default_value]);

    return (
        <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
                <Button
                    disabled={tipos_contrato.length === 0}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? tipos_contrato.find((tipo_contrato) => tipo_contrato.id === value)?.nome
                        : 'Selecione uma tipo_contrato...'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Selecione um tipo de contrato..." />
                    <CommandList>
                        <CommandEmpty>tipo_contrato não encontada</CommandEmpty>
                        <CommandGroup>
                            {tipos_contrato.map((tipo_contrato) => (
                                <CommandItem
                                    key={tipo_contrato.id}
                                    value={tipo_contrato.nome}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === tipo_contrato.nome ? tipo_contrato.id : '');
                                        setTipoContrato(tipo_contrato.id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn('mr-2 h-4 w-4', value === tipo_contrato.id ? 'opacity-100' : 'opacity-0')}
                                    />
                                    {tipo_contrato.nome}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default ComboboxTiposContrato;
