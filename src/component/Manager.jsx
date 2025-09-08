import React, { useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        const passwords = localStorage.getItem('passwords');
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast(' Copied text successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text);

    };

    const togglePassword = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const savePassword = () => {
        if (!form.site || !form.username || !form.password) return;

        const updatedArray = [...passwordArray, { id: uuidv4(), ...form }];
        setPasswordArray(updatedArray);
        localStorage.setItem('passwords', JSON.stringify(updatedArray));
        console.log('Password saved successfully');
        setForm({ site: '', username: '', password: '' });
        toast(' Password saved successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDelete = (item) => {
        let confirm = window.confirm('Are you sure you want to delete this password?');
        if (confirm) {
            console.log('Password deleted successfully', item.id);
            const updatedArray = passwordArray.filter((pass) => pass.id !== item.id);
            setPasswordArray(updatedArray);
            localStorage.setItem('passwords', JSON.stringify(updatedArray));
            toast(' Deleted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        }
    };
        const handleEdit = (item) => {
            let confirm = window.confirm('Are you sure you want to edit this password?');
            if (confirm) {
                console.log('Password edited successfully', item.id);
            }
            setForm(item);
            handleDelete(item);
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {/* Background */}
            <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>

            <div className="p-2 md:p-0 mycontainer  min-h-[calc(100vh-17vh)]">
                {/* Header */}
                <div className="text-black text-4xl font-bold text-center">
                    <span className="text-green-600">&lt;</span>
                    Pass
                    <span className="text-green-600">OP/&gt;</span>
                </div>
                <p className="text-green-900 text-lg text-center">
                    Your own Password Manager
                </p>

                {/* Input Section */}
                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input
                        value={form.site}
                        name="site"
                        onChange={handleChange}
                        className="rounded-full text-black px-3 border border-green-500 w-full"
                        type="text"
                        placeholder="Enter Website URL"
                        id='website'
                    />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                        <input
                            value={form.username}
                            name="username"
                            onChange={handleChange}
                            className="rounded-full text-black px-3 border border-green-500 w-full"
                            type="text"
                            placeholder="Enter Username"
                            id='username'
                        />

                        {/* Password Input with Toggle */}
                        <div className="relative w-full">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={form.password}
                                name="password"
                                onChange={handleChange}
                                className="rounded-full text-black px-4 border border-green-500 w-full"
                                placeholder="Enter Password"
                                id='password'
                            />
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={togglePassword}
                            >
                                <img
                                    className="p-1 w-7"
                                    src={
                                        isPasswordVisible
                                            ? 'public/icon/hidden.png'
                                            : 'public/icon/eye.png'
                                    }
                                    alt="toggle password"
                                />
                            </span>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={savePassword}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold px-5 py-2 rounded-full w-fit hover:bg-green-500 transition-colors border border-green-700"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        ></lord-icon>
                        Save Password
                    </button>
                </div>

                {/* Password List */}
                <div className="password">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>

                    {passwordArray.length === 0 ? (
                        <div className="text-red-600 font-semibold">No Passwords Saved</div>
                    ) : (
                        <table className="table-auto w-full bg-green-800 text-white rounded-lg mb-2 overflow-hidden">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-center">Website</th>
                                    <th className="px-4 py-2 text-center">Username</th>
                                    <th className="px-4 py-2 text-center">Password</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-200">
                                {passwordArray.map((item, index) => (
                                    <tr key={index} className="hover:bg-green-300">
                                        <td className="border px-4 text-green-800 py-2 text-center  gap-2 ">
                                            <div className='flex  items-center justify-between' onClick={() => copyText(item.site)}>
                                                <a href={item.site} target="_blank" rel="noreferrer">
                                                    <span>{item.site}</span>
                                                </a>
                                                <lord-icon
                                                    onClick={() => handleEdit(item)}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                                ></lord-icon>
                                            </div>
                                        </td>
                                        <td className="border px-4 text-green-800 py-2 text-center">
                                            <div className='flex items-center justify-between' onClick={() => copyText(item.username)}>
                                                <span>{item.username}</span>
                                                <lord-icon
                                                    onClick={() => handleEdit(item)}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                                ></lord-icon>
                                            </div>
                                        </td>
                                        <td className="border px-4 text-green-800 py-2 text-center">
                                            <div className='flex items-center justify-between' onClick={() => copyText(item.password)}>
                                                <span>{item.password}</span>

                                                <lord-icon
                                                    onClick={() => handleEdit(item)}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                                ></lord-icon>
                                            </div>
                                        </td>
                                        <td className="border px-4 text-green-800 py-2 text-center">
                                            <div className='flex items-center justify-around'>
                                                <span>
                                                    <lord-icon
                                                        onClick={() => handleEdit(item)}
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                                    ></lord-icon>
                                                </span>
                                                <span>
                                                    <lord-icon
                                                        onClick={() => handleDelete(item)}
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                                    ></lord-icon>
                                                </span>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
