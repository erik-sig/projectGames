import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { BiRightArrowCircle } from "react-icons/bi";

import styles from "./CardGame.module.css";
import Link from "next/link";

export default function CardGame({ game }: { game: GameProps }) {
  return (
    <Link href={`/game/${game.id}`} className={styles.cardLink}>
      <div className={styles.containerCard}>
        <div className={styles.imgContainer}>
          <Image
            src={game.image_url}
            alt={game.title}
            fill={true}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 44vw'
            quality={100}
            className={styles.gameImg}
          ></Image>
        </div>
        <div className={styles.gameInfo}>
          <span>{game.title}</span>
          <BiRightArrowCircle size={22} color='#000' />
        </div>
      </div>
    </Link>
  );
}
