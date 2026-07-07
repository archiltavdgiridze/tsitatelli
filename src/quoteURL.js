import quoteBase from "./quoteBase.json";

const tsitatelliDB = {
  data: quoteBase.map((q) => ({
    type: "georgian-quotes",
    id: q.id,
    attributes: {
      author: q.nameSurname,
      quote: q.quote,
      source: q.source,
      topic: q.topic,
    },
  })),
};

export default tsitatelliDB;
