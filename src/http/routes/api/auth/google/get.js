import axios from "axios";
import db from "@/db";
import { jwtDecode } from "jwt-decode";

const get = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Authorization code is missing");
  }

  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { id_token } = response.data;
    const { email, name } = jwtDecode(id_token);

    const existed = await db.users.get({ email });
    let user;

    if (existed) user = existed;
    else user = await db.users.add({ email, name, service: "google" });

    res.cookie("user_uuid", user.uuid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.send(user);
  } catch (error) {
    console.error("Failed to exchange the authorization code:", error);
    res.status(500).send("Internal Server Error");
  }
};
export default get;
