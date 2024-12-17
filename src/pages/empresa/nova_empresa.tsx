import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { ErrorFormater } from '@/logic/error_formater';
import { Flip, toast } from 'react-toastify';
import { NewButton } from '@/components/buttons/Buttons';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import placeholder from '@/assets/placeholder_empresa.png';

import 'react-datepicker/dist/react-datepicker.css';

import LoadingButton from '@/components/self/loading_button';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';

function NovaEmpresa({ refetch }: { refetch: () => void }) {
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [open, setOpen] = useState(false);

    // eslint-disable-next-line
    const [image, setImage] = useState<any>();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm();

    function ResetForm() {
        setLoading(false);
        reset();
    }

    useEffect(() => {
        ResetForm();
    }, [open]);

    // eslint-disable-next-line
    async function SubmitForm(data: any) {
        setLoading(true);

        const formData = new FormData();

        for (const key in data) {
            if (key === 'arquivo') {
                formData.append(key, data[key][0]);
            } else {
                formData.append(key, data[key]);
            }
        }

        const request = new Request(import.meta.env.VITE_BASE_URL + '/empresa', {
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
            <DialogContent className="h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Cadastrar Empresa</DialogTitle>
                </DialogHeader>

                <form id="empresa_form" onSubmit={handleSubmit(SubmitForm)} className="flex mb-5 mt-3 gap-5">
                    <div className="flex flex-col gap-2">
                        <div>
                            <div className="h-[250px] w-[300px] rounded-lg overflow-clip border-[1px] border-system_gray_300">
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
                                        setImage(URL.createObjectURL(file.target.files[0]));
                                    }}
                                    id="arquivo"
                                    type="file"
                                    className="hidden"
                                />

                                <Label htmlFor="arquivo" className="w-full">
                                    <div className="flex items-center justify-center bg-system_gray_600 hover:bg-system_gray_700 p-2 text-white rounded-md w-[300px]">
                                        <Camera className="mr-2" />
                                        <p>Foto de perfil</p>
                                    </div>
                                </Label>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="w-full">
                            <p>Nome</p>
                            <Input
                                maxLength={191}
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

                        <div className="flex gap-5">
                            <div className="mt-5 w-full">
                                <p>CNPJ</p>
                                <Input
                                    maxLength={191}
                                    placeholder="CNPJ"
                                    className={ErrorFormater('mt-2', errors.cnpj)}
                                    {...register('cnpj', {
                                        required: {
                                            value: true,
                                            message: 'Campo obrigatório',
                                        },
                                    })}
                                />

                                {errors.cnpj && <p className="ml-1 text-system_red_600">{errors.cnpj.message?.toString()}</p>}
                            </div>

                            <div className="mt-5 w-full">
                                <p>E-Mail</p>
                                <Input
                                    maxLength={191}
                                    placeholder="E-Mail"
                                    className={ErrorFormater('mt-2', errors.email)}
                                    {...register('email')}
                                />

                                {errors.email && <p className="ml-1 text-system_red_600">{errors.email.message?.toString()}</p>}
                            </div>
                        </div>

                        <div className="mt-5 w-full">
                            <p>Endereço</p>
                            <Input
                                maxLength={191}
                                placeholder="Endereço"
                                className={ErrorFormater('mt-2', errors.endereco)}
                                {...register('endereco')}
                            />

                            {errors.endereco && <p className="ml-1 text-system_red_600">{errors.endereco.message?.toString()}</p>}
                        </div>
                    </div>
                </form>

                <LoadingButton loading={loading ? 'true' : 'false'} form="empresa_form">
                    Cadastrar
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}

export default NovaEmpresa;
