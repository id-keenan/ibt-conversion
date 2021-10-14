require('regenerator-runtime/runtime')

const telemetryLib = require('ibt-telemetry')
const fs = require('fs')

const pathToIbt = './telemetry_file.ibt'

// Change this list manually (for now) if you want to change the params output in the CSV
const params = ['GPS Speed','GPS Nsat','GPS LatAcc','GPS LonAcc','GPS Slope','GPS Heading','GPS Gyro','GPS Altitude','GPS PosAccuracy','GPS SpdAccuracy','GPS Radius','GPS Latitude','GPS Longitude"SessionTime','SessionTick','SessionNum','SessionState','SessionUniqueID','SessionFlags','SessionTimeRemain','SessionLapsRemain','SessionLapsRemainEx','SessionTimeOfDay','DriverMarker','PushToPass','ManualBoost','ManualNoBoost','IsOnTrack','FrameRate','CpuUsageBG','PlayerCarPosition','PlayerCarClassPosition','PlayerTrackSurface','PlayerTrackSurfaceMaterial','PlayerCarIdx','PlayerCarTeamIncidentCount','PlayerCarMyIncidentCount','PlayerCarDriverIncidentCount','PlayerCarWeightPenalty','PlayerCarPowerAdjust','PlayerCarTowTime','PlayerCarInPitStall','PlayerCarPitSvStatus','PaceMode','OnPitRoad','SteeringWheelAngle','Throttle','Brake','Clutch','Gear','RPM','Lap','LapCompleted','LapDist','LapDistPct','LapBestLap','LapBestLapTime','LapLastLapTime','LapCurrentLapTime','LapLasNLapSeq','LapLastNLapTime','LapBestNLapLap','LapBestNLapTime','LapDeltaToBestLap','LapDeltaToBestLap_DD','LapDeltaToBestLap_OK','LapDeltaToOptimalLap','LapDeltaToOptimalLap_DD','LapDeltaToOptimalLap_OK','LapDeltaToSessionBestLap','LapDeltaToSessionBestLap_DD','LapDeltaToSessionBestLap_OK','LapDeltaToSessionOptimalLap','LapDeltaToSessionOptimalLap_DD','LapDeltaToSessionOptimalLap_OK','LapDeltaToSessionLastlLap','LapDeltaToSessionLastlLap_DD','LapDeltaToSessionLastlLap_OK','Speed','Yaw','YawNorth','Pitch','Roll','EnterExitReset','Lat','Lon','Alt','TrackTemp','TrackTempCrew','AirTemp','WeatherType','Skies','AirDensity','AirPressure','WindVel','WindDir','RelativeHumidity','FogLevel','PitsOpen','PitRepairLeft','PitOptRepairLeft','PitstopActive','FastRepairUsed','FastRepairAvailable','IsOnTrackCar','SteeringWheelPctTorque','SteeringWheelPctTorqueSign','SteeringWheelPctTorqueSignStops','SteeringWheelPctDamper','SteeringWheelAngleMax','ShiftIndicatorPct','ShiftPowerPct','ShiftGrindRPM','ThrottleRaw','BrakeRaw','HandbrakeRaw','EngineWarnings','FuelLevel','FuelLevelPct','PitSvFlags','PitSvLFP','PitSvRFP','PitSvLRP','PitSvRRP','PitSvFuel','TireLF_RumblePitch','TireRF_RumblePitch','TireLR_RumblePitch','TireRR_RumblePitch','SteeringWheelTorque','VelocityZ','VelocityY','VelocityX','YawRate','PitchRate','RollRate','VertAccel','LatAccel','LongAccel','dcStarter','dcPitSpeedLimiterToggle','dpRFTireChange','dpLFTireChange','dpRRTireChange','dpLRTireChange','dpFuelFill','dpWindshieldTearoff','dpFuelAddKg','dpFastRepair','dpLFTireColdPress','dpRFTireColdPress','dpLRTireColdPress','dpRRTireColdPress','WaterTemp','WaterLevel','FuelPress','FuelUsePerHour','OilTemp','OilPress','OilLevel','Voltage','ManifoldPress','RFbrakeLinePress','RFspeed','RFpressure','RFcoldPressure','RFtempL','RFtempM','RFtempR','RFtempCL','RFtempCM','RFtempCR','RFwearL','RFwearM','RFwearR','LFbrakeLinePress','LFspeed','LFpressure','LFcoldPressure','LFtempL','LFtempM','LFtempR','LFtempCL','LFtempCM','LFtempCR','LFwearL','LFwearM','LFwearR','RRbrakeLinePress','RRspeed','RRpressure','RRcoldPressure','RRtempL','RRtempM','RRtempR','RRtempCL','RRtempCM','RRtempCR','RRwearL','RRwearM','RRwearR','LRbrakeLinePress','LRspeed','LRpressure','LRcoldPressure','LRtempL','LRtempM','LRtempR','LRtempCL','LRtempCM','LRtempCR','LRwearL','LRwearM','LRwearR','RRshockDefl','RRshockVel','LRshockDefl','LRshockVel','RFshockDefl','RFshockVel','LFshockDefl','LFshockVel','LFrideHeight','RFrideHeight','LRrideHeight','RRrideHeight']

let csvString = params.toString() + "\n";
const telemetry = telemetryLib.Telemetry.fromFile(pathToIbt).then((promisedData) => {
    let samples = []
    let index = 0;
    for (sample of promisedData.samples()) {
        let current = [];
        for (paramIndex in params) {
            param = sample.getParam(params[paramIndex]);
            if (param !== null && typeof param !== undefined) {
                current.push(param.value)
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
})
