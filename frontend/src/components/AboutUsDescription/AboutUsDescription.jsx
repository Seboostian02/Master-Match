import React from "react";
import picture from "../../assets/logo.png";
import styles from "./AboutUsDescription.module.css";

export default function AboutUsDescription() {
  return (
    <main className={styles.about}>
      <section>
        <img src={picture} alt="stikmeni fantastici" />
        <div>
          <h2>Despre Master Match.</h2>
          <p>
            Master Match este un proiect de Summer Practice în cadrul Continental, care s-a născut din alte 3 proiecte combinate.
            Scopul acestui proiect este să unească experții în anumite domenii cu cei care vor să învețe skill-uri utile prin 
            training-uri personalizate.
          </p>
          <p>
            Cine suntem noi? Noi suntem Luminița, Alexandra și Sebastian și am lucrat cu mult drag această vara
            la Master Match și abia așteptăm să vedeți cum a ieșit. 
            <br/>
            <br/>
            P.S.: fiecare dintre noi și-a pus amprenta pe acest site și am adăugat propriul "Easter Egg":) 
            Vă invităm să le descoperiți! 
          </p>
        </div>
      </section>
    </main>
  );
}
