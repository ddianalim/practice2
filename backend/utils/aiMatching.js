const { OpenAI } = require('openai');
const dotenv = require('dotenv');
const path = require('path');

// Load env from correct path
dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Current directory:', __dirname);
console.log('API Key status:', {
  exists: !!process.env.OPENAI_API_KEY,
  length: process.env.OPENAI_API_KEY?.length,
  preview: process.env.OPENAI_API_KEY?.substring(0, 7) + '...'
});

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not defined in .env file');
  process.exit(1);
}

console.log('API Key loaded:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');
console.log('API Key length:', process.env.OPENAI_API_KEY?.length);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getEmbedding(text) {
  try {
    console.log('Calling OpenAI API for text:', text.substring(0, 50) + '...');
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    throw new Error(`Failed to get embedding: ${error.message}`);
  }
}

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (normA * normB);
}

async function calculateJobMatch(resume, job) {
  try {
    const resumeEmbedding = resume.embedding || await getEmbedding(resume.content);
    const jobEmbedding = job.embedding || await getEmbedding(
      `${job.title} ${job.description} ${job.requirements.join(' ')}`
    );
    return cosineSimilarity(resumeEmbedding, jobEmbedding);
  } catch (error) {
    console.error('Match calculation error:', error);
    return 0; // Return 0 score on error
  }
}

module.exports = { getEmbedding, calculateJobMatch }; 