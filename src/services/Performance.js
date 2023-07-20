import axios from "axios"
import { format } from 'date-fns'
import Performance from '../services/PerformanceModel.js'

export async function getPerformance(athlete_id, race_id) {

    let url ='http://localhost:3000/performances?athlete=' + athlete_id + "&race=" + race_id;
  
      const res = await axios.get(url);
      if (res.status != 404) {
        return res.data
      } else {
        return []
      }
}

export async function getPerformanceByRace(race_id) {

    let url = 'http://localhost:3000/performances?race=' + race_id;
  
      const res = await axios.get(url);
      if (res.status != 404) {
        return res.data
      } else {
        return []
      }
}

export async function getPerformanceById(id) {

  let url ='http://localhost:3000/performances/' + id

    const res = await axios.get(url);
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
}

export async function getLatestPerformance(athlete_id, limit) {
    let races = [];
  
    let url = 'http://localhost:3000/performances?athlete=' + athlete_id;

    if (limit && limit > 0) {
        url += "&limit=" + limit
    }
    const res = await axios.get(url, { validateStatus: false });
  
      if (res.status != 404) {
        res.data.forEach(performance => {
          races.push({
            "meeting": performance.race.meeting.name || "",
            "date": performance.race.meeting.startDate || "",
            "discipline": performance.race.discipline.distance + "m" || "",
            "result": performance.result || ""
          })
        });

        return races
      } else {
        return []
      }
}

export function getHighlights(performance) {
    return [
        {
            "text": performance.rank, 
            "icon": "podium.svg", 
            "legend": "Rank"
        },
        {
            "text": performance.result, 
            "icon": "time.svg", 
            "legend": "Result",
            "accent": true
        },
        {
            "text": performance.reactionTime != undefined ? (performance.reactionTime<=0?"":"+") + performance.reactionTime + " s" 
                                                          : '-', 
            "icon": "push.svg", 
            "legend": "Reaction Time"
        }
    ]
}

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

export function getAverageSpeedInfos(speeds) {
    let sum = 0;
    speeds.forEach(item => {
        sum += item.speed;
    });
    sum /= speeds.length;

    return {
        "text": sum.toFixed(2) + " km/h", 
        "icon":"speed.svg", 
        "legend":"Average"
    }
}

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

export function getReactionTimeInfos(performance) {
    return {
        "text": performance.reactionTime != undefined ? (performance.reactionTime<=0?"":"+") + performance.reactionTime + " s" 
                                                 : '-', 
        "icon":"push.svg", 
        "legend":"Reaction Time"
    }
}

export function getAthleteInfos(performance) {
    let athleteInfosArray = [];
    if (performance.athlete.dateOfBirth) {
        athleteInfosArray.push({
            "text": performance.athlete.dateOfBirth.replace(/-/g, "."), 
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
