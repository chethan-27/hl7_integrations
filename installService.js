const { auto } = require('async');

const Service = require('node-windows').Service

const svc = new Service({
    name: "NueAssistListener",
    description: "Testing for node windows as a service",
    script: "./nueAssistListener.js",
    nodeOptions:['--harmony', '--max_old_space_size=4096']
});

//svc.startType = 'Manual';
svc.on('install', function()
{
   
    svc.start();  
   // svc.setOption('start', 'auto');  
})

svc.install()

