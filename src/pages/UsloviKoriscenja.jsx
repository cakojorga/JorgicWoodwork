import { motion } from "framer-motion";
import classes from "./LegalPage.module.css";

export default function UsloviKoriscenja() {
  return (
    <section className={classes.legalPage}>
      <motion.div
        className={classes.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className={classes.header}>
          <h1 className={classes.title}>Uslovi korišćenja</h1>
          <p className={classes.lastUpdated}>
            Posljednje ažurirano: 19.04.2026.
          </p>
          <div className={classes.line}></div>
        </header>

        <div className={classes.intro}>
          Dobrodošli na <strong>jorgicwoodwork.com</strong>. Pristupom i
          korišćenjem ove internet stranice prihvatate sljedeće Uslove
          korišćenja. Molimo vas da ih pažljivo pročitate prije nego što
          nastavite. Ako se ne slažete sa bilo kojim dijelom ovih uslova,
          molimo vas da ne koristite naš sajt.
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>1. Opšte odredbe</h2>
          <p className={classes.sectionText}>
            Ovi Uslovi korišćenja regulišu odnos između korisnika sajta i
            vlasnika — <strong>Jorgić Woodwork</strong>, stolarske radionice
            sa sjedištem u Bistrici, Banja Luka, Bosna i Hercegovina.
            Korišćenjem ovog sajta potvrđujete da ste punoljetni ili da
            imate saglasnost roditelja/staratelja za korišćenje.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>2. Opis usluga</h2>
          <p className={classes.sectionText}>
            Jorgić Woodwork pruža sljedeće usluge:
          </p>
          <ul className={classes.list}>
            <li>Izrada kuhinja po mjeri, radnih ploča i ugradnih elemenata.</li>
            <li>Izrada ormara, plakara i garderobera po mjeri.</li>
            <li>Izrada unutrašnjih vrata, stepenica i obloga.</li>
            <li>
              Izrada dječijih soba, kreveta i namještaja za različite prostore.
            </li>
            <li>Ostali stolarski radovi po projektu i mjeri.</li>
          </ul>
          <p className={classes.sectionText}>
            Sajt služi kao informativna platforma — prikaz usluga, galerija
            radova i kontakt forma za zahtjeve ponude. Konačni ugovor o
            uslugama sklapa se posebno, u pisanoj ili usmenoj formi, nakon
            dogovora sa klijentom.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>3. Korišćenje sajta</h2>
          <p className={classes.sectionText}>
            Saglasni ste da ćete sajt koristiti isključivo u zakonite svrhe i
            na način koji ne narušava prava drugih korisnika. Zabranjeno je:
          </p>
          <ul className={classes.list}>
            <li>
              Pokušaj neovlašćenog pristupa sistemu, serveru ili podacima
              drugih korisnika.
            </li>
            <li>
              Postavljanje zlonamjernog softvera, virusa ili štetnog koda.
            </li>
            <li>
              Slanje neželjenih poruka (spam), lažnih podataka ili uvredljivog
              sadržaja putem kontakt forme.
            </li>
            <li>
              Kopiranje, reprodukcija ili distribucija sadržaja sajta bez
              pisane saglasnosti vlasnika.
            </li>
            <li>
              Korišćenje automatizovanih alata (botova, skripti) za
              prikupljanje sadržaja.
            </li>
          </ul>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            4. Kontakt forma i podaci korisnika
          </h2>
          <p className={classes.sectionText}>
            Slanjem podataka putem kontakt forme, potvrđujete da:
          </p>
          <ul className={classes.list}>
            <li>
              Su uneseni podaci <strong>tačni, potpuni i istiniti</strong>.
            </li>
            <li>
              Ste saglasni sa obradom vaših podataka u skladu sa našom{" "}
              <a
                href="/privatnost"
                style={{ color: "#ff6347", textDecoration: "none" }}
              >
                Politikom privatnosti
              </a>
              .
            </li>
            <li>
              Dostavljeni podaci neće biti korišćeni u nezakonite ili
              prevarne svrhe.
            </li>
            <li>
              Jorgić Woodwork zadržava pravo da ne odgovori na poruke koje
              sadrže uvredljiv sadržaj, neistinite podatke ili su očigledno
              zlonamjerne.
            </li>
          </ul>
          <p className={classes.sectionText}>
            Slanje poruke putem kontakt forme <strong>ne predstavlja
            zaključeni ugovor</strong> o pružanju usluga, već samo zahtjev
            za ponudu ili informacije.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>5. Intelektualna svojina</h2>
          <p className={classes.sectionText}>
            Sav sadržaj na ovom sajtu — uključujući tekstove, fotografije
            radova, logotip, dizajn stranice, grafička rješenja i kôd —
            vlasništvo je <strong>Jorgić Woodwork</strong> ili je korišćen uz
            odgovarajuću saglasnost. Zabranjeno je bilo kakvo kopiranje,
            preuzimanje ili komercijalno korišćenje sadržaja bez prethodne
            pisane saglasnosti.
          </p>
          <p className={classes.sectionText}>
            Fotografije izrađenih proizvoda služe kao prikaz naših radova i
            mogu prikazivati enterijere klijenata uz njihovu saglasnost.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            6. Tačnost informacija i ponude
          </h2>
          <p className={classes.sectionText}>
            Trudimo se da informacije na sajtu budu tačne i ažurirane, ali ne
            možemo garantovati potpunu tačnost, blagovremenost ili
            kompletnost podataka. Opisi usluga, fotografije i primjeri radova
            su informativnog karaktera. <strong>Konačna cijena i specifikacije</strong>{" "}
            svakog projekta utvrđuju se nakon izmjere i dogovora sa klijentom,
            u pisanoj ponudi.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            7. Ograničenje odgovornosti
          </h2>
          <p className={classes.sectionText}>
            Jorgić Woodwork ne odgovara za:
          </p>
          <ul className={classes.list}>
            <li>
              Posredne ili posljedične štete koje mogu nastati korišćenjem
              sajta.
            </li>
            <li>
              Nedostupnost sajta zbog tehničkih razloga, održavanja ili više
              sile.
            </li>
            <li>
              Greške u prenosu podataka putem interneta ili trećih usluga
              (npr. servisa za slanje poruka).
            </li>
            <li>
              Sadržaj eksternih sajtova na koje vode linkovi sa naše
              stranice.
            </li>
          </ul>
          <p className={classes.sectionText}>
            Korišćenjem sajta prihvatate da to činite na vlastitu
            odgovornost.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>8. Eksterni linkovi</h2>
          <p className={classes.sectionText}>
            Naš sajt može sadržati linkove ka eksternim stranicama i
            servisima (npr. Instagram, Google Maps, Web3Forms). Ti linkovi
            su isključivo informativnog karaktera. Ne preuzimamo odgovornost
            za sadržaj, uslove korišćenja ili politike privatnosti tih
            trećih strana.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>9. Izmjene uslova</h2>
          <p className={classes.sectionText}>
            Zadržavamo pravo da u bilo kom trenutku izmijenimo ili dopunimo
            ove Uslove korišćenja. Sve izmjene stupaju na snagu odmah nakon
            objavljivanja na ovoj stranici. Nastavkom korišćenja sajta nakon
            izmjena potvrđujete da prihvatate nove uslove.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            10. Mjerodavno pravo i nadležnost
          </h2>
          <p className={classes.sectionText}>
            Na ove Uslove korišćenja i sve sporove koji mogu proisteći iz
            korišćenja sajta primjenjuje se pravo{" "}
            <strong>Bosne i Hercegovine</strong>. U slučaju spora, nadležan
            je sud prema sjedištu rukovaoca (Banja Luka), osim ako zakon ne
            propisuje drugačije.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>11. Odvojivost odredaba</h2>
          <p className={classes.sectionText}>
            Ukoliko se neka odredba ovih Uslova utvrdi ništavnom ili
            neprimjenjivom, to neće uticati na valjanost i primjenu ostalih
            odredaba, koje ostaju na snazi u cjelosti.
          </p>
        </div>

        <div className={classes.contactBox}>
          <h3>Kontakt</h3>
          <p>
            <strong>Jorgić Woodwork</strong>
          </p>
          <p>Adresa: Bistrica BB, Banja Luka, Bosna i Hercegovina</p>
          <p>
            E‑mail:{" "}
            <a href="mailto:info@jorgicwoodwork.com">
              info@jorgicwoodwork.com
            </a>
          </p>
          <p>
            Telefon: <a href="tel:+38766531274">+387 66 531 274</a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
