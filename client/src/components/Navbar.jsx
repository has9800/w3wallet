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
        </nav>
    )
}

export default Navbar