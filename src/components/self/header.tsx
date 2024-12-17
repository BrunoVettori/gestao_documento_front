//eslint-disable-next-line
function Header({ nome, children, icon, loading }: { nome: string; children?: any; icon: any; loading: boolean }) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex gap-5 items-center">
                    {icon}
                    <p className="text-xl font-raleway_semibold">{nome}</p>

                    {loading && (
                        <svg
                            className="animate-spin w-10 stroke-system_prince_700"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    )}
                </div>
                {children}
            </div>

            <div className="w-full h-[2px] mt-3 rounded-full bg-gradient-to-r from-system_gray_700 to-system_teal_500" />
        </div>
    );
}

export default Header;
