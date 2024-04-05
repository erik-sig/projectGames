import CardGame from "@/components/CardGame/CardGame";
import { GameProps } from "@/utils/types/game";

import styles from "./Page.module.css";
import Input from "@/components/Input/Input";

async function getData({ title }: { title: string }) {
  try {
    const decodeTitle = decodeURI(title);
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Search({
  params: title,
}: {
  params: { title: string };
}) {
  const games: GameProps[] = await getData(title);

  return (
    <main className={styles.main}>
      <Input />
      <h1 className={styles.h1}>Veja o que encontramos na nossa base:</h1>
      {!games && <span>Jogo não encontrado...</span>}
      <section className={styles.sectionGamesFounded}>
        {games?.map((item) => (
          <CardGame game={item}></CardGame>
        ))}
      </section>
    </main>
  );
}
