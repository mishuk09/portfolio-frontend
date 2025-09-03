import React from "react";

const ActiveStatus = () => {
    const handleAction = async (action) => {
        try {
            const res = await fetch(`http://localhost:5000/api/lab/${action}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ student: "Mahadi Hasan Mishuk" }), // dynamic user later
            });
            const data = await res.json();
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <h2 className="text-xl font-bold">Lab Status</h2>
            <div className="flex gap-4">
                <button
                    onClick={() => handleAction("enter")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
                >
                    Enter Lab
                </button>
                <button
                    onClick={() => handleAction("exit")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                >
                    Exit Lab
                </button>
            </div>
        </div>
    );
};

export default ActiveStatus;
