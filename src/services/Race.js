import axios from "axios"
import * as PerformanceService from '../services/Performance';


export async function getRaces(state, limit) {
  if (!limit) limit = 0;

  let url ='http://localhost:3000/races?limit=' + limit

  if (state) {
    url += '&state=' + state
  }

    const res = await axios.get(url, { validateStatus: false });
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
}

export async function getRaceById(id) {

  let url ='http://localhost:3000/races/' + id

    const res = await axios.get(url, { validateStatus: false });
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
}


export async function getLatestRaces(athlete_id, limit) {
  let races = [];

  let url = 'http://localhost:3000/performances?athlete=' + athlete_id;
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
      console.log(races);
      return races
    } else {
      return []
    }

  /* let url ='http://localhost:3000/races?athletes=' + athlete_id;

  if (!limit) { 
    limit = 0; 
  } else {
    url += "&limit=" + limit
  }

  let races = [];

  const res = await axios.get(url, { validateStatus: false });

  if (res.status != 404) {

    res.data.forEach(async race => {
      const performance = await PerformanceService.getPerformance(athlete_id, race.id);
      console.log(performance);

      races.push({
        "meeting": race.meeting.name || "",
        "date": race.meeting.startDate || "",
        "discipline": race.discipline.distance + "m" || "",
        "result": performance[0].result || ""
      })
    });
    console.log(races);
    return races;

  } else {
    return []
  }    */
}

export function formatRaceResults(races) {
  return races
}

export async function getRacePositions(id) {

  let url ='http://localhost:3000/positions?race=' + id

    const res = await axios.get(url, { validateStatus: false });
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
     
}