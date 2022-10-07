import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { basename } from 'path';
import { readFile, stat, readdir } from 'fs/promises';
import { Layout } from 'components/Layout';

const Comic = ({ img, title, alt, width, height, nextId, prevId, hasNext, hasPrevious }) => {
  return (
    <>
      <Head>
        <title>xkdc - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <section className="max-w-lg m-auto">
          <h1 className="mb-4 text-xl font-bold text-center">{title}</h1>
          <div className="max-w-xs m-auto mb-4">
            <Image
              //
              layout="responsive"
              width={width}
              height={height}
              src={img}
              alt={alt}
            />
          </div>
          <p>{alt}</p>

          {/* Create pagination with nextId and prevId if available*/}
          <div className="flex justify-between mt-4 font-bold ">
            {hasPrevious && (
              <Link href={`/comic/${prevId}`}>
                <a className="text-gray-600">⬅ Previous</a>
              </Link>
            )}

            {hasNext && (
              <Link href={`/comic/${nextId}`}>
                <a className="text-gray-600">Next ➡</a>
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Comic;

//Cuando se necesita un getStaticProps en una pagina dinamica [id] (comics/500)
export async function getStaticPaths() {
  // Leer el directorio
  const files = await readdir('./comics');

  // obtener el nombre del archivo (id)
  const paths = files.map((file) => {
    const id = basename(file, `.json`);

    return { params: { id } };
  });

  // obtener el nombre del archivo (id)
  //   files.map((file) => ({ params: { id: basename(file, `.json`) } }));

  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const content = await readFile(`./comics/${id}.json`, 'utf8');
  const comic = JSON.parse(content);

  // Paginación
  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  // Debería decir si existe un archivo o no
  const [prevResult, nextResult] = await Promise.allSettled([stat(`./comics/${prevId}.json`), stat(`./comics/${nextId}.json`)]);

  const hasPrevious = prevResult.status === 'fulfilled';
  const hasNext = nextResult.status === 'fulfilled';

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId,
    },
  };
}
