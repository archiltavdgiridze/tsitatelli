import { supabase } from "../supabaseClient";

export async function fetchQuotesData() {
  const { data, error } = await supabase
    .from("quotes")
    .select("id, author, quote, source, topic")
    .order("id", { ascending: true });

  if (error) throw error;

  return {
    data: data.map((row) => ({
      type: "georgian-quotes",
      id: row.id,
      attributes: {
        author: row.author,
        quote: row.quote,
        source: row.source,
        topic: row.topic,
      },
    })),
  };
}
