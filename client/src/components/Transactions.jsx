import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

// custom useFetch hook to fetch gifs
import useFetch from '../hooks/useFetch';

// import test data
import testData from '../utils/testData';

// shorten address util function
import { shortenAddress } from '../utils/shortenAddress';

// transaction card component
const TransactionCard = ({     
    addressTo, 
    addressFrom, 
    timestamp, 
    message, 
    keyword, 
    amount, 
    url }) => {
        // fetch gifs
        const gifUrl = useFetch({ keyword });

        return (
            <div className="blue-glassmorphism ring-1 hover:ring-4 m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:cursor-pointer hover:shadow-2xl hover:scale-95 hover:transition duration-200 ease-out
            ">
                <div className="flex flex-col items-center w-full mt-3" onClick={() => window.open(`https://ropsten.etherscan.io/address/${addressTo}`)}>
                    <div className="w-full mb-6 p-2">
                        <a href={`https://ropsten.etherscan.io/address/${addressFrom}`}
                        target="_blank" rel="noopener noreferrer"
                        >
                            <p className="text-white text-base font-bold">From: <span className="font-thin">{shortenAddress(addressFrom)}</span></p>
                        </a>
                        <a href={`https://ropsten.etherscan.io/address/${addressTo}`}
                        target="_blank" rel="noopener noreferrer"
                        >
                            <p className="text-white text-base font-bold">To: <span className="font-thin">{shortenAddress(addressTo)}</span></p>
                        </a>
                        <p className="text-white text-base font-bold">Amount: <span className="font-thin">{amount}</span></p>
                        {message && (
                            <>
                                <br />
                                <p className="text-white text-base font-bold">Message: <span className="font-thin">{message}</span></p>
                            </>
                        )}
                    </div>
                    <img src={gifUrl || url} alt="gif" className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover" />
                        <div className="bg-[#0f0e13] p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                            <p className="text-white text-sm font-bold">{timestamp}</p>
                        </div>
                </div>
            </div>
        )
}

const Transactions = () => {
    const { currentAccount, transactions } = useContext(TransactionContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">Connect an account to see transactions</h3>
                )}

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Transactions