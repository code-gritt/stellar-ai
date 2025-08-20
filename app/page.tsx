import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <header className={styles.container_fluid}>
        <div className={styles.header__flex}>
          <div className={styles.header__menu}>
            <ul className={styles.header__menu__submenu}>
              <li className={styles.header__menu__logo}>
                <a href="#!">
                  <img src="/logo.svg" alt="logo" />
                  <h2>Stellar</h2>
                </a>
              </li>
              <li>
                <a href="#!">Product</a>
              </li>
              <li>
                <a href="#!">Pricing</a>
              </li>
              <li>
                <a href="#!">Changelog</a>
              </li>
            </ul>
            <ul className={styles.header__menu__submenu}>
              <li>
                <a href="#!">Log in</a>
              </li>
              <li>
                <a
                  className={`${styles.primary_button} ${styles.header__menu__sign_up}`}
                  href="#!"
                >
                  Sign up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className={styles.container_fluid}>
        <div className={styles.hero__body}>
          <div className={styles.hero__body__subsec1}>
            <div className={styles.hero__new_components__holder}>
              <a
                href="#!"
                className={`${styles.primary_button} ${styles.hero__new_components}`}
              >
                New components <img src="/chevron_right.svg" />
              </a>
            </div>
            <div className={styles.hero__title}>
              <h1>Craft Stunning User Interfaces</h1>
            </div>
            <div className={styles.hero__description}>
              This UI kit is a perfect blend of modern design and practical
              usability, making it an ideal choice for a wide range of projects
              including web applications, mobile apps, and dashboard interfaces.
            </div>
            <div className={styles.hero__start_btn__holder}>
              <a href="#!" className={styles.hero__start_btn}>
                START FREE TRIAL <img src="/chevron_right.svg" />
              </a>
            </div>
          </div>
          <div className={styles.hero__body__subsec2}>
            <div className={styles.hero__body__lights_fill}></div>
            <div className={styles.hero__body__lights_border}></div>
            <div className={styles.hero__body__contrast}></div>
            <img className={styles.hero__body__circle_1} src="/circle_1.png" />
            <div className={styles.hero__body__circle_2}></div>
            <img
              className={styles.hero__body__browse_app}
              src="/browse_app.png"
            />
            <img
              className={styles.hero__body__main_card}
              src="/main_card.png"
            />
            <div className={styles.hero__body__main_card__blur}></div>
            <div className={styles.hero__body__score_1}>
              <div className={styles.hero__body__score_1__holder}>
                <div className={styles.hero__body__score_1__blur}></div>
                <div className={styles.hero__body__score_1__text}>98</div>
                <img src="/score_1.svg" />
                <div className={styles.hero__body__score_1__holder_2}>
                  <img
                    className={styles.hero__body__score_1__ellipse_1}
                    src="/ellipse_1.svg"
                  />
                  <img
                    className={styles.hero__body__score_1__ellipse_2}
                    src="/ellipse_2.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.hero__body__score_2}>
              <div className={styles.hero__body__score_2__holder}>
                <div className={styles.hero__body__score_2__blur}></div>
                <div className={styles.hero__body__score_2__text}>50%</div>
                <img src="/score_2.svg" />
                <div className={styles.hero__body__score_2__holder_2}>
                  <img
                    className={styles.hero__body__score_2__circle_1}
                    src="/circle_1.svg"
                  />
                  <div className={styles.hero__body__score_2__arrow_1}>
                    <img src="/arrow_1.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
