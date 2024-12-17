import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ErrorFormater } from "@/logic/error_formater";
import { Flip, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import "react-datepicker/dist/react-datepicker.css";

import LoadingButton from "@/components/self/loading_button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

// eslint-disable-next-line
function EditarEmpresa({
  empresa,
  refetch,
}: {
  empresa: any;
  refetch: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line
  const [image, setImage] = useState<any>();
  const [ativo, setAtivo] = useState(empresa.ativo === 1 ? true : false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: empresa });

  function ResetForm() {
    setLoading(false);
    reset(empresa);
  }

  useEffect(() => {
    ResetForm();
  }, [open]);

  // eslint-disable-next-line
  async function SubmitForm(data: any) {
    const formData = new FormData();

    data.ativo = ativo;

    delete data.foto_perfil;

    const arquivo = data.arquivo;

    if (arquivo.length > 0) formData.append("arquivo", arquivo[0]);

    for (const key in data) {
      if (data[key] !== undefined && data[key] !== "" && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    setLoading(true);

    const request = new Request(import.meta.env.VITE_BASE_URL + "/empresa", {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    const response = await fetch(request);

    if (response.status >= 200 && response.status < 400) {
      toast.success(await response.text(), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Flip,
      });

      setOpen(false);
      refetch();
      ResetForm();
    } else {
      setLoading(false);
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
      <DialogContent className=" h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Cadastrar Empresa</DialogTitle>
        </DialogHeader>

        <form
          id="empresa_form"
          onSubmit={handleSubmit(SubmitForm)}
          className="flex mb-5 mt-3 gap-5"
        >
          <div>
            <div className="h-[250px] w-[300px] rounded-lg overflow-clip border-[1px] border-system_gray_300">
              {image ? (
                <img
                  className="rounded-t-lg object-cover w-[100%] h-[100%]"
                  src={image}
                  alt="Placeholder"
                />
              ) : (
                <img
                  className="rounded-t-lg object-cover w-[100%] h-[100%]"
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
              )}
            </div>

            <div className="flex gap-5">
              <input
                {...register("arquivo")}
                // eslint-disable-next-line
                onChangeCapture={(file: any) => {
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
          <div className="w-full">
            <div className="flex items-center gap-5">
              <div className="w-full">
                <p>Nome</p>
                <Input
                  maxLength={191}
                  placeholder="Nome"
                  className={ErrorFormater("mt-2", errors.nome)}
                  {...register("nome", {
                    required: {
                      value: true,
                      message: "Campo obrigatório",
                    },
                  })}
                />

                {errors.nome && (
                  <p className="ml-1 text-system_red_600">
                    {errors.nome.message?.toString()}
                  </p>
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
            </div>

            <div className="flex gap-5">
              <div className="mt-5 w-full">
                <p>CNPJ</p>
                <Input
                  maxLength={191}
                  placeholder="CNPJ"
                  className={ErrorFormater("mt-2", errors.cnpj)}
                  {...register("cnpj", {
                    required: {
                      value: true,
                      message: "Campo obrigatório",
                    },
                  })}
                />

                {errors.cnpj && (
                  <p className="ml-1 text-system_red_600">
                    {errors.cnpj.message?.toString()}
                  </p>
                )}
              </div>

              <div className="mt-5 w-full">
                <p>E-Mail</p>
                <Input
                  maxLength={191}
                  placeholder="E-Mail"
                  className={ErrorFormater("mt-2", errors.email)}
                  {...register("email")}
                />

                {errors.email && (
                  <p className="ml-1 text-system_red_600">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 w-full">
              <p>Endereço</p>
              <Input
                maxLength={191}
                placeholder="Endereço"
                className={ErrorFormater("mt-2", errors.endereco)}
                {...register("endereco")}
              />

              {errors.endereco && (
                <p className="ml-1 text-system_red_600">
                  {errors.endereco.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </form>

        <LoadingButton loading={loading ? "true" : "false"} form="empresa_form">
          Atualizar
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
}

export default EditarEmpresa;
