import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { redirect } from "next/navigation";

import styles from "./Page.module.css";
import CardGame from "@/components/CardGame/CardGame";
import { Metadata } from "next";

interface PropsParams {
  params: {
    id: String;
  };
}

export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  try {
    const response: GameProps = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } }
    )
      .then((res) => res.json())
      .catch(() => {
        return {
          title: "DalyGames - Descubra jogos incríveis para se divertir",
        };
      });

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    };
  } catch (error) {
    console.log("CHEGUEI");
    return { title: "DalyGames - Descubra jogos incríveis para se divertir" };
  }
}

async function getGame({ id }: { id: number }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } }
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

async function getSortedGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function GamePage({
  params: id,
}: {
  params: { id: number };
}) {
  const game: GameProps = await getGame(id);
  const sortedGame: GameProps = await getSortedGame();

  if (!game) {
    redirect("/");
  }

  return (
    <>
      <div className={styles.imgContainer}>
        <Image
          className={styles.gameImg}
          src={game.image_url}
          alt={game.title}
          priority
          fill={true}
          quality={100}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 44vw'
        ></Image>
      </div>
      <div className={styles.infoContainer}>
        <h1>{game.title}</h1>
        <p>{game.description}</p>
        <div className={styles.containerInfos}>
          <h3>Plataformas disponíveis</h3>
          <div className={styles.spanContainer}>
            {game.platforms.map((plataformName) => (
              <span className={styles.spanInfos}>{plataformName}</span>
            ))}
          </div>
        </div>
        <div className={styles.containerInfos}>
          <h3>Categorias</h3>
          <div className={styles.spanContainer}>
            {game.categories.map((categoriesName) => (
              <span className={styles.spanInfos}>{categoriesName}</span>
            ))}
          </div>
        </div>
        <div className={styles.releaseInfo}>
          <h3>Lançamento:</h3>
          <span>{game.release}</span>
        </div>

        <h3>Outros jogos que recomendamos</h3>
        <div className={styles.sortedGameContainer}>
          <CardGame game={sortedGame}></CardGame>
        </div>
      </div>
    </>
  );
}
