import React from 'react'

const MailTo = ({ email, subject = "", body = "", children }) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;
  return (
    <a href={`mailto:${email}${params}`} target={`_blank`}>
      {children}
    </a>
  );
};

export default MailTo