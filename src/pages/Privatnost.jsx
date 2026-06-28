import { motion } from "framer-motion";
import classes from "./LegalPage.module.css";

export default function Privatnost() {
  return (
    <section className={classes.legalPage}>
      <motion.div
        className={classes.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className={classes.header}>
          <h1 className={classes.title}>Politika privatnosti</h1>
          <p className={classes.lastUpdated}>
            Posljednje ažurirano: 19.04.2026.
          </p>
          <div className={classes.line}></div>
        </header>

        <div className={classes.intro}>
          Vaša privatnost nam je važna. Ova Politika privatnosti objašnjava koje
          lične podatke prikupljamo putem naše internet stranice{" "}
          <strong>jorgicwoodwork.com</strong>, u koje svrhe ih koristimo, kako
          ih čuvamo i koja su vaša prava u vezi sa obradom tih podataka.
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>1. Ko je rukovalac podataka</h2>
          <p className={classes.sectionText}>
            Rukovalac vaših ličnih podataka je <strong>Jorgić Woodwork</strong>,
            stolarska radionica sa sjedištem u Bistrici, Banja Luka, Bosna i
            Hercegovina. Za sva pitanja u vezi sa obradom ličnih podataka možete
            nas kontaktirati putem e‑mail adrese{" "}
            <strong>dgjorgicbl@gmail.com</strong>.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>2. Koje podatke prikupljamo</h2>
          <p className={classes.sectionText}>
            Putem kontakt forme na našem sajtu prikupljamo isključivo podatke
            koje nam vi dobrovoljno dostavite. To uključuje:
          </p>
          <ul className={classes.list}>
            <li>
              <strong>Ime i prezime</strong> — kako bismo znali kome se
              obraćamo.
            </li>
            <li>
              <strong>Broj telefona</strong> — radi kontakta i dogovaranja
              termina izmjere ili ponude.
            </li>
            <li>
              <strong>E‑mail adresa</strong> — za slanje ponuda, odgovora i
              dodatnih informacija.
            </li>
            <li>
              <strong>Poruka</strong> — sadržaj vašeg upita ili zahtjeva.
            </li>
          </ul>
          <p className={classes.sectionText}>
            Ne prikupljamo osjetljive lične podatke (podatke o zdravlju,
            vjerskim uvjerenjima, političkom mišljenju i sl.). Ne tražimo ni ne
            obrađujemo podatke maloljetnih lica.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>3. Svrha obrade podataka</h2>
          <p className={classes.sectionText}>
            Prikupljene podatke koristimo isključivo u svrhu:
          </p>
          <ul className={classes.list}>
            <li>Odgovora na vaše upite i zahtjeve za ponudu.</li>
            <li>Dogovaranja izmjere, izrade i montaže namještaja.</li>
            <li>
              Slanja informacija o toku realizacije projekta na vaš zahtjev.
            </li>
            <li>
              Ispunjavanja ugovorenih obaveza i zakonskih propisa (npr.
              računovodstveni zakoni u slučaju zaključenja posla).
            </li>
          </ul>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>4. Pravna osnova obrade</h2>
          <p className={classes.sectionText}>
            Vaše lične podatke obrađujemo na osnovu vaše{" "}
            <strong>saglasnosti</strong> koju dajete slanjem kontakt forme, te
            na osnovu <strong>legitimnog interesa</strong> za komunikaciju i
            realizaciju zatraženih usluga. Slanjem forme potvrđujete da ste
            saglasni sa uslovima ove Politike privatnosti.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            5. Obrada podataka i treće strane
          </h2>
          <p className={classes.sectionText}>
            Za prijem poruka iz kontakt forme koristimo uslugu{" "}
            <strong>Web3Forms</strong>, koja prosljeđuje sadržaj vaše poruke na
            našu e‑mail adresu. Web3Forms nastupa kao obrađivač podataka i
            obavezan je poštovati standarde zaštite ličnih podataka. Više
            informacija dostupno je na{" "}
            <a
              href="https://web3forms.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff6347" }}
            >
              web3forms.com/privacy
            </a>
            .
          </p>
          <p className={classes.sectionText}>
            Osim navedenog, vaše podatke <strong>ne prodajemo</strong>, ne
            iznajmljujemo niti dijelimo sa trećim licima u marketinške svrhe.
            Podaci mogu biti otkriveni nadležnim organima samo ako to zahtijeva
            zakon.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>6. Čuvanje podataka</h2>
          <p className={classes.sectionText}>
            Vaše podatke čuvamo samo onoliko koliko je potrebno za ispunjenje
            svrhe za koju su prikupljeni, a najduže do povlačenja vaše
            saglasnosti. Podaci vezani za zaključene poslove čuvaju se u skladu
            sa rokovima propisanim računovodstvenim i poreskim zakonima Bosne i
            Hercegovine.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>7. Vaša prava</h2>
          <p className={classes.sectionText}>
            U skladu sa Zakonom o zaštiti ličnih podataka Bosne i Hercegovine i
            opštim principima zaštite podataka, imate pravo na:
          </p>
          <ul className={classes.list}>
            <li>
              <strong>Pristup</strong> svojim podacima i informacijama o obradi.
            </li>
            <li>
              <strong>Ispravku</strong> netačnih ili nepotpunih podataka.
            </li>
            <li>
              <strong>Brisanje</strong> ("pravo na zaborav") kada više ne
              postoji osnov za obradu.
            </li>
            <li>
              <strong>Ograničenje obrade</strong> u određenim slučajevima.
            </li>
            <li>
              <strong>Prigovor</strong> na obradu zasnovanu na legitimnom
              interesu.
            </li>
            <li>
              <strong>Povlačenje saglasnosti</strong> u bilo kom trenutku, bez
              uticaja na zakonitost obrade prije povlačenja.
            </li>
            <li>
              <strong>Podnošenje pritužbe</strong> Agenciji za zaštitu ličnih
              podataka u Bosni i Hercegovini.
            </li>
          </ul>
          <p className={classes.sectionText}>
            Za ostvarivanje bilo kog od navedenih prava, kontaktirajte nas putem
            kontakt podataka navedenih na kraju ove stranice.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>8. Bezbjednost podataka</h2>
          <p className={classes.sectionText}>
            Preduzimamo razumne tehničke i organizacione mjere kako bismo vaše
            podatke zaštitili od neovlašćenog pristupa, gubitka, izmjene ili
            otkrivanja. Komunikacija sa našim sajtom odvija se preko{" "}
            <strong>HTTPS</strong> zaštićene veze.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>9. Kolačići (Cookies)</h2>
          <p className={classes.sectionText}>
            Naš sajt može koristiti osnovne (tehničke) kolačiće neophodne za
            ispravno funkcionisanje stranice. Ne koristimo kolačiće za marketing
            ili profilisanje korisnika. U svakom trenutku možete onemogućiti
            kolačiće u podešavanjima vašeg internet preglednika.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>
            10. Linkovi ka drugim sajtovima
          </h2>
          <p className={classes.sectionText}>
            Naš sajt može sadržati linkove ka eksternim stranicama (npr.
            Instagram, Google Maps). Nismo odgovorni za sadržaj ni politiku
            privatnosti tih sajtova. Preporučujemo vam da pročitate njihove
            politike privatnosti prije korišćenja.
          </p>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>11. Izmjene politike</h2>
          <p className={classes.sectionText}>
            Zadržavamo pravo da povremeno ažuriramo ovu Politiku privatnosti.
            Sve izmjene biće objavljene na ovoj stranici, sa naznačenim datumom
            posljednjeg ažuriranja. Preporučujemo vam da povremeno provjerite
            ovu stranicu.
          </p>
        </div>

        <div className={classes.contactBox}>
          <h3>Kontakt za pitanja o privatnosti</h3>
          <p>
            <strong>Jorgić Woodwork</strong>
          </p>
          <p>Adresa: Bistrica BB, Banja Luka, Bosna i Hercegovina</p>
          <p>
            E‑mail:{" "}
            <a href="mailto:dgjorgicbl@gmail.com">dgjorgicbl@gmail.com</a>
          </p>
          <p>
            Telefon: <a href="tel:+38766531274">+387 66 531 274</a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
