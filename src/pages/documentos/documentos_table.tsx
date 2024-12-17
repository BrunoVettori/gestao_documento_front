import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RefreshIconButton } from '@/components/buttons/Buttons';
import { Flip, toast } from 'react-toastify';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import SubstituirDocumento from './substituir_documentos';
import BuildRequestQuery from '@/logic/build_request_query';
import FiltrarDocumentos from './filtrar_documentos';
import EditarDocumento from './editar_documento';
import TableSkeleton from '@/components/skeletons/table';
import FormatDate from '@/logic/format_date';
import Documento from './documento';
import moment from 'moment';

function DocumentoTable({
    NovoDocumento,
    refetch,
    funcionario_cpf,
    empresa_id,
    geral = false,
}: {
    // eslint-disable-next-line
    NovoDocumento?: any;
    // eslint-disable-next-line
    refetch: (ref?: any) => void;
    funcionario_cpf?: string | undefined;
    empresa_id?: string | undefined;
    geral?: boolean;
}) {
    const [page, setPage] = useState(0);

    const page_length = 100;

    // eslint-disable-next-line
    const default_filtros: any = {
        ativo: true,
        limit: page_length,
        offset: page * page_length,
    };

    if (geral) {
        default_filtros.funcionario_ativo = true;
    }

    if (funcionario_cpf) {
        default_filtros.funcionario_cpf = funcionario_cpf;
    }

    if (empresa_id) {
        default_filtros.empresa_id = empresa_id;
    }

    // eslint-disable-next-line
    const [filtros, setFiltros] = useState<any>(default_filtros);

    // eslint-disable-next-line
    const [documentos, setDocumentos] = useState<Array<any>>();

    const query_documentos = useQuery({
        queryKey: [`lista_documentos`, page, filtros],
        queryFn: async () => {
            const request = new Request(BuildRequestQuery(import.meta.env.VITE_BASE_URL + '/documentos', filtros), {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            const response = await fetch(request);

            if (response.status >= 400) {
                throw new Error('Erro ao buscar informações');
            }

            return response.json();
        },
    });

    useEffect(() => {
        if (!query_documentos.isPending && !query_documentos.isError && query_documentos.data !== undefined) {
            setDocumentos(query_documentos.data);
        }
    }, [query_documentos.data, query_documentos.isPending]);

    if (!documentos) {
        return <TableSkeleton />;
    }

    if (query_documentos.isError) {
        toast.error('Erro ao buscar informações', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'colored',
            transition: Flip,
        });

        return <TableSkeleton />;
    }

    function Valido({ minutes, ativo }: { minutes: number; ativo: boolean }) {
        const days_decimal = (minutes + 24) / 24;

        const days = Math.round((minutes + 24) / 24);

        if (!ativo) {
            return (
                <div className="bg-system_gray_400 min-w-[200px] w-fit rounded-sm p-1 pl-5 pr-5">
                    <p className="text-center text-white">{days} dias</p>
                </div>
            );
        }

        if (days_decimal > 0 && days_decimal < 30) {
            return (
                <div className="bg-system_yellow_500 min-w-[200px] w-fit rounded-sm p-1 pl-5 pr-5">
                    <p className="text-center text-black">{days} dias</p>
                </div>
            );
        } else if (days_decimal >= -30 && days_decimal < 0) {
            return (
                <div className="bg-system_orange_500 min-w-[200px] w-fit rounded-sm p-1 pl-5 pr-5">
                    <p className="text-center text-white">Vencido à {days * -1} dias</p>
                </div>
            );
        } else if (days_decimal < -30) {
            return (
                <div className="bg-system_red_500 min-w-[200px] w-fit rounded-sm p-1 pl-5 pr-5">
                    <p className="text-center text-white">Vencido à {days * -1} dias</p>
                </div>
            );
        } else {
            return (
                <div className="bg-system_green_500 min-w-[200px] w-fit rounded-sm p-1 pl-5 pr-5">
                    <p className="text-center text-white">{days} dias</p>
                </div>
            );
        }
    }

    function RefetchAll() {
        query_documentos.refetch();
        refetch();
    }

    return (
        <>
            <div className="flex mb-5 gap-5">
                <RefreshIconButton
                    onClick={() => {
                        RefetchAll();
                    }}
                    className="ml-auto"
                />

                <FiltrarDocumentos
                    refetch={RefetchAll}
                    filtros={filtros}
                    setFiltros={setFiltros}
                    default_filters={default_filtros}
                />

                {NovoDocumento ? <>{NovoDocumento(RefetchAll)}</> : <></>}
            </div>

            <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                <ScrollArea className="h-[800px] w-full">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead>
                                    <p className="text-lg">Nº Doc</p>
                                </TableHead>

                                <TableHead>
                                    <p className="text-lg">Tipo Documento</p>
                                </TableHead>

                                {geral && (
                                    <TableHead>
                                        <p className="text-lg">Referencia</p>
                                    </TableHead>
                                )}

                                {geral && (
                                    <TableHead>
                                        <p className="text-lg">Nome</p>
                                    </TableHead>
                                )}

                                <TableHead>
                                    <p className="text-lg">Documento</p>
                                </TableHead>

                                <TableHead>
                                    <p className="text-lg">Validade</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Dias até a validade</p>
                                </TableHead>

                                <TableHead>
                                    <p className="text-lg">Ativo</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Ações</p>
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {
                                //eslint-disable-next-line
                                documentos.map((documento: any, index: number) => {
                                    let folder = '';

                                    if (funcionario_cpf) {
                                        folder = funcionario_cpf;
                                    } else if (empresa_id) {
                                        folder = empresa_id;
                                    } else {
                                        if (documento.funcionario_cpf) {
                                            folder = documento.funcionario_cpf;
                                        }

                                        if (documento.empresa_id) {
                                            folder = documento.empresa_id;
                                        }
                                    }

                                    return (
                                        <TableRow
                                            key={documento.id}
                                            className={`bg-system_card_background hover:bg-slate-200 ${
                                                index % 2 == 1 ? 'bg-system_gray_100' : ''
                                            }`}
                                        >
                                            <TableCell className="text-lg w-[125px] max-w-[300px]">{documento.numero}</TableCell>

                                            <TableCell className="text-lg">{documento.tipo}</TableCell>

                                            {geral && (
                                                <>
                                                    <TableCell className="text-lg">
                                                        {documento.empresa_id ? (
                                                            <div className="bg-system_prince_500 text-white flex items-center justify-center rounded-md">
                                                                Empresa
                                                            </div>
                                                        ) : (
                                                            <div className="bg-system_aqua_600 text-white flex items-center justify-center rounded-md pl-2 pr-2">
                                                                Funcionário
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                </>
                                            )}

                                            {geral &&
                                                (documento.funcionario_cpf ? (
                                                    <TableCell className="text-lg">{documento.nome_funcionario}</TableCell>
                                                ) : (
                                                    <TableCell className="text-lg">{documento.nome_empresa}</TableCell>
                                                ))}

                                            <TableCell className="text-lg">{documento.nome}</TableCell>

                                            <TableCell className="text-lg">{documento.validade}</TableCell>
                                            <TableCell className="text-lg">
                                                <Valido
                                                    minutes={moment(FormatDate(documento.validade)).diff(new Date(), 'hours')}
                                                    ativo={documento.ativo === 1 ? true : false}
                                                />
                                            </TableCell>

                                            <TableCell className="text-lg">
                                                {documento.ativo === 1 ? (
                                                    <Badge className="bg-system_green_500 hover:bg-system_green_500 w-[60px] pl-3.5">
                                                        Ativo
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="destructive">Inativo</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="w-[50px]">
                                                <div className="flex items-center gap-1">
                                                    <Documento documento={documento} id_folder={folder} />

                                                    <EditarDocumento
                                                        documento={documento}
                                                        cpf={funcionario_cpf ? funcionario_cpf : documento.funcionario_cpf}
                                                        empresa_id={empresa_id ? empresa_id : documento.empresa_id}
                                                        refetch={RefetchAll}
                                                    />

                                                    <SubstituirDocumento
                                                        documento={documento}
                                                        cpf={funcionario_cpf}
                                                        empresa_id={empresa_id ? empresa_id : documento.empresa_id}
                                                        refetch={RefetchAll}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </ScrollArea>

                <div className="w-full h-[1px] bg-system_gray_300" />

                {!(documentos.length < page_length) && (
                    <div className="flex flex-row justify-end items-center gap-2 mt-3 mr-5 mb-5">
                        <Button
                            className="rounded-full h-9 w-9 "
                            disabled={page === 0}
                            onClick={() => {
                                setPage(page - 1);
                            }}
                        >
                            <ChevronLeft className="m-[-8px]" />
                        </Button>

                        <p className="ml-1 mr-1 text-xl">{page + 1}</p>

                        <Button
                            className="rounded-full h-9 w-9 "
                            disabled={documentos.length < page_length}
                            onClick={() => {
                                setPage(page + 1);
                            }}
                        >
                            <ChevronRight className="m-[-8px]" />
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default DocumentoTable;
