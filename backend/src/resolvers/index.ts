export const resolvers = {
    Query: {
      getWeather: async (_source, { lat, lon }, { dataSources }) => {
        return dataSources.weather.getWeather(lat, lon);
      },
      getAddressByQuery: async (_source, { query }, { dataSources }) => {
        return dataSources.nominatim.getAdress(query);
      },
      getAddressByCoords: async (_source, { lat, lon }, { dataSources }) => {
        return dataSources.nominatim.getReverseAddress(lat, lon);
      },
      getPhotosByLocation: async (_, { lat, lon }, { dataSources }) => {
        return dataSources.flickr.getPhotosByLocation(lat, lon);
      },
    },
  };
  