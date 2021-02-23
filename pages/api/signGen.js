import { getSession } from "next-auth/client";
const cloudinary = require("cloudinary").v2;

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    // Signed in
    var timestamp = Math.round(new Date().getTime() / 1000);

    var signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      process.env.API_SECRET
    );

    res.status(200).json({ signature, timestamp });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
