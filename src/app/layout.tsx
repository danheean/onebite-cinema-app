import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={style.container}>
          <header>
            <Link href="/">🎬 ONEBITE CINEMA</Link>
          </header>
          <main>{children}</main>
          <footer>제작 @JUREPI</footer>
        </div>
      </body>
    </html>
  );
}
