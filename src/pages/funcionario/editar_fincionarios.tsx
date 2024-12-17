import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useHookFormMask } from 'use-mask-input';
import { ErrorFormater } from '@/logic/error_formater';
import { Flip, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ptBR } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

import ComboboxTiposContrato from '@/components/self/combobox/combobox_tipo_contrato';
import ComboboxEstadosCivis from '@/components/self/combobox/combobox_estado_civil';
import ComboboxStatusMult from '@/components/self/combobox/combobox_status';
import ComboboxEmpresas from '@/components/self/combobox/combobox_empresas';
import ComboboxCargos from '@/components/self/combobox/combobox_cargos';
import LoadingButton from '@/components/self/loading_button';
import FormatDate from '@/logic/format_date';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// eslint-disable-next-line
function EditarFuncionario({ funcionario, refetch }: { funcionario: any; refetch: () => void }) {
    // eslint-disable-next-line
    const [admissao, setAdmissao] = useState<any>(
        funcionario.data_admissao ? FormatDate(funcionario.data_admissao) : moment(new Date()).format('YYYY/MM/DD')
    );
    // eslint-disable-next-line
    const [nascimento, setNascimento] = useState<any>(
        funcionario.data_nascimento ? FormatDate(funcionario.data_nascimento) : moment(new Date()).format('YYYY/MM/DD')
    );

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
    const [ativo, setAtivo] = useState(funcionario.ativo === 1 ? true : false);

    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [open, setOpen] = useState(false);

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

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ defaultValues: funcionario });

    const registerWithMask = useHookFormMask(register);

    function ResetForm() {
        setImage(undefined);
        setLoading(false);
    }

    useEffect(() => {
        ResetForm();
    }, [open]);

    // eslint-disable-next-line
    async function SubmitForm(data: any) {
        const formData = new FormData();

        const arquivo = data.arquivo;

        delete data.arquivo;
        delete data.created_at;
        delete data.updated_at;

        if (arquivo.length > 0) formData.append('arquivo', arquivo[0]);

        if (nascimento) {
            data['data_nascimento'] = nascimento.toString();
        }

        if (admissao) {
            data['data_admissao'] = admissao.toString();
        }

        if (tipo && tipo !== '') {
            data['tipo_contrato'] = tipo;
        }

        if (estado_civil && estado_civil !== '') {
            data['estado_civil'] = estado_civil;
        }

        if (empresa && empresa !== '') {
            data['empresa_id'] = empresa && empresa.id;
        }
        if (status && status !== '') {
            data['status_id'] = status;
        }

        if (cargo && cargo !== '') {
            data['cargo_id'] = cargo;
        }

        data.ativo = ativo;

        for (const key in data) {
            if (data[key] !== undefined && data[key] !== '' && data[key] !== null) {
                formData.append(key, data[key]);
            }
        }

        setLoading(true);

        const request = new Request(import.meta.env.VITE_BASE_URL + '/funcionario', {
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
                <Button className="flex items-center justify-center w-[150px] h-[50px] rounded-xl bg-yellow-500 hover:bg-yellow-600 pl-8 pr-8 text-lg text-black">
                    Editar
                </Button>
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
                                        src={
                                            import.meta.env.VITE_BASE_URL +
                                            `${funcionario.foto_perfil ? '/' + funcionario.foto_perfil : '/placeholder.png'}`
                                        }
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
                                    disabled
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
                                />

                                {errors.celular && (
                                    <p className="ml-1 text-system_red_600">{errors.celular.message?.toString()}</p>
                                )}
                            </div>

                            <div>
                                <p>Ativo</p>
                                <Switch
                                    className="data-[state=checked]:bg-system_aqua_700 mt-4"
                                    checked={ativo}
                                    onCheckedChange={setAtivo}
                                />
                            </div>

                            <div className="w-[208px] overflow-clip">
                                <p className="mb-2">Estado Civil</p>
                                <ComboboxEstadosCivis setEstadoCivil={setEstadoCivil} default_value={funcionario.estado_civil} />
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
                                <ComboboxTiposContrato setTipoContrato={setTipo} default_value={funcionario.tipo_contrato} />
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
                                    <ComboboxStatusMult setStatus={setStatus} default_value={funcionario.status_id} />
                                </div>
                            </div>
                            <div className="w-[208px] overflow-clip">
                                <p>Cargo</p>
                                <div className="mt-2">
                                    <ComboboxCargos setCargo={setCargo} default_value={funcionario.cargo_id} />
                                </div>
                            </div>

                            <div className="w-[208px] overflow-clip">
                                <p>Empresa</p>
                                <div className="mt-2">
                                    <ComboboxEmpresas
                                        setEmpresa={setEmpresa}
                                        default_value={funcionario.empresa_id && funcionario.empresa_id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <LoadingButton loading={loading ? 'true' : 'false'} form="funcionario_form">
                    Atualizar
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}

export default EditarFuncionario;
