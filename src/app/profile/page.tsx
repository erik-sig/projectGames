import Image from "next/image";
import styles from "./Page.module.css";

import { IoShareSocial } from "react-icons/io5";

import userImg from "/public/assets/user.png";
import Favorite from "./components/Favorite/Favorite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu perfil - Daly Games sua plataforma de jogos!",
  description: "Perfil Sujeito Programador | Daly Games sua plaforma de jogos!",
};

export default function Profile() {
  return (
    <main className={styles.main}>
      <div className={styles.profileHeader}>
        <div className={styles.profileDetails}>
          <Image
            className={styles.profileImg}
            src={userImg}
            width={156}
            height={156}
            alt='Imagem do usuário'
          ></Image>
          <h2>Sujeito Programador</h2>
        </div>

        <div className={styles.btns}>
          <button>Configuração</button>
          <button className={styles.icon}>
            <IoShareSocial size={24}></IoShareSocial>
          </button>
        </div>
      </div>
      <section className={styles.profileGames}>
        <div className={styles.cardContainer}>
          <Favorite />
        </div>
        <div className={styles.cardContainer}>
          <Favorite />
        </div>
        <div className={styles.cardContainer}>
          <Favorite />
        </div>
      </section>
    </main>
  );
}
