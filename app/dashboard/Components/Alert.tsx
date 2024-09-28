import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

interface AlertProps {
    message: string;
    type: "success" | "error" | "warning";
}

const Alert = ({ message, type }: AlertProps) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex absolute right-1 top-1 justify-between items-center px-4 py-2 rounded-lg shadow-lg mb-4
        ${type === "success" ? "bg-green-200 text-green-700" : ""}
        ${type === "error" ? "bg-red-200 text-red-700" : ""}
        ${type === "warning" ? "bg-yellow-200 text-yellow-700" : ""}
      `}
        >
            <span>{message}</span>
            <button onClick={() => setVisible(false)} className="ml-4">
                <AiOutlineClose size={20} />
            </button>
        </motion.div>
    );
};

export default Alert;
