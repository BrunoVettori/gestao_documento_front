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
import { Plus } from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";

import LoadingButton from "@/components/self/loading_button";

function NovoCargo({ refetch }: { refetch: () => void }) {
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

    const request = new Request(import.meta.env.VITE_BASE_URL + "/cargo", {
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
          <Plus className="mr-2" /> <p className="font-poppins_medium">Cargo</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[900px] h-fit max-w-[80vw] max-h-[80vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Cadastrar Cargo</DialogTitle>
        </DialogHeader>

        <form
          id="cargo_form"
          onSubmit={handleSubmit(SubmitForm)}
          className="mb-5 mt-3"
        >
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
        </form>

        <LoadingButton loading={loading ? "true" : "false"} form="cargo_form">
          Cadastrar
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
}

export default NovoCargo;
