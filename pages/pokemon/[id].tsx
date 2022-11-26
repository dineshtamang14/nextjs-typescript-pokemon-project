import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router"
import Head from 'next/head'
import styles from '../../styles/Details.module.css'
import Link from 'next/link';
import Image from 'next/image';

export default function Details(){
    const {
        query: {id},
    } = useRouter();

    type statsType = {
      name: string 
      value: number
    }
    interface PokemonDetails {
      name: string 
      type: Array<string>
      stats: Array<statsType>
      image: string
    }

      const [pokemon, setPokemon] = useState<PokemonDetails>({
        name: "",
        type: [],
        stats: [],
        image: ""
      });
    
      useEffect(() => {
        const getPokemon = async (): Promise<void> => {
          const res = await fetch(
            `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
          );
          setPokemon(await res.json());
        }
        if(id){
            getPokemon();
        }
      }, [id]);

      if(!pokemon){
        return null;
      }

    return (
      <div>
      <Head>
        <title>{pokemon.name}</title>
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
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name}
            width="200"
            height="200"
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
}