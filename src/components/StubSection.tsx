import styles from "./StubSection.module.css";

export default function StubSection() {
  return (
    <section className={styles.stub} id="block-3">
      <div className={styles.inner}>
        <h2 className={styles.title}>Блок 3 — заглушка</h2>
        <p className={styles.desc}>
          Этот раздел добавлен для оценки перехода после прокрутки карточек
          каталога. Здесь может быть портфолио, отзывы или контакты.
        </p>
      </div>
    </section>
  );
}
