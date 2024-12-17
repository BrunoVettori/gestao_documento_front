import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { ErrorFormater } from '@/logic/error_formater';
import { Flip, toast } from 'react-toastify';
import { NewButton } from '@/components/buttons/Buttons';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

import 'react-datepicker/dist/react-datepicker.css';

import LoadingButton from '@/components/self/loading_button';

function NovoUsuario({ refetch }: { refetch: () => void }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

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

        const request = new Request(import.meta.env.VITE_BASE_URL + '/usuario', {
            method: 'POST',
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
            <DialogContent className="w-[900px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Cadastrar Usuario</DialogTitle>
                </DialogHeader>

                <form id="usuario_form" onSubmit={handleSubmit(SubmitForm)} className="mb-5 mt-3">
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

                    <div className="mt-5 w-full">
                        <p>Senha</p>
                        <Input
                            maxLength={191}
                            placeholder="Senha"
                            type="password"
                            className={ErrorFormater('mt-2', errors.senha)}
                            {...register('senha', {
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório',
                                },
                            })}
                        />

                        {errors.senha && <p className="ml-1 text-system_red_600">{errors.senha.message?.toString()}</p>}
                    </div>
                </form>

                <LoadingButton loading={loading ? 'true' : 'false'} form="usuario_form">
                    Cadastrar
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}

export default NovoUsuario;
