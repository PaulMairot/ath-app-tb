import axios from "axios"

/**
 * Get a list of races
 * @param state - State of the races to get
 * @param limit - limit the number of results returned
 * @returns List of races or empty array
 */
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

/**
 * Get list of races of a meeting
 * @param limit - limit the number of results returned
 * @param meetingId - ID of the meeting
 * @returns List of races or empty array
 */
export async function getRacesByMeeting(limit, meetingId) {
  if (!limit) limit = 0;

  let url ='http://localhost:3000/races?limit=' + limit + "&meeting=" + meetingId

    const res = await axios.get(url, { validateStatus: false });
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
}

/**
 * Get a specific race from its ID
 * @param {*} id - ID of the race
 * @returns race found or empty array
 */
export async function getRaceById(id) {

  let url ='http://localhost:3000/races/' + id

    const res = await axios.get(url, { validateStatus: false });
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
}

/**
 * Get a list of positions in a race
 * @param id - ID of the race
 * @returns List of positions or empty array
 */
export async function getRacePositions(id) {

  let url ='http://localhost:3000/positions?race=' + id

    const res = await axios.get(url, { validateStatus: false });
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
     
}