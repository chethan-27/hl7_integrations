const net = require('net');
const logger = require('./loggerPage.js');
const config = require('./config.json');
 
//  const NueAssistIP = "13.233.73.116"; - For Develop
//  const NueAssistIP = "13.201.73.158"; - For Staging
//  const NueAssistIP = "54.191.80.252"; - For Production
//  const NueAssistOrderPort = 31006; - For all environments
 
const NueAssistIP = config?.NueAssistIP;
const NueAssistOrderPort = config.NueAssistOrderPort;
 
 const PharmacyHost = config ? config.nueAssistListener : "172.31.22.68";
 const PharmacyOrdersPort = config.PharmacyOrdersPort;
 
 
 
 const logData = (title, content) => {
    try{
        console.log(`${title}\n`);
        if(content) console.log(`${content}\n`);
 
        if(logger) {
            logger.info(`${title}\n`);
            if(content) logger.info(`${content}\n`);
        }
    }catch(e){
        logger.info(`Error in logData ${e}\n`);
    }
}
 
 const sendToNueAssistOrdersServer = (buffer, socket) => {
    try{
        logData('Inside sendToNueAssistOrdersServer');
        const data = buffer.toString();
        const NewAssistOrdersSocket = new net.Socket();
 
        NewAssistOrdersSocket.connect(NueAssistOrderPort, NueAssistIP, () => {
            logData(`\nConnected to NueAssistOrdersServer ${NueAssistOrderPort}, ${NueAssistIP}`);
            NewAssistOrdersSocket.write(data);
        });
 
        NewAssistOrdersSocket.on('data', (ack) => {
            console.log(`\nReceived ACK from NueAssistOrdersServer: ${ack.toString()}`);
            socket.write(ack);
            // socket.end();
            // NewAssistOrdersSocket.end();
        });
 
        NewAssistOrdersSocket.on('close', (data) => {
            console.log('NueAssistOrdersServer connection closed:', data.toString());
        });
        NewAssistOrdersSocket.on('error', (data) => {
            console.log('Error from NueAssistOrdersServer:', data.toString());
        });
     }catch(e){
        logData(`Error in sendToNueAssistOrdersServer ${e}`);
    }
}
 
 const isTestConnection = (buffer, type) => {
    try{
        let data = buffer.toString().split('\n')[0];
        return data === type;
    }catch(e){
        logData(`Error in isTestConnection ${e}`);
    }
}
 
module.exports = {
    PharmacyOrdersPort,
    PharmacyHost,
    logData,
    sendToNueAssistOrdersServer,
    isTestConnection
}