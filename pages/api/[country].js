import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const {country} = req.query
  const client = await clientPromise;
  const db = client.db("auth");
  switch (req.method) {
    case "GET":
      const allPosts = await db.collection("posts").find({country}).sort({createdAt: -1}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}