import Head from 'next/head'
import styles from '../../styles/Details.module.css'
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';


type Details = {
  name: string
  value: number
}

interface PokemonDetails {
  name: string
  type: Array<string>
  stats: Array<Details>
  image: string
}

interface Pokemons {
  pokemon: PokemonDetails
}

interface PokemonDetails {
  id: number
  image: string 
  name: string
}

type FetchPokemon = {
  params: {
    id: string
  }
}

export const getStaticPaths = async () => {
  const res = await axios.get(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );
  const pokemon = await res.data;
  return {
    paths: pokemon.map((pokemon: PokemonDetails) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false
  }
}

export const getStaticProps = async ({ params }: FetchPokemon) => {
  const res = await axios.get(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await res.data,
    },
    // to check data after 30s
    // revalidate: 30,
  }
}

export default function Details(props: Pokemons){
    return (
      <div>
      <Head>
        <title>{props.pokemon.name}</title>
      </Head>
      <div>
        <Link href="/">
          <h3>Back to Home</h3>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <Image
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${props.pokemon.image}`}
            alt={props.pokemon.name}
            width="200"
            height="200"
          />
        </div>
        <div>
          <div className={styles.name}>{props.pokemon.name}</div>
          <div className={styles.type}>{props.pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {props.pokemon.stats.map((i: Details) => (
                <tr key={i.name}>
                  <td className={styles.attribute}>{i.name}</td>
                  <td>{i.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
}