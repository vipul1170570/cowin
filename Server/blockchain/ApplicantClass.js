class Applicant {
	constructor(phaseID, candidateId, vaccineId) {
		this.candidateId = candidateId
		this.vaccineId = vaccineId
		this.phaseID = phaseID
	}
}

module.exports = {
	Applicant: Applicant
}
