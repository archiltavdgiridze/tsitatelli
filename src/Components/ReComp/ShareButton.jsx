import React from "react";

const ShareButton = ({ quote }) => {
  const handleShare = () => {
    // Encode the quote and website link to be shared on Facebook
    const encodedQuote = encodeURIComponent(quote);
    const encodedLink = encodeURIComponent(window.location.href);

    // Open the Facebook share dialog
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}&quote=${encodedQuote}`,
      "Share on Facebook",
      "width=600,height=400"
    );
  };

  return <button onClick={handleShare}>Share on Facebook</button>;
};

export default ShareButton;
