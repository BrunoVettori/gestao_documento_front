import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter, Trash } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

import 'react-datepicker/dist/react-datepicker.css';

function FiltrarTipoDocumento({
    default_filters,
    filtros,
    setFiltros,
    refetch,
}: {
    // eslint-disable-next-line
    default_filters: any;
    // eslint-disable-next-line
    filtros: any;
    // eslint-disable-next-line
    setFiltros: (default_filters: any) => void;
    refetch: () => void;
}) {
    const [empresarial, setEmpresarial] = useState(true);
    const [ativo, setAtivo] = useState(true);
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line
    const [nome, setNome] = useState<any>();
    // eslint-disable-next-line
    const [tipo, setTipo] = useState<any>();

    function ResetFilters() {
        setFiltros(default_filters);
        setTipo(undefined);
        setNome(undefined);
        setOpen(false);
        refetch();
    }

    function ApplyFilters() {
        if (nome) filtros.nome = nome;
        if (tipo) filtros.tipo_documento_id = tipo;

        filtros.ativo = ativo;
        filtros.empresarial = empresarial;

        refetch();
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(local_open: boolean) => {
                setOpen(local_open);
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items gap-2 hover:bg-system_orange_500 hover:text-white">
                    <Filter /> <p>Filtro</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-fit h-fit min-w-[900px] max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Filtrar Tipo</DialogTitle>
                </DialogHeader>

                <div className="flex gap-5 items-start">
                    <div className="mt-5 w-full">
                        <p>Nome</p>

                        <Input
                            className="mt-2"
                            placeholder="Nome"
                            value={nome}
                            // eslint-disable-next-line
                            onChange={(field: any) => setNome(field.target.value)}
                        />
                    </div>

                    <div className="mt-5">
                        <p>Empresarial</p>
                        <Switch
                            className="data-[state=checked]:bg-system_aqua_700 mt-4"
                            checked={empresarial}
                            onCheckedChange={setEmpresarial}
                        />
                    </div>

                    <div className="mt-5">
                        <p>Ativo</p>
                        <Switch
                            className="data-[state=checked]:bg-system_aqua_700 mt-4"
                            checked={ativo}
                            onCheckedChange={setAtivo}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={() => {
                            ResetFilters();
                        }}
                        variant="ghost"
                        className="w-[200px] bg-system_gray_300 hover:bg-system_gray_400 p-8 text-black"
                    >
                        <Trash className="mr-2" />
                        Limpar Filtros
                    </Button>

                    <Button
                        onClick={() => {
                            ApplyFilters();
                        }}
                        variant="ghost"
                        className="w-full bg-system_orange_500 hover:bg-system_orange_600 p-8 text-white hover:text-white"
                    >
                        <Filter className="mr-2" />
                        <p>Filtrar</p>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default FiltrarTipoDocumento;
