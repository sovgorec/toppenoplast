"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { categories, serviceCards } from "@/data/services";
import ServiceCard from "./ServiceCard";
import styles from "./ServicesSticky.module.css";

const MOBILE_BREAKPOINT = 767;

export default function ServicesSticky() {
  const pinSpacerRef = useRef<HTMLDivElement>(null);
  const cardsInnerRef = useRef<HTMLDivElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const stickyEnabledRef = useRef(true);

  const [cardOffset, setCardOffset] = useState(0);
  const [isStickyEnabled, setIsStickyEnabled] = useState(true);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const layout = useCallback(() => {
    const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
    stickyEnabledRef.current = !mobile;
    setIsStickyEnabled(!mobile);

    const spacer = pinSpacerRef.current;
    const viewport = cardsViewportRef.current;
    const inner = cardsInnerRef.current;

    if (!spacer || !viewport || !inner) return;

    if (mobile) {
      spacer.style.height = "";
      setCardOffset(0);
      return;
    }

    const maxOffset = Math.max(inner.scrollHeight - viewport.clientHeight, 0);
    const pinHeight = window.innerHeight + maxOffset;
    spacer.style.height = `${pinHeight}px`;

    const totalScroll = pinHeight - window.innerHeight;
    if (totalScroll <= 0) {
      setCardOffset(0);
      return;
    }

    const rect = spacer.getBoundingClientRect();
    const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
    const progress = scrolled / totalScroll;

    setCardOffset(progress * maxOffset);
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      layout();
      rafRef.current = null;
    });
  }, [layout]);

  useLayoutEffect(() => {
    layout();
  }, [layout]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => layout());

    const nodes = [
      pinSpacerRef.current,
      cardsViewportRef.current,
      cardsInnerRef.current,
    ];

    nodes.forEach((node) => {
      if (node) resizeObserver.observe(node);
    });

    window.addEventListener("resize", layout);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [layout, onScroll]);

  return (
    <section className={styles.services}>
      <div ref={pinSpacerRef} className={styles.pinSpacer}>
        <div className={styles.stickyPanel}>
          <div className={`container ${styles.inner}`}>
            <div className={styles.flex}>
              <button
                type="button"
                className={`${styles.catMob} ${catalogOpen ? styles.catMobOpen : ""}`}
                onClick={() => setCatalogOpen((open) => !open)}
                aria-expanded={catalogOpen}
              >
                Каталог изделий
              </button>

              <aside
                className={`${styles.sidebar} ${catalogOpen ? styles.sidebarOpen : ""}`}
              >
                <nav className={styles.items}>
                  {categories.map((category) => (
                    <Link key={category} href="#" className={styles.item}>
                      {category}
                    </Link>
                  ))}
                </nav>
                <Link href="#" className={`btn ${styles.servicesBtn}`}>
                  Виды услуг
                </Link>
              </aside>

              <div className={styles.content}>
                <h2 className={styles.title}>
                  Воплотим в форму любую вашу фантазию
                </h2>
                <p className={styles.text}>
                  Товары из пенопласта являются прекрасным украшением интерьера
                  или фасада дома, оригинальной деталью любой рекламной
                  компании, неотъемлемым атрибутом свадебной или новогодней
                  вечеринки, изысканным элементом фотосессии.
                </p>

                <div ref={cardsViewportRef} className={styles.cardsViewport}>
                  <div
                    ref={cardsInnerRef}
                    className={styles.cardsInner}
                    style={
                      isStickyEnabled
                        ? { transform: `translateY(-${cardOffset}px)` }
                        : undefined
                    }
                  >
                    {serviceCards.map((card) => (
                      <ServiceCard key={card.id} card={card} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
