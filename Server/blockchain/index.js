const express = require('express')
const ApplicationChainModule = require('./ApplicantChain')
const bodyParser = require('body-parser')

const app = express();
const http_port = process.env.HTTP_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const ApplicationChain = new ApplicationChainModule.ApplicantChain()
ApplicationChain.addnewBlockChain()



const initRoutes = () => {
    app.post('/create', (req, res) => res.send({"index": ApplicationChain.addnewBlockChain()}))
    app.get('/length', (req, res) => res.send({"length": ApplicationChain.getLength()}))
    app.get('/blocks', (req, res) => res.send(ApplicationChain.getApplicationChain()))
    app.get('/blocks/:id', (req, res) => res.send(ApplicationChain.getSpecificBlockChain(req.params.id)))
    app.post('/Application/:id', castApplication)
    app.get('/ApplicationCount/:id', (req, res) => res.send(ApplicationChain.countApplications(req.params.id)))
    app.get('/', (req, res) => res.send("BlockChain Running here......."))
    app.get('*', (req, res) => res.send("Route Not Found. Please request proper routes"))
    app.get('/contains/:id', checkConatins)
}

function castApplication(req, res) {
    return res.send(ApplicationChain.addApplication(req.params.id, req.body.candidateId, req.body.ApplicationrId))
}

function checkConatins(req, res) {
    return res.send(Applicationchain.checkApplicant(req.params.id, req.body.vaccineId))
}

initRoutes()

app.listen(http_port, () => console.log("Http Routes Listening on port: ", http_port))