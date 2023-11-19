import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import UserDep from "../contracts/UserDep.json";

const Temp = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const web3 = new Web3(window.ethereum);
  const usercon = new web3.eth.Contract(UserDep.abi, '0x70175544c5e1c0fa606daee8e4970f73f97208c9');

  useEffect(() => {
    // Check if the user is already connected when the component mounts
    accountChangedHandler();
  }, []);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUser(accounts[0]);
        await checkUserRole();
      } catch (err) {
        console.error(err.message);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const accountChangedHandler = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async (accounts) => {
        setUser(accounts[0]);
        await checkUserRole();
      });
    } else {
      setUser("");
      alert("Please install MetaMask");
    }
  };

  const checkUserRole = async () => {
    try {
      const userRole = await usercon.methods.getUserRole().call();
      setUserRole(userRole);

      // Redirect the user based on their role
      
    } catch (error) {
      console.error('Error checking user role:', error.message);
      setErrorMessage('Error checking user role.');
   
    }
  };

  return (
    <div>
      <button onClick={connectWalletHandler}>Connect Wallet</button>
      {user && (
        <div>
          <p>User Address: {user}</p>
          <p>User Role: {userRole}</p>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Temp;
