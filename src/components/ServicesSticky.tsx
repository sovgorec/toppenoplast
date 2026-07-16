"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { categories, serviceCards } from "@/data/services";
import ServiceCard from "./ServiceCard";
import styles from "./ServicesSticky.module.css";

const MOBILE_BREAKPOINT = 767;

export default function ServicesSticky() {
  const pinSpacerRef = useRef<HTMLDivElement>(null);
  const cardsInnerRef = useRef<HTMLDivElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [pinHeight, setPinHeight] = useState<number | null>(null);
  const [cardOffset, setCardOffset] = useState(0);
  const [isStickyEnabled, setIsStickyEnabled] = useState(true);

  const measure = useCallback(() => {
    const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
    setIsStickyEnabled(!mobile);

    if (mobile) {
      setPinHeight(null);
      setCardOffset(0);
      return;
    }

    const viewport = cardsViewportRef.current;
    const inner = cardsInnerRef.current;

    if (!viewport || !inner) return;

    const viewportHeight = viewport.clientHeight;
    const innerHeight = inner.scrollHeight;
    const scrollDistance = Math.max(innerHeight - viewportHeight, 0);

    setPinHeight(window.innerHeight + scrollDistance);
  }, []);

  const updateScroll = useCallback(() => {
    if (!isStickyEnabled) return;

    const spacer = pinSpacerRef.current;
    const viewport = cardsViewportRef.current;
    const inner = cardsInnerRef.current;

    if (!spacer || !viewport || !inner) return;

    const viewportHeight = window.innerHeight;
    const totalScroll = spacer.offsetHeight - viewportHeight;
    const rect = spacer.getBoundingClientRect();

    if (totalScroll <= 0) {
      setCardOffset(0);
      return;
    }

    const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
    const progress = scrolled / totalScroll;
    const maxOffset = Math.max(inner.scrollHeight - viewport.clientHeight, 0);

    setCardOffset(progress * maxOffset);
  }, [isStickyEnabled]);

  const onScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      updateScroll();
      rafRef.current = null;
    });
  }, [updateScroll]);

  useEffect(() => {
    measure();
    updateScroll();

    const resizeObserver = new ResizeObserver(() => {
      measure();
      updateScroll();
    });

    if (cardsInnerRef.current) {
      resizeObserver.observe(cardsInnerRef.current);
    }
    if (cardsViewportRef.current) {
      resizeObserver.observe(cardsViewportRef.current);
    }

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [measure, onScroll, updateScroll]);

  useEffect(() => {
    if (isStickyEnabled) {
      updateScroll();
    }
  }, [isStickyEnabled, pinHeight, updateScroll]);

  return (
    <section className={styles.services}>
      <div
        ref={pinSpacerRef}
        className={styles.pinSpacer}
        style={pinHeight ? { height: pinHeight } : undefined}
      >
        <div className={styles.stickyPanel}>
          <div className={`container ${styles.inner}`}>
            <div className={styles.flex}>
              <div className={styles.catMob}>Каталог изделий</div>

              <aside className={styles.sidebar}>
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
