import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { WeatherApi } from './datasources/weatherApi';
import { NominatimApi } from './datasources/nominatimApi';
import { FlickrApi } from './datasources/flickrApi';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        weather: new WeatherApi(),
        nominatim: new NominatimApi(),
        flickr: new FlickrApi()
      }),
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server bereit unter ${url}`);
});