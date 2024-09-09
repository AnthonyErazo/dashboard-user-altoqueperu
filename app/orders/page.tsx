"use client";

import { Typography } from "@mui/material";
import { Check, CircleXIcon, Clock, TriangleAlert } from "lucide-react";
import { useState } from "react";

export default function Orders() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("Todos");
    const [searchType, setSearchType] = useState("Cursos");

    const orders = [
        {
            id: "2138261832I9361",
            status: "complete",
            bank: "BCP",
            date: "10/08/2024",
            envio: 1000,
            recepcion: 900,
        },
        {
            id: "2138261832I9361",
            status: "in-progress",
            bank: "BCP",
            date: "10/08/2024",
            envio: 1000,
            recepcion: 900,
        },
        {
            id: "2138261832I9361",
            status: "pending",
            bank: "BCP",
            date: "10/08/2024",
            envio: 1000,
            recepcion: 900,
        },
        {
            id: "2138261832I9361",
            status: "cancelled",
            bank: "BCP",
            date: "10/08/2024",
            envio: 1000,
            recepcion: 900,
        },
    ];

    const filteredOrders = orders.filter((order) => {
        return (
            (filterStatus === "Todos" || order.status === filterStatus) &&
            (order.id.includes(searchTerm) || searchTerm === "")
        );
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-6">Mis Órdenes</h1>

            {/* Custom Search Section */}
            <label className="mt-4 block text-sm font-medium text-gray-900 text-center sm:text-start">
                Buscar por
            </label>
            <div className="flex items-center flex-col sm:flex-row mb-4">
                {/* Select Type */}
                <div className="w-2/5">
                    <select
                        value={searchType}
                        onChange={handleSearchTypeChange}
                        className="bg-gray-50 w-full rounded-lg border p-2 border-gray-300 text-gray-700 text-sm sm:text-sm focus:outline-none"
                    >
                        <option value="Cursos">Cursos</option>
                        <option value="Profesores">Profesores</option>
                    </select>
                </div>

                {/* Search Input */}
                <div className="flex ml-2 items-center mb-4 mt-4 w-full">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm focus:ring-1"
                            placeholder={`Buscar ${searchType}`}
                            required
                        />
                    </div>
                    <button
                        onClick={handleClearSearch}
                        className="p-2.5 ml-2 text-sm font-medium text-white bg-indigo-700 rounded-lg border border-indigo-700 hover:bg-indigo-800 focus:outline-none"
                    >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>

            {/* Filter by Order Status */}
            <div className="flex justify-between mb-4">
                <select
                    value={filterStatus}
                    onChange={handleFilterChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="Todos">Todos</option>
                    <option value="complete">Completado</option>
                    <option value="in-progress">En progreso</option>
                    <option value="pending">Pendiente</option>
                    <option value="cancelled">Cancelado</option>
                </select>
            </div>

            {/* Orders List */}
            <ul className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                        <li key={index} className="flex items-center gap-4 border-b pb-4">
                            {/* Status Icon */}
                            <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                    order.status === "complete"
                                        ? "bg-green-500"
                                        : order.status === "in-progress"
                                        ? "bg-blue-500"
                                        : order.status === "pending"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                }`}
                            >
                                {order.status === "complete" && <Check color="green" />}
                                {order.status === "in-progress" && <Clock color="blue" />}
                                {order.status === "pending" && <TriangleAlert color="yellow" />}
                                {order.status === "cancelled" && <CircleXIcon color="red" />}
                            </div>

                            {/* Order Information */}
                            <div className="flex-grow">
                                <p className="font-bold">Nº {order.id}</p>
                                <p className="text-gray-500">{order.bank}</p>
                                <p className="text-gray-500">{order.date}</p>
                            </div>

                            {/* Prices */}
                            <div>
                                <p className="text-sm">Envío: S/.{order.envio}</p>
                                <p className="text-sm">Recepción: S/.{order.recepcion}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <Typography>No se encontraron órdenes.</Typography>
                )}
            </ul>
        </div>
    );
}
