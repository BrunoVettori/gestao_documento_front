import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Flip, toast } from 'react-toastify';
import { FolderOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ptBR } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

import ComboboxTipoDocumento from '@/components/self/combobox/tipo_documento';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// eslint-disable-next-line
function NovosMultiplosDocumentos({ funcionario, refetch }: { funcionario: any; refetch: () => void }) {
    const [validate, setValidate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [open, setOpen] = useState(false);

    // eslint-disable-next-line
    const [arquivos, setArquivos] = useState<Array<any>>([]);

    const {
        getValues,
        register,
        reset,
        formState: { errors },
    } = useForm();

    function ResetForm() {
        setArquivos([]);
        setValidate(false);
        setLoading(false);
        reset({ arquivos: undefined });
    }

    useEffect(() => {
        ResetForm();
    }, [open]);

    useEffect(() => {
        if (getValues('arquivo') && getValues('arquivo').length > 0) {
            const local_arquivos = [];

            for (let index = 0; index < getValues('arquivo').length; index++) {
                local_arquivos.push({
                    file: getValues('arquivo')[index],
                    nome: getValues('arquivo')[index].name.split('.').shift(),
                    validade: moment(new Date()).add(1, 'y'),
                });
            }

            setArquivos(local_arquivos);
        }
    }, [getValues('arquivo')]);

    async function SubmitForm() {
        const formData = new FormData();

        if (arquivos.length === 0) {
            toast.warn('Selecione um arquivo', {
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

        formData.append('funcionario_cpf', funcionario.cpf);

        for (let index = 0; index < arquivos.length; index++) {
            const arquivo = arquivos[index];

            if (!arquivo.tipo_documento_id || arquivo.tipo_documento_id == '') {
                toast.warn('Todos os tipo de documentos devem ser selecionados', {
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

            const id = uuidv4();

            arquivo.funcionario_cpf = funcionario.cpf;
            formData.append(id, arquivo.file);
            arquivo.id = id;
        }

        formData.append('arquivos', JSON.stringify(arquivos));

        setLoading(true);

        const request = new Request(import.meta.env.VITE_BASE_URL + '/documentos', {
            method: 'POST',
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
            ResetForm();
            refetch();
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

    // eslint-disable-next-line
    function NomeFormField({ arquivo }: { arquivo: any }) {
        const [error_field, setErrorField] = useState(arquivo.nome === undefined || arquivo.nome === '' ? true : false);

        return (
            <div className="w-full">
                <p className="mb-2">Nome</p>

                <Input
                    placeholder="Nome"
                    defaultValue={arquivo.nome}
                    // eslint-disable-next-line
                    onChange={(field: any) => {
                        arquivo.nome = field.target.value;

                        if (arquivo.nome === undefined || arquivo.nome === '') {
                            setErrorField(true);
                        } else {
                            setErrorField(false);
                        }
                    }}
                />

                {error_field === true && validate && <p className="ml-1 mt-1 text-system_red_600">Campo obrigatório</p>}
            </div>
        );
    }

    // eslint-disable-next-line
    function TipoFormField({ arquivo }: { arquivo: any }) {
        const [error_field, setErrorField] = useState(
            arquivo.tipo_documento_id === undefined || arquivo.tipo_documento_id === '' ? true : false
        );

        return (
            <div className="w-full">
                <p className="mb-2">Tipo Documento</p>

                <div>
                    <ComboboxTipoDocumento
                        setTipo={(tipo: string) => {
                            arquivo.tipo_documento_id = tipo;

                            if (tipo === undefined || tipo === '') {
                                setErrorField(true);
                            } else {
                                setErrorField(false);
                            }
                        }}
                        default_value={arquivo.tipo_documento_id ? arquivo.tipo_documento_id : undefined}
                        empresarial={false}
                        ativo={true}
                    />
                </div>

                {error_field === true && validate && <p className="ml-1 mt-1 text-system_red_600">Campo obrigatório</p>}
            </div>
        );
    }

    // eslint-disable-next-line
    function ValidadeFormField({ arquivo }: { arquivo: any }) {
        const [validade, setValidade] = useState(
            arquivo.validate === undefined || arquivo.validate === ''
                ? moment(new Date()).add(1, 'y').format('YYYY/MM/DD')
                : arquivo.validate
        );

        return (
            <div className="w-full">
                <p className="mb-2">Validade</p>
                <DatePicker
                    className="w-full border-[1px] rounded-md h-[40px] border-system_gray_200 p-3"
                    selected={validade ? validade : moment(new Date()).add(1, 'y').format('YYYY/MM/DD')}
                    // eslint-disable-next-line
                    onChange={(date: any) => setValidade(moment(date).format('YYYY/MM/DD'))}
                    locale={ptBR}
                    dateFormat="dd/MM/yyyy"
                />
            </div>
        );
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(local_open: boolean) => {
                setOpen(local_open);
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className="hover:bg-system_yellow_500">
                    <FolderOpen className="mr-2" /> <p>Múltiplos</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Cadastrar Documento</DialogTitle>
                </DialogHeader>

                <div>
                    <div>
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
                            multiple
                            type="file"
                            className="hidden"
                        />

                        <Label htmlFor="arquivo" className="w-full">
                            {(arquivos && arquivos.length === 0) || !arquivos ? (
                                <div className="p-6 pl-10 pr-10 bg-system_gray_300 rounded-lg">
                                    <p>Selecione um arquivo</p>
                                </div>
                            ) : (
                                <div className="p-6 pl-10 pr-10 bg-system_gray_700 rounded-lg">
                                    <p className="text-white">{arquivos.length} Arquivos selecionados</p>
                                </div>
                            )}

                            {errors['arquivo'] && <p className="text-system_red_600">{errors['arquivo']!.message?.toString()}</p>}
                        </Label>
                    </div>

                    {arquivos && arquivos.length > 0 && <div className="w-full h-[1px] bg-system_gray_400 mt-5 mb-5" />}

                    <div className="gap-5 grid grid-cols-[_1fr_2fr_1fr_2fr]">
                        {arquivos &&
                            // eslint-disable-next-line
                            arquivos.map((arquivo: any) => {
                                console.log(arquivo.erro_nome);

                                return (
                                    <>
                                        <div className="mt-auto mb-auto bg-system_gray_700 pt-5 pb-5 pl-3 pr-3 rounded-lg">
                                            <p className="text-lg text-white break-words">{arquivo.file.name}</p>
                                        </div>

                                        <NomeFormField arquivo={arquivo} />

                                        <ValidadeFormField arquivo={arquivo} />

                                        <TipoFormField arquivo={arquivo} />
                                    </>
                                );
                            })}
                    </div>

                    {loading ? (
                        <Button
                            onClick={() => {
                                setValidate(true);
                                SubmitForm();
                            }}
                            disabled
                            variant="ghost"
                            className="w-full mt-5 bg-system_aqua_600 hover:bg-system_aqua_700 p-6 text-white hover:text-white"
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
                            Cadastrar
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                setValidate(true);
                                SubmitForm();
                            }}
                            variant="ghost"
                            className="w-full mt-5 bg-system_aqua_600 hover:bg-system_aqua_700 p-6 text-white hover:text-white"
                        >
                            Cadastrar
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default NovosMultiplosDocumentos;
