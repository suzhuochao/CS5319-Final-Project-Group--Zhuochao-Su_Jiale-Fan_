//**************************RPC-style-Architecture******************************************/
// /*
// Uses RPC (Remote Procedure Call) approach as it defines explicit procedures or methods such as
// getHistory, createChat, updateChat, and deleteChat that can be invoked remotely through
// HTTP requests. Instead of the RESTful approach of associating HTTP methods with resource URIs,
// this RPC-style interaction is based on invoking these specific methods.
// Each method encapsulates a distinct action and is directly mapped to a corresponding HTTP route,
// which is then processed by the server as a single standalone function call.
// This allows clients to perform complex operations with a single request-response cycle,
// typical of RPC architecture, where the focus is on actions (calls) rather than on resources, as in REST.
//  */

 import OpenAI from "openai";
 import express from "express";
 import cors from "cors";
 import { v4 as uuidv4 } from "uuid";

 const port = 4000;
 const app = express();

 const openai = new OpenAI({
   apiKey:'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',
 });

 app.use(express.json());
 app.use(cors());

 const conversationHistory = {};

 // RPC-style internal methods
 const rpcMethods = {
   getHistory() {
     return Object.values(conversationHistory).map((value, index) => ({
       ...value,
       id: Object.keys(conversationHistory)[index],
     }));
   },

   async createChat(question, position) {
     let prompt = "In one short paragraph or less, answer the following question ";
     switch (position) {
       case "for":
         prompt += "as if you support the affirmative side";
         break;
       case "against":
         prompt += "as if you support the negative side";
         break;
       case "neutral":
         prompt += "taking a neutral position";
         break;
       default:
         throw new Error("Invalid position");
     }
     prompt += `:\n${question}`;

     // Here to construct the messages array
     const messages = [{
       role: "user", // "system" is another valid role for context setting
       content: prompt
     }];

     // Make sure to pass the messages array to the chat completions
     const chatResponse = await openai.chat.completions.create({
       model: "gpt-3.5-turbo", // or "gpt-4"
       messages: messages,
       max_tokens: 150,
     });

     const id = uuidv4();
     // Assuming the API response format is correct, adjust accordingly if different.
     const content = chatResponse.choices[0].message.content.trim();
     conversationHistory[id] = { question, answer: content, position };

     return { id, response: content };
   },


   updateChat(id, answer) {
     if (conversationHistory[id]) {
       conversationHistory[id].answer = answer;
       return { message: "Conversation updated.", conversation: conversationHistory[id] };
     } else {
       throw new Error("Conversation not found");
     }
   },

   deleteChat(id) {
     if (conversationHistory[id]) {
       delete conversationHistory[id];
       return { message: "Conversation deleted." };
     } else {
       throw new Error("Conversation not found");
     }
   },
 };

 app.get("/history", (req, res) => {
   res.json(rpcMethods.getHistory());
 });

 app.post("/", async (req, res, next) => {
   try {
     const { question, position } = req.body;
     const response = await rpcMethods.createChat(question, position);
     res.json(response);
   } catch (error) {
     next(error);
   }
 });

  app.put("/history/:id", (req, res, next) => {
   try {
     const { id } = req.params;
     const { answer } = req.body;
     const response = rpcMethods.updateChat(id, answer);
     res.json(response);
   } catch (error) {
      next(error);
   }
 });

 app.delete("/history/:id", (req, res, next) => {
   try {
     const { id } = req.params;
     const response = rpcMethods.deleteChat(id);
     res.json(response);
   } catch (error) {
     next(error);
   }
 });

 // Error handling middleware
 app.use((error, req, res, next) => {
   console.error(error.message);
   const status = error.message === "Conversation not found" ? 404 : 500;
   res.status(status).json({ error: error.message });
});

 app.listen(port, () => {
   console.log(`Server running on port ${port}`);
 });

