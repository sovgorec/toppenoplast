import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header-row">
          <Link href="#" className="header__logo">
            <Image
              src="/img/logo.svg"
              alt="ТОП-ПЕНОПЛАСТ"
              width={170}
              height={40}
              priority
            />
          </Link>
          <div className="menu-burger" aria-label="Меню" role="button">
            <div className="line line-1" />
            <div className="line line-2" />
          </div>
          <div className="header-search">
            <input
              type="text"
              placeholder="Поиск по сайту"
              className="header-search__input"
            />
            <button type="button" className="header-search__btn" aria-label="Поиск">
              <Image src="/img/search-icon.svg" alt="" width={20} height={20} />
            </button>
          </div>
          <div className="header-contacts">
            <a href="mailto:zakaz@toppenoplast.ru" className="header-contacts__link">
              zakaz@toppenoplast.ru
            </a>
            <a href="tel:+79689756348" className="header-contacts__link">
              +7 968 975 63 48
            </a>
            <a href="tel:+74957951590" className="header-contacts__link">
              +7 495 795 15 90
            </a>
          </div>
          <Link href="#" className="btn header__btn">
            Оставить заявку
          </Link>
        </div>
      </div>
    </header>
  );
}
