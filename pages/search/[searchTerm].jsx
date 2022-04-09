import Head from "next/head";
import { useRouter } from "next/router";

const Search = (initialData) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
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
    </>
  )
};

export default Search;

export const getServerSideProps = async (context) => {
  const searchTerm = context.query.searchTerm;
  let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}s&api_key=6gw058lnlowg7ZinCm4aRjOdhFf6rv3f&limit=10`);

  giphys = await giphys.json();

  return {
    props: { giphys: giphys.data }
  }
};
