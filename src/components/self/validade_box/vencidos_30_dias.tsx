import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Flip, toast } from 'react-toastify';

// eslint-disable-next-line
function Vencidos30Dias({
    funcionario_cpf,
    empresa_id,
    refetching,
}: {
    funcionario_cpf?: string;
    empresa_id?: string;
    refetching: boolean;
}) {
    // eslint-disable-next-line
    const [documentos, setDocumentos] = useState<Array<any>>();

    const query_documentos = useQuery({
        queryKey: [`lista_vencidos30dias`],
        queryFn: async () => {
            let request_query = `/documentos_valdiade?tipo=3`;

            if (funcionario_cpf) {
                request_query += `&funcionario_cpf=${funcionario_cpf}`;
            }

            if (empresa_id) {
                request_query += `&empresa_id=${empresa_id}`;
            }

            const request = new Request(import.meta.env.VITE_BASE_URL + request_query, {
                method: 'GET',
                credentials: 'include',
            });

            return (await fetch(request)).json();
        },
    });

    useEffect(() => {
        if (refetching === true) query_documentos.refetch();
    }, [refetching]);

    useEffect(() => {
        if (!query_documentos.isPending && !query_documentos.isError && query_documentos.data !== undefined) {
            setDocumentos(query_documentos.data);
        }

        if (query_documentos.isError) {
            toast.error('Erro ao buscar validade dos arquivos', {
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
    }, [query_documentos.data]);

    if (!documentos) {
        return (
            <div className="flex items-center justify-center w-[400px] h-[150px] bg-system_gray_800 rounded-xl">
                <svg
                    className="animate-spin w-[80px] stroke-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
            </div>
        );
    } else {
        return (
            <div className="flex items-center w-[400px] h-[150px] bg-system_gray_800 rounded-xl overflow-hidden">
                <p className="text-white text-2xl font-nunito_semibold ml-auto mr-auto">Vencidos há 30 dias</p>

                <div className="flex items-center justify-center bg-system_orange_500 h-full min-w-[120px] w-fit ml-auto">
                    <p className="text-white text-4xl font-nunito_semibold">{documentos.length}</p>
                </div>
            </div>
        );
    }
}

export default Vencidos30Dias;
