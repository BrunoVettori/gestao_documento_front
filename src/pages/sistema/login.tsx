import { ErrorFormater } from '@/logic/error_formater';
import { useNavigate } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import logo_delta from '@/assets/logo.svg';

function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const request = new Request(import.meta.env.VITE_BASE_URL + '/clear_cookie', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });

        fetch(request);
    }, []);

    // eslint-disable-next-line
    async function MakeLoginRequest(data: any) {
        const request = new Request(import.meta.env.VITE_BASE_URL + '/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.email, senha: data.senha }),
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

        if (response.status === 200) {
            navigate('/');
        } else {
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
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className="h-fit w-fit rounded-sm bg-white flex flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center gap-5">
                <img className="w-[150px]" src={logo_delta} alt="Delta" />

                <p className="font-nunito_semibold text-system_gray_700 text-2xl">Delta Gestão de Documentos</p>
            </div>

            <form onSubmit={handleSubmit(MakeLoginRequest)}>
                <div className="min-w-[350px] h-full flex flex-col gap-3 mt-5">
                    <div>
                        <Input
                            placeholder="E-Mail"
                            className={ErrorFormater('mb-2 mt-2', errors.email)}
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório',
                                },
                                pattern: {
                                    value: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
                                    message: 'Email inválido',
                                },
                            })}
                        />

                        {errors.email && <p className="ml-1 text-system_red_600">{errors.email.message?.toString()}</p>}
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Senha"
                            className={ErrorFormater('mb-2 mt-2', errors.senha)}
                            {...register('senha', {
                                required: {
                                    value: true,
                                    message: 'Campo obrigatório',
                                },
                            })}
                        />

                        {errors.senha && <p className="ml-1 text-system_red_600">{errors.senha.message?.toString()}</p>}
                    </div>
                    <Button className="w-full bg-system_gray_700 hover:bg-system_gray_700 ">Login</Button>
                </div>
            </form>
        </div>
    );
}

export default Login;
