import React, { useState, useEffect } from "react";

const TimerApp = () => {
    const [status, setStatus] = useState("Offline");
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [task, setTask] = useState("");
    const [message, setMessage] = useState("");
    const [timemessage, setTimeMessage] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            if (!startTime) {
                setStartTime(Date.now() - time * 1000);
            }
            interval = setInterval(() => {
                setTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime, time]);

    const handleToggle = async () => {
        if (isActive) {
            setIsActive(false);
            setStatus("Inactive");
            await saveTimeToDatabase(time, false);
            setTime(0);
            setStartTime(null);
        } else {
            setIsActive(true);
            setStatus("Active");
            setStartTime(Date.now());
            await saveTimeToDatabase(0, true);
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const saveTimeToDatabase = async (time, status) => {
        try {
            const response = await fetch("https://portfolio-backend-q5fr.onrender.com/api/save-time", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ time, status })
            });
            if (!response.ok) throw new Error("Failed to save time");
            setTimeMessage(true);
            setTimeout(() => setTimeMessage(false), 3000);
        } catch (error) {
            console.error("Error saving time:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.trim()) {
            setMessage("Task cannot be empty!");
            return;
        }
        try {
            const response = await fetch("https://portfolio-backend-q5fr.onrender.com/api/add-task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task })
            });
            if (response.ok) {
                showMessage("Task added successfully! ✅");
                setTask("");
            } else {
                showMessage("Failed to add task ❌");
            }
        } catch (error) {
            showMessage("Error connecting to the server!");
        }
    };

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <>
            {!isActive && timemessage && (
                <div className="absolute top-2 right-2 px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md flex items-center space-x-2 animate-fade-in">
                    <span role="img" aria-label="check-mark" className="text-xl">✅</span>
                    <p>Time and Status update successful!</p>
                </div>
            )}
            <h1 className="text-2xl md:text-4xl text-gray-800 pt-10 bg-gray-100 font-bold text-center">Dashboard for Developer</h1>
            <div className="flex flex-col md:flex-row gap-0 md:gap-8 items-center justify-center pt-6 md:pt-20 pb-50 bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Timer Task Manager</h1>
                    <p className="text-xl text-gray-700 mb-2 text-center">Status: {status}</p>
                    <p className="text-xl text-gray-700 mb-6 text-center">⏰ Time: {formatTime(time)}</p>
                    <button onClick={handleToggle} className={`w-full py-3 text-lg rounded-lg font-semibold ${isActive ? "bg-red-500" : "bg-green-500"} text-white`}>{isActive ? "Deactivate" : "Activate"}</button>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Enter Today's Task</h1>
                    <input className="border border-gray-300 p-3 w-full rounded-md mb-6 focus:ring-2 focus:ring-blue-500" type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter task name" />
                    <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600">✅ Submit</button>
                    {message && <div className="absolute top-2 right-2 px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md">✅ {message}</div>}
                </div>
            </div>
        </>
    );
};

export default TimerApp;
