import {
  User,
  Building2,
  File,
  Power,
  UserPlus,
  Wrench,
  Mail,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import logo from "@/assets/logo.svg";

// eslint-disable-next-line
function Layout({ usuario }: { usuario: any }) {
  const navigate = useNavigate();

  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col bg-system_background">
      <div className="h-[75px] flex items-center justify-between bg-gradient-to-r from-system_gray_800 to-system_gray_700 shadow-md">
        <TooltipProvider>
          <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant="outline"
                className="w-[100px] group border-r-[2px] hover:bg-system_gray_100 border-white hover:border-r-system_gray_800 rounded-none ease-in-out duration-200 p-[25px] h-full "
              >
                <img src={logo} alt="RailenWeb" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p className="text-white text-2xl mr-auto ml-3 mt-1">
          Gestão de Documentos
        </p>
        {/*
                <Button className="bg-white relative hover:bg-system_gray_100 mr-[13px]">
                    <Bell color={'#374151'} />
                    <div className="absolute top-[-5px] right-[-5px] h-[15px] w-[15px] bg-system_red_700 rounded-full"></div>
                </Button> */}
      </div>

      <div className="flex flex-grow">
        <div className="min-w-[100px] min-h-full flex flex-col gap-5 pt-5 items-center justify-start bg-white shadow-md">
          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    navigate("/funcionarios");
                  }}
                  variant="ghost"
                  className="w-full h-[50px] group border-r-[2px] border-l-[2px] hover:bg-system_gray_100 border-white hover:border-r-system_gray_800 rounded-none ease-in-out duration-200"
                >
                  <User color="#374151" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Funcionários</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    navigate("/empresas");
                  }}
                  variant="ghost"
                  className="w-full h-[50px] group border-r-[2px] border-l-[2px] hover:bg-system_gray_100 border-white hover:border-r-system_gray_800 rounded-none ease-in-out duration-200"
                >
                  <Building2 color="#374151" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Empresas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    navigate("/documentos");
                  }}
                  variant="ghost"
                  className="w-full h-[50px] group border-r-[2px] border-l-[2px] hover:bg-system_gray_100 border-white hover:border-r-system_gray_800 rounded-none ease-in-out duration-200"
                >
                  <File color="#374151" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Documentos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {usuario && usuario.admin == "1" && (
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      navigate("/usuarios");
                    }}
                    variant="ghost"
                    className="w-full h-[50px] group border-r-[2px] border-l-[2px] hover:bg-system_gray_100 border-white hover:border-r-system_gray_800 rounded-none ease-in-out duration-200"
                  >
                    <UserPlus color="#374151" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Usuarios</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    navigate("/sistema");
                  }}
                  variant="ghost"
                  className="w-full h-[50px] group border-r-[2px] border-l-[2px] hover:bg-system_gray_100 border-white hover:border-r-system_gray_800 rounded-none ease-in-out duration-200"
                >
                  <Wrench color="#374151" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Sistema</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    navigate("/email");
                  }}
                  variant="ghost"
                  className="w-full h-[50px] group border-r-[2px] border-l-[2px] hover:bg-system_gray_100 border-white hover:border-r-system_gray_800 rounded-none ease-in-out duration-200"
                >
                  <Mail color="#374151" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>E-Mail</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="w-full h-[1px] bg-system_teal_900 m-2" />

          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  variant="ghost"
                  className="bg-system_gray_700 hover:bg-system_gray_800 rounded-full w-[50px] h-[50px]"
                >
                  <Power color="white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="ml-6" side="left">
                <p>Sair</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="p-3 flex-grow flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
