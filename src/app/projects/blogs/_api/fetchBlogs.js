import blogs from "./blogs.json"

export default function handler(req, res) {
  // If get request
  if (req.method === "GET") {
    // Create a copy of blogs without the hashes and filenames
    const blogsNoHashes = blogs.map((blog) => {

      const { hash, filename, ...rest } = blog;
      return rest;
    });

    res.status(200).json(blogsNoHashes);  
  }
  else {
    res.status(405).send(`Method ${req.method} not allowed`);
  }
}