import React from 'react'
import { Link } from 'react-router-dom';


const MailTo = ({ email, subject = "", body = "", children }) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;
  return (
    <Link to={`mailto:${email}${params}`} target={`_blank`}>
      {children}
    </Link>
  );
};

export default MailTo