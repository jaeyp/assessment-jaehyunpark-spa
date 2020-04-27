import React, { useState, useEffect } from 'react';
import './style.css'
import logo from '../../assets/images/logo.svg'

const Logo = ({ title }) => {
    return (
        <div className="pl-4 flex items-center">
            <img src={logo} width="40px" alt="" />
            <a href="/#" className="no-underline hover:no-underline font-bold text-2xl lg:text-4xl ml-3">{title}</a>
        </div>
    )
}

const Menu = ({ scrolled }) => {
    const styles = {
        button: "mx-auto lg:mx-0 hover:underline bg-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow " +
            (scrolled ? "gradient text-white" : "text-gray-800 opacity-75")
    }
    return (
        <>
            <div className="block lg:hidden pr-4">
                <button id="nav-toggle" className="flex items-center p-1 text-blue-800 hover:text-gray-900">
                    <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>

            <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
                <ul className="list-reset lg:flex justify-end flex-1 items-center">
                    <li className="mr-3">
                        <a className="inline-block py-2 px-4 text-black font-bold no-underline" href="/#">Active</a>
                    </li>
                    <li className="mr-3">
                        <a className="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="/#">link</a>
                    </li>
                </ul>
                <button id="navAction" className={styles.button}>Action</button>
            </div>
        </>
    )
}

export default () => {
    const [scrolled, setScrolled] = useState(false)
    const style = {
        header: "fixed w-full z-30 top-0 " + (scrolled ? "text-blue-700 bg-indigo-100" : "text-white"),
        contents: "w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2",
        border: "border-b opacity-50 my-0 py-0 " + (scrolled ? "border-indigo-100" : "border-gray-100")
    }

    const handleScroll = () => {
        const scrolled = window.pageYOffset ? true : false
        setScrolled(scrolled)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => { window.removeEventListener('scroll', handleScroll) }
    }, [])

    return (
        <nav id="header" className={style.header}>
            <div className={style.contents}>
                <Logo title="Shakepay" />
                <Menu scrolled={scrolled} />
            </div>
            <hr className={style.border} />
        </nav>
    )
}