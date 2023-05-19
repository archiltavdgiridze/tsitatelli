import React from "react";
import MailTo from "./MailTo";

const AboutUs = () => {
  return (
    <div className="result">
      <div className="about_us">
        <h1>ჩვენ ვართ ციტატელი</h1>
        <h2>
          გვერდის მისიაა, თქვენამდე მოიტანოს ცნობილი ქართველების ციტატები.
          <br />
          <br />
          თუ გსურთ თქვენი ციტატის დამატება ვებ–გვერდზე,{" "}
          <span>
            <MailTo
              email="achitavdgiridze@gmail.com"
              subject="Hello & Welcome"
              body="Hello world!"
            >
              დაგვიკავშირდით ელ-ფოსტაზე!
            </MailTo>
          </span>
        </h2>

        <h2>ვებ–გვერდის მფლობელი ავტორი: არჩილ თავდგირიძე</h2>
        <br />
        <br />
        <br />
        <br />
        <br />

        <h2>
          &copy; ციტატებზე არსებული შრიფტის ავტორია დავით მაისურაძე, შრიფტზე
          ყველა უფლება ეკუთვნის მას. davit.maisuradze@tsu.ge
        </h2>
      </div>
    </div>
  );
};

export default AboutUs;
