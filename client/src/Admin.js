import React from 'react'
import {useState} from 'react';
import Axios from 'axios';
import './User.css';
function Admin() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState(0);
    const [aadhar, setAadhar] = useState(0);
    const [res, setRes] = useState("");

    // const displayInfo = () => {
    //     console.log(name + phone + aadhar);
    // };
    
    const getResult = () =>  {
        Axios.post('http://localhost:3001/getdetails/', {
            name: name,
            phoneNumber: phone, 
            aadharNumber: aadhar,
            phaseId: "2"    
        }).then((response) => {
            console.log("success");
            setRes(response.data)
          });
    };

    return(
        <div className="form-style-10">
            <h1>Admin</h1>  
            <div className="information">
                <label>Name:</label>
                <input type="text" onChange={(cl)=>{setName(cl.target.value);}}/>  
                <label>Phone number:</label>
                <input type="number" onChange={(cl)=>{setPhone(cl.target.value);}}/>  
                <label>Aadhar number:</label>
                <input type="number" onChange={(cl)=>{setAadhar(cl.target.value);}}/>  
                <p>{"\n"}</p>
                <button onClick={getResult} className = "btn-submit">Check Status</button>
                <label>{res}</label>
            </div>
        </div>
    );
}

export default Admin;