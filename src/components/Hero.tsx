import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero__desc">Бесплатное 3D-моделирование</p>
          <h1 className="hero__title">Изделия из пенопласта</h1>
          <p className="hero__text">
            Покажем форму, пропорции и детали будущей фигуры перед изготовлением
          </p>
          <Link href="#" className="btn btn_blue hero__btn">
            Отправить заявку
          </Link>
        </div>

        <div className="hero-content hero-content_mob">
          <p className="hero__desc">Создаем</p>
          <h1 className="hero__title">Искусство из современных материалов</h1>
          <p className="hero__text">
            Товары из пенопласта станут прекрасным украшением интерьера или
            фасада дома, оригинальной деталью любой рекламной компании.
          </p>
          <Link href="#" className="btn btn_blue hero__btn">
            Отправить заявку
          </Link>
        </div>
      </div>
    </section>
  );
}
