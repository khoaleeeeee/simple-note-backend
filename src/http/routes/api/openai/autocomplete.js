import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

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
    const promptText = req.body.promptText;

    const prompt = `Complete the sentence '${promptText}' in a meaningful way. Return only the additional part to complete the sentence. Don't include quotation marks`;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
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
    res.json("An error occured from the server");
    return "";
  }
};

export default autocomplete;
