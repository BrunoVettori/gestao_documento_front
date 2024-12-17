import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshIconButton, ViewIconButton } from '@/components/buttons/Buttons';
import { useEffect, useState } from 'react';
import { Flip, toast } from 'react-toastify';
import { Building2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';

import EmpresaSkeleton from './empresa_skeleton';
import NovaEmpresa from './nova_empresa';
import Pannel from '@/components/self/pannel';
import Header from '@/components/self/header';

function Empresas() {
    // eslint-disable-next-line
    const [empresas, setEmpresas] = useState<any>();

    const [loading, setLoading] = useState(true);

    const query_empresas = useQuery({
        queryKey: [`lista_empresas`],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + `/empresas`, {
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
        if (!query_empresas.isPending && !query_empresas.isError && query_empresas.data !== undefined) {
            setEmpresas(query_empresas.data);
        }
    }, [query_empresas.isPending, query_empresas.isError, query_empresas.data]);

    useEffect(() => {
        if (empresas !== undefined) {
            if (empresas.length === 0) {
                toast.warn('Sem empresas no sistema', {
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
    }, [empresas]);

    useEffect(() => {
        if (query_empresas.isError) {
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
    }, [query_empresas.isError]);

    if (query_empresas.isError || loading) {
        return (
            <Pannel className="h-full w-full p-5">
                <EmpresaSkeleton />
            </Pannel>
        );
    }

    return (
        <Pannel className="h-full w-full p-5">
            <Header nome="Empresas" icon={<Building2 />} loading={loading}>
                <div className="flex items-center gap-3">
                    <RefreshIconButton
                        onClick={() => {
                            query_empresas.refetch();
                        }}
                    />
                    <NovaEmpresa refetch={query_empresas.refetch} />
                </div>
            </Header>

            <div>
                <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead>
                                    <p className="text-lg">CNPJ</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Nome</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">E-Mail</p>
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
                                empresas.map((empresa: any, index: number) => (
                                    <TableRow
                                        key={empresa.id}
                                        className={`bg-system_card_background hover:bg-slate-200 ${
                                            index % 2 == 1 ? 'bg-system_gray_100' : ''
                                        }`}
                                    >
                                        <TableCell className="text-lg">{empresa.cnpj}</TableCell>
                                        <TableCell className="text-lg capitalize">{empresa.nome}</TableCell>
                                        <TableCell className="text-lg">{empresa.email}</TableCell>
                                        <TableCell className="text-lg">
                                            {empresa.ativo === 1 ? (
                                                <Badge className="bg-system_green_500 hover:bg-system_green_500 w-[60px] pl-3.5">
                                                    Ativo
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive">Inativo</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-lg">
                                            <a href={`/empresa/${empresa.id}`}>
                                                <ViewIconButton />
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Pannel>
    );
}

export default Empresas;
