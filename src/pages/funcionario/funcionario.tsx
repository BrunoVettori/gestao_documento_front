import { useEffect, useState } from 'react';
import { Flip, toast } from 'react-toastify';
import { FolderDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

import FuncionarioSkeleton from './funcionario_skeleton';
import VencidosMais30Dias from '@/components/self/validade_box/vencidos_mais_30_dias';
import EditarFuncionario from './editar_fincionarios';
import Vencidos30Dias from '@/components/self/validade_box/vencidos_30_dias';
import DocumentoTable from '../documentos/documentos_table';
import NovoDocumento from '../documentos/novo_documentos';
import CleckListDocs from '@/components/self/check_list_docs';
import Vence30Dias from '@/components/self/validade_box/vence_30_dias';
import FileSaver from 'file-saver';
import Valido from '@/components/self/validade_box/valido';
import Pannel from '@/components/self/pannel';
import NovosMultiplosDocumentos from '../documentos/novo_multiple_documentos';

function Funcionario() {
    const { cpf } = useParams();

    // eslint-disable-next-line
    const [funcionario, setFuncionario] = useState<any>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (funcionario !== undefined) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [funcionario]);

    const query_funcionario = useQuery({
        queryKey: [`lista_funcionario`],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + `/funcionarios?cpf=${cpf}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!query_funcionario.isPending && !query_funcionario.isError && query_funcionario.data !== undefined) {
            setFuncionario(query_funcionario.data[0]);
        }

        if (query_funcionario.isError) {
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
    }, [query_funcionario.data, query_funcionario.isPending]);

    function NovoDoc(refetch: () => void) {
        return (
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-system_green_600 hover:text-white"
                    onClick={() => {
                        DonwloadFiles();
                    }}
                >
                    <FolderDown />
                    <p>Donwload Geral</p>
                </Button>
                <CleckListDocs
                    nome={funcionario.matricula + '_' + funcionario.nome}
                    cpf={cpf}
                    refetching={query_funcionario.isRefetching}
                />
                <NovosMultiplosDocumentos funcionario={funcionario} refetch={refetch} />

                <NovoDocumento funcionario={funcionario} refetch={refetch} />
            </div>
        );
    }

    async function DonwloadFiles() {
        const request = new Request(import.meta.env.VITE_BASE_URL + `/download_zip?funcionario_cpf=${funcionario.cpf}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await fetch(request);

        if (response.status >= 200 && response.status < 400) {
            const blob = await response.blob();

            FileSaver.saveAs(blob, funcionario.matricula + '_' + funcionario.nome);

            toast.success('Sucesso', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
                transition: Flip,
            });
        } else {
            toast.error(await response.text(), {
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
    }

    if (loading === true) {
        return (
            <Pannel className="h-full w-full p-5">
                <FuncionarioSkeleton />
            </Pannel>
        );
    } else {
        return (
            <div className="h-full w-full p-5 pl-10 pr-10 overflow-hidden">
                <div className="flex p-5 gap-5 relative bg-system_card_background rounded-xl border-[2px] border-system_border">
                    <div className="absolute top-[0px] right-[0px] p-8">
                        {funcionario.ativo === 1 ? (
                            <div className="flex items-center gap-2">
                                <div className="h-[10px] w-[10px] rounded-full bg-system_green_500 shadow-md shadow-system_green_300" />
                                <p className="text-lg font-nunito_semibold text-center">Ativo</p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="h-[10px] w-[10px] rounded-full bg-system_red_500 shadow-md shadow-system_red_300" />
                                <p className="text-lg font-nunito_semibold text-center">Inativo</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="h-[250px] w-[225px] rounded-t-lg overflow-clip border-b-[0px] border-[1px] border-system_gray_300">
                            <img
                                className="rounded-t-lg object-cover w-[100%] h-[100%]"
                                src={
                                    import.meta.env.VITE_BASE_URL +
                                    `${funcionario.foto_perfil ? '/' + funcionario.foto_perfil : '/placeholder.png'}`
                                }
                                alt="Placeholder"
                            />
                        </div>

                        {funcionario.status && (
                            <div className="bg-system_aqua_800 text-white rounded-b-lg p-2">
                                <p className="text-lg font-nunito_semibold text-center">{funcionario.status}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-6xl font-nunito_bold">{funcionario.nome}</p>
                        <p className="text-3xl font-nunito_light text-system_gray_400">{funcionario.cargo}</p>

                        <div className="flex flex-col h-[190px] gap-x-[200px] flex-wrap w-fit mt-5">
                            <div className="flex gap-5">
                                <div className="flex flex-col gap-3">
                                    <p className="text-lg font-nunito_light text-system_gray_500">CPF:</p>
                                    <p className="text-lg font-nunito_light text-system_gray_500">Celular:</p>
                                    {funcionario.email && (
                                        <p className="text-lg font-nunito_light text-system_gray_500">E-Mail:</p>
                                    )}
                                    <p className="text-lg font-nunito_light text-system_gray_500">Contrato:</p>
                                    <p className="text-lg font-nunito_light text-system_gray_500">Estado Civil:</p>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <p className="text-lg font-nunito_semibold">{funcionario.cpf}</p>
                                    <p className="text-lg font-nunito_semibold">{funcionario.celular}</p>
                                    {funcionario.email && <p className="text-lg font-nunito_semibold">{funcionario.email}</p>}
                                    <p className="text-lg font-nunito_semibold uppercase">{funcionario.tipo_contrato}</p>
                                    <p className="text-lg font-nunito_semibold capitalize">{funcionario.estado_civil}</p>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <div className="flex flex-col gap-3">
                                    <p className="text-lg font-nunito_light text-system_gray_500">Matrícula:</p>
                                    <p className="text-lg font-nunito_light text-system_gray_500">Nascimento:</p>
                                    <p className="text-lg font-nunito_light text-system_gray_500">Admissão:</p>
                                    <p className="text-lg font-nunito_light text-system_gray_500">Cadastro:</p>
                                    {funcionario.endereco && (
                                        <p className="text-lg font-nunito_light text-system_gray_500">Endereço:</p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-3">
                                    <p className="text-lg font-nunito_semibold">{funcionario.matricula}</p>
                                    <p className="text-lg font-nunito_semibold">{funcionario.data_nascimento}</p>
                                    <p className="text-lg font-nunito_semibold">{funcionario.data_admissao}</p>
                                    <p className="text-lg font-nunito_semibold">{funcionario.created_at}</p>
                                    {funcionario.endereco && (
                                        <p className="text-lg font-nunito_semibold">{funcionario.endereco}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ml-auto mt-auto">
                        <EditarFuncionario funcionario={funcionario} refetch={query_funcionario.refetch} />
                    </div>
                </div>

                <div className="flex flex-wrap mt-5 gap-2 items-center justify-between">
                    <Valido funcionario_cpf={cpf} refetching={query_funcionario.isRefetching} />
                    <Vence30Dias funcionario_cpf={cpf} refetching={query_funcionario.isRefetching} />
                    <Vencidos30Dias funcionario_cpf={cpf} refetching={query_funcionario.isRefetching} />
                    <VencidosMais30Dias funcionario_cpf={cpf} refetching={query_funcionario.isRefetching} />
                </div>

                <div className="bg-system_card_background rounded-xl border-[2px] border-system_border mt-5 p-5 w-full">
                    <DocumentoTable NovoDocumento={NovoDoc} refetch={query_funcionario.refetch} funcionario_cpf={cpf} />
                </div>
            </div>
        );
    }
}

export default Funcionario;
