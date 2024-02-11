const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAi = new GoogleGenerativeAI("AIzaSyBwWhQ0RXlL8oHayZv1ZBT6ND3l_L2169E");
const generationConfig = { temperature : 0.9, topP : 1, topK: 1, maxOutputTokens: 4096};

const model = genAi.getGenerativeModel({ model: "gemini-pro", generationConfig});

async function generateContent(prompt) {
    try{
        console.log(prompt);
        const result = await model.generateContent(prompt.prompt);
        const response = await result.response;
        const surya = await response.text();
        console.log(response.text());
        return surya;
    }
    catch(error){
        console.error('Error Generating Content', error);
    }
}

// generateContent();

module.exports = { generateContent}

