import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { postId } = req.query;
  const client = await clientPromise;
  const db = client.db("auth");
  switch (req.method) {
    case "DELETE":
      const deletePost = await db
        .collection("posts")
        .deleteOne({ _id: ObjectId(postId) });
      res.json(deletePost);
      break;

    case "PATCH":
      let bodyObject = JSON.parse(req.body);
      const updatePost = await db
        .collection("posts")
        .updateOne(
          { _id: ObjectId(postId) },
          { $set: bodyObject },
          { upsert: true }
        );
      res.json(updatePost);
      break;

    case "GET":
      const post = await db
        .collection("posts")
        .findOne({ _id: ObjectId(postId) });
      res.json(post);
      break;
  }
}
