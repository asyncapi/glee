import {Low, JSONFile} from 'lowdb'
type Data = {
  flights: any[];
}
export default class DatabaseManager {
  

  db: Low<Data>
  private static instance: DatabaseManager

  private constructor(){
    const file = new JSONFile<Data>("db.json")
    console.log('the file is',file)
    this.db = new Low(file)
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DatabaseManager()
    }
    return this.instance
  }

  async getFlights(airportCode: string) {
    this.db.read()
    return this.db.data.flights.filter((flight) => flight.destin_code === airportCode || flight.origin_code === airportCode)

  }

  async updateFlight(updatedFlight: any): Promise<boolean> {
    const id = updatedFlight.id
    try {
      this.db.data.flights = this.db.data.flights.map((flight) => {
        if(flight.id === id) return {...flight, ...updatedFlight}
        return flight
      })
      this.db.write()
    } catch(err){
      console.error(err)
      return false
    }
    return true
  }
}
