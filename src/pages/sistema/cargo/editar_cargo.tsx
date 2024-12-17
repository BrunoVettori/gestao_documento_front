import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { EditIconButton } from '@/components/buttons/Buttons';
import { ErrorFormater } from '@/logic/error_formater';
import { Flip, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

import 'react-datepicker/dist/react-datepicker.css';

import LoadingButton from '@/components/self/loading_button';
import { Switch } from '@/components/ui/switch';

// eslint-disable-next-line
function EditarCargo({ cargo, refetch }: { cargo: any; refetch: () => void }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [ativo, setAtivo] = useState(cargo.ativo === 1 ? true : false);

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: cargo });

    function ResetForm() {
        setLoading(false);
        reset(cargo);
    }

    useEffect(() => {
        ResetForm();
    }, [open]);

    // eslint-disable-next-line
    async function SubmitForm(data: any) {
        setLoading(true);

        data.ativo = ativo;

        const request = new Request(import.meta.env.VITE_BASE_URL + '/cargo', {
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
                <EditIconButton />
            </DialogTrigger>
            <DialogContent className="w-[900px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Cadastrar Cargo</DialogTitle>
                </DialogHeader>

                <form id="cargo_form" onSubmit={handleSubmit(SubmitForm)} className="mb-5 mt-3 flex gap-5">
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

                    <div>
                        <p>Ativo</p>
                        <Switch
                            className="data-[state=checked]:bg-system_aqua_700 mt-4"
                            checked={ativo}
                            onCheckedChange={setAtivo}
                        />
                    </div>
                </form>

                <LoadingButton loading={loading ? 'true' : 'false'} form="cargo_form">
                    Editar
                </LoadingButton>
            </DialogContent>
        </Dialog>
    );
}

export default EditarCargo;
