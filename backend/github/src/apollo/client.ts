import fetch from 'node-fetch'
import {ApolloClient} from 'apollo-client';
import {HttpLink, InMemoryCache} from 'apollo-boost';
import * as config from '../../apollo.config'

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: config.client.service.url,
        fetch: fetch,
        headers: config.client.service.headers
    }),
});
