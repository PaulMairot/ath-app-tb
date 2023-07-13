import axios from "axios"

export async function getAllMeetings(limit) {
  if (!limit) limit = 0;
  try{
      const res = await axios.get('http://localhost:3000/meetings?limit=' + limit);
      return res.data;

    }catch(err){

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