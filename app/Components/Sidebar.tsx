"use client";

import { useContext, createContext, ReactNode } from "react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { usePathname,useRouter } from "next/navigation";

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

    return (
        <div className="relative">
            <aside className="h-[95vh] fixed shadow-xl top-1/2 rounded-3xl -translate-y-1/2 transform left-5">
                <nav className="h-full flex flex-col bg-white border-r shadow-sm rounded-3xl">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img
                            src="https://static.wixstatic.com/media/4ebc68_ab41a22907914fcc878695033a717c78~mv2.png/v1/crop/x_82,y_325,w_1507,h_250/fill/w_534,h_89,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/web%20portada.png"
                            className={`overflow-hidden transition-all ${expanded ? "w-40" : "w-0"
                                }`}
                            alt=""
                        />
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>
                    <SidebarContext.Provider value={{ expanded, setExpanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>
                    <div className="border-t flex p-3">
                        <img
                            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                            alt=""
                            className="w-10 h-10 rounded-md"
                        />
                        <div
                            className={`
                                flex justify-between items-center
                                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                                                }
                            `}
                        >
                            <div className="leading-4">
                                <h4 className="font-semibold">John Doe</h4>
                                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                            </div>
                            <MoreVertical size={20} />
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
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
                >
                    {text}
                </div>
            )}
        </li>
    );
}
