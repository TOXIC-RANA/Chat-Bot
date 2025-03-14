import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { message } = req.body;

  try {
    const response = await axios.get("https://api.simsimi.net/v2/", {
      params: {
        text: message,
        lc: "bn", // বাংলা ভাষার জন্য
        key: process.env.SIMSIMI_API_KEY, // তোমার SimSimi API Key
      },
    });

    res.status(200).json({ reply: response.data.success });
  } catch (error) {
    res.status(500).json({ error: "SimSimi API Error" });
  }
}
