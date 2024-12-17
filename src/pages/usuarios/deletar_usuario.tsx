import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DeleteIconButton } from '@/components/buttons/Buttons';
import { Flip, toast } from 'react-toastify';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line
function DeletarUsuario({ usuario, refetch }: { usuario: any; refetch: () => void }) {
    const [open, setOpen] = useState(false);

    async function DeleteUser() {
        const request = new Request(import.meta.env.VITE_BASE_URL + '/usuario', {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario),
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
        } else {
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
                <DeleteIconButton />
            </DialogTrigger>
            <DialogContent className="w-[900px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                <p className="text-2xl mt-5 mb-10 text-center">
                    Deseja mesmo deletar o usuário{' '}
                    <span className="text-system_red_600 font-nunito_semibold">{usuario.nome}</span> ? Essa ação é permanente
                </p>

                <div className="flex gap-5 items-center">
                    <Button
                        className="w-full bg-system_gray_700 hover:bg-system_gray_800 text-white"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Fechar
                    </Button>
                    <Button
                        className="w-full bg-system_red_600 hover:bg-system_red_700 text-white"
                        onClick={() => {
                            DeleteUser();
                        }}
                    >
                        Deletar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DeletarUsuario;
