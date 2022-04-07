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
    // account state
    const [currentAccount, setCurrentAccount] = useState('');
    // form submission state
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    })

    // handle form inputs to dynamically change state
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }
 
    // check if ethereum obj provided by MetaMask is present
    const isWalletConnected = async () => {
        try {
            if(!ethereum) return alert("Please install MetaMask extension to connect to the Ethereum Blockchain and send transcactions. Close this pop-up to continue");
            const accounts = await ethereum.request({method: 'eth_accounts'});
    
            // if account is present, set `currentAccount` state
            if(accounts.length) {
                setCurrentAccount(accounts[0])
                // getAllTransactions();
            } else {
                console.log('No Accounts Found!');
            }
        } catch (error) {
            console.log(error)
            alert("Could not connect wallet")
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

    // send transactions
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
        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum Object found")
        }
    }

    // call isWalletConnected function onMount
    useEffect(() => {
        isWalletConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ 
            connectWallet, 
            currentAccount, 
            formData, 
            setFormData, 
            handleChange, 
            sendTransaction 
            }}>
            {children}
        </TransactionContext.Provider>
    );
}