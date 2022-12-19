import axios from 'axios';
export default class DatabaseManager {
  api = axios.create({ baseURL: 'http://localhost:3004' });
  private static instance: DatabaseManager | undefined;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DatabaseManager();
    }
    return this.instance;
  }

  async getFlights(airportCode: string) {
    const response = await this.api.get('/flights');
    console.log(response);
    return response.data.filter((flight) => flight.destin_code === airportCode || flight.origin_code === airportCode);
  }

  async updateFlight(flight: any): Promise<boolean> {
    const id = flight.id;
    const response = await this.api.put(`/flights/${id}`, flight);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}
