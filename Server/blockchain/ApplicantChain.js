const Applicant = require('./ApplicantClass')
const blockchain = require('./blockchain')

class ApplicantChain {
    constructor() {
        this.ApplicantChain = []
        console.log("Application Chain Instanitated")
    }

    getLength() {
        return this.ApplicantChain.length
    }

    getApplicantChain() {
        return this.ApplicantChain
    }

    addnewBlockChain() {
        const chain = new blockchain.Blockchain()
        const index = this.ApplicantChain.length
        this.ApplicantChain.push(chain);
        return index
    }

    getSpecificBlockChain(index) {
        if(index >= this.ApplicantChain.length) {
            console.log("Invalid phase Id")
            return null
        }
        return this.ApplicantChain[index];
    }



    addApplicant(phaseID, candidateId, vaccineID) {

        while(this.ApplicantChain.length <= parseInt(phaseID)) {
            this.addnewBlockChain()
        }

        if(phaseID >= this.ApplicantChain.length) {
            console.log("Invalid phase Id")
            return "Invalid phase Id";
        }

        const blockchain = this.getSpecificBlockChain(parseInt(phaseID)).getBlockchain();
        for(var i=1; i<blockchain.length; i++) {
            if(blockchain[i].ApplicantData.candidateId == candidateId) {
                return "you are already registered";
            }
        }


        const ApplicantData = new Applicant.Applicant(phaseID, candidateId, vaccineID)
        const newBlock = this.ApplicantChain[phaseID].generateNextBlock(ApplicantData)
        this.ApplicantChain[phaseID].addBlock(newBlock)
        return "your details added successfully";
    }

    getVaccineID(phaseID, candidateId) {
        if(this.ApplicantChain.length <= parseInt(phaseID)) {
            return 5;
        }
        const blockchain = this.getSpecificBlockChain(parseInt(phaseID)).getBlockchain();
        for(var i = 1; i < blockchain.length; i++) {
            const savedCandidateId = blockchain[i].ApplicantData.candidateId
            if(candidateId == savedCandidateId) {
                return blockchain[i].ApplicantData.vaccineId;
            }
        }
        return 5;
    }

    

    checkApplicant(phaseID, candidateId) {
        if(index >= this.ApplicantChain.length) {
            console.log("Invalid phase Id")
            return null
        }

        var containCandidateId = false;

        const blockchain = this.getSpecificBlockChain(phaseID).getBlockchain();
        for(var i = 1; i < blockchain.length; i++) {
            const savedCandidateId = blockchain[i].ApplicantData.candidateId
            if(candidateId == savedCandidateId) {
                containCandidateId = true;
            }
        }

        return containCandidateId;
    }

}


module.exports = {
	ApplicantChain: ApplicantChain
}