import Race from "./RaceModel";

export default class Perfomance {
    constructor() {
            this.athlete = { 
              lastName: "",
              firstName: "",
              dateOfBirth: null,
              gender: null,
              nationality: {},
              disciplines: []
            },
            this.race = new Race,
            this.lane = null,
            this.rank = null,
            this.result = null,
            this.positions = [],
            this.startingPressure = null,
            this.reactionTime = null,
            this.stepsHurdles = null,
            this.exchangeTime = null,
            this.mention = []
    }
}