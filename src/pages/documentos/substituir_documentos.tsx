import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { ReplaceIconButton } from '@/components/buttons/Buttons';
import { Flip, toast } from 'react-toastify';
import { RotateCw } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ptBR } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

import LoadingButton from '@/components/self/loading_button';
import FormatDate from '@/logic/format_date';
import DatePicker from 'react-datepicker';
import FileSaver from 'file-saver';
import moment from 'moment';

// eslint-disable-next-line
function SubstituirDocumento({
    documento,
    cpf,
    empresa_id,
    refetch,
}: {
    // eslint-disable-next-line
    documento: any;
    // eslint-disable-next-line
    cpf: any;
    // eslint-disable-next-line
    empresa_id: any;
    refetch: () => void;
}) {
    // eslint-disable-next-line
    const [validate, setValidate] = useState<any>(FormatDate(documento.validade));
    const [loading_download, setLoadingDownload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        getValues,
        register,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: documento });

    function ResetForm() {
        setLoading(false);
        setLoadingDownload(false);
        reset(documento);
    }

    useEffect(() => {
        ResetForm();
    }, [open]);

    // eslint-disable-next-line
    async function SubmitForm() {
        if (!validate) {
            toast.warn('Selecione uam validade', {
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

        documento.validade = validate.toString();

        const formData = new FormData();

        for (const key in documento) {
            if (documento[key] !== null && documento[key] !== undefined) {
                formData.append(key, documento[key]);
            }
        }

        formData.append('arquivo', getValues('arquivo')[0]);

        setLoading(true);

        const request = new Request(import.meta.env.VITE_BASE_URL + '/substituir_documento', {
            method: 'PUT',
            credentials: 'include',
            body: formData,
        });

        const response = await fetch(request);

        if (response.status >= 200 && response.status < 400) {
            toast.success(await response.text(), {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
                transition: Flip,
            });

            setOpen(false);
            refetch();
            ResetForm();
        } else {
            setLoadingDownload(false);
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

    async function FetchDocument() {
        let id_folder = '';

        if (cpf) {
            id_folder = cpf;
        }

        if (empresa_id) {
            id_folder = empresa_id;
        }

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
        setLoadingDownload(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(local_open: boolean) => {
                setOpen(local_open);
            }}
        >
            <DialogTrigger asChild>
                <ReplaceIconButton />
            </DialogTrigger>
            <DialogContent className="w-[900px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex gap-2 items-center">
                            <RotateCw />
                            <p>Substituir Documento</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <hr />

                <div className="flex justify-between gap-5">
                    <div className=" flex flex-col gap-5 w-full">
                        <div>
                            <p className="text-system_red_600">Validade Atual</p>
                            <Input className="focus-visible:ring-0 mt-2" readOnly value={documento.validade}></Input>
                        </div>

                        {loading_download ? (
                            <div className="p-6 pl-10 pr-10 bg-system_gray_100 rounded-lg hover:bg-system_red_200 w-full border-[1px] border-system_red_400">
                                <div className="flex gap-5">
                                    <p>{documento.nome_arquivo}</p>

                                    <svg
                                        className="animate-spin w-8 stroke-system_red_600 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="p-6 pl-10 pr-10 bg-system_gray_100 rounded-lg hover:bg-system_red_200 w-full border-[1px] border-system_red_400"
                                onClick={() => {
                                    setLoadingDownload(true);
                                    FetchDocument();
                                }}
                            >
                                <p>{documento.nome_arquivo}</p>
                            </div>
                        )}
                    </div>

                    <form className="w-full" id="documento_form" onSubmit={handleSubmit(SubmitForm)}>
                        <p className="text-system_green_600">Nova Validade</p>

                        <DatePicker
                            className="mt-2 w-full border-[1px] rounded-md h-[40px] border-system_gray_200 p-3"
                            selected={validate}
                            // eslint-disable-next-line
                            onChange={(date: any) => setValidate(FormatDate(moment(date).format('DD/MM/YYYY')))}
                            locale={ptBR}
                            dateFormat="dd/MM/yyyy"
                        />

                        <div className="flex gap-5 mt-5 w-full">
                            <input
                                {...register('arquivo', {
                                    required: {
                                        value: true,
                                        message: 'Campo obrigatório',
                                    },
                                })}
                                onChangeCapture={() => {
                                    setReload(!reload);
                                }}
                                id="arquivo"
                                type="file"
                                className="hidden"
                            />

                            <Label
                                htmlFor="arquivo"
                                className="p-7 mt-[1px] pl-10 pr-10 bg-system_gray_100 rounded-lg hover:bg-system_green_200 w-full border-[1px] border-system_green_400"
                            >
                                {!getValues('arquivo') || getValues('arquivo').length === 0 ? (
                                    <p>Selecione um arquivo</p>
                                ) : (
                                    <p className="text-system_green_600 font-poppins_semibold">{getValues('arquivo')[0].name}</p>
                                )}

                                {errors['arquivo'] && (
                                    <p className="ml-1 mt-2 text-system_red_600">{errors['arquivo']!.message?.toString()}</p>
                                )}
                            </Label>
                        </div>
                    </form>
                </div>

                <LoadingButton
                    loading={loading ? 'true' : 'false'}
                    form="documento_form"
                    className="bg-system_aqua_600 hover:bg-system_aqua_700 p-5 mt-3 text-white hover:text-white"
                >
                    Concluir substituição
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}

export default SubstituirDocumento;
