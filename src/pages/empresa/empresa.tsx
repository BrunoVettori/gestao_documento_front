import { useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";
import { FolderDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import EmpresaSkeleton from "./empresa_skeleton";
import DocumentoTable from "../documentos/documentos_table";
import NovoDocumento from "../documentos/novo_documentos";
import FileSaver from "file-saver";
import Pannel from "@/components/self/pannel";
import CleckListDocs from "@/components/self/check_list_docs";
import Valido from "@/components/self/validade_box/valido";
import Vence30Dias from "@/components/self/validade_box/vence_30_dias";
import Vencidos30Dias from "@/components/self/validade_box/vencidos_30_dias";
import VencidosMais30Dias from "@/components/self/validade_box/vencidos_mais_30_dias";
import CleckListFuncionario from "@/components/self/check_list_funcionario";
import EditarEmpresa from "./editar_empresa";

function Empresa() {
  const { id } = useParams();

  // eslint-disable-next-line
  const [empresa, setEmpresa] = useState<any>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (empresa !== undefined) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [empresa]);

  const query_empresa = useQuery({
    queryKey: [`lista_empresa`],
    queryFn: async () => {
      const request = new Request(
        import.meta.env.VITE_BASE_URL + `/empresas?id=${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      return (await fetch(request)).json();
    },
  });

  useEffect(() => {
    if (
      !query_empresa.isPending &&
      !query_empresa.isError &&
      query_empresa.data !== undefined
    ) {
      setEmpresa(query_empresa.data[0]);
    }

    if (query_empresa.isError) {
      toast.error("Erro ao buscar informações", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
    }
  }, [query_empresa.data, query_empresa.isPending]);

  function NovoDoc(refetch: () => void) {
    return (
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-system_green_600 hover:text-white"
          onClick={() => {
            DonwloadFiles();
          }}
        >
          <FolderDown />
          <p>Donwload Geral</p>
        </Button>
        <CleckListFuncionario
          nome={empresa.nome}
          empresa_id={id}
          refetching={query_empresa.isRefetching}
        />
        <CleckListDocs
          nome={empresa.nome}
          empresa_id={id}
          refetching={query_empresa.isRefetching}
        />
        <NovoDocumento empresa={empresa} refetch={refetch} />
      </div>
    );
  }

  async function DonwloadFiles() {
    const request = new Request(
      import.meta.env.VITE_BASE_URL + `/download_zip?empresa_id=${empresa.id}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = await fetch(request);

    if (response.status >= 200 && response.status < 400) {
      const blob = await response.blob();

      FileSaver.saveAs(blob, `${empresa.nome}`);

      toast.success("Sucesso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
    } else {
      toast.error(await response.text(), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });
    }
  }

  if (loading === true) {
    return (
      <Pannel className="h-full w-full p-5">
        <EmpresaSkeleton />
      </Pannel>
    );
  } else {
    return (
      <div className="h-full w-full p-5 pl-10 pr-10 overflow-hidden">
        <div className="flex p-5 gap-5 relative bg-system_card_background rounded-xl border-[2px] border-system_border">
          <div className="absolute top-[0px] right-[0px] p-8">
            {empresa.ativo === 1 ? (
              <div className="flex items-center gap-2">
                <div className="h-[10px] w-[10px] rounded-full bg-system_green_500 shadow-md shadow-system_green_300" />
                <p className="text-lg font-nunito_semibold text-center">
                  Ativo
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-[10px] w-[10px] rounded-full bg-system_red_500 shadow-md shadow-system_red_300" />
                <p className="text-lg font-nunito_semibold text-center">
                  Inativo
                </p>
              </div>
            )}
          </div>

          <div className="h-[250px] w-[300px] rounded-lg overflow-clip border-[1px] border-system_gray_300">
            <img
              className="rounded-t-lg w-[100%] h-[100%]"
              src={
                import.meta.env.VITE_BASE_URL +
                `${
                  empresa.foto_perfil
                    ? "/" + empresa.foto_perfil
                    : "/placeholder_empresa.svg"
                }`
              }
              alt="Placeholder"
            />
          </div>

          <div className="flex flex-col gap-1 min-h-[200px]">
            <p className="text-6xl font-nunito_bold">{empresa.nome}</p>
            <p className="text-3xl font-nunito_light text-system_gray_400">
              {empresa.cargo}
            </p>

            <div className="flex flex-col h-fit gap-x-[200px] flex-wrap w-fit mt-5">
              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div>
                    <p className="text-lg font-nunito_light text-system_gray_500">
                      CNPJ:
                    </p>
                    {empresa.email && (
                      <p className="text-lg font-nunito_light text-system_gray_500">
                        E-Mail:
                      </p>
                    )}
                    <p className="text-lg font-nunito_light text-system_gray_500">
                      Cadastro:
                    </p>
                    {empresa.endereco && (
                      <p className="text-lg font-nunito_light text-system_gray_500">
                        Endereço:
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-nunito_semibold">
                      {empresa.cnpj}
                    </p>
                    {empresa.email && (
                      <p className="text-lg font-nunito_semibold">
                        {empresa.email}
                      </p>
                    )}
                    <p className="text-lg font-nunito_semibold">
                      {empresa.created_at}
                    </p>
                    {empresa.endereco && (
                      <p className="text-lg font-nunito_semibold">
                        {empresa.endereco}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-auto mt-auto">
            <EditarEmpresa empresa={empresa} refetch={query_empresa.refetch} />
          </div>
        </div>

        <div className="flex flex-wrap mt-5 gap-2 items-center justify-between">
          <Valido empresa_id={id} refetching={query_empresa.isRefetching} />
          <Vence30Dias
            empresa_id={id}
            refetching={query_empresa.isRefetching}
          />
          <Vencidos30Dias
            empresa_id={id}
            refetching={query_empresa.isRefetching}
          />
          <VencidosMais30Dias
            empresa_id={id}
            refetching={query_empresa.isRefetching}
          />
        </div>

        <div className="bg-system_card_background rounded-xl border-[2px] border-system_border mt-5 p-5 w-full">
          <DocumentoTable
            NovoDocumento={NovoDoc}
            refetch={query_empresa.refetch}
            empresa_id={id}
          />
        </div>
      </div>
    );
  }
}

export default Empresa;
