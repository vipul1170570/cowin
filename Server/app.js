const express = require('express');
const app = express();
const Joi = require('joi');
const ApplicationChainModule = require('./blockchain/ApplicantChain');

var cors = require('cors')
app.use(cors())

const ApplicationChain = new ApplicationChainModule.ApplicantChain()
ApplicationChain.addnewBlockChain();



app.use(express.json());

app.get('/', (request, response) => {
    response.send("welcome to the apis section of Cowin app");
});



function GetVaccineId(vaccineName) {
    switch (vaccineName) {
        case "Covishield":
            return 1;
        case "Covaxin":
            return 2;
        case "J&J":
            return 3;
        case "Sputnik":
            return 4;
    }
    return 5;
};

function GetVaccineName(vaccineId) {
    let vaccines = ["Covishield", "Covaxin", "J&J", "Sputnik", "No vaccine"];
    return vaccines[parseInt(vaccineId) - 1];
}

app.post('/add/patient/', (request, response) => {

    // console.log(request.body.name);

    const schema = {
        name: Joi.string().min(3).required(),
        phoneNumber: Joi.string().min(3).required(),
        aadharNumber: Joi.string().min(3).required(),
        vaccineName: Joi.string().min(2).required(),
        aadharXml: Joi.string().min(1).required(),
        phaseId : Joi.string().min(1).required(),
    }

    const result = Joi.validate(request.body, schema);

    if(result.error) { 
        response.status(200).send(result.error.details[0].message);
        return;
    }

    console.log("Data arrived");

    if(GetVaccineId(request.body.vaccineName) == 5) {
        response.status(200).send(`${request.body.vaccineName} Vaccine is not available`);
    }

    // verfiy aadhar details
    verfiyAadharDetails(request, response);
    // add the element in blockchain
    castApplication(request,response);
});


function castApplication(req, res) {
    let msg = ApplicationChain.addApplicant(req.body.phaseId, req.body.aadharNumber, GetVaccineId(req.body.vaccineName));
    return res.status(200).send(msg);
}


function verfiyAadharDetails(req, res) {
    console.log("AAdhar Verified");


    // const aadhaarJson = aadhar.giveAadhaarJSON(req.body.aadharXml, {});
    // const signatureValue = aadhaarJson.signatureValue;


    // const KeyFilePath = "/Users/vipulbansal/Downloads/okyc-publickey.cer";
    // const ObjX509Certificate = new X509Certificate(KeyFilePath, "public"); //Initialize the public ket certificate file        
    // // const objX509Certificate = new Org.BouncyCastle.X509.X509Certificate();
    // const objX509CertificateParser = new X509CertificateParser();
    // objX509Certificate = objX509CertificateParser.ReadCertificate(ObjX509Certificate.GetRawCertData());

    // const signer = SignerUtilities.GetSigner("SHA256withRSA");


    // /* Populate key */
    // signer.Init(false, objX509Certificate.GetPublicKey());
    // var expectedSig = Convert.FromBase64String(signatureValue);

    // /* Get the bytes to be signed from the string */
    // var msgBytes = Encoding.UTF8.GetBytes(ObjXmlDocument.InnerXml);

    // /* Calculate the signature and see if it matches */
    // signer.BlockUpdate(msgBytes, 0, msgBytes.Length);

    // const Flag = signer.VerifySignature(expectedSig);
    // // Console.WriteLine("\n\n\n");
    // // const Flag = false;
    // if (Flag)
    // {
    //     Console.log("XML Validate Successfully");
    // }
    // else
    // {
    //     Console.log("XML Validation Failed");
    // }


}

app.post('/getdetails/', (request, response) => {

    const schema = {
        name: Joi.string().min(3).required(),
        phoneNumber: Joi.string().min(3).required(),
        aadharNumber: Joi.string().min(3).required(),
        phaseId : Joi.string().min(1).required(),
    }

    const result = Joi.validate(request.body, schema);

    if(result.error) { 
        response.status(400).send(result.error.details[0].message);
        return;
    }

    let vaccineName = GetVaccineName(ApplicationChain.getVaccineID(request.body.phaseId, request.body.aadharNumber));
    return response.status(200).send(`${vaccineName} is avaliable for ${request.body.name}`);

});

const port = process.env.PORT || 3001;
app.listen(port, () => {console.log(`Listening on port ${port}...`)});