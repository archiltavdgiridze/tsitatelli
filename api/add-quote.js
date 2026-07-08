import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { password, author, quote, source, topic } = req.body || {};

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  if (!author || !author.trim() || !quote || !quote.trim()) {
    res.status(400).json({ error: "Author and quote are required" });
    return;
  }

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    res.status(500).json({ error: "Server is missing Supabase configuration" });
    return;
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabaseAdmin
    .from("quotes")
    .insert({
      author: author.trim(),
      quote: quote.trim(),
      source: source ? source.trim() : "",
      topic: topic ? topic.trim() : "",
    })
    .select()
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ quote: data });
}
