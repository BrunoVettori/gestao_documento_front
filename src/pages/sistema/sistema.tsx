import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { RefreshIconButton } from '@/components/buttons/Buttons';
import { Flip, toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import FiltrarTipoDocumento from './tipo_documento/filtrar_tipo_documento';
import EditarTipoDocumento from './tipo_documento/editar_tipo_documento';
import NovoTipoDocumento from './tipo_documento/novo_tipo_documento';
import BuildRequestQuery from '@/logic/build_request_query';
import TableSkeleton from '@/components/skeletons/table';
import EditarStatus from './status/editar_status';
import EditarCargo from './cargo/editar_cargo';
import NovoStatus from './status/novo_status';
import NovoCargo from './cargo/novo_cargo';
import Header from '@/components/self/header';
import Pannel from '@/components/self/pannel';

function Sistema() {
    // eslint-disable-next-line
    const [filtros, setFiltros] = useState<any>({ ativo: true });

    // eslint-disable-next-line
    const [cargos, setCargos] = useState<any>();

    // eslint-disable-next-line
    const [status, setStatus] = useState<any>();

    // eslint-disable-next-line
    const [tipos, setTipos] = useState<any>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cargos !== undefined && status !== undefined && tipos !== undefined) {
            if (cargos.length === 0) {
                toast.warn('Sem cargos no sistema', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Flip,
                });
            }

            if (status.length === 0) {
                toast.warn('Sem status no sistema', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Flip,
                });
            }

            if (tipos.length === 0) {
                toast.warn('Sem tipos de documentos no sistema', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'colored',
                    transition: Flip,
                });
            }

            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [cargos, status, tipos]);

    const query_cargos = useQuery({
        queryKey: [`lista_cargos`],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + `/cargos`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!query_cargos.isPending && !query_cargos.isError && query_cargos.data !== undefined) {
            setCargos(query_cargos.data);
        }

        if (query_cargos.isError) {
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
        }
    }, [query_cargos.data]);

    const query_status = useQuery({
        queryKey: [`lista_status`],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + `/status`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!query_status.isPending && !query_status.isError && query_status.data !== undefined) {
            setStatus(query_status.data);
        }

        if (query_status.isError) {
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
        }
    }, [query_status.data]);

    const query_tipos = useQuery({
        queryKey: [`lista_tipo_doc`, filtros],
        queryFn: async () => {
            const request = new Request(BuildRequestQuery(import.meta.env.VITE_BASE_URL + `/tipo_documento`, filtros), {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!query_tipos.isPending && !query_tipos.isError && query_tipos.data !== undefined) {
            setTipos(query_tipos.data);
        }

        if (query_tipos.isError) {
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
        }
    }, [query_tipos.data]);

    return (
        <Pannel className="h-full w-full p-5">
            <Header nome="Parâmetros do Sistema" icon={<Wrench />} loading={loading}></Header>

            {loading ? (
                <>
                    <p className="mt-5 text-xl font-nunito_semibold">Cargos</p>

                    <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                        <TableSkeleton />
                    </div>

                    <p className="mt-5 text-xl font-nunito_semibold">Status</p>

                    <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                        <TableSkeleton />
                    </div>
                </>
            ) : (
                <div className="mt-3">
                    <div className="flex items-center justify-between mt-3">
                        <p className="mt-5 text-xl font-nunito_semibold">Tipos de documento</p>

                        <div className="flex gap-4">
                            <RefreshIconButton
                                onClick={() => {
                                    query_tipos.refetch();
                                }}
                            />
                            <FiltrarTipoDocumento
                                default_filters={{ ativo: true }}
                                filtros={filtros}
                                setFiltros={setFiltros}
                                refetch={query_tipos.refetch}
                            />
                            <NovoTipoDocumento refetch={query_tipos.refetch} />
                        </div>
                    </div>
                    <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead>
                                        <p className="text-lg">Nome</p>
                                    </TableHead>

                                    <TableHead>
                                        <p className="text-lg">Empresarial</p>
                                    </TableHead>

                                    <TableHead>
                                        <p className="text-lg">Ativo</p>
                                    </TableHead>

                                    <TableHead>
                                        <p className="text-lg">Ação</p>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    //eslint-disable-next-line
                                    tipos.map((tipo: any, index: number) => (
                                        <TableRow
                                            key={tipo.id}
                                            className={`bg-system_card_background hover:bg-slate-200 ${
                                                index % 2 == 1 ? 'bg-system_gray_100' : ''
                                            }`}
                                        >
                                            <TableCell className="text-lg">{tipo.nome}</TableCell>

                                            <TableCell className="text-lg">
                                                {tipo.empresarial === 1 ? (
                                                    <Badge className="bg-system_orange_500 hover:bg-system_orange_500">Sim</Badge>
                                                ) : (
                                                    <Badge className="bg-system_green_500 hover:bg-system_green_500">Não</Badge>
                                                )}
                                            </TableCell>

                                            <TableCell className="text-lg">
                                                {tipo.ativo === 1 ? (
                                                    <Badge className="bg-system_green_500 hover:bg-system_green_500 w-[60px] pl-3.5">
                                                        Ativo
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="destructive">Inativo</Badge>
                                                )}
                                            </TableCell>

                                            <TableCell className="text-lg w-[80px]">
                                                <EditarTipoDocumento tipo={tipo} refetch={query_tipos.refetch} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                        <p className="mt-5 text-xl font-nunito_semibold">Cargos</p>

                        <div className="flex gap-4">
                            <RefreshIconButton
                                onClick={() => {
                                    query_cargos.refetch();
                                }}
                            />
                            <NovoCargo refetch={query_cargos.refetch} />
                        </div>
                    </div>
                    <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead>
                                        <p className="text-lg">Nome</p>
                                    </TableHead>

                                    <TableHead>
                                        <p className="text-lg">Ativo</p>
                                    </TableHead>

                                    <TableHead>
                                        <p className="text-lg">Ação</p>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    //eslint-disable-next-line
                                    cargos.map((cargo: any, index: number) => (
                                        <TableRow
                                            key={cargo.id}
                                            className={`bg-system_card_background hover:bg-slate-200 ${
                                                index % 2 == 1 ? 'bg-system_gray_100' : ''
                                            }`}
                                        >
                                            <TableCell className="text-lg">{cargo.nome}</TableCell>

                                            <TableCell className="text-lg">
                                                {cargo.ativo === 1 ? (
                                                    <Badge className="bg-system_green_500 hover:bg-system_green_500 w-[60px] pl-3.5">
                                                        Ativo
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="destructive">Inativo</Badge>
                                                )}
                                            </TableCell>

                                            <TableCell className="text-lg w-[80px]">
                                                <EditarCargo cargo={cargo} refetch={query_cargos.refetch} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                        <p className="mt-5 text-xl font-nunito_semibold">Status</p>

                        <div className="flex gap-4">
                            <RefreshIconButton
                                onClick={() => {
                                    query_status.refetch();
                                }}
                            />
                            <NovoStatus refetch={query_status.refetch} />
                        </div>
                    </div>
                    <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead>
                                        <p className="text-lg">Nome</p>
                                    </TableHead>

                                    <TableHead>
                                        <p className="text-lg">Ativo</p>
                                    </TableHead>

                                    <TableHead>
                                        <p className="text-lg">Ação</p>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    //eslint-disable-next-line
                                    status.map((status_funcionario: any, index: number) => (
                                        <TableRow
                                            key={status_funcionario.id}
                                            className={`bg-system_card_background hover:bg-slate-200 ${
                                                index % 2 == 1 ? 'bg-system_gray_100' : ''
                                            }`}
                                        >
                                            <TableCell className="text-lg">{status_funcionario.nome}</TableCell>

                                            <TableCell className="text-lg">
                                                {status_funcionario.ativo === 1 ? (
                                                    <Badge className="bg-system_green_500 hover:bg-system_green_500 w-[60px] pl-3.5">
                                                        Ativo
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="destructive">Inativo</Badge>
                                                )}
                                            </TableCell>

                                            <TableCell className="text-lg w-[80px]">
                                                <EditarStatus status={status_funcionario} refetch={query_status.refetch} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </Pannel>
    );
}

export default Sistema;
