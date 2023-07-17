export default class Race {
    constructor() {
            this.meeting = { 
              name: "",
              startDate: null,
              endDate: null,
              location: "",
              city: "",
              country: null,
              races: null
            },
            this.discipline = {
              distance: null,
              type: "",
              gender: ""
            }
    }
}