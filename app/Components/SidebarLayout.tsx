"use client"; // Marcado como Client Component

import { useState } from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { FaExchangeAlt, FaListAlt, FaUser, FaWallet } from "react-icons/fa";
import { LogOut } from "lucide-react";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="flex">
            <Sidebar expanded={expanded} setExpanded={setExpanded}>
                <SidebarItem icon={<FaExchangeAlt size={20} />} text="Cambiar" route="/" />
                <SidebarItem icon={<FaListAlt size={20} />} text="Ordenes" route="/orders" />
                <SidebarItem icon={<FaWallet  size={20} />} text="Cuentas" route="/accounts" />
                <SidebarItem icon={<FaUser  size={20} />} text="Datos" route="/my-info" />
                <SidebarItem icon={<LogOut  size={20} />} text="Logout" route="https://google.com" />
            </Sidebar>
            <div
                className={`flex-1 max-md:mb-24 transition-all duration-500 ${expanded ? "md:ml-[21rem]" : "md:ml-[7rem]"
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
