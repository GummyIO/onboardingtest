import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from '../src/axios/axios';

function App() {
    const [signer, setSigner] = useState(null);
    const [, setProvider] = useState(null);
    const [isInstalled, setIsInstalled] = useState('');
    const [body, setBody] = useState({});
    const [address, setAddress] = useState(localStorage.getItem('walletAddress') || null);

    useEffect(() => {
        connectWallet();
        localStorage.setItem('walletAddress', address);
    }, [address]);

    // connect wallet
    const connectWallet = async () => {
        try {
            let currentProvider, currentSigner, walletAddress;

            if (!window.ethereum) {
                setIsInstalled('MetaMask not installed.');
                const currentProvider = ethers.getDefaultProvider();
                setProvider(currentProvider);
            } else {
                currentProvider = new ethers.BrowserProvider(window.ethereum);
                setProvider(currentProvider);

                currentSigner = await currentProvider.getSigner();
                setSigner(currentSigner);

                walletAddress = await currentSigner.getAddress();
                setAddress(walletAddress);
            }
        } catch (err) {
            alert('Connect your wallet');
            console.error(err);
        }
    };

    // handle inputs
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name;
        const value = form.value;
        const newBody = { ...body };
        newBody[name] = value;

        setBody(newBody);
    };

    // signUp
    const signUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/${address}/nonce/signup`);
            const message = res.data.data.messageToSign;

            const signMessage = await signer.signMessage(message);
            const data = { name: body.name, email: body.email, signature: signMessage };

            const signUpResponse = await axios.post(`/${address}/signup`, data);

            const { token } = signUpResponse.data.data;
            localStorage.setItem('jwt', token);

            alert('Successfully signed up!');
        } catch (err) {
            alert(err.response.data.error.message);
            console.log(err.response.data.error.message);
        }
    };

    // signIn
    const signIn = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`/${address}/nonce/signin`);
            const message = res.data.data.messageToSign;

            const signMessage = await signer.signMessage(message);
            const data = { signature: signMessage };

            const signInResponse = await axios.post(`/${address}/signin`, data);

            const { token } = signInResponse.data.data;
            localStorage.setItem('jwt', token);

            alert('Successfully signed in!');
        } catch (err) {
            alert(err.response.data.error.message);
            console.error(err.response.data.error.message);
        }
    };

    return (
        <div className="App">
            <h3>Auth Frontend</h3>
            <p>{isInstalled}</p>
            <h2>Wallet address: {address}</h2>
            <form onSubmit={signUp}>
                <input onChange={handleSubmit} type="text" name="name" placeholder="your name" required />
                <input onChange={handleSubmit} type="email" name="email" placeholder="email address" required />
                <button type="submit">Sign Up</button>
            </form>
            <button onClick={signIn}>Sign In</button>
        </div>
    );
}

export default App;
