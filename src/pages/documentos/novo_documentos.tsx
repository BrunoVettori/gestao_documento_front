import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { ErrorFormater } from '@/logic/error_formater';
import { Flip, toast } from 'react-toastify';
import { NewButton } from '@/components/buttons/Buttons';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ptBR } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

import ComboboxTipoDocumento from '@/components/self/combobox/tipo_documento';
import LoadingButton from '@/components/self/loading_button';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// eslint-disable-next-line
function NovoDocumento({ funcionario, empresa, refetch }: { funcionario?: any; empresa?: any; refetch: () => void }) {
    // eslint-disable-next-line
    const [validate, setValidate] = useState<any>(moment(new Date()).format('YYYY/MM/DD'));
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [open, setOpen] = useState(false);
    const [tipo, setTipo] = useState('');

    const {
        handleSubmit,
        getValues,
        setValue,
        register,
        reset,
        formState: { errors },
    } = useForm();

    function ResetForm() {
        setLoading(false);
        setTipo('');
        reset();
    }

    useEffect(() => {
        ResetForm();
    }, [open]);

    // eslint-disable-next-line
    async function SubmitForm(data: any) {
        const formData = new FormData();

        if (tipo === '') {
            toast.warn('Selecione o tipo do documento', {
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

        formData.append('tipo_documento_id', tipo);
        if (funcionario) formData.append('funcionario_cpf', funcionario.cpf);
        if (empresa) formData.append('empresa_id', empresa.id);
        formData.append('validade', validate.toString());
        formData.append('arquivo', getValues('arquivo')[0]);
        formData.append('nome', data.nome);

        if (getValues('descricao') && getValues('descricao') !== '') {
            formData.append('descricao', getValues('descricao'));
        }

        setLoading(true);

        const request = new Request(import.meta.env.VITE_BASE_URL + '/documento', {
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
            refetch();
            ResetForm();
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
            }}
        >
            <DialogTrigger asChild>
                <NewButton />
            </DialogTrigger>
            <DialogContent className="w-[900px] h-[550px] max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Cadastrar Documento</DialogTitle>
                </DialogHeader>

                <div>
                    <p>Arquivo</p>
                    <div className="flex gap-5 mt-2">
                        <input
                            {...register('arquivo', {
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório',
                                },
                            })}
                            // eslint-disable-next-line
                            onChangeCapture={(file: any) => {
                                setReload(!reload);
                                const name = file.target.value.replace('C:\\fakepath\\', '');
                                setValue('nome', name.split('.').shift());
                            }}
                            id="arquivo"
                            type="file"
                            className="hidden"
                        />

                        <Label htmlFor="arquivo" className="w-full">
                            {!getValues('arquivo') || getValues('arquivo').length === 0 ? (
                                <div className="p-6 pl-10 pr-10 bg-system_gray_300 rounded-lg">
                                    <p>Selecione um arquivo</p>
                                </div>
                            ) : (
                                <div className="p-6 pl-10 pr-10 bg-system_gray_700 rounded-lg">
                                    <p className="text-white font-poppins_semibold">{getValues('arquivo')[0].name}</p>
                                </div>
                            )}

                            {errors['arquivo'] && (
                                <p className="ml-1 mt-2 text-system_red_600">{errors['arquivo']!.message?.toString()}</p>
                            )}
                        </Label>
                    </div>

                    <form id="documento_form" onSubmit={handleSubmit(SubmitForm)}>
                        <div className="flex gap-5 items-start">
                            <div className="mt-5 w-full">
                                <p>Nome</p>
                                <Input
                                    placeholder="Nome"
                                    className={ErrorFormater('mt-2', errors.nome)}
                                    {...register('nome', {
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório',
                                        },
                                    })}
                                />

                                {errors.nome && <p className="ml-1 text-system_red_600">{errors.nome.message?.toString()}</p>}
                            </div>

                            <div className="mt-5 w-[400px]">
                                <p>Validade</p>
                                <DatePicker
                                    className="mt-2 w-full border-[1px] rounded-md h-[40px] border-system_gray_200 p-3"
                                    selected={validate}
                                    // eslint-disable-next-line
                                    onChange={(date: any) => setValidate(moment(date).format('YYYY/MM/DD'))}
                                    locale={ptBR}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>

                            <div className="mt-5 w-full">
                                <p>Tipo de Documento</p>
                                <div className="mt-2">
                                    <ComboboxTipoDocumento
                                        setTipo={setTipo}
                                        default_value={tipo}
                                        empresarial={empresa ? true : false}
                                        ativo={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <p>Descrição (opcional)</p>
                            <Textarea
                                placeholder="Descrição"
                                className={ErrorFormater(
                                    'mt-3 h-[100px] border-[1px] border-system_gray_500 focus-visible:border-system_gray_500 focus-visible:ring-transparent',
                                    errors.nome
                                )}
                                {...register('descricao')}
                            />

                            {errors.nome && <p className="ml-1 text-system_red_600">{errors.nome.message?.toString()}</p>}
                        </div>
                    </form>
                </div>

                <LoadingButton loading={loading ? 'true' : 'false'} form="documento_form">
                    Cadastrar
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}

export default NovoDocumento;
