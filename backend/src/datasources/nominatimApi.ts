

import { RESTDataSource } from 'apollo-datasource-rest';
import dotenv from 'dotenv'

dotenv.config();

export class NominatimApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://nominatim.openstreetmap.org/';
  }

  willSendRequest(request) {
    request.headers.set('Accept-Language', 'de');
  }

  async getAdress(q: string) {
    return this.get('search', {
        q,
        format:'json',
        limit: 5,
        addressdetails: 1,
    }); 
  }

  async getReverseAddress(lat: string, lon: string) {
    return this.get('reverse', {
        lat,
        lon,
        format: 'json',
        addressdetails: 1,
    });
  }
  
}