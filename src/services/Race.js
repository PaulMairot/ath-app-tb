import axios from "axios"

export async function getAllRaces(limit) {
  if (!limit) limit = 0;
  try{
      const res = await axios.get('http://localhost:3000/races?limit=' + limit);
      return res.data;

    }catch(err){

    }
}

export async function getFinishedRaces(limit) {
  if (!limit) limit = 0;
  try{
      const res = await axios.get('http://localhost:3000/races?state=finished&limit=' + limit);
      return res.data;

    }catch(err){

    }
}