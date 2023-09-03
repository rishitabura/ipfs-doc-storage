import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
// import { MdAccountCircle } from "react-icons/md";
// import { IoLogIn } from "react-icons/io5";
import "../styles/style.css";
// import "../styles/common.css";


const Home=()=>
{
    return(
       <body className="Main">
        <div className="container"><br/>
        <h1 className="Title">Welcome to DocSafe</h1>
        <h2 className="normaltext" style={{'text-align':'center'}}>Your Secure Document Vault powered by IPFS</h2>
        </div>
        </body>
       
    )
        
}
export default Home;