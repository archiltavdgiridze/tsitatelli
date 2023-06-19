import React from "react";
import MailTo from "./MailTo";

const AboutUs = () => {
  const url = "https://linktr.ee/archiltavdgiridze";
  const calligraphy = "https://calligraphy.ge/";

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

        <h2>
          ვებ–გვერდის ავტორი:{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            არჩილ თავდგირიძე
          </a>
        </h2>
        <br />
        <br />
        <br />
        <br />
        <br />

        <h4>
          &copy; ციტატებზე არსებული შრიფტი აღებულია &nbsp;
          <a href={calligraphy} target="_blank" rel="noopener noreferrer">
            calligraphy.ge
          </a>
          –დან და მისი ავტორია დავით მაისურაძე, შრიფტზე ყველა უფლება ეკუთვნის
          მას. davit.maisuradze@tsu.ge
        </h4>
      </div>
    </div>
  );
};

export default AboutUs;
