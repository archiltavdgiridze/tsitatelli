import React, { useEffect, useState } from "react";
import "./admin.css";

const AdminPanel = ({ darkMode }) => {
  const [password, setPassword] = useState("");
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");
  const [source, setSource] = useState("");
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState(null); // { type: "success" | "error", message }
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "ადმინი | ციტატელი";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/add-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, author, quote, source, topic }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: result.error || "დაფიქსირდა შეცდომა." });
        return;
      }

      setStatus({ type: "success", message: "ციტატა წარმატებით დაემატა!" });
      setAuthor("");
      setQuote("");
      setSource("");
      setTopic("");
    } catch (error) {
      setStatus({ type: "error", message: "სერვერთან დაკავშირება ვერ მოხერხდა." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`result admin_panel ${darkMode ? "dark-mode" : ""}`}>
      <h1 className="result_title">ციტატის დამატება</h1>
      <form className="admin_form" onSubmit={handleSubmit}>
        <label>
          პაროლი
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          ავტორი
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <label>
          ციტატა
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={4}
            required
          />
        </label>
        <label>
          წყარო
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </label>
        <label>
          თემატიკა
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? "იტვირთება..." : "დამატება"}
        </button>
        {status && (
          <p className={`admin_status admin_status_${status.type}`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminPanel;
