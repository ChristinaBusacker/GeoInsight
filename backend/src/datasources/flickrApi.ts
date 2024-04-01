import { RESTDataSource } from 'apollo-datasource-rest';

import dotenv from 'dotenv'
dotenv.config();


export class FlickrApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.flickr.com/services/rest/';

  }

  async getPhotosByLocation(lat, lon) {
    const response = await this.get('', {
      method: 'flickr.photos.search',
      api_key: process.env.FLICKR_API_KEY,
      lat: lat,
      lon: lon,
      format: 'json',
      nojsoncallback: 1,
      per_page: 4,
      sort: 'relevance'
    });

    return response.photos.photo.map(photo => ({
        ...photo,
        url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
      }));
  }
}