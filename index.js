require('regenerator-runtime/runtime')

const telemetryLib = require('ibt-telemetry')
const fs = require('fs')

const pathToIbt = './telemetry_file.ibt'
let logSample = false
let params = []

var argv = require('minimist')(process.argv.slice(2))

if (argv.params && argv.params !== '') {
    params = argv.params.split(',')
}
if (argv.logSample && argv.logSample !== '') {
    logSample = argv.logSample
}

// Change this list manually (for now) if you want to change the params output in the CSV
const defaultParams = ['Speed','Throttle','Brake','Clutch','Gear','RPM','LapDistPct','LapDist','Lap','LapBestLap','LapBestLapTime','TrackTemp','PlayerCarTeamIncidentCount','PlayerCarMyIncidentCount','PlayerCarDriverIncidentCount','Lat','Lon','SteeringWheelAngle','FuelLevel']
if (params.length === 0) {
    params = defaultParams
}

console.log('Generating CSV using the following params:')
console.log(params)

let csvString = params.toString() + "\n";
const telemetry = telemetryLib.Telemetry.fromFile(pathToIbt).then((promisedData) => {
    let index = 0
    for (sample of promisedData.samples()) {
        if (logSample && index == 1) {
            console.log('Logging single sample:')
            console.log(sample.toJSON())
        }
        let current = [];
        for (paramIndex in params) {
            param = sample.getParam(params[paramIndex]);
            if (param !== null && typeof param !== undefined) {
                current.push(param.value)
            } else {
                current.push('')
            }
        }
        csvString += current.toString() + "\n"
        index++
    }
    fs.writeFile('./output.csv', csvString, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
     })
     console.log('CSV successfully created.')
})
