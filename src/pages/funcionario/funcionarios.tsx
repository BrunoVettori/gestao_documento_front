import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshIconButton, ViewIconButton } from '@/components/buttons/Buttons';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { Flip, toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';

import PaginationSkeleton from '@/components/skeletons/pagination';
import FiltrarFuncionarios from './filtrar_funcionarios';
import BuildRequestQuery from '@/logic/build_request_query';
import NovoFuncionario from './novo_funcionario';
import TableSkeleton from '@/components/skeletons/table';
import Header from '@/components/self/header';
import Pannel from '@/components/self/pannel';

function Funcionarios() {
    // eslint-disable-next-line
    const [funcionarios, setFuncionarios] = useState<any>();
    const [loading, setLoading] = useState(true);

    // eslint-disable-next-line
    const default_filtros: any = {
        ativo: true,
    };

    // eslint-disable-next-line
    const [filtros, setFiltros] = useState<any>(default_filtros);

    useEffect(() => {
        if (funcionarios !== undefined) {
            if (funcionarios.length === 0) {
                toast.warn('Sem funcionários no sistema', {
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
    }, [funcionarios]);

    const query_funcionarios = useQuery({
        queryKey: [`lista_funcionarios`, filtros],
        queryFn: async () => {
            const request = new Request(BuildRequestQuery(import.meta.env.VITE_BASE_URL + '/funcionarios', filtros), {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!query_funcionarios.isPending && !query_funcionarios.isError && query_funcionarios.data !== undefined) {
            setFuncionarios(query_funcionarios.data);
        }

        if (query_funcionarios.isError) {
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
    }, [query_funcionarios.data, query_funcionarios.isPending]);

    return (
        <Pannel className="h-full w-full p-5">
            <Header nome="Funcionarios" icon={<User />} loading={loading}>
                <div className="flex gap-4">
                    <RefreshIconButton
                        onClick={() => {
                            query_funcionarios.refetch();
                        }}
                    />

                    <FiltrarFuncionarios
                        filtros={filtros}
                        setFiltros={setFiltros}
                        refetch={query_funcionarios.refetch}
                        default_filters={default_filtros}
                    />

                    <NovoFuncionario refetch={query_funcionarios.refetch} />
                </div>
            </Header>

            {loading ? (
                <>
                    <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                        <TableSkeleton />
                    </div>

                    <PaginationSkeleton />
                </>
            ) : (
                <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead>
                                    <p className="text-lg">Foto</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Matrícula</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Nome</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">CPF</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Celular</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Tipo Contrato</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Empresa</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Cargo</p>
                                </TableHead>
                                <TableHead>
                                    <p className="text-lg">Status</p>
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
                                funcionarios.map((funcionario: any, index: number) => (
                                    <TableRow
                                        key={funcionario.cpf}
                                        className={`bg-system_card_background hover:bg-slate-200 ${
                                            index % 2 == 1 ? 'bg-system_gray_100' : ''
                                        }`}
                                    >
                                        <TableCell className="text-lg w-[70px]">
                                            <div className="h-[60px] w-[60px] rounded-full overflow-clip">
                                                <img
                                                    className="rounded-t-lg object-cover w-[100%] h-[100%]"
                                                    src={
                                                        import.meta.env.VITE_BASE_URL +
                                                        `${
                                                            funcionario.foto_perfil
                                                                ? '/' + funcionario.foto_perfil
                                                                : '/placeholder.png'
                                                        }`
                                                    }
                                                    alt="Placeholder"
                                                />
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-lg">{funcionario.matricula}</TableCell>
                                        <TableCell className="text-lg">{funcionario.nome}</TableCell>
                                        <TableCell className="text-lg">{funcionario.cpf}</TableCell>
                                        <TableCell className="text-lg">{funcionario.celular}</TableCell>
                                        <TableCell className="text-lg uppercase">{funcionario.tipo_contrato}</TableCell>
                                        <TableCell className="text-lg capitalize">{funcionario.empresa}</TableCell>
                                        <TableCell className="text-lg capitalize">{funcionario.cargo}</TableCell>
                                        <TableCell className="text-lg capitalize">{funcionario.status}</TableCell>
                                        <TableCell className="text-lg">
                                            {funcionario.ativo === 1 ? (
                                                <Badge className="bg-system_green_500 hover:bg-system_green_500 w-[60px] pl-3.5">
                                                    Ativo
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive">Inativo</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-lg">
                                            <a href={`/funcionario/${funcionario.cpf}`}>
                                                <ViewIconButton />
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            )}
        </Pannel>
    );
}

export default Funcionarios;
