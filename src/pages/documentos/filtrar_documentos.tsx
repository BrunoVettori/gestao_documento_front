import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Filter, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ptBR } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

import ComboboxTipoDocumento from '@/components/self/combobox/tipo_documento';
import FormatDate from '@/logic/format_date';
import DatePicker from 'react-datepicker';
import moment from 'moment';

function FiltrarDocumentos({
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
    const [ativo, setAtivo] = useState(true);
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line
    const [nome, setNome] = useState<any>();
    // eslint-disable-next-line
    const [tipo, setTipo] = useState<any>();
    // eslint-disable-next-line
    const [validade_ini, setValidadeIni] = useState<any>(undefined);
    // eslint-disable-next-line
    const [validade_fim, setValidadeFim] = useState<any>(undefined);
    // eslint-disable-next-line
    const [descricao, setDescricao] = useState<any>();

    function ResetFilters() {
        setValidadeIni(undefined);
        setValidadeFim(undefined);

        setFiltros(default_filters);

        setTipo(undefined);
        setNome(undefined);
        refetch();

        setOpen(false);
    }

    function ApplyFilters() {
        if (nome) filtros.nome = nome;
        if (tipo) filtros.tipo_documento_id = tipo;
        if (descricao) filtros.descricao = descricao;
        if (validade_ini) filtros.validade_ini = validade_ini.toString();
        if (validade_fim) filtros.validade_fim = validade_fim.toString();

        filtros.ativo = ativo;

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
            <DialogContent className="w-fit h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Filtrar Documento</DialogTitle>
                </DialogHeader>

                <div className="flex gap-5 items-start">
                    <div className="mt-5 w-full">
                        <p>Nome Documento</p>

                        <Input
                            className="mt-2"
                            placeholder="Nome Documento"
                            value={nome}
                            // eslint-disable-next-line
                            onChange={(field: any) => setNome(field.target.value)}
                        />
                    </div>

                    <div className="mt-5 w-[400px]">
                        <p>Validade inicial</p>
                        <DatePicker
                            className="mt-2 w-full border-[1px] rounded-md h-[40px] border-system_gray_200 p-3"
                            selected={validade_ini}
                            // eslint-disable-next-line
                            onChange={(date: any) => setValidadeIni(FormatDate(moment(date).format('DD/MM/YYYY')))}
                            locale={ptBR}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className="mt-5 w-[400px]">
                        <p>Validade Final</p>
                        <DatePicker
                            className="mt-2 w-full border-[1px] rounded-md h-[40px] border-system_gray_200 p-3"
                            selected={validade_fim}
                            // eslint-disable-next-line
                            onChange={(date: any) => setValidadeFim(FormatDate(moment(date).format('DD/MM/YYYY')))}
                            locale={ptBR}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className="mt-5 w-full">
                        <p>Tipo de Documento</p>
                        <div className="mt-2">
                            <ComboboxTipoDocumento setTipo={setTipo} default_value={tipo} />
                        </div>
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

                <div className="mt-5">
                    <p>Descrição</p>
                    <Textarea
                        className="mt-2"
                        placeholder="Descrição"
                        value={descricao}
                        // eslint-disable-next-line
                        onChange={(field: any) => setDescricao(field.target.value)}
                    />
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

export default FiltrarDocumentos;
