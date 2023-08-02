import axios from "axios"

/**
 * Get a list of meetings
 * @param limit - limit the number of results returned
 * @returns List of meetings
 */
export async function getMeetings(limit) {
  if (!limit) limit = 0;
  try{
      const res = await axios.get('http://localhost:3000/meetings?limit=' + limit);
      return res.data;

    }catch(err){
      return err;
    }
}

/**
 * Get a specific meeting with its ID
 * @param id - ID of the meeting to get
 * @returns meeting with specified ID or nothing
 */
export async function getMeetingById(id) {

  let url ='http://localhost:3000/meetings/' + id

  const res = await axios.get(url, { validateStatus: false });
  if (res.status != 404) {
    return res.data
  } else {
    return null
  }
}

/**
 * Get a list of meetings from a specified date
 * @param date - minimal date of meetings
 * @param limit - limit the number of results returned
 * @returns List of meetings from a date
 */
export async function getUpcomingMeetings(date, limit) {
  if (!limit) limit = 0;
  try{
      const res = await axios.get('http://localhost:3000/meetings?fromDate=' + date + '&limit=' + limit);
      return res.data;

    }catch(err){

    }
}

/**
 * Get a list of meetings before a specified date
 * @param date - maximum date of meetings
 * @param limit - limit the number of results returned
 * @returns List of meetings before a date
 */
export async function getPastMeetings(date, limit) {
  if (!limit) limit = 0;
  try{
      const res = await axios.get('http://localhost:3000/meetings?toDate=' + date + '&limit=' + limit);
      return res.data;

    }catch(err){

    }
}

/**
 * Filter meetings list by name
 * @param meetings - meetings list to filter
 * @param filter - filter value
 * @returns list of filtered meetings
 */
export function filterMeetings(meetings, filter) {
  if (filter) {
      return meetings.filter(meeting => meeting.name == filter)
  } else {
      return meetings
  }
}