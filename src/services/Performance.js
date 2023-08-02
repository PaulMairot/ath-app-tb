import axios from "axios"
import { format } from 'date-fns'
import { formatDate } from '../services/Formating.js';

/**
 * Get a performance with athlete and race IDs
 * @param athlete_id - ID of the athlete
 * @param race_id - ID of the race
 * @returns performance found or empty array
 */
export async function getPerformance(athlete_id, race_id) {

    let url ='http://localhost:3000/performances?athlete=' + athlete_id + "&race=" + race_id;
  
    const res = await axios.get(url);
    if (res.status != 404) {
    return res.data
    } else {
    return []
    }
}

/**
 * Get a performance from race ID
 * @param race_id - ID of the race
 * @returns performance found or empty array
 */
export async function getPerformanceByRace(race_id) {

    let url = 'http://localhost:3000/performances?race=' + race_id;
  
    const res = await axios.get(url);
    if (res.status != 404) {
    return res.data
    } else {
    return []
    }
}

/**
 * Get a specific performance from its ID
 * @param {*} id - ID of the performance
 * @returns performance found or empty array
 */
export async function getPerformanceById(id) {

    let url ='http://localhost:3000/performances/' + id

    const res = await axios.get(url);
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
}

/**
 * Get latest performances of an athlete
 * @param athlete_id - ID of the athlete
 * @param limit - limit the number of results returned
 * @returns performance found or empty array
 */
export async function getLatestPerformance(athlete_id, limit) {
    let performances = [];
  
    let url = 'http://localhost:3000/performances?athlete=' + athlete_id;

    if (limit && limit > 0) {
        url += "&limit=" + limit
    }
    const res = await axios.get(url, { validateStatus: false });
  
    if (res.status != 404) {
    res.data.forEach(performance => {
        performances.push({
        "meeting": performance.race.meeting.name || "",
        "date": performance.race.meeting.startDate || "",
        "discipline": performance.race.discipline.distance + "m" || "",
        "result": performance.result || ""
        })
    });

    return performances
    } else {
    return []
    }
}

/**
 * Get highlights of a performance (rank, result and reaction time)
 * @param performance - Performance to get the highlights from
 * @returns Array with highlights
 */
export function getHighlights(performance) {
    return [
        {
            "text": performance.rank ? performance.rank : '-', 
            "icon": "podium.svg", 
            "legend": "Rank"
        },
        {
            "text": performance.result ? performance.result : '-', 
            "icon": "time.svg", 
            "legend": "Result",
            "accent": true
        },
        {
            "text": performance.reactionTime ? (performance.reactionTime<=0?"":"+") + performance.reactionTime + " s" 
                                                          : '-', 
            "icon": "push.svg", 
            "legend": "Reaction Time"
        }
    ]
}

/**
 * Get all speed from positions array
 * @param positions - Array of positions
 * @returns Array of all speeds in the race
 */
export function getSpeedArray(positions) {
    let speeds = [];

    positions.forEach(position => {

        let timeArray = position.time.split(/[:.]/g);
        position.time = format(new Date(1970, 1, 1, timeArray[0], timeArray[1], timeArray[2], timeArray[3]), "HHmmssSSS");

        speeds.push(
            {
                "time": parseInt(position.time, 10) / 1000,
                "speed": position.speed
            }
        )
    });

    return speeds;
}

/**
 * Get the average speed from array of value
 * @param speeds - Array of speeds
 * @returns Array of speed informations
 */
export function getAverageSpeedInfos(speeds) {
    let sum = 0;
    speeds.forEach(item => {
        sum += item.speed;
    });
    sum /= speeds.length;

    if (!isNaN(sum)) {
        return [{
            "text": sum.toFixed(2) + " km/h", 
            "icon":"speed.svg", 
            "legend":"Average"
        }]
    } else {
        return [{
            "text": "-", 
            "icon":"speed.svg", 
            "legend":"Average"
        }]
    }
}

/**
 * Get an array of pressures and times
 * @param pressures - array of pressure
 * @param times - array of times
 * @returns Array with pressures/times
 */
export function getPressureArray(pressures, times) {
    let pressuresArray = [];

    pressures.forEach((pressure, index) => {
        pressuresArray.push(
            {
                "time": times[index],
                "pressure": pressure
            }
        )
    });

    return pressuresArray;
}

/**
 * Get reaction time informations
 * @param performance - Performance to get reaction time informations from
 * @returns Array of reaction time informations
 */
export function getReactionTimeInfos(performance) {
    return {
        "text": performance.reactionTime != undefined ? (performance.reactionTime<=0?"":"+") + performance.reactionTime + " s" 
                                                 : '-', 
        "icon":"push.svg", 
        "legend":"Reaction Time"
    }
}

/**
 * Get athlete informations (Date of birth, nationality, disciplines)
 * @param performance - Performance to get athlete's informations from
 * @returns Array of athlete informations
 */
export function getAthleteInfos(performance) {
    let athleteInfosArray = [];
    if (performance.athlete.dateOfBirth) {
        athleteInfosArray.push({
            "text": formatDate(performance.athlete.dateOfBirth.replace(/-/g, ".")), 
            "icon": "calendar.svg", 
            "legend": "Date of birth"
        })
    }

    if (performance.athlete.nationality) {
        athleteInfosArray.push({
            "text": performance.athlete.nationality.name, 
            "icon": performance.athlete.nationality.alpha2, 
            "legend": "Nationality"
        })
    }

    if (performance.athlete.discipline) {
        let disciplines = []

        performance.athlete.discipline.forEach(discipline => {
            
            if (discipline.type == 'none') {
                disciplines.push(discipline.distance + "m")
            } else {
                disciplines.push(discipline.distance + "m " + discipline.type.charAt(0).toUpperCase() + discipline.type.slice(1))
            }
        });

        athleteInfosArray.push({
            "text": disciplines.join(' / '), 
            "icon": "shoe.svg", 
            "legend": "Disciplines"
        })
    }

    return athleteInfosArray;
}
