import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useHookFormMask } from 'use-mask-input';
import { ErrorFormater } from '@/logic/error_formater';
import { Flip, toast } from 'react-toastify';
import { NewButton } from '@/components/buttons/Buttons';
import { useForm } from 'react-hook-form';
import { Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ptBR } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

import ComboboxTiposContrato from '@/components/self/combobox/combobox_tipo_contrato';
import ComboboxEstadosCivis from '@/components/self/combobox/combobox_estado_civil';
import ComboboxStatusMult from '@/components/self/combobox/combobox_status';
import ComboboxCargos from '@/components/self/combobox/combobox_cargos';
import LoadingButton from '@/components/self/loading_button';
import placeholder from '@/assets/placeholder.png';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ComboboxEmpresas from '@/components/self/combobox/combobox_empresas';

// eslint-disable-next-line
function NovoFuncionario({ funcionario, refetch }: { funcionario?: any; refetch: () => void }) {
    // eslint-disable-next-line
    const [admissao, setAdmissao] = useState<any>(moment(new Date()).format('YYYY/MM/DD'));
    // eslint-disable-next-line
    const [nascimento, setNascimento] = useState<any>(moment(new Date()).format('YYYY/MM/DD'));

    // eslint-disable-next-line
    const [image, setImage] = useState<any>();
    // eslint-disable-next-line
    const [empresa, setEmpresa] = useState<any>();
    // eslint-disable-next-line
    const [status, setStatus] = useState<any>();
    // eslint-disable-next-line
    const [cargo, setCargo] = useState<any>();
    // eslint-disable-next-line
    const [estado_civil, setEstadoCivil] = useState<any>();
    // eslint-disable-next-line
    const [tipo, setTipo] = useState<any>();

    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        setValue,
        register,
        reset,
        formState: { errors },
    } = useForm();

    function ResetForm() {
        setImage(undefined);
        setLoading(false);
        setTipo('');
        reset();
    }

    const registerWithMask = useHookFormMask(register);

    useEffect(() => {
        ResetForm();
    }, [open]);

    function SetWarnToast(message: string) {
        toast.warn(message, {
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

    // eslint-disable-next-line
    function FormatDatePicker(date: any) {
        try {
            const fomrated_date = moment(date).format('YYYY/MM/DD');

            if (fomrated_date === 'Invalid date') {
                return moment(new Date()).format('YYYY/MM/DD');
            }

            return fomrated_date;
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(error.message);
            return moment(new Date()).format('YYYY/MM/DD');
        }
    }

    // eslint-disable-next-line
    async function SubmitForm(data: any) {
        const formData = new FormData();

        let flag = false;

        if (!admissao || admissao === '') {
            SetWarnToast('Selecione uma validade');
            flag = true;
        }

        if (!tipo || tipo === '') {
            SetWarnToast('Selecione o tipo de contrato');
            flag = true;
        }

        if (!estado_civil || estado_civil === '') {
            SetWarnToast('Selecione o estado civil');
            flag = true;
        }

        if (!empresa || empresa === '') {
            SetWarnToast('Selecione a empresa');
            flag = true;
        }
        if (!status || status === '') {
            SetWarnToast('Selecione o status do funcionário');
            flag = true;
        }

        if (!cargo || cargo === '') {
            SetWarnToast('Selecione o cargo do funcionário');
            flag = true;
        }

        if (flag) {
            return;
        }

        const arquivo = data.arquivo;

        delete data.arquivo;

        for (const key in data) {
            if (data[key] !== undefined && data[key] !== '') {
                formData.append(key, data[key]);
            }
        }

        if (arquivo.length > 0) formData.append('arquivo', arquivo[0]);

        formData.append('data_nascimento', nascimento.toString());
        formData.append('data_admissao', admissao.toString());
        formData.append('tipo_contrato', tipo);
        formData.append('estado_civil', estado_civil);
        formData.append('empresa_id', empresa && empresa.id);
        formData.append('status_id', status);
        formData.append('cargo_id', cargo);

        setLoading(true);

        const request = new Request(import.meta.env.VITE_BASE_URL + '/funcionario', {
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
            <DialogContent className="w-[1500px] min-h-[550px] max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Cadastrar Funcionario</DialogTitle>
                </DialogHeader>

                <form id="funcionario_form" onSubmit={handleSubmit(SubmitForm)}>
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-2">
                            <div className="h-[250px] w-[225px] rounded-lg overflow-clip border-[1px] border-system_gray_300">
                                {image ? (
                                    <img className="rounded-t-lg object-cover w-[100%] h-[100%]" src={image} alt="Placeholder" />
                                ) : (
                                    <img
                                        className="rounded-t-lg object-cover w-[100%] h-[100%]"
                                        src={placeholder}
                                        alt="Placeholder"
                                    />
                                )}
                            </div>

                            <div className="flex gap-5">
                                <input
                                    {...register('arquivo')}
                                    // eslint-disable-next-line
                                    onChangeCapture={(file: any) => {
                                        setReload(!reload);
                                        const name = file.target.value.replace('C:\\fakepath\\', '');
                                        setValue('nome', name.split('.').shift());
                                        setImage(URL.createObjectURL(file.target.files[0]));
                                    }}
                                    id="arquivo"
                                    type="file"
                                    className="hidden"
                                />

                                <Label htmlFor="arquivo" className="w-full">
                                    <div className="flex items-center justify-center bg-system_gray_600 hover:bg-system_gray_700 p-2 text-white rounded-md w-[225px]">
                                        <Camera className="mr-2" />
                                        <p>Foto de perfil</p>
                                    </div>
                                </Label>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-5">
                            <div>
                                <p>CPF</p>
                                <Input
                                    placeholder="CPF"
                                    maxLength={15}
                                    className={ErrorFormater('mt-2', errors.cpf)}
                                    {...registerWithMask('cpf', '999.999.999-99', {
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório',
                                        },
                                    })}
                                    type="text"
                                />

                                {errors.cpf && <p className="ml-1 text-system_red_600">{errors.cpf.message?.toString()}</p>}
                            </div>
                            <div>
                                <p>Matrícula</p>
                                <Input
                                    placeholder="Matrícula"
                                    maxLength={191}
                                    className={ErrorFormater('mt-2', errors.matricula)}
                                    {...register('matricula', {
                                        pattern: {
                                            value: new RegExp('^[0-9]*$'),
                                            message: 'Somente números',
                                        },
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório',
                                        },
                                    })}
                                />

                                {errors.matricula && (
                                    <p className="ml-1 text-system_red_600">{errors.matricula.message?.toString()}</p>
                                )}
                            </div>
                            <div>
                                <p>Nome</p>
                                <Input
                                    placeholder="Nome"
                                    maxLength={191}
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
                            <div>
                                <p>E-Mail</p>
                                <Input
                                    placeholder="E-Mail"
                                    maxLength={191}
                                    className={ErrorFormater('mt-2', errors.email)}
                                    {...register('email')}
                                />

                                {errors.email && <p className="ml-1 text-system_red_600">{errors.email.message?.toString()}</p>}
                            </div>
                            <div>
                                <p>Celular</p>

                                <Input
                                    placeholder="Celular"
                                    maxLength={191}
                                    className={ErrorFormater('mt-2', errors.celular)}
                                    {...registerWithMask('celular', '(99) 99999-9999', {
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório',
                                        },
                                    })}
                                    type="text"
                                />

                                {errors.celular && (
                                    <p className="ml-1 text-system_red_600">{errors.celular.message?.toString()}</p>
                                )}
                            </div>
                            <div className="w-[208px] overflow-clip">
                                <p className="mb-2">Estado Civil</p>
                                <ComboboxEstadosCivis setEstadoCivil={setEstadoCivil} />
                            </div>
                            <div className="w-fit">
                                <p>Data Nascimento</p>
                                <DatePicker
                                    className="mt-2 w-[208px] border-[1px] rounded-md h-[40px] border-system_gray_200 p-3"
                                    selected={nascimento}
                                    // eslint-disable-next-line
                                    onChange={(date: any) => setNascimento(FormatDatePicker(date))}
                                    locale={ptBR}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="w-fit">
                                <p>Data Admissão</p>
                                <DatePicker
                                    className="mt-2 w-[208px] border-[1px] rounded-md h-[40px] border-system_gray_200 p-3"
                                    selected={admissao}
                                    // eslint-disable-next-line
                                    onChange={(date: any) => setAdmissao(FormatDatePicker(date))}
                                    locale={ptBR}
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="w-[208px] overflow-clip">
                                <p className="mb-2">Tipo Contrato</p>
                                <ComboboxTiposContrato setTipoContrato={setTipo} />
                            </div>
                            <div>
                                <p>Endereço</p>
                                <Input
                                    placeholder="Endereço"
                                    maxLength={191}
                                    className={ErrorFormater('mt-2', errors.endereco)}
                                    {...register('endereco')}
                                />

                                {errors.endereco && (
                                    <p className="ml-1 text-system_red_600">{errors.endereco.message?.toString()}</p>
                                )}
                            </div>
                            <div className="w-[208px] overflow-clip">
                                <p>Status</p>
                                <div className="mt-2">
                                    <ComboboxStatusMult setStatus={setStatus} default_value={status} />
                                </div>
                            </div>
                            <div className="w-[208px] overflow-clip">
                                <p>Cargo</p>
                                <div className="mt-2">
                                    <ComboboxCargos setCargo={setCargo} default_value={cargo} />
                                </div>
                            </div>

                            <div className="w-[208px] overflow-clip">
                                <p>Empresa</p>
                                <div className="mt-2">
                                    <ComboboxEmpresas setEmpresa={setEmpresa} default_value={empresa && empresa.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <LoadingButton loading={loading ? 'true' : 'false'} form="funcionario_form">
                    Cadastrar
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}

export default NovoFuncionario;
