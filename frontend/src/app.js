import { h, Component } from 'preact';
import { MapComponent } from './components/MapComponent/MapComponent';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="app">
          <MapComponent />
          <Sidebar />

        </div>
      </ApolloProvider>
    );
  }
}