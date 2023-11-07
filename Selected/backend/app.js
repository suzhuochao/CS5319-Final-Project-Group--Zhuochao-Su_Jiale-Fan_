/*************************REST-Style*****************************************/
/*
This code employs a REST (Representational State Transfer) approach because it uses HTTP methods
as intended by RESTful principles to perform operations on resources represented by URIs.
Each HTTP method (GET, POST, PUT, DELETE) corresponds to a CRUD (Create, Read, Update, Delete) operation below.
 */
import OpenAI from "openai";
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const port = 4000;
const app = express();
/******************************************************************/
const openai = new OpenAI({
  apiKey: `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`,
});

app.use(express.json());
app.use(cors());

const conversationHistory = {};
/******************************************************************/
// Return an array of conversations, filter out any undefined or null entries
app.get("/history", (req, res) => {
  const ids = Object.keys(conversationHistory);
  const val = Object.values(conversationHistory).map((cell, idx) => {
    return { ...cell, id: ids[idx] };
  });
  res.json(val);
});
/******************************************************************/
// POST method to create a chat response
app.post("/", async (req, res, next) => {
  try {
    let gpt_prompt = "In one short paragraph or less, answer the following question ";
    if (req.body.position == "for") {
      gpt_prompt += "as if you support the affirmative side";
    } else if (req.body.position == "against") {
      gpt_prompt += "as if you support the negative side";
    } else if (req.body.position == "neutral") {
      gpt_prompt += "taking a neutral position";
    } else {
      res.status = 400;
      res.json({ error: "position should be for, against, or neutral" });
      return;
    }
    gpt_prompt += ":\n" + req.body.question;
     const chatCompletion = await openai.chat.completions.create({
       messages: [{ role: "user", content: gpt_prompt }],
       // model: "gpt-3.5-turbo",
       model: "gpt-4",
     });
    const content = chatCompletion.choices[0].message.content;
    const id = uuidv4();
    conversationHistory[id] = {
      question: req.body.question,
      answer: content,
      position: req.body.position,
    };
    res.json({ id: id, response: content });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
/******************************************************************/
// PUT method to update conversation history
app.put("/history/:id", (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  if (conversationHistory[id]) {
    conversationHistory[id].answer = answer;
    res.json({ message: "Conversation updated.", conversation: conversationHistory[id] });
  } else {
    res.status(404).json({ error: "Conversation not found" });
  }
});
/******************************************************************/
// DELETE method to delete a conversation entry
app.delete("/history/:id", (req, res) => {
  const { id } = req.params;
  if (conversationHistory[id]) {
    delete conversationHistory[id];
    res.json({ message: "Conversation deleted." });
  } else {
    res.status(404).json({ error: "Conversation not found" });
  }
});
/******************************************************************/
// Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ error: "An internal server error occurred" });
});
/******************************************************************/
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


