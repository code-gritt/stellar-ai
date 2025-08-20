import { Score1 } from '@/components';
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
          <img className={styles.hero__body__lines} src="/lines_1.svg" />
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

            <Score1 number={98} className={styles.hero__body__score_1} />

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

      <section className={styles.container_fluid}>
        <div className={styles.teams}>
          <div className={styles.teams__title}>
            <h2 className={styles.teams__title__line_1}>Used by top teams</h2>
            <div className={styles.teams__title__line_2}>
              <span>across</span>
              <span>the globe</span>
            </div>
          </div>
          <img className={styles.teams__companies} src="/companies.svg" />
          <img className={styles.teams__blur} src="/blur_1.png" />
          <img className={styles.teams__earth} src="/earth.png" />
        </div>
      </section>

      <section className={styles.container_fluid}>
        <div className={styles.steps}>
          <img className={styles.steps__blur} src="/blur_2.png" />

          <Score1 number={98} className={styles.steps__score} />

          <div className="row">
            <div className="col-6">
              <div className={styles.steps__left_holder}>
                <h2 className={styles.steps__title}>
                  Craft captivating websites with a canvas you already know
                </h2>
                <div className={styles.steps__features}>
                  <div className={styles.steps__features__content}>
                    <h4>Components</h4>
                    <p>
                      A collection of versatile components that can be tailored
                      to fit the specific needs of your project, ensuring both
                      aesthetic appeal and functionality.
                    </p>
                  </div>
                  <div className={styles.steps__features__content}>
                    <h4>Glass, Outline, Flat styles</h4>
                    <p>
                      Choose from these diverse design styles to cater to
                      different aesthetic preferences and project requirements.
                    </p>
                  </div>
                  <div className={styles.steps__features__content}>
                    <h4>Templates and Sections</h4>
                    <p>
                      Streamline your design process with ready-to-use templates
                      and sections, adaptable to various web projects.
                    </p>
                  </div>
                  <a href="#!" className={styles.steps__features__btn}>
                    <div className={styles.steps__features__btn_content}>
                      START FREE TRIAL <img src="/chevron_right.svg" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className={styles.steps__flight_img}>
                <img src="/flight.png" />
                <div className={styles.steps__mask}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
