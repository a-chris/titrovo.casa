import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TagsInput } from "react-tag-input-component";
import getCities from "../lib/cities";
import { calculateQuery } from "../lib/query";

const adTypes = [
  { value: "affitto", label: "Affitto" },
  { value: "vendita", label: "Vendita" },
];

export default function Home({ cities }) {
  const [queryFields, setQueryFields] = useState({ city: "roma", adType: "affitto", includeWords: [], excludeWords: [] });

  const handleChangeQueryFields = (e) => {
    const { name, value } = e.target;
    setQueryFields((curr) => ({ ...curr, [name]: value }));
  };

  const handleChangeInclude = (value) => {
    setQueryFields((curr) => ({ ...curr, includeWords: value }));
  };

  const handleChangeExclude = (value) => {
    setQueryFields((curr) => ({ ...curr, excludeWords: value }));
  };

  const queryString = calculateQuery(queryFields);

  return (
    <div id="root">
      <Head>
        <title>House Finder 🏡</title>
        <meta name="description" content="House Finder" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏡</text></svg>"></link>
        <link href="https://fonts.googleapis.com/css?family=Open%20Sans:400|Open%20Sans:400&display=swap" rel="stylesheet"></link>
      </Head>

      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand px-4">
          <h1 className="title p-3">House Finder 🏡</h1>
        </div>
      </nav>

      <main className="container">
        <div className="columns is-desktop py-6" style={{ minHeight: "50em" }}>
          <div className="landing is-flex is-flex-direction-column is-justify-content-space-around">
            <article className="message is-info transformed-1">
              <div className="message-body">
                <div className="content">
                  <b>Cos&apos;è? 🤔</b>
                  <br />
                  <p>House Finder è un servizio gratuito che ti aiuta a trovare casa in affitto o in vendita in Italia 🏡</p>
                </div>
              </div>
            </article>

            <article className="message is-info transformed-2">
              <div className="message-body">
                <div className="content">
                  <b>Come funziona?</b>
                  <br />
                  <p>
                    Crea una ricerca sul nostro{" "}
                    <a target="_blank" rel="noreferrer" href={"https://t.me/house_finder_italy_bot"}>
                      Bot Telegram
                    </a>{" "}
                    inserisci i filtri di prezzo, metri, parole chiave e woila&apos;! Riceverai una notifica su Telegram ogni volta che un annuncio viene pubblicato 🥰
                  </p>
                </div>
              </div>
            </article>

            <article className="message is-info transformed-3">
              <div className="message-body">
                <div className="content">
                  <b>Da dove arrivano gli annunci?</b>
                  <br />
                  <p>Dai principali siti italiani del settore tra cui Immobiliare, Idealista, Tecnocasa e Subito.it</p>
                </div>
              </div>
            </article>

            <article className="message is-info transformed-4">
              <div className="message-body">
                <div className="content">
                  <b>Ogni quanto vengo notificato? 🔔</b>
                  <br />
                  <p>
                    Il nostro servizio controlla <b>ogni ora</b> gli annunci disponibili, riceverai solo gli annunci che rispettano i tuoi parametri 🥳
                  </p>
                </div>
              </div>
            </article>
          </div>
          <Image src={"/screenshot.webp"} quality={100} alt="screenshot of telegram chat" width={800} height={800} layout="intrinsic" objectFit="cover" />
        </div>

        <div>
          <div className="box query-form m-auto">
            <h3 className="title">Imposta i dati della ricerca Telegram:</h3>
            <div className="block is-flex is-justify-content-space-between">
              <div className="select" style={{ width: "100%" }}>
                <select name="city" onChange={handleChangeQueryFields} style={{ width: "100%" }}>
                  {cities.map((c) => (
                    <option value={c.value} key={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ width: "3em" }} />
              <div className="select" style={{ width: "100%" }}>
                <select name="adType" onChange={handleChangeQueryFields} style={{ width: "100%" }}>
                  {adTypes.map((t) => (
                    <option value={t.value} key={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h4>Prezzo</h4>
            <div className="block is-flex">
              <input className="input" type="number" placeholder="prezzo minimo" name="minPrice" onChange={handleChangeQueryFields}></input>
              <div style={{ width: "3em" }} />
              <input className="input" type="number" placeholder="prezzo massimo" name="maxPrice" onChange={handleChangeQueryFields}></input>
            </div>
            <h4>Metri</h4>
            <div className="block is-flex">
              <input className="block input" type="number" placeholder="mq minimi" name="minMeter" onChange={handleChangeQueryFields}></input>
              <div style={{ width: "3em" }} />
              <input className="block input" type="number" placeholder="mq massimi" name="maxMeter" onChange={handleChangeQueryFields}></input>
            </div>

            <h4>Parole chiave</h4>
            <TagsInput value={queryFields.includeWords} onChange={handleChangeInclude} name="includeKeywords" placeHolder="include solo annunci con queste parole" />
            <TagsInput value={queryFields.excludeWords} onChange={handleChangeExclude} name="excludeKeywords" placeHolder="esclude annunci con queste parole" />

            <div className="block has-text-centered py-4">
              {queryString.errors.length > 0 ? (
                <p>{queryString.errors}</p>
              ) : (
                <div>
                  <code className="p-4">
                    {queryString.success}
                    <CopyToClipboard className="ml-4" text={queryString.success}>
                      <button>Copia</button>
                    </CopyToClipboard>
                  </code>
                </div>
              )}
            </div>

            <div className="block has-text-centered">
              Ci sei quasi! Invia un messaggio con questo testo al{" "}
              <b>
                <a target="_blank" rel="noreferrer" href={"https://t.me/house_finder_italy_bot"}>
                  Bot Telegram
                </a>
              </b>{" "}
              per iniziare la tua ricerca! 🚀
            </div>
          </div>
        </div>
      </main>

      <footer style={{ height: "5em" }}></footer>
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: { cities: await getCities() },
  };
}
