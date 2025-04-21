import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { MovieData } from "@/types";
import { ReactNode } from "react";

async function Footer() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      return <footer>제작 @JUREPI</footer>;
    }

    const movies: MovieData[] = await response.json();
    const movieCount = movies.length;

    return (
      <footer className={style.footer}>
        <div>제작 @JUREPI</div>
        <div>{movieCount}개의 영화가 등록되어 있습니다.</div>
      </footer>
    );
  } catch (error) {
    console.error(error);
    return <footer>제작 @JUREPI</footer>;
  }
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={style.container}>
          <header className={style.header}>
            <Link href="/">🎬 ONEBITE CINEMA</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
