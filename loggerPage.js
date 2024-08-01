const { createLogger, format, transports } = require("winston");
const { join } =  require('path');
const DailyRotateFile =  require('winston-daily-rotate-file');

// const { fileURLToPath } = require('url');
// const { dirname } = require('path');
// const __dirname = dirname(fileURLToPath(import.meta.url));

const transport = new DailyRotateFile({
    filename: join(__dirname, 'logs/application-%DATE%.log'),
    format: format.combine(
                format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                format.align(),
                format.printf(
                    (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
                )
            ),
    // datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20mb',
    maxFiles: '14d'
  });

transport.on('rotate', function(oldFilename, newFilename) {
    console.log('Log files rotated',oldFilename,newFilename)
});

const logger = createLogger({
    transports: [
        transport
    ]
});

module.exports = logger;