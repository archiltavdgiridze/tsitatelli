import tsitatelliDB from "../quoteURL";

// Supabase is temporarily disabled because the live "quotes" table has no
// data loaded yet (see supabase_import_quotes.sql). Falling back to the
// bundled quoteBase.json until that's sorted out. To re-enable Supabase,
// uncomment the block below and remove the local-data implementation.
export async function fetchQuotesData() {
  return tsitatelliDB;
}

// import { supabase } from "../supabaseClient";
//
// export async function fetchQuotesData() {
//   const { data, error } = await supabase
//     .from("quotes")
//     .select("id, author, quote, source, topic")
//     .order("id", { ascending: true });
//
//   if (error) throw error;
//
//   return {
//     data: data.map((row) => ({
//       type: "georgian-quotes",
//       id: row.id,
//       attributes: {
//         author: row.author,
//         quote: row.quote,
//         source: row.source,
//         topic: row.topic,
//       },
//     })),
//   };
// }
