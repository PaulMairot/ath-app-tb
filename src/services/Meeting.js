import axios from "axios"

export async function getMeetings(limit) {
  if (!limit) limit = 0;
  try{
      const res = await axios.get('http://localhost:3000/meetings?limit=' + limit);
      return res.data;

    }catch(err){

    }
}

export async function getMeetingById(id) {

  let url ='http://localhost:3000/meetings/' + id

    const res = await axios.get(url, { validateStatus: false });
    if (res.status != 404) {
      return res.data
    } else {
      return []
    }
}

export async function getUpcomingMeetings(date, limit) {
  if (!limit) limit = 0;
  try{
      const res = await axios.get('http://localhost:3000/meetings?fromDate=' + date + '&limit=' + limit);
      return res.data;

    }catch(err){

    }
}

export async function getPastMeetings(date, limit) {
  if (!limit) limit = 0;
  try{
      const res = await axios.get('http://localhost:3000/meetings?toDate=' + date + '&limit=' + limit);
      return res.data;

    }catch(err){

    }
}

export function filterMeetings(meetings, filter) {
  if (filter) {
      return meetings.filter(meeting => meeting.name == filter)
  } else {
      return meetings
  }
}