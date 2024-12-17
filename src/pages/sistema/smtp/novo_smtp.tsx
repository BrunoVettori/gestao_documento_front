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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

import LoadingButton from "@/components/self/loading_button";

// eslint-disable-next-line
function NovoSmtp({ smtp, refetch }: { smtp: any; refetch: () => void }) {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [ativo, setAtivo] = useState(smtp && smtp.ativo === 1 ? true : false);
  const [secure, setSecure] = useState(
    smtp && smtp.secure === 1 ? true : false
  );

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ defaultValues: smtp });

  function ResetForm() {
    reset(smtp);
    setLoading(false);
  }

  useEffect(() => {
    ResetForm();
  }, [open]);

  // eslint-disable-next-line
  async function SubmitForm(data: any) {
    setLoading(true);

    data.port = data.port.toString();
    data.ativo = ativo;
    data.secure = secure;

    const request = new Request(import.meta.env.VITE_BASE_URL + "/smtp", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
        <Button
          variant="outline"
          className="hover:bg-system_gray_700 hover:text-white"
        >
          <Plus className="mr-2" /> <p className="font-poppins_medium">Novo</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[900px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Cadastrar SMTP</DialogTitle>
        </DialogHeader>

        <form
          id="status_form"
          onSubmit={handleSubmit(SubmitForm)}
          className="mb-5 mt-3"
        >
          <div className="w-full">
            <div className="flex gap-5 mt-5">
              <div className="w-full">
                <p>Host</p>
                <Input
                  maxLength={191}
                  placeholder="Host"
                  className={ErrorFormater("mt-2", errors.host)}
                  {...register("host", {
                    required: {
                      value: true,
                      message: "Campo obrigatório",
                    },
                  })}
                />

                {errors.host && (
                  <p className="ml-1 text-system_red_600">
                    {errors.host.message?.toString()}
                  </p>
                )}
              </div>

              <div className="">
                <p>Port</p>
                <Input
                  maxLength={191}
                  placeholder="Port"
                  className={ErrorFormater("mt-2", errors.port)}
                  {...register("port", {
                    required: {
                      value: true,
                      message: "Campo obrigatório",
                    },
                  })}
                />

                {errors.port && (
                  <p className="ml-1 text-system_red_600">
                    {errors.port.message?.toString()}
                  </p>
                )}
              </div>

              <div className="">
                <p>Secure</p>
                <Switch
                  className="data-[state=checked]:bg-system_aqua_700 mt-4"
                  checked={secure}
                  onCheckedChange={setSecure}
                />
              </div>

              <div className="">
                <p>Ativo</p>
                <Switch
                  className="data-[state=checked]:bg-system_aqua_700 mt-4"
                  checked={ativo}
                  onCheckedChange={setAtivo}
                />
              </div>
            </div>

            <div className="mt-5">
              <p>User</p>
              <Input
                maxLength={191}
                placeholder="User"
                className={ErrorFormater("mt-2", errors.user)}
                {...register("user", {
                  required: {
                    value: true,
                    message: "Campo obrigatório",
                  },
                })}
              />

              {errors.user && (
                <p className="ml-1 text-system_red_600">
                  {errors.user.message?.toString()}
                </p>
              )}
            </div>

            <div className="mt-5">
              <p>Pass</p>
              <Input
                maxLength={191}
                placeholder="Pass"
                className={ErrorFormater("mt-2", errors.pass)}
                {...register("pass", {
                  required: {
                    value: true,
                    message: "Campo obrigatório",
                  },
                })}
              />

              {errors.pass && (
                <p className="ml-1 text-system_red_600">
                  {errors.pass.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </form>

        <LoadingButton loading={loading ? "true" : "false"} form="status_form">
          Cadastrar
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
}

export default NovoSmtp;
