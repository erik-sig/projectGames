import { GameProps } from "@/utils/types/game";
import styles from "./Page.module.css";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRightSquare } from "react-icons/bs";
import Input from "@/components/Input/Input";
import CardGame from "@/components/CardGame/CardGame";

async function getDalyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { next: { revalidate: 320 } }
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

async function getAll() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`, {
      next: { revalidate: 320 },
    });

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const dalyGame: GameProps = await getDalyGame();
  const allGames: GameProps[] = await getAll();

  console.log(dalyGame);

  return (
    <main className={styles.main}>
      <h3 className={styles.h3}>Separamos um jogo exclusivo pra você</h3>
      <Link href={`/game/${dalyGame.id}`}>
        <section className={styles.sectionDalyImg}>
          <div className={styles.containerGameTitle}>
            <span className={styles.spanTitleGame}>{dalyGame.title}</span>
            <BsArrowRightSquare size={24} color='#fff' />
          </div>
          <Image
            src={dalyGame.image_url}
            alt={dalyGame.title}
            priority
            quality={100}
            fill={true}
            className={styles.dalyImg}
            sizes='(max-width: 768px) 90vw, (max-width: 1200px) 33vw'
          ></Image>
        </section>
      </Link>
      <Input />
      <h4 className={styles.h4}>Jogos para conhecer</h4>

      <section className={styles.sectionGames}>
        {allGames.map((item) => (
          <CardGame key={item.id} game={item}></CardGame>
        ))}
      </section>
    </main>
  );
}
