import Head from "next/head";
import { Header } from "components/Header";
import Image from "next/image";
import { readFile, stat } from "fs/promises";

const Comic = ({
  img,
  title,
  alt,
  width,
  height,
  nextId,
  prevId,
  hastNext,
  hasPrevious,
}) => {
  return (
    <>
      <Head>
        <title>xkdc - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <section className="max-w-lg m-auto">
          <h1 className="font-bold">{title}</h1>
          <Image src={img} alt={alt} width={width} height={height} />
          <p>{alt}</p>

          {/* Create pagination with nextId and prevId if available*/}
        </section>
      </main>
    </>
  );
};

export default Comic;

//Cuando se necesita un getStaticProps en una pagina dinamica [id] (comics/500)
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "2500" } }],
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const content = await readFile(`./comics/${id}.json`, "utf8");
  const comic = JSON.parse(content);

  // Paginación
  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  // Debería decir si existe un archivo o no
  const { prevResult, nextResult } = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hastNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      hasPrevious,
      hastNext,
      nextId,
      prevId,
    },
  };
}
