import classes from "./About.module.css";

export default function About() {
  return (
    <section className={classes.about} id="o-nama" aria-labelledby="o-nama-title">
      <div className="container">
        <header className={classes.header}>
          <h2 id="o-nama-title" className={classes.title}>
            O nama
          </h2>
          <p className={classes.lead}>
            Jorgić Woodwork je stolarska radionica iz Banja Luke koja već više od
            30 godina izrađuje stolariju i namještaj po mjeri — precizno, trajno i
            estetski.
          </p>
          <div className={classes.line} aria-hidden="true"></div>
        </header>
        <div className={classes.aboutContent}>
          <div className={classes.text}>
            <h3 className={classes.subTitle}>Šta radimo</h3>
            <ul className={classes.list}>
              <li>Kuhinje po mjeri, radne ploče i ugradni elementi</li>
              <li>Ormari, plakari i garderoberi po mjeri</li>
              <li>Unutrašnja vrata, stepenice i obloge</li>
              <li>Dječije sobe, kreveti i namještaj za svaki prostor</li>
              <li>Ostali stolarski radovi po projektu i mjeri</li>
            </ul>

            <h3 className={classes.subTitle}>Zašto Jorgić Woodwork</h3>
            <ul className={classes.highlights}>
              <li>
                <strong>Precizna izrada</strong> uz pažnju na detalje i čiste
                završne obrade.
              </li>
              <li>
                <strong>Kvalitetni materijali</strong> i provjerena okovska
                rješenja za dug vijek trajanja.
              </li>
              <li>
                <strong>Dizajn po vašoj mjeri</strong> — funkcionalno,
                dugotrajno i vizuelno skladno.
              </li>
              <li>
                <strong>Iskustvo 30+ godina</strong> u izradi namještaja i
                stolarije u Banja Luci i okolini.
              </li>
            </ul>

            <div className={classes.note}>
              Radimo po mjeri i dogovoru — od savjetovanja, izmjere i prijedloga
              rješenja, do izrade i montaže.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}