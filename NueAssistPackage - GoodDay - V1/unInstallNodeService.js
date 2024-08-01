var Service = require('node-windows').Service;

var svc = new Service({
  name:'NueAssistListener',
  description: "Testing for node windows as a service",
  script: "./nueAssistListener.js"
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();