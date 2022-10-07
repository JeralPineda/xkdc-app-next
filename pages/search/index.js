import Head from 'next/head';
import { Layout } from 'components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { search } from 'services/search';

export default function Search({ query, results }) {
  return (
    <>
      <Head>
        <title>xkdc - Results for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>

      <Layout>
        <h1 className="font-bold mb-2 text-center">
          {results.length} Resultados para {query}
        </h1>

        {results.map((result) => {
          return (
            <Link key={result.id} href={`/comic/${result.id}`}>
              <a className="flex flex-row bg-state-300 hover:bg-slate-50 content-center justify-between p-2 border-b">
                <Image className="rounded-full" src={result.img} alt={result.alt} width="50" height="50" />
                <div>
                  <h2>{result.title}</h2>
                </div>
              </a>
            </Link>
          );
        })}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = '' } = query;

  // Mala practica cuando la api es realizada en next (no hacer), también lo de variables de entorno
  //* fetch('https://external-host.com') // ✅
  //! fetch('http://mismo-host-o-localhost') // ❌

  const { results } = await search({ query: q });

  // Llamar a la api de Algolia para buscar los resultados
  return {
    props: {
      query: q,
      results,
    },
  };
}
