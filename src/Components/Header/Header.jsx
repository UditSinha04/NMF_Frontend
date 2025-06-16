import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
    const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));

    useEffect(() => {
        // Listen for login/logout events
        const onStorage = () => setIsAdmin(!!localStorage.getItem('adminToken'));
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-[#f5f5dc] border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap items-center mx-auto max-w-screen-xl justify-between">
                    <Link to="/" className="flex flex-col items-center">
                        <img
                            src="/Images/nmf.png"
                            className="h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div
                        className="flex-1 flex justify-center"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 items-center">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/gallery"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    Gallery
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/donate"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    Donate
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Team"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    Our Team
                                </NavLink>
                            </li>
                            {isAdmin && (
                                <li>
                                    <NavLink
                                        to="/reports"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                        }
                                    >
                                        Reports
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}