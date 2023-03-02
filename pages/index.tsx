import React, { useState, useEffect, lazy } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

interface PokemonDetails {
  id: number
  image: string 
  name: string
}

interface Pokemons {
  pokemon: Array<PokemonDetails>
}

export const getStaticProps = async () => {
  const res = await axios.get(
    "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
  );

  return {
    props: {
      pokemon: await res.data
    }
  }
}

export default function Home(props: Pokemons) {
  return (
    <div className={styles.container}>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />

        <title>Pokemons List by Dinesh Tamang</title>
        <meta name="description" content="Dinesh Tamang student at Mumbai University, currently in fourth year B.E. Computer Science. Technical skill includes programming in python, java, c++, typescript, Node.js and Databases such as
        sql and Nosql. and i am also familiar with Web Development, Kubernetes, Docker, Ansible, terraform, AWS etc." />
        <meta name="keywords" content="Dinesh Tamang, Computer Science, AWS Solution Architect, Cloud Engineer, Backend Engineer, Portfolio website, Dinesh Rambahadur Tamang" />
        <meta name="author" content="Dinesh Tamang" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Dinesh Tamang | AWS Solution Architect | Mumbai, India" />
        <meta property="og:description" content="Dinesh Tamang student at Mumbai University, currently in fourth year B.E. Computer Science. Technical skill includes programming in python, java, c++, typescript, Node.js and Databases such as
        sql and Nosql. and i am also familiar with Web Development, Kubernetes, Docker, Ansible, terraform, AWS etc." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dineshtamang.tech" />
        <meta property="og:image" content="https://drive.google.com/file/d/10-0Y76IHGnTIA2_5aEli-ey3cBpTUse3/view?usp=sharing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dinesh Tamang | AWS Solution Architect | Mumbai, India" />
        <meta name="twitter:description" content="Dinesh Tamang student at Mumbai University, currently in fourth year B.E. Computer Science. Technical skill includes programming in python, java, c++, typescript, Node.js and Databases such as
        sql and Nosql. and i am also familiar with Web Development, Kubernetes, Docker, Ansible, terraform, AWS etc." />
	      <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1130796628997156864/HFXo5m91_400x400.jpg" />
      </Head>

      <Link href="https://dineshtamang.tech">
        <a target="_blank" rel="noopener noreferrer">
          <h2>Pokemon List</h2>
        </a>
      </Link>
      
      <div className={styles.grid}>
        {props.pokemon.map((pokemon: PokemonDetails): JSX.Element => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
                <Image
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                  width="200"
                  height="200"
                />
                <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
