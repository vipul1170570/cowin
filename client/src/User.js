import React from 'react'
import './User.css';
import {useState} from 'react';
import Axios from 'axios';
// import {parseString} from 'xml2js';

function User() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState(0);
    const [aadhar, setAadhar] = useState(0);
    const [vaccine, setVaccine] = useState("");
    const [res, setRes] = useState("");
    const [aadharxml, setAadharxml] = useState("");
    
    const addUser = () =>  {

        // console.log("aadhar is :  " + aadhar);
        // var url = aadhar;
        // fetch(url)
        //     .then((response) => response.text())
        //     .then((responseText) => {
        // parseString(responseText, function (err, result) {
        //     console.log(result);
        //     return result;
        //     });
        // this.setState({
        //     datasource : result
        //     })
        // })
        // .catch((error) => {
        // console.log('Error fetching the feed: ', error);
        // });

        Axios.post('http://localhost:3001/add/patient/', {
            name: name,
            phoneNumber: phone, // Gotta add the xml stuff here 
            aadharNumber: aadhar,
            vaccineName: vaccine,
            aadharXml:aadharxml,
            phaseId: "2"
        }).then((response) => {
            console.log("success");
            setRes(response.data);
            // setRes
          });
        //   console.log(res);
    };

    return(
        <div  className = "form-style-10">
            <h1>User  Details</h1>  
            <div className="information">
                <label>Name:</label>
                <input type="text" onChange={(cl)=>{setName(cl.target.value);}}/>  
                <label>Phone number:</label>
                <input type="number" onChange={(cl)=>{setPhone(cl.target.value);}}/>  
                <label>Aadhar number:</label>
                <input type="number" onChange={(cl)=>{setAadhar(cl.target.value);}}/>  
                <label>Vaccine</label>
                <input type="text"  onChange={(cl)=>{setVaccine(cl.target.value);}}/>  
                <label >Upload XML</label>
                <input type="file"  onChange={(cl)=>{setAadharxml(cl.target.value);}}></input>
                <p>{"\n"}</p>
                <button  onClick={addUser} className = "btn-submit">Register</button>
                <label>{res}</label>
            </div>
        </div>
    );
}

export default User;