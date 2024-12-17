import { FileText } from 'lucide-react';
import { useState } from 'react';

import VencidosMais30Dias from '@/components/self/validade_box/vencidos_mais_30_dias';
import Vencidos30Dias from '@/components/self/validade_box/vencidos_30_dias';
import CleckListGeral from '@/components/self/check_list_geral';
import DocumentoTable from './documentos_table';
import Vence30Dias from '@/components/self/validade_box/vence_30_dias';
import Valido from '@/components/self/validade_box/valido';
import Header from '@/components/self/header';

function Documentos() {
    const [refetching, setRefetching] = useState(false);

    function Refetch() {
        setRefetching(true);
        setTimeout(() => {
            setRefetching(false);
        }, 2000);
    }

    function NovoDoc() {
        return (
            <div className="flex items-center gap-3">
                <CleckListGeral refetching={refetching} />
            </div>
        );
    }

    return (
        <div className="h-full w-full p-5 pl-10 pr-10 overflow-hidden">
            <div className="w-full p-5 bg-system_card_background rounded-xl border-[2px] border-system_border">
                <Header nome="Documentos Gerais" icon={<FileText />} loading={false}></Header>
            </div>

            <div className="flex flex-wrap mt-5 gap-2 items-center justify-between">
                <Valido refetching={refetching} />
                <Vence30Dias refetching={refetching} />
                <Vencidos30Dias refetching={refetching} />
                <VencidosMais30Dias refetching={refetching} />
            </div>
            <div className="mt-5"></div>

            <div className="bg-system_card_background rounded-xl border-[2px] border-system_border mt-5 p-5 w-full">
                <DocumentoTable NovoDocumento={NovoDoc} refetch={Refetch} geral={true} />
            </div>
        </div>
    );
}

export default Documentos;
