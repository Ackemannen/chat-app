import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";


const Navbar = () => {

    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");

    const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end w-full gap-2">
                {/* LOGO - Only in chat */}
                {isChatPage && (
                    <div className="pl-5 mr-auto">
                        <Link to="/" className="flex items-center gap-2.5">
                            <img src="/logo_icon_c.png" alt="logo" className='size-9' />
                            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                VoxityChat
                            </span>
                        </Link>
                    </div>
                )}

                {/* Notifications */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <Link to={"/notifications"}>
                        <button className="btn btn-ghost btn-circle  hover:btn-primary">
                            <BellIcon className="size-6 text-base-content opacity-70" />
                        </button>
                    </Link>
                </div>

                {/* TODO: Add theme selector */}
                <ThemeSelector />

                {/* Profile */}
                <div className="avatar">
                    <Link to="/profile" className="w-9 rounded-full">
                        <img src={authUser?.profilePic} alt="User profile" rel="noreferrer" />
                    </Link>
                </div>

                {/* Logout btn */}
                <button className="btn btn-ghost btn-circle hover:btn-primary" onClick={logoutMutation}>
                    <LogOutIcon className="size-6 text-base-content opacity-70" />
                </button>
            </div>

        </div>
    </nav>
  )
}

export default Navbar