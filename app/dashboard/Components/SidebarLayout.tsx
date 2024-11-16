"use client";

import { useState } from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { FaExchangeAlt, FaListAlt, FaUser, FaWallet } from "react-icons/fa";
import { LogOut } from "lucide-react";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="flex bg-white">
            <Sidebar expanded={expanded} setExpanded={setExpanded}>
                <SidebarItem icon={<FaExchangeAlt size={20} />} text="Cambiar" route="/dashboard" />
                <SidebarItem icon={<FaListAlt size={20} />} text="Ordenes" route="/dashboard/orders" />
                <SidebarItem icon={<FaWallet  size={20} />} text="Cuentas" route="/dashboard/accounts" />
                <SidebarItem icon={<FaUser  size={20} />} text="Datos" route="/dashboard/my-info" />
                <SidebarItem icon={<LogOut  size={20} />} text="Logout" route="https://altoqueperuwk.com/" />
            </Sidebar>
            <div
                className={`flex-1 bg-white max-md:mb-24 transition-all duration-500 ${expanded ? "md:ml-[21rem]" : "md:ml-[7rem]"
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
