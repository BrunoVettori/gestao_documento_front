import { Outlet } from 'react-router-dom';

function LayoutLoggedOut() {
    return (
        <div className="min-w-[100vw] min-h-[100vh] flex items-center justify-center bg-gradient-to-r from-system_prince_800 to-system_prince_700">
            <Outlet />
        </div>
    );
}

export default LayoutLoggedOut;
