import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  interface Pokemon {
    id: number
    image: string 
    name: string
  }
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);

  useEffect(() => {
    const getPokemon = async (): Promise<void> => {
      const res = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
      );
      setPokemon(await res.json());
    }
    getPokemon();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="pokemon names stores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon: Pokemon): JSX.Element => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
                <Image
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                  width={200}
                  height={200}
                />
                <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
