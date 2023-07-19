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


export async function getRacePositions(id) {

  let url ='http://localhost:3000/positions?race=' + id

    const res = await axios.get(url, { validateStatus: false });
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
     
}