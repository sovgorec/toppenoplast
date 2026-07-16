import Link from "next/link";
import type { ServiceCard as ServiceCardType } from "@/data/services";
import styles from "./ServicesSticky.module.css";

type ServiceCardProps = {
  card: ServiceCardType;
};

export default function ServiceCard({ card }: ServiceCardProps) {
  return (
    <Link href="#" className={styles.card}>
      <div
        className={styles.cardPreview}
        style={{ backgroundImage: `url(${card.image})` }}
      />
      <p className={styles.cardName}>{card.name}</p>
    </Link>
  );
}
