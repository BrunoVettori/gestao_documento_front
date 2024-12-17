import { Button } from '@/components/ui/button';
import LayoutLoggedOut from './layout_logged_out';

import logo_delta from '@/assets/logo.svg';

function Fallback({ path }: { path: string }) {
    if (path.includes('/login')) {
        return <LayoutLoggedOut />;
    } else {
        return (
            <div className="min-w-[100vw] min-h-[100vh] flex flex-col bg-system_background">
                <div className="h-[75px] flex items-center justify-between bg-gradient-to-r from-system_prince_800 to-system_prince_700 shadow-md">
                    <Button
                        variant="outline"
                        className="w-[100px] group border-r-[2px] hover:bg-system_gray_100 border-white hover:border-r-system_prince_800 rounded-none ease-in-out duration-200 p-[25px] h-full "
                    >
                        <img src={logo_delta} alt="Delta" />
                    </Button>

                    <p className="text-white text-2xl mr-auto ml-3 mt-1">Gestão de Documentos</p>
                </div>

                <div className="flex flex-grow">
                    <div className="w-[100px] min-h-full flex flex-col gap-5 pt-5 items-center justify-start bg-white shadow-md"></div>
                </div>
            </div>
        );
    }
}

export default Fallback;
