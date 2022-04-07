import { AiFillPlayCircle  } from "react-icons/ai"
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
 
import { Loader } from "./"

// common styles for grid's dynamic class
const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => {
    // const handleChange = () => {

    // }

    return (
        <input 
            placeholder={placeholder}
            name={name}
            type={type}
            step={0.0001}
            value={value}
            // onChange={() => handleChange(e, name)}
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
    )
}

const Welcome = () => {
    // connect to metamask wallet
    const connectWallet = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex flex-col mf:flex-row items-start justify-between md:p-20 py-12 px-4">

                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-left text-4xl md:text-5xl text-white text-gradient py-1">
                        Send crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world, buy and sell cryptocurrencies on Qrypt
                    </p>
                    <button
                     type="button" onClick={connectWallet}
                     className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer
                     hover:bg-[#2546bd] hover:transition duration-200 ease-out"
                     >
                    <p className="text-white text-base font-semibold">Connect Wallet</p>
                    </button>
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
                        <div className={`rounded-tr-2xl sm:rounded-tr-none ${commonStyles}`}>Security </div>
                        <div className={`md:rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
                        <div className={`md:rounded-bl-2xl ${commonStyles}`}>Web3.0</div>
                        <div className={`rounded-bl-2xl sm:rounded-bl-none ${commonStyles}`}>Low gas fees</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>Multichain</div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-60 md:h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-black flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#000" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#000" /> 
                            </div>
                            <div>
                                <p className="text-black font-medium text-sm">
                                    0xajknsxc...ds394jk
                                </p>
                                <p className="text-black font-light text-lg my-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        {/* missing handleChange() */}
                        <Input placeholder="Address to" name="addressTo" type="text"  />
                        <Input placeholder="Amount ETH" name="amount" type="number"   />
                        <Input placeholder="Keyword GIF" name="keyword" type="text"   />
                        <Input placeholder="Message" name="message" type="text"   />

                        <div className="h-[1px] w-full bg-gray-400 my-5" />

                        {false ? (
                            <Loader />
                        ) : (
                            <button 
                            type="button" 
                            onClick={handleSubmit}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-[#2952e3] hover:border-[#2952e3] hover:transition duration-200 ease-out"
                            >Send now</button>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Welcome