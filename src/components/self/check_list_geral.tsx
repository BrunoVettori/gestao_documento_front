import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { ArrowLeft, Folder, User } from 'lucide-react';
import { Flip, toast } from 'react-toastify';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';

import FileSaver from 'file-saver';
import ComboboxEmpresas from './combobox/combobox_empresas';

function CleckListGeral({ refetching }: { refetching: boolean }) {
    // eslint-disable-next-line
    const [tipo_documentos, setTipoDocumentos] = useState<Array<any>>();

    // eslint-disable-next-line
    const [funcionarios, setFuncionarios] = useState<Array<any>>();

    // eslint-disable-next-line
    const [empresa, setEmpresa] = useState<any>();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(false);
    const [open, setOpen] = useState(false);

    const query_funcionarios = useQuery({
        queryKey: [`lista_funcionarios_checktree`, empresa],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + `/funcionarios?empresa_id=${empresa.id}`, {
                method: 'GET',
                credentials: 'include',
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
    }, [query_funcionarios.data]);

    const query_tipo_documentos = useQuery({
        queryKey: [`lista_tipo_documentos`, empresa],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + `/tipo_documento_empresa?empresa_id=${empresa.id}`, {
                method: 'GET',
                credentials: 'include',
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!query_tipo_documentos.isPending && !query_tipo_documentos.isError && query_tipo_documentos.data !== undefined) {
            if (query_tipo_documentos.data.length === 0) {
                toast.warn('Usuários sem documentos', {
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

            setTipoDocumentos(query_tipo_documentos.data);
        }

        if (query_tipo_documentos.isError) {
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
    }, [query_tipo_documentos.data]);

    useEffect(() => {
        if (refetching === true) {
            query_funcionarios.refetch();
            query_tipo_documentos.refetch();
        }
    }, [refetching]);

    async function DownloadFuncionarios() {
        if (funcionarios === undefined) {
            return;
        }
        if (tipo_documentos === undefined) {
            return;
        }
        let flag_funcionario = false;
        for (let index = 0; index < funcionarios.length; index++) {
            const funcionario = funcionarios[index];
            if (funcionario.checked) {
                flag_funcionario = true;
            }
        }
        let flag_tipo = false;
        for (let index = 0; index < tipo_documentos.length; index++) {
            const tipo_documento = tipo_documentos[index];
            if (tipo_documento.checked) {
                flag_tipo = true;
            }
        }
        if (!flag_funcionario || !flag_tipo) {
            toast.warn('Selecione um funcionário e um tipo', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
                transition: Flip,
            });
            return;
        }

        setLoading(true);

        const request = new Request(
            import.meta.env.VITE_BASE_URL +
                `/download_funcionarios?funcionarios=${JSON.stringify(funcionarios)}&tipos=${JSON.stringify(tipo_documentos)}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }
        );

        const response = await fetch(request);

        if (response.status >= 200 && response.status < 400) {
            const blob = await response.blob();
            FileSaver.saveAs(blob, empresa.nome + '.zip');
            setLoading(false);
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
            setLoading(false);
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

    return (
        <Dialog
            open={open}
            onOpenChange={(local_open: boolean) => {
                setOpen(local_open);
                setLoading(false);
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className="flex gap-2 items-center hover:bg-system_teal_600 hover:text-white">
                    <User /> Donwload Funcionários
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[700px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Donwload Funcionários {empresa && ' - ' + empresa.nome}</DialogTitle>
                </DialogHeader>

                {stage && funcionarios && tipo_documentos ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                onCheckedChange={(check: boolean) => {
                                    for (let index = 0; index < funcionarios.length; index++) {
                                        const funcionario = funcionarios[index];

                                        funcionario.checked = check;
                                    }

                                    setRefresh(!refresh);
                                }}
                            />
                            <p>Marcar Todos Funcionários</p>
                        </div>

                        <div className="flex p-5 border-[1px] border-system_gray_400 rounded-md justify-between">
                            <div className="max-h-[250px] overflow-scroll w-full">
                                {
                                    // eslint-disable-next-line
                                    funcionarios.map((funcionario: any) => {
                                        return (
                                            <div key={funcionario.cpf}>
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        checked={funcionario.checked ? true : false}
                                                        onCheckedChange={(check: boolean) => {
                                                            funcionario.checked = check;

                                                            setRefresh(!refresh);
                                                        }}
                                                    />

                                                    <User className="w-5 h-5" />

                                                    <p>{funcionario.nome}</p>

                                                    <Button
                                                        className="w-10 h-10"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            if (funcionario.aberto === undefined) {
                                                                funcionario.aberto = true;
                                                            }

                                                            funcionario.aberto = !funcionario.aberto;
                                                            setRefresh(!refresh);
                                                        }}
                                                    ></Button>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            <div className="h-full w-[5px] mr-5 ml-5 bg-system_gray_400" />

                            <div className="max-h-[250px] overflow-scroll w-full">
                                {
                                    // eslint-disable-next-line
                                    tipo_documentos.map((tipo_documento: any) => {
                                        return (
                                            <div key={tipo_documento.id}>
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        checked={tipo_documento.checked ? true : false}
                                                        onCheckedChange={(check: boolean) => {
                                                            tipo_documento.checked = check;

                                                            setRefresh(!refresh);
                                                        }}
                                                    />

                                                    <Folder className="w-5 h-5" />

                                                    <p>{tipo_documento.nome}</p>

                                                    <Button
                                                        className="w-10 h-10"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            if (tipo_documento.aberto === undefined) {
                                                                tipo_documento.aberto = true;
                                                            }

                                                            tipo_documento.aberto = !tipo_documento.aberto;
                                                            setRefresh(!refresh);
                                                        }}
                                                    ></Button>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>

                        <div className="w-full flex gap-5 items-center">
                            <Button
                                onClick={() => {
                                    setStage(false);
                                }}
                                className="bg-system_gray_400 hover:bg-system_gray_500"
                            >
                                <ArrowLeft />
                            </Button>

                            {loading ? (
                                <Button
                                    disabled
                                    onClick={() => {
                                        DownloadFuncionarios();
                                    }}
                                    className="w-full bg-system_aqua_700 hover:bg-system_aqua_800"
                                >
                                    <div className="flex gap-2 items-center">
                                        <svg
                                            className="animate-spin w-8 stroke-white mr-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                        </svg>
                                        <p>Download funcionários</p>
                                    </div>
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        DownloadFuncionarios();
                                    }}
                                    className="w-full bg-system_aqua_700 hover:bg-system_aqua_800"
                                >
                                    Download funcionários
                                </Button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="w-full flex flex-col gap-5">
                        <ComboboxEmpresas
                            default_value={empresa ? empresa.id : undefined}
                            setEmpresa={
                                // eslint-disable-next-line
                                (empresa: any) => {
                                    setEmpresa(empresa);
                                }
                            }
                        />

                        <Button
                            onClick={() => {
                                if (empresa === undefined) {
                                    toast.warn('Selecione uma empresa', {
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
                                    setStage(true);
                                }
                            }}
                            variant="outline"
                            className=" bg-system_teal_700 hover:bg-system_teal_800 text-white hover:text-white"
                        >
                            Avançar
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default CleckListGeral;
