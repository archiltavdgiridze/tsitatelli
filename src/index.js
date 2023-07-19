import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const AppWithFacebookInit = () => {
  useEffect(() => {
    // Initialize the Facebook SDK when the component mounts
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "231983419221843",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v12.0",
      });
    };

    // Load the Facebook SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<AppWithFacebookInit />, document.getElementById("root"));
