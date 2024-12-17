import {
  Check,
  DoorOpen,
  Eye,
  Filter,
  GraduationCap,
  Pencil,
  Plus,
  Power,
  RefreshCcw,
  RotateCw,
  Settings,
  Trash,
} from "lucide-react";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface secondary {
  secondary?: string | undefined;
}

type ButtonProps = React.HTMLProps<HTMLButtonElement> & secondary;

// eslint-disable-next-line
export const NewButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="outline"
        className={cn(
          `hover:bg-system_gray_700 hover:text-white`,
          props.className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Plus className="mr-2" /> <p className="font-poppins_medium">Novo</p>
      </Button>
    );
  }
);

// eslint-disable-next-line
export const FilterButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="outline"
        className={cn(
          `hover:bg-system_prince_600 hover:text-white`,
          props.className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Filter className="mr-2" />{" "}
        <p className="font-poppins_medium">Filtros</p>
      </Button>
    );
  }
);

// ------------------------------------- Icon Buttons -------------------------------------

// eslint-disable-next-line
export const ViewIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-9 w-9`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <Eye className="m-[-15px]" color="#3b6064" />
      </Button>
    );
  }
);

// eslint-disable-next-line
export const EditIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-9 w-9`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <Pencil className="m-[-15px]" color="#D5AB09" />
      </Button>
    );
  }
);

// eslint-disable-next-line
export const ReplaceIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-9 w-9`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <RotateCw className="m-[-15px]" color="#C81E1E" />
      </Button>
    );
  }
);

// eslint-disable-next-line
export const DeleteIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-9 w-9`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <Trash className="m-[-15px]" color="#CB343C" />
      </Button>
    );
  }
);

// eslint-disable-next-line
export const SettingsIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-9 w-9`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <Settings className="m-[-15px]" color="#3b6064" />
      </Button>
    );
  }
);

// eslint-disable-next-line
export const CheckIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-9 w-9`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <Check className="m-[-15px]" color="#3b6064" />
      </Button>
    );
  }
);

// eslint-disable-next-line
export const PowerIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-9 w-9`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <Power className="m-[-15px]" color="#3b6064" />
      </Button>
    );
  }
);

// eslint-disable-next-line
export const GradCapIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-9 w-9`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <GraduationCap className="m-[-15px]" style={{ color: "#385F7D" }} />
      </Button>
    );
  }
);

// eslint-disable-next-line
export const EntrarIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-9 w-9`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <DoorOpen className="m-[-15px]" color="#3b6064" />
      </Button>
    );
  }
);

// eslint-disable-next-line
export const RefreshIconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: any, forwardedRef: any) => {
    return (
      <Button
        variant="ghost"
        className={cn(`h-10 w-10`, props.className)}
        {...props}
        ref={forwardedRef}
      >
        <RefreshCcw className="m-[-15px] stroke-system_prince_600" />
      </Button>
    );
  }
);
