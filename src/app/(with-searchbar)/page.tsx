import ClientComponents from "@/components/client-components";
import ServerComponents from "@/components/server-components";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      Index
      <ClientComponents>
        <ServerComponents />
      </ClientComponents>
    </div>
  );
}
