"use client";

import { useContext, createContext, ReactNode, useState, useEffect } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/legacy/image";

interface SidebarContextProps {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

interface SidebarProps {
    children: ReactNode;
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}

export default function Sidebar({ children, expanded, setExpanded }: SidebarProps) {
    const [isScreenSmall, setIsScreenSmall] = useState(false);
    const userName = "John Doe";
    const initials = userName.split(" ").map((name) => name[0]).join("");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1050) {
                setIsScreenSmall(true);
                setExpanded(false);
            } else {
                setIsScreenSmall(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); 

        return () => window.removeEventListener("resize", handleResize);
    }, [setExpanded]);

    return (
        <div className="relative">
            <aside className="md:h-[95vh] max-md:w-[100%] fixed md:shadow-xl md:top-1/2 max-md:bottom-0 md:p-0 md:rounded-3xl md:-translate-y-1/2 transform md:left-5 z-10">
                <nav className="h-full flex flex-col bg-white md:border-r md:shadow-sm md:rounded-3xl">
                    <div className="p-4 pb-2 flex justify-between items-center max-md:hidden">
                        {expanded&&<Image
                            src="https://static.wixstatic.com/media/4ebc68_ab41a22907914fcc878695033a717c78~mv2.png/v1/crop/x_82,y_325,w_1507,h_250/fill/w_534,h_89,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/web%20portada.png"
                            width={320}
                            height={60}
                            priority
                            className={`overflow-hidden transition-all`}
                            alt="logo"
                        />}
                        {!isScreenSmall && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                            >
                                {expanded ? <ChevronFirst /> : <ChevronLast />}
                            </button>
                        )}
                    </div>
                    <SidebarContext.Provider value={{ expanded, setExpanded }}>
                        <ul className="md:flex-1 px-3 max-md:flex max-md:justify-evenly">{children}</ul>
                    </SidebarContext.Provider>
                    <div className="border-t flex p-3 max-md:hidden">
                        <div
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#c7d2fe] text-[#3730a3] font-bold text-lg"
                        >
                            {initials}
                        </div>
                        <div
                            className={`
                                flex justify-between items-center
                                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                                }
                            `}
                        >
                            <div className="leading-4">
                                <h4 className="font-semibold">{userName}</h4>
                                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    );
}

interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    route: string;
    alert?: boolean;
}

export function SidebarItem({
    icon,
    text,
    route,
    alert = false,
}: SidebarItemProps) {
    const sidebarContext = useContext(SidebarContext);
    const router = useRouter();
    const pathname = usePathname();

    if (!sidebarContext) {
        return null;
    }

    const { expanded } = sidebarContext;

    const isActive = pathname === route;

    const handleNavigation = () => {
        router.push(route);
    };
    return (
        <li
            onClick={handleNavigation}
            className={`
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            ${isActive
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
            `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                    }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    className={`
            absolute md:left-full max-md:bottom-12 rounded-md px-2 py-1 md:ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 ${text==="Datos"?"max-md:group-hover:-translate-x-4":"max-md:group-hover:-translate-x-6"} md:group-hover:-translate-x-0
        `}
                >
                    {text}
                </div>
            )}
        </li>
    );
}
