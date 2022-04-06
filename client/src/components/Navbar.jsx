import { useState } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

// navbar items for navigation menu list
const NavbarItem = ({ title, classProps }) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

const Navbar = () => {
    // navbar state 
    const [toggled, setToggled] = useState(false);

    return (
        <nav className="w-full flex justify-between md:justify-center items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <h1 className="text-gray-100 text-3xl font-extrabold w-32 cursor-pointer">Qrypt</h1>
            </div>
            <ul className="text-white flex-initial md:flex hidden list-none flex-row justify-between items-center">
                {["Market", "Exchange", "Docs", "Wallet"].map((item, index) => (
                    <NavbarItem key={item + index} title={item} />
                ))}
                <li 
                className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] hover:transition
                duration-200 ease-in-out"
                >Login</li>
            </ul>
            <div className="flex relative">
                {toggled ? (
                    <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggled(false)}  />
                ): (
                    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggled(true)}  />
                )}
                {toggled && (
                    <ul
                    className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                    flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in
                    "
                    >
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose onClick={() => setToggled(false)} />
                        </li>
                        {["Market", "Exchange", "Docs", "Wallet"].map((item, index) => (
                            <NavbarItem key={item + index} title={item} classProps="my-2 text-lg" />
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar