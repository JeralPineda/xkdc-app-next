import Head from "next/head";
import { Header } from "components/Header";
import Image from "next/image";
import { readFile } from "fs/promises";

const Comic = ({ img, title, alt, width, height }) => {
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

  return {
    props: {
      ...comic,
    },
  };
}
