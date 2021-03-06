import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";

const Search = (initialData) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Search results for : {router.query.searchTerm}</title>
        <meta name="description" content={initialData.giphys.map((each, idx) => each.title + ' ')}></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <p>Go <Link href="/"><a>home</a></Link></p>
      <h1>Search results for : {router.query.searchTerm}</h1>

      <div className="giphy-search-results-grid">
        {initialData.giphys.map((each, idx) => {
          return (
            <div key={idx}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          )
        })}
      </div>
      <Footer />
    </>
  )
};

export default Search;

export const getServerSideProps = async (context) => {
  const searchTerm = context.query.searchTerm;
  let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}s&api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&limit=10`);

  giphys = await giphys.json();

  return {
    props: { giphys: giphys.data }
  }
};
