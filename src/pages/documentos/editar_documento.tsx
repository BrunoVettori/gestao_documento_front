import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { EditIconButton } from '@/components/buttons/Buttons';
import { ErrorFormater } from '@/logic/error_formater';
import { Flip, toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ptBR } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

import ComboboxTipoDocumento from '@/components/self/combobox/tipo_documento';
import LoadingButton from '@/components/self/loading_button';
import FormatDate from '@/logic/format_date';
import DatePicker from 'react-datepicker';
import moment from 'moment';

function EditarDocumento({
    documento,
    cpf,
    empresa_id,
    refetch,
}: {
    // eslint-disable-next-line
    documento: any;
    // eslint-disable-next-line
    cpf?: any;
    // eslint-disable-next-line
    empresa_id?: any;
    refetch: () => void;
}) {
    // eslint-disable-next-line
    const [validate, setValidate] = useState<any>(FormatDate(documento.validade));
    const [loading, setLoading] = useState(false);
    const [ativo, setAtivo] = useState(documento.ativo === 1 ? true : false);
    const [open, setOpen] = useState(false);
    const [tipo, setTipo] = useState(documento.tipo_documento_id);

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: documento });

    useEffect(() => {
        reset(documento);
    }, [open]);

    // eslint-disable-next-line
    async function SubmitForm(data: any) {
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

        data.ativo = ativo;
        data.tipo_documento_id = tipo;

        if (empresa_id) {
            data.empresa_id = empresa_id;
        }

        if (cpf) {
            data.funcionario_cpf = cpf;
        }

        data.validade = validate.toString();

        setLoading(true);

        const request = new Request(import.meta.env.VITE_BASE_URL + '/documento', {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
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
            setLoading(false);
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

    return (
        <Dialog
            open={open}
            onOpenChange={(local_open: boolean) => {
                setOpen(local_open);
            }}
        >
            <DialogTrigger asChild>
                <EditIconButton />
            </DialogTrigger>
            <DialogContent className="w-[900px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Editar Documento</DialogTitle>
                </DialogHeader>
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
                                onChange={(date: any) => setValidate(FormatDate(moment(date).format('DD/MM/YYYY')))}
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
                                    empresarial={empresa_id ? true : false}
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <p>Ativo</p>
                            <Switch
                                className="data-[state=checked]:bg-system_aqua_700 mt-4"
                                checked={ativo}
                                onCheckedChange={setAtivo}
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <p>Descrição</p>
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

                <LoadingButton loading={loading ? 'true' : 'false'} form="documento_form">
                    Atualizar
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}

export default EditarDocumento;
