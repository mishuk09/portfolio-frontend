import React, { useState } from 'react';
import axios from 'axios';

function AddProject() {
    const [title, setTitle] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [liveLink, setLiveLink] = useState('');
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('githubLink', githubLink);
        formData.append('liveLink', liveLink);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const res = await axios.post('http://localhost:5000/api/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Project added successfully!');
            console.log(res.data);

            setTitle('');
            setGithubLink('');
            setLiveLink('');
            setImages([]);
        } catch (err) {
            console.error(err);
            alert('Failed to add project');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your project title"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                    <input
                        type="url"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://github.com/your-repo"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Live Link</label>
                    <input
                        type="url"
                        value={liveLink}
                        onChange={(e) => setLiveLink(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://your-live-site.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-600"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                    Submit Project
                </button>
            </form>
        </div>
    );
}

export default AddProject;
