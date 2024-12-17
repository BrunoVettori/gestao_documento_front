import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Flip, toast } from 'react-toastify';

import Layout from './pages/layout/layout';
import Fallback from './pages/layout/fallback';
import LayoutLoggedOut from './pages/layout/layout_logged_out';

// const Home = lazy(() => import('./pages/sistema/home'));
const Login = lazy(() => import('./pages/sistema/login'));
const Email = lazy(() => import('./pages/sistema/email'));
const Sistema = lazy(() => import('./pages/sistema/sistema'));
const Empresa = lazy(() => import('./pages/empresa/empresa'));
const Empresas = lazy(() => import('./pages/empresa/empresas'));
const Usuarios = lazy(() => import('./pages/usuarios/usuarios'));
const Documentos = lazy(() => import('./pages/documentos/documentos'));
const Funcionario = lazy(() => import('./pages/funcionario/funcionario'));
const Funcionarios = lazy(() => import('./pages/funcionario/funcionarios'));

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    //eslint-disable-next-line
    const [usuario, setUsuario] = useState<any>();

    async function SetUser() {
        try {
            await fetch(import.meta.env.VITE_BASE_URL + '/get_current_user', {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }).then(async (response) => {
                if (response.status == 401 || response.status >= 400) {
                    navigate('/login');
                    return;
                }

                setUsuario(await response.json());
            });

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

            navigate('/login');

            return;
        }
    }

    useEffect(() => {
        if (!location.pathname.includes('/login')) {
            SetUser();
        }
    }, [location.pathname]);

    if (usuario === undefined && !location.pathname.includes('/login')) {
        return <Fallback path={location.pathname} />;
    }

    return (
        <Suspense fallback={<Fallback path={location.pathname} />}>
            <Routes>
                {/* Logged In */}
                <Route element={<Layout usuario={usuario} />}>
                    <Route path="/" element={<Documentos />}></Route>
                    <Route path="/funcionarios" element={<Funcionarios />}></Route>
                    <Route path="/funcionario/:cpf" element={<Funcionario />}></Route>
                    <Route path="/empresas" element={<Empresas />}></Route>
                    <Route path="/empresa/:id" element={<Empresa />}></Route>
                    {usuario && usuario.admin == '1' && <Route path="/usuarios" element={<Usuarios />}></Route>}
                    <Route path="/documentos" element={<Documentos />}></Route>
                    <Route path="/sistema" element={<Sistema />}></Route>
                    <Route path="/email" element={<Email />}></Route>
                </Route>

                {/* Logged Out */}
                <Route element={<LayoutLoggedOut />}>
                    <Route path="*" element={<>Not Found</>}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/login/:redirect" element={<Login />}></Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
