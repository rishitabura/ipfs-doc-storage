import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Web3 from 'web3';
import DocDep from '../contracts/DocDep.json';
import contract from '../contracts/contract-address.json';
import { UserContext } from '../contexts/UserContext';

const web3 = new Web3(window.ethereum);
const doccon = new web3.eth.Contract(DocDep.abi, contract.docdep);

const MyFiles = () => {
  const { user } = useContext(UserContext);
  const [ownedDocs, setOwnedDocs] = useState([]);

  useEffect(() => {
    const fetchOwnedDocs = async () => {
      try {
        // Fetch the list of owned documents
        const response = await doccon.methods.getDocsOwner().call({ from: user });
        setOwnedDocs(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching owned documents:", error.message);
      }
    };

    fetchOwnedDocs();
  }, []);

  return (
    <div>
      <h2>My Documents</h2>
      <ul>
        {ownedDocs
          .filter(doc => doc.docHash && doc.docName) // Filter out entries with blank hash or name
          .map((doc) => (
            <li key={doc.docHash}>
            
             
              <Link to={`/view/${(doc.docName || '').split('.').pop().toLowerCase()}/${doc.docHash}/${doc.encKey}`}>
                {doc.docName}
              </Link>
              <button>
                <Link to={`/share/${doc.docHash}/${doc.encKey}`}>Share</Link>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyFiles;
