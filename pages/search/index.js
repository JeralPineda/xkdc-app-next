import Head from 'next/head';
import { Layout } from 'components/Layout';

export default function Search({ query }) {
  return (
    <>
      <Head>
        <title>xkdc - Results for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>

      <Layout>
        <h1>Resultados para {query}</h1>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = '' } = query;
  console.log(q);
  //   const { search } = q;

  // Llamar a la api de Algolia para buscar los resultados
  return {
    props: {
      query: q,
    },
  };
}
