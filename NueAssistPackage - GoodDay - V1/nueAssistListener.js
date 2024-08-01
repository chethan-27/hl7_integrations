const net = require('net');
const {
    PharmacyOrdersPort,
    PharmacyHost,
    logData,
    sendToNueAssistOrdersServer,
    isTestConnection,
} = require('./helpers.js');
const config = require('./config.json');
 
const setupOrderServer = () => {
    try{
        //Creating a TCP server to receive orders
        const orderServer = net.createServer((socket) => {
 
            //When socket gets data
            socket.on('data', (buffer) => {
 
                let data = buffer.toString();
 
                //Checking Test Mode
                let isTestMode = isTestConnection(buffer, "TESTORDERS");
                logData(`isTestMode is ${isTestMode}`);
               
                let dataToSend = isTestMode ? "Orders Test Message\n" : data;
                logData(`\nSuccessfully Received the Message from Source(${!isTestMode ? "RedSail-Orders" : "NueAssist-Orders"}): ${socket.remoteAddress} \nMessage: ${JSON.stringify(dataToSend)}`);
 
                if(!isTestMode){
                    //Sending Orders to NueAssist
                    sendToNueAssistOrdersServer(dataToSend, socket);
                }else{
                    socket.write(`Test Connection Successful for ${config?.pharmacy}: Version - ${config?.listenerVersion}`);
                }
 
            });
 
            //When socket gets error
            socket.on('error', (err) => {
                logData(`NueAssist Orders server is not up and running`, err);
            });
        });
 
        orderServer.listen(PharmacyOrdersPort, PharmacyHost, () => {
            logData(`Listener Orders server is running  @ ${PharmacyHost} : ${PharmacyOrdersPort}`);
        });
    }catch(e){
        logData("Error in setting up Order server in pharmacy listener ",e);
    }
}
 
const setup = () => {
    setupOrderServer();
}
 
setup();
 