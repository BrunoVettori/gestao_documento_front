import { useEffect, useState } from 'react';
import { Flip, toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { Wrench } from 'lucide-react';

import TableSkeleton from '@/components/skeletons/table';
import NovoSmtp from './novo_smtp';
import Header from '@/components/self/header';

function Smtp() {
    // eslint-disable-next-line
    const [smtp, setSmtp] = useState<any>();
    const [loading, setLoading] = useState(true);

    const query_smtp = useQuery({
        queryKey: [`lista_smtp`],
        queryFn: async () => {
            const request = new Request(import.meta.env.VITE_BASE_URL + `/smtp`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (!query_smtp.isPending && !query_smtp.isError && query_smtp.data !== undefined) {
            setSmtp(query_smtp.data[0]);
        }

        if (query_smtp.isError) {
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
    }, [query_smtp.data]);

    if (loading === true) {
        return (
            <div className="mt-5 w-full p-5 bg-system_card_background rounded-xl border-[2px] border-system_border">
                <Header nome="Configuração SMTP" icon={<Wrench />} loading={loading}></Header>
                <div className="mt-5" />
                <TableSkeleton />;
            </div>
        );
    }

    if (!smtp === true) {
        return (
            <div className="mt-5 w-full p-5 bg-system_card_background rounded-xl border-[2px] border-system_border">
                <Header nome="Configuração SMTP" icon={<Wrench />} loading={loading}>
                    <NovoSmtp smtp={smtp} refetch={query_smtp.refetch} />
                </Header>
            </div>
        );
    }

    return (
        <div className="mt-5 w-full p-5 bg-system_card_background rounded-xl border-[2px] border-system_border">
            <Header nome="Configuração SMTP" icon={<Wrench />} loading={loading}>
                <NovoSmtp smtp={smtp} refetch={query_smtp.refetch} />
            </Header>

            <div className="mt-5 flex gap-10">
                <div>
                    <div className="flex gap-2 items-center">
                        <p className="text-xl">Host:</p>
                        <p className="text-xl">{smtp.host}</p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <p className="text-xl">Porta:</p>
                        <p className="text-xl">{smtp.port}</p>
                    </div>

                    <div className="flex gap-2">
                        <p className="text-xl">Seguro:</p>
                        {smtp.secure === 1 ? (
                            <p className="rounded-sm text-md bg-system_green_500 text-white p-1">Seguro</p>
                        ) : (
                            <p className="rounded-sm text-md bg-system_red_600 text-white p-1">Inseguro</p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex gap-2 items-center">
                        <p className="text-xl">Usuário:</p>
                        <p className="text-xl">{smtp.user}</p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <p className="text-xl">Senha:</p>
                        <p className="text-xl">*******</p>
                    </div>

                    <div className="flex gap-2 ">
                        <p className="text-xl">Ativo:</p>
                        {smtp.ativo === 1 ? (
                            <p className="rounded-sm text-md bg-system_green_500 text-white p-1">Ativo</p>
                        ) : (
                            <p className="rounded-sm text-md bg-system_red_600 text-white p-1">Inativo</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Smtp;
