import React, { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut, FlaskConical } from "lucide-react";

const ActiveStatus = () => {
    const [loadingAction, setLoadingAction] = useState(null); // "enter" | "exit" | null

    const handleAction = async (action) => {
        try {
            setLoadingAction(action);
            const res = await fetch(
                `https://portfolio-backend-q5fr.onrender.com/api/lab/${action}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ student: "Mahadi Hasan Mishuk" }), // dynamic user later
                }
            );
            const data = await res.json();
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-md w-full mx-auto border border-gray-200"
        >
            {/* Header */}
            <div className="flex items-center gap-2 text-blue-600">
                <FlaskConical className="w-6 h-6" />
                <h2 className="text-3xl font-semibold">Lab Status</h2>
            </div>
            <p className="text-gray-500 text-sm text-center">
                Manage your secure lab entry and exit with one click.
            </p>

            {/* Action buttons */}
            <div className="flex gap-6">
                <button
                    onClick={() => handleAction("enter")}
                    disabled={loadingAction !== null}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:opacity-70 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all"
                >
                    <LogIn className="w-4 h-4" />
                    {loadingAction === "enter" ? "Processing..." : "Enter Lab"}
                </button>

                <button
                    onClick={() => handleAction("exit")}
                    disabled={loadingAction !== null}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white px-5 py-2.5 rounded-xl shadow-lg transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    {loadingAction === "exit" ? "Processing..." : "Exit Lab"}
                </button>
            </div>

            {/* Footer */}
            <p className="text-xs text-gray-400 mt-4">
                🔒 Powered by Lab Management System
            </p>
        </motion.div>
    );
};

export default ActiveStatus;
