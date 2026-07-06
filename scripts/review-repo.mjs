import 'dotenv/config'
import fs from 'fs'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * -------------------------
 * CONFIG
 * -------------------------
 */

const filesToCheck = [
  'server/server.ts',
  'server/routes/units.ts',
  'server/routes/armyRoutes.ts',
  'server/db/knexfile.ts',
]

/**
 * -------------------------
 * LOAD FILE CONTEXT
 * -------------------------
 */

function loadFile(file) {
  return `\n\n=== ${file} ===\n` + fs.readFileSync(file, 'utf-8')
}

const repoContext = filesToCheck.map(loadFile).join('\n')

/**
 * -------------------------
 * GEMINI SETUP
 * -------------------------
 */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

/**
 * -------------------------
 * QWEN (LM STUDIO) SETUP
 * -------------------------
 */

const qwen = new OpenAI({
  baseURL: 'http://localhost:1234/v1',
  apiKey: 'lm-studio', // ignored but required
})

/**
 * -------------------------
 * PROMPT
 * -------------------------
 */

const prompt = `
You are reviewing a full-stack TypeScript project.

Focus on:
- build failures
- TS config issues
- ESM vs CommonJS issues
- missing modules
- runtime Express problems

Return:
1. root cause
2. exact fixes
3. priority order

CODEBASE:
${repoContext}
`

/**
 * -------------------------
 * RUN GEMINI
 * -------------------------
 */

async function runGemini() {
  const result = await geminiModel.generateContent(prompt)
  return result.response.text()
}

/**
 * -------------------------
 * RUN QWEN (LM STUDIO)
 * -------------------------
 */

async function runQwen() {
  const res = await qwen.chat.completions.create({
    model: 'qwen2.5-coder',
    messages: [
      {
        role: 'system',
        content: 'You are a senior full-stack TypeScript engineer.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
  })

  return res.choices[0].message.content
}

/**
 * -------------------------
 * MAIN
 * -------------------------
 */

async function main() {
  console.log('\n🧠 Running Gemini...\n')
  const gemini = await runGemini()

  console.log('\n🤖 Running Qwen (LM Studio)...\n')
  const qwenOut = await runQwen()

  console.log('\n================ GEMINI ================\n')
  console.log(gemini)

  console.log('\n================ QWEN ==================\n')
  console.log(qwenOut)
}

main()
