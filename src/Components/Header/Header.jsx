import React from 'react'
import {Link, NavLink} from 'react-router-dom'

export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-[#f5f5dc] border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex flex-col items-center">
                        <img
                            src="/Images/nmf.png"
                            className="h-12"
                            alt="Logo"
                        />
                        
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <NavLink
                            to="/admin"
                            className={({isActive}) =>
                                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                            }
                        >
                            Admin
                        </NavLink>
                        {/* <Link
                            to="#"
                            className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link> */}
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/gallery"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    Gallery
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/donate"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    Donate
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Team"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-gray-800" : "text-gray-600"} border-b border-gray-100 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 hover:text-gray-800 lg:p-0`
                                    }
                                >
                                    Our Team
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}