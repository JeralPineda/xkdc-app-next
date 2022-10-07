import algoliasearch from 'algoliasearch';

const client = algoliasearch('BRP6J1KQU4', '580ca1efe841ff1004b6d850bd236476');
const index = client.initIndex('prod_comics');

const CACHE = {};

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] };

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10,
  });

  CACHE[query] = hits;

  return { results: hits };
};
