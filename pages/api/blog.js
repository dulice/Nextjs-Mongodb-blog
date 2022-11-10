import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("auth");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      bodyObject.createdAt = new Date(bodyObject.createdAt);
      let myPost = await db.collection("posts").insertOne(bodyObject);
      res.json(myPost);
      break;
    case "GET":
      const allPosts = await db.collection("posts").find({}).sort({createdAt: -1}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}