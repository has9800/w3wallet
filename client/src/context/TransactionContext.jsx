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

    console.log({
        provider,
        signer,
        transactionContract
    })
}

// context provider
export const TransactionProvider = ({ children }) => {
    // account state
    const [currentAccount, setCurrentAccount] = useState('');

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

    // call isWalletConnected function onMount
    useEffect(() => {
        isWalletConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
            {children}
        </TransactionContext.Provider>
    );
}