"use client"; // Marcado como Client Component

import { useState } from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { FaExchangeAlt, FaListAlt, FaPhone, FaUser, FaWallet } from "react-icons/fa";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="flex">
            <Sidebar expanded={expanded} setExpanded={setExpanded}>
                <SidebarItem icon={<FaExchangeAlt size={20} />} text="Cambiar" route="/" />
                <SidebarItem icon={<FaListAlt size={20} />} text="Ordenes" route="/orders" alert />
                <SidebarItem icon={<FaWallet  size={20} />} text="Cuentas" route="/accounts" />
                <SidebarItem icon={<FaUser  size={20} />} text="Datos" route="/my-info" />
                <SidebarItem icon={<FaPhone  size={20} />} text="Contacto" route="/contact" />
            </Sidebar>
            <div
                className={`flex-1 transition-all duration-500 ${expanded ? "ml-[21rem]" : "ml-[7rem]"
                    }`}
            >
                {children}
            </div>
        </div>
    );
}
