import OpenAI from "openai";
import db from "@/db";

const trimmer = (promptText, text) => {
  // Remove all new lines
  let trimmedText = text.replace(/(\r\n|\n|\r)/gm, "");
  // Trim leading spaces
  trimmedText = trimmedText.replace(/^\s+/gm, "");
  // first letter to lower case
  if (promptText.charAt(promptText.length - 1) === ".") {
    trimmedText = trimmedText.charAt(0).toUpperCase() + trimmedText.slice(1);
  } else {
    trimmedText = trimmedText.charAt(0).toLowerCase() + trimmedText.slice(1);
  }
  return trimmedText;
};

const autocomplete = async (req, res) => {
  try {
    // throw new Error("This is a test error");
    let { topic, promptText, user_uuid, apiKey } = req.body;

    if (!apiKey || apiKey === "") {
      const settings = await db.settings.get({ uuid: user_uuid });
      apiKey = settings.find((s) => s.name === "openAIKey")?.value;
    }

    const prompt = `Given the topic '${topic}', complete the text '${promptText}' in a meaningful way. Return only the additional part. Don't include quotation marks`;

    const openai = new OpenAI({
      apiKey
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 10,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json(trimmer(promptText, response.choices[0].message.content) || "");
  } catch (error) {
    console.log(error);
    res.json("An error occured from the server");
    return "";
  }
};

export default autocomplete;
