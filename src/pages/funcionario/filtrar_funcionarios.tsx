import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter, Trash } from 'lucide-react';
import { withMask } from 'use-mask-input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

import 'react-datepicker/dist/react-datepicker.css';

import ComboboxStatusMult from '@/components/self/combobox/combobox_status';
import ComboboxEmpresas from '@/components/self/combobox/combobox_empresas';

function FiltrarFuncionarios({
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
    // eslint-disable-next-line
    const [nome, setNome] = useState<any>();
    // eslint-disable-next-line
    const [empresa, setEmpresa] = useState<any>();

    const [cpf, setCpf] = useState<string>();
    const [ativo, setAtivo] = useState(true);
    const [status, setStatus] = useState<string>();
    const [matricula, setMatricula] = useState<string>();

    const [open, setOpen] = useState(false);

    function ResetFilters() {
        setMatricula(undefined);
        setFiltros(default_filters);
        setEmpresa(undefined);
        setStatus(undefined);
        setNome(undefined);
        setCpf(undefined);
        setOpen(false);
        refetch();
    }

    function ApplyFilters() {
        if (matricula) filtros.matricula = matricula;
        if (empresa) filtros.empresa_id = empresa.id;
        if (status) filtros.status_id = status;
        if (nome) filtros.nome = nome;
        if (cpf) filtros.cpf = cpf;

        filtros.ativo = ativo;

        setOpen(false);
        refetch();
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
            <DialogContent className="w-fit h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Editar Funcionario</DialogTitle>
                </DialogHeader>

                <div className="flex gap-5 items-start flex-wrap mt-5">
                    <div className="w-[250px]">
                        <p>Matrícula</p>

                        <Input
                            className="mt-2"
                            placeholder="Matŕicula"
                            value={matricula}
                            // eslint-disable-next-line
                            onChange={(field: any) => setMatricula(field.target.value)}
                        />
                    </div>

                    <div className="w-[250px]">
                        <p>CPF</p>

                        <Input
                            ref={withMask('999.999.999-99')}
                            className="mt-2"
                            placeholder="CPF"
                            value={cpf}
                            // eslint-disable-next-line
                            onChange={(field: any) => setCpf(field.target.value)}
                        />
                    </div>

                    <div className="w-[250px]">
                        <p>Nome Funcionario</p>

                        <Input
                            className="mt-2"
                            placeholder="Nome Funcionario"
                            value={nome}
                            // eslint-disable-next-line
                            onChange={(field: any) => setNome(field.target.value)}
                        />
                    </div>

                    <div>
                        <p>Ativo</p>
                        <Switch
                            className="data-[state=checked]:bg-system_aqua_700 mt-4"
                            checked={ativo}
                            onCheckedChange={setAtivo}
                        />
                    </div>

                    <div className="w-[250px] overflow-clip">
                        <p>Empresa</p>
                        <div className="mt-2">
                            <ComboboxEmpresas setEmpresa={setEmpresa} default_value={empresa && empresa.id} />
                        </div>
                    </div>

                    <div className="w-[208px] overflow-clip">
                        <p>Status</p>
                        <div className="mt-2">
                            <ComboboxStatusMult setStatus={setStatus} default_value={status} />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-5">
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

export default FiltrarFuncionarios;
