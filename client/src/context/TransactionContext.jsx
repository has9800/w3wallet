import { useEffect, useState, createContext } from "react";
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../utils/constants';

export const TransactionContext = createContext();

// ethereum window object provided by MetaMask in browser
const { ethereum } = window;

// use ABI and deployed smrt contract address to init app on client
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer)

    // return transaction contract to use for sending currency
    return transactionContract;
}

// context provider
export const TransactionProvider = ({ children }) => {
    // <<<--------STATE----------
    // account state
    const [currentAccount, setCurrentAccount] = useState('');

    // form submission state
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    })

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // tx count state
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))

    // transaction list to use in TransactionCard to list
    const [transactions, setTransactions] = useState([]);

    // handle form inputs to dynamically change state
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }

    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Please install MetaMask extension to connect to the Ethereum Blockchain and send transcactions. Close this pop-up to continue");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            console.log(availableTransactions)

            // structure transactions to access on window easier and display on TransactionCard component
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressFrom: transaction.sender,
                addressTo: transaction.receiver,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex / (10 ** 18)) // values in eth are in hex, convert back
            }))

            setTransactions(structuredTransactions)
            console.log(structuredTransactions)
        } catch (error) {
            console.log(error)
        }
    }
 
    // check if ethereum obj provided by MetaMask is present
    const isWalletConnected = async () => {
        try {
            if(!ethereum) return alert("Please install MetaMask extension to connect to the Ethereum Blockchain and send transcactions. Close this pop-up to continue");
            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            // if account is present, set `currentAccount` state
            if(accounts.length) {
                setCurrentAccount(accounts[0])
                getAllTransactions();
            } else {
                console.log('No Accounts Found!');
            }
        } catch (error) {
            console.log(error)
            alert("Could not connect wallet")
            throw new Error("No Ethereum Object found")
        }
    }

    // check if transactions exist
    const existingTransactions = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transActionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem('transactionCount', transActionCount)
        } catch (error) {
            throw new Error("No Ethereum Object found")
        }
    }

    // button functionality to connect to MetaMask extension
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("You need to install MetaMask extension to continue");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            // set current account to first in arr returned by MetaMask
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
            alert("Could not connect wallet")
            throw new Error("No Ethereum Object found")
        }
    }

    // send transactions frm one address to another
    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("You need to install MetaMask extension to continue");

            // get data frm form
            const { addressTo, amount, keyword, message } = formData;

            // transfer `amount` into GWEI to send
            const parsedAmount = ethers.utils.parseEther(amount);

            // use `transactionContract` to now call all contract related funcs
            const transactionContract = getEthereumContract()


            // send eth on blockchain here ->
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount._hex
                }]
            })

            // call `transactionContract` via sol method to add the transaction to the blockchain, returns tx hash
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            
            // set loading state
            setIsLoading(true)
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();

            setIsLoading(false)
            console.log(`Success - ${transactionHash.hash}`);

            const transActionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transActionCount.toNumber())

            // reload the page when transaction is complete
            window.reload();
        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum Object found")
        }
    }

    // call isWalletConnected function onMount
    useEffect(() => {
        isWalletConnected();
        existingTransactions();
    }, [])

    return (
        <TransactionContext.Provider value={{ 
            connectWallet, 
            currentAccount, 
            formData, 
            setFormData, 
            handleChange, 
            sendTransaction,
            transactions,
            isLoading
            }}>
            {children}
        </TransactionContext.Provider>
    );
}