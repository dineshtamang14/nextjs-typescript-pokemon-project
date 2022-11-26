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

    interface Pokemon {
        id: number
        image: string 
        name: string
      }
      const [pokemon, setPokemon] = useState(null);
    
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

    return <div>
        <h1>Hello world - {pokemon}</h1>
    </div>
}