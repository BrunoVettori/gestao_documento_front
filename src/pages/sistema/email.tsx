import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Flip, toast } from 'react-toastify';
import { Mail, Trash } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import TableSkeleton from '@/components/skeletons/table';
import Header from '@/components/self/header';
import Smtp from './smtp/smtp';

function Email() {
    // eslint-disable-next-line
    const [aviso, setAviso] = useState<any>([]);

    // eslint-disable-next-line
    const [vencido, setVencido] = useState<any>([]);

    // eslint-disable-next-line
    const [vencido_mais_30, setVencidoMais30] = useState<any>([]);

    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const query_lista_email = useQuery({
        queryKey: [`lista_tipo_doc`],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + `/lista_email`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!query_lista_email.isPending && !query_lista_email.isError && query_lista_email.data !== undefined) {
            const local_aviso = [];
            const local_vencido = [];
            const local_vencido_mais_30 = [];

            for (let index = 0; index < query_lista_email.data.length; index++) {
                const email = query_lista_email.data[index];

                if (email.tipo_lista_email === 'aviso') {
                    local_aviso.push({ id: email.id, email: email.email });
                }

                if (email.tipo_lista_email === 'vencido') {
                    local_vencido.push({ id: email.id, email: email.email });
                }

                if (email.tipo_lista_email === 'vencido_mais_30') {
                    local_vencido_mais_30.push({ id: email.id, email: email.email });
                }
            }

            setAviso(local_aviso);
            setVencido(local_vencido);
            setVencidoMais30(local_vencido_mais_30);

            setRefresh(!refresh);
        }

        if (query_lista_email.isError) {
            toast.error('Erro ao buscar informações', {
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

        setLoading(false);
    }, [query_lista_email.data]);

    async function CreateListaEmail(email: string, tipo: string) {
        const request = new Request(import.meta.env.VITE_BASE_URL + '/lista_email', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, tipo_lista_email: tipo }),
        });

        let response;

        try {
            response = await fetch(request);
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(error.message);

            toast.error('Servidor indisponível no momento', {
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

        if (response.status >= 400) {
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
        } else {
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
        }
    }

    async function DeleteListaEmail(id: string) {
        const request = new Request(import.meta.env.VITE_BASE_URL + '/lista_email', {
            method: 'Delete',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        let response;

        try {
            response = await fetch(request);
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(error.message);

            toast.error('Servidor indisponível no momento', {
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

        if (response.status >= 400) {
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
        } else {
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
        }
    }

    function AddEmail({ list }: { list: string }) {
        const [open, setOpen] = useState(false);

        const [email, setemail] = useState('');

        return (
            <Dialog
                open={open}
                onOpenChange={(local_open: boolean) => {
                    setOpen(local_open);
                    setemail('');
                }}
            >
                <DialogTrigger asChild>
                    <Button className="w-full mt-5 border-[1px] p-2 border-system_gray_300 rounded-lg bg-system_aqua_800 hover:bg-system_aqua_900">
                        <p className="text-white">Adicionar</p>
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[900px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
                    <DialogHeader>
                        <DialogTitle>Adicionar E-Mail</DialogTitle>
                    </DialogHeader>

                    <Input
                        value={email}
                        // eslint-disable-next-line
                        onChange={(event: any) => {
                            setemail(event.target.value);
                        }}
                    ></Input>

                    <Button
                        onClick={async () => {
                            await CreateListaEmail(email, list);

                            query_lista_email.refetch();

                            setOpen(false);
                            setRefresh(!refresh);
                        }}
                    >
                        Cadastrar
                    </Button>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <div className="h-full w-full">
            <div className="w-full h-fit p-5 bg-system_card_background rounded-xl border-[2px] border-system_border">
                <Header nome="Lista de avisos" icon={<Mail />} loading={loading}></Header>

                {loading ? (
                    <div className="mt-5 border-[1px] border-system_gray_300 rounded-xl overflow-scroll">
                        <TableSkeleton />
                    </div>
                ) : (
                    <div className="flex item justify-between p-5 rounded-lg gap-5">
                        <div className="w-full flex flex-col text-center p-5">
                            <div className="border-[1px] bg-system_yellow_500 p-5 rounded-lg text-center">
                                <p className="text-xl font-nunito_semibold">A vencer em 30 dias</p>
                            </div>

                            {
                                // eslint-disable-next-line
                                aviso.map((lista_email: any, index: number) => {
                                    return (
                                        <div key={lista_email.id} className="flex items-center gap-2">
                                            <div className="w-full mt-5 border-[1px] p-2 border-system_gray_300 rounded-lg bg-system_gray_800">
                                                <p className="text-white">{lista_email.email}</p>
                                            </div>

                                            <Button
                                                onClick={async () => {
                                                    await DeleteListaEmail(lista_email.id);
                                                    query_lista_email.refetch();
                                                }}
                                                className="mt-5 border-[1px] p-2 border-system_gray_300 rounded-lg bg-system_red_700 hover:bg-system_red_800"
                                            >
                                                <Trash className="text-white" />
                                            </Button>
                                        </div>
                                    );
                                })
                            }

                            <div className="flex items-center gap-2">
                                <AddEmail list="aviso" />
                            </div>
                        </div>

                        <div className="w-full flex flex-col text-center p-5">
                            <div className="border-[1px] bg-system_orange_500 text-white p-5 rounded-lg text-center">
                                <p className="text-xl font-nunito_semibold">Vencidos á 30 dias</p>
                            </div>

                            {
                                // eslint-disable-next-line
                                vencido.map((lista_email: any, index: number) => {
                                    return (
                                        <div key={lista_email.id} className="flex items-center gap-2">
                                            <div className="w-full mt-5 border-[1px] p-2 border-system_gray_300 rounded-lg bg-system_gray_800">
                                                <p className="text-white">{lista_email.email}</p>
                                            </div>

                                            <Button
                                                onClick={async () => {
                                                    await DeleteListaEmail(lista_email.id);
                                                    query_lista_email.refetch();
                                                }}
                                                className="mt-5 border-[1px] p-2 border-system_gray_300 rounded-lg bg-system_red_700 hover:bg-system_red_800"
                                            >
                                                <Trash className="text-white" />
                                            </Button>
                                        </div>
                                    );
                                })
                            }

                            <div className="flex items-center gap-2">
                                <AddEmail list="vencido" />
                            </div>
                        </div>

                        <div className="w-full flex flex-col text-center p-5">
                            <div className="border-[1px] bg-system_red_700 text-white p-5 rounded-lg text-center">
                                <p className="text-xl font-nunito_semibold">Vencidos a mais de 30 dias</p>
                            </div>

                            {
                                // eslint-disable-next-line
                                vencido_mais_30.map((lista_email: any, index: number) => {
                                    return (
                                        <div key={lista_email.id} className="flex items-center gap-2">
                                            <div className="w-full mt-5 border-[1px] p-2 border-system_gray_300 rounded-lg bg-system_gray_800">
                                                <p className="text-white">{lista_email.email}</p>
                                            </div>

                                            <Button
                                                onClick={async () => {
                                                    await DeleteListaEmail(lista_email.id);
                                                    query_lista_email.refetch();
                                                }}
                                                className="mt-5 border-[1px] p-2 border-system_gray_300 rounded-lg bg-system_red_700 hover:bg-system_red_800"
                                            >
                                                <Trash className="text-white" />
                                            </Button>
                                        </div>
                                    );
                                })
                            }
                            <div className="flex items-center gap-2">
                                <AddEmail list="vencido_mais_30" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Smtp />
        </div>
    );
}

export default Email;
