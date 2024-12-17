import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { ViewIconButton } from '@/components/buttons/Buttons';
import { ErrorFormater } from '@/logic/error_formater';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import 'react-datepicker/dist/react-datepicker.css';

import ComboboxTipoDocumento from '@/components/self/combobox/tipo_documento';
import FileSaver from 'file-saver';

// eslint-disable-next-line
function Documento({ documento, id_folder }: { documento: any; id_folder: any }) {
    const [open, setOpen] = useState(false);
    const [tipo, setTipo] = useState(documento.tipo_documento_id);
    const [loading, setLoading] = useState(false);

    const {
        register,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: documento });

    useEffect(() => {
        reset(documento);
    }, [open]);

    async function FetchDocument() {
        const request = new Request(
            import.meta.env.VITE_BASE_URL +
                `/download_documento?id_folder=${id_folder}&id=${documento.id}&nome_arquivo=${documento.nome_arquivo}`,
            {
                method: 'GET',
                credentials: 'include',
            }
        );

        const res = await fetch(request);

        const blob = await res.blob();

        FileSaver.saveAs(blob, documento.nome_arquivo);

        setLoading(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(local_open: boolean) => {
                setOpen(local_open);
            }}
        >
            <DialogTrigger asChild>
                <ViewIconButton />
            </DialogTrigger>
            <DialogContent className="w-[900px] h-[450px] max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Documento Nº {documento.numero}</DialogTitle>
                </DialogHeader>
                <form id="documento_form">
                    <div className="flex gap-5 items-start">
                        <div className="mt-5 w-full">
                            <p>Nome</p>
                            <Input
                                readOnly
                                placeholder="Nome"
                                className={ErrorFormater('mt-2', errors.nome)}
                                {...register('nome', {
                                    required: {
                                        value: true,
                                        message: 'Campo obrigatório',
                                    },
                                })}
                            />
                        </div>

                        <div className="mt-5 w-full">
                            <p>Tipo de Documento</p>
                            <div className="mt-2">
                                <ComboboxTipoDocumento setTipo={setTipo} default_value={tipo} />
                            </div>
                        </div>

                        <div className="mt-5 w-[400px]">
                            <p>Validade</p>
                            <Input
                                readOnly
                                placeholder="Validade"
                                className={ErrorFormater('mt-2', errors.validade)}
                                {...register('validade', {
                                    required: {
                                        value: true,
                                        message: 'Campo obrigatório',
                                    },
                                })}
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <p>Descrição</p>
                        <Textarea
                            readOnly
                            placeholder="Descrição"
                            className={ErrorFormater(
                                'mt-3 h-[100px] border-[1px] border-system_gray_500 focus-visible:border-system_gray_500 focus-visible:ring-transparent',
                                errors.nome
                            )}
                            {...register('descricao')}
                        />
                    </div>
                </form>

                {loading ? (
                    <Button
                        disabled
                        className="h-[60px] p-5 bg-system_gray_700 hover:bg-system_gray_800"
                        onClick={() => {
                            FetchDocument();
                        }}
                    >
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

                        <p>Abrindo Documento</p>
                    </Button>
                ) : (
                    <Button
                        className="h-[60px] p-5 bg-system_gray_700 hover:bg-system_gray_800"
                        onClick={() => {
                            setLoading(true);
                            FetchDocument();
                        }}
                    >
                        Abrir Documento
                    </Button>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default Documento;
