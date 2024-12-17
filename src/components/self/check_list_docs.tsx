import {
    ArrowDownToLine,
    ChevronDown,
    ChevronUp,
    File,
    FileCode2,
    FileImage,
    FileText,
    FileType,
    Folder,
    Sheet,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Flip, toast } from 'react-toastify';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import FileSaver from 'file-saver';

function CleckListDocs({
    nome,
    cpf,
    empresa_id,
    refetching,
}: {
    nome: string;
    // eslint-disable-next-line
    cpf?: any;
    // eslint-disable-next-line
    empresa_id?: any;
    refetching: boolean;
}) {
    // eslint-disable-next-line
    const [documentos, setDocumentos] = useState<Array<any>>();
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const query_documentos = useQuery({
        queryKey: [`lista_documentos_checktree`],
        queryFn: async () => {
            let url_query = '/documentos_checktree';

            if (cpf) {
                url_query += `?funcionario_cpf=${cpf}`;
            }

            if (empresa_id) {
                url_query += `?empresa_id=${empresa_id}`;
            }

            const request = new Request(import.meta.env.VITE_BASE_URL + url_query, {
                method: 'GET',
                credentials: 'include',
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!query_documentos.isPending && !query_documentos.isError && query_documentos.data !== undefined) {
            setDocumentos(query_documentos.data);
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
        }
    }, [query_documentos.data]);

    useEffect(() => {
        if (refetching === true) {
            query_documentos.refetch();
        }
    }, [refetching]);

    if (!documentos || documentos.length === 0) {
        return <p>Sem dados</p>;
    }

    async function DownloadDocumentos() {
        if (documentos === undefined) {
            return;
        }

        let flag = false;

        for (let index = 0; index < documentos.length; index++) {
            const tipo = documentos[index];

            for (let index_tipo = 0; index_tipo < tipo.documentos.length; index_tipo++) {
                const documento = tipo.documentos[index_tipo];

                if (documento.checked) {
                    flag = true;
                }
            }
        }

        if (!flag) {
            toast.warn('Selecione um documento', {
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
            import.meta.env.VITE_BASE_URL + `/download_documentos?arquivos=${JSON.stringify(documentos)}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }
        );

        const response = await fetch(request);

        if (response.status >= 200 && response.status < 400) {
            const blob = await response.blob();
            FileSaver.saveAs(blob, nome + '.zip');
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
                    <ArrowDownToLine /> Donwload
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[700px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Donwload Documentos</DialogTitle>
                </DialogHeader>

                <div className="flex items-center gap-2">
                    <Checkbox
                        onCheckedChange={(check: boolean) => {
                            for (let index = 0; index < documentos.length; index++) {
                                const tipo = documentos[index];

                                tipo.checked = check;

                                for (let index_tipo = 0; index_tipo < tipo.documentos.length; index_tipo++) {
                                    const documento = tipo.documentos[index_tipo];

                                    documento.checked = check;
                                }
                            }

                            setRefresh(!refresh);
                        }}
                    />
                    <p>Marcar todos</p>
                </div>

                <div className="flex flex-col p-5 border-[1px] border-system_gray_400 rounded-md">
                    {
                        // eslint-disable-next-line
                        documentos.map((tipo: any) => {
                            if (!tipo.documentos || tipo.documentos.length === 0) {
                                return;
                            }

                            return (
                                <div key={tipo.id}>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            checked={tipo.checked ? true : false}
                                            onCheckedChange={(check: boolean) => {
                                                tipo.checked = check;

                                                for (let index = 0; index < tipo.documentos.length; index++) {
                                                    const documento = tipo.documentos[index];

                                                    documento.checked = check;
                                                }

                                                setRefresh(!refresh);
                                            }}
                                        />

                                        <Folder className="w-5 h-5" />

                                        <p>{tipo.nome}</p>

                                        <Button
                                            className="w-10 h-10"
                                            variant="ghost"
                                            onClick={() => {
                                                if (tipo.aberto === undefined) {
                                                    tipo.aberto = true;
                                                }

                                                tipo.aberto = !tipo.aberto;
                                                setRefresh(!refresh);
                                            }}
                                        >
                                            {tipo.aberto || tipo.aberto === undefined ? (
                                                <ChevronDown className="m-[-50px]" />
                                            ) : (
                                                <ChevronUp className="m-[-50px]" />
                                            )}
                                        </Button>
                                    </div>

                                    <div className={`ml-6 ${tipo.aberto && ' hidden'} ${tipo.aberto === undefined && ' hidden'}`}>
                                        {
                                            // eslint-disable-next-line
                                            tipo.documentos.map((documento: any) => {
                                                let flag = false;

                                                let extention = documento.nome_arquivo;

                                                while (flag == false) {
                                                    const split = extention.split('.');

                                                    if (split.length > 1) {
                                                        extention = split[1];
                                                    } else {
                                                        flag = true;
                                                    }
                                                }

                                                let icon = <File className="w-5 h-5" />;

                                                switch (extention) {
                                                    case 'pdf':
                                                        icon = <FileType className="w-5 h-5" />;
                                                        break;
                                                    case 'png':
                                                    case 'jpg':
                                                    case 'jpeg':
                                                    case 'gif':
                                                    case 'webp':
                                                    case 'svg':
                                                    case 'avif':
                                                    case 'tiff':
                                                    case 'bmp':
                                                        icon = <FileImage className="w-5 h-5" />;
                                                        break;
                                                    case 'doc':
                                                    case 'docx':
                                                    case 'txt':
                                                    case 'md':
                                                    case 'odt':
                                                    case 'word':
                                                        icon = <FileText className="w-5 h-5" />;
                                                        break;
                                                    case 'ods':
                                                    case 'xlsx':
                                                    case 'xls':
                                                        icon = <Sheet className="w-5 h-5" />;
                                                        break;
                                                    case 'xml':
                                                        icon = <FileCode2 className="w-5 h-5" />;
                                                        break;
                                                }

                                                return (
                                                    <div key={documento.id} className="flex items-center gap-2">
                                                        <Checkbox
                                                            checked={documento.checked ? true : false}
                                                            onCheckedChange={(checked: boolean) => {
                                                                documento.checked = checked;

                                                                if (checked === false) {
                                                                    tipo.checked = false;
                                                                }

                                                                setRefresh(!refresh);
                                                            }}
                                                        />

                                                        {icon}

                                                        <p>
                                                            {documento.nome}.{extention}
                                                        </p>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

                {loading ? (
                    <Button
                        disabled
                        onClick={() => {
                            DownloadDocumentos();
                        }}
                        className="bg-system_aqua_700 hover:bg-system_aqua_800"
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
                            <p>Download documentos</p>
                        </div>
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            DownloadDocumentos();
                        }}
                        className="bg-system_aqua_700 hover:bg-system_aqua_800"
                    >
                        Download documentos
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default CleckListDocs;
