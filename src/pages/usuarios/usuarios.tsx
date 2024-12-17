import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { RefreshIconButton } from '@/components/buttons/Buttons';
import { Flip, toast } from 'react-toastify';
import { Building2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import EmpresaSkeleton from '../empresa/empresa_skeleton';
import DeletarUsuario from './deletar_usuario';
import EditarUsuario from './editar_usuario';
import NovaUsuario from './novo_usuario';
import Pannel from '@/components/self/pannel';
import Header from '@/components/self/header';

function Usuarios() {
    // eslint-disable-next-line
    const [usuarios, setUsuarios] = useState<any>();

    const [loading, setLoading] = useState(true);

    const query_usuarios = useQuery({
        queryKey: [`lista_usuarios`],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + `/usuarios`, {
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
        if (!query_usuarios.isPending && !query_usuarios.isError && query_usuarios.data !== undefined) {
            setUsuarios(query_usuarios.data);
        }
    }, [query_usuarios.isPending, query_usuarios.isError, query_usuarios.data]);

    useEffect(() => {
        if (usuarios !== undefined) {
            if (usuarios.length === 0) {
                toast.warn('Sem usuarios no sistema', {
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
    }, [usuarios]);

    useEffect(() => {
        if (query_usuarios.isError) {
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
    }, [query_usuarios.isError]);

    if (query_usuarios.isError || loading) {
        return (
            <Pannel className="h-full w-full p-5">
                <EmpresaSkeleton />
            </Pannel>
        );
    }

    return (
        <Pannel className="h-full w-full p-5">
            <Header nome="Usuarios" icon={<Building2 />} loading={loading}>
                <div className="flex items-center gap-3">
                    <RefreshIconButton />
                    <NovaUsuario refetch={query_usuarios.refetch} />
                </div>
            </Header>

            <div>
                <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead>
                                    <p className="text-lg">Nome</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">E-Mail</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Ação</p>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                //eslint-disable-next-line
                                usuarios.map((usuario: any, index: number) => (
                                    <TableRow
                                        key={usuario.id}
                                        className={`bg-system_card_background hover:bg-slate-200 ${
                                            index % 2 == 1 ? 'bg-system_gray_100' : ''
                                        }`}
                                    >
                                        <TableCell className="text-lg capitalize">{usuario.nome}</TableCell>
                                        <TableCell className="text-lg">{usuario.email}</TableCell>
                                        <TableCell className="text-lg w-[110px]">
                                            <div className="flex justify-between items-center">
                                                <EditarUsuario usuario={usuario} refetch={query_usuarios.refetch} />
                                                <DeletarUsuario usuario={usuario} refetch={query_usuarios.refetch} />
                                            </div>
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

export default Usuarios;
