import Image from "next/image";
import Link from "next/link";

import logoImg from "../../../public/assets/logo.svg";

import styles from "./Header.module.css";

import { CgProfile } from "react-icons/cg";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href='/'>
          <Image
            alt='Logo do site dalygames'
            src={logoImg}
            quality={100}
            priority
          ></Image>
        </Link>
        <Link href='/'>Jogos</Link>
        <Link href='/profile' className={styles.perfil}>
          Perfil
        </Link>
        <Link href='/profile' className={styles.gamepad}>
          <CgProfile size={34} color='#475569' />
        </Link>
      </nav>
    </header>
  );
}
