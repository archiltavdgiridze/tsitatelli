import React from "react";
import MailTo from "./MailTo";

const AboutUs = () => {
  return (
    <div className="result">
      <div className="about_us">
        <h1>ჩვენ ვართ ციტატელი</h1>
        <h2>
          გვერდის მისიაა, თქვენამდე მოიტანოს ცნობილი ციტატები, რომელიც იქნება
          საინტერესო და სასიამოვნო თქვენთვის.
          <br />
          თუ გსურთ თქვენი ციტატის დამატება ვებ–გვერდზე,{" "}
          <span>
            <MailTo
              email="achitavdgiridze@gmail.com"
              subject="Hello & Welcome"
              body="Hello world!"
            >
              დაგვიკავშირდით ელფოსტაზე!
            </MailTo>
          </span>
        </h2>
        <h2>ავტორი: არჩილ თავდგირიძე</h2>
        <span>
        </span>
      </div>
    </div>
  );
};

export default AboutUs;
