"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const TICKER_TOOLS = [
  "OpenAI GPT-4o", "Anthropic Claude", "Google Gemini", "Meta LLaMA",
  "Mistral", "LangChain", "LlamaIndex", "Hugging Face", "Pinecone",
  "Weaviate", "Qdrant", "OpenAI Embeddings", "Whisper", "Stable Diffusion",
  "AWS Bedrock", "Azure OpenAI", "Vertex AI", "Replicate",
];

const MODEL_CARDS = [
  {
    type: "Large Language Models",
    abbr: "LLM",
    desc: "Text generation, reasoning, summarisation, classification, and code.",
    models: ["GPT-4o", "Claude 3.5", "Gemini 1.5", "LLaMA 3"],
  },
  {
    type: "Embedding Models",
    abbr: "EMB",
    desc: "Semantic search, similarity matching, and RAG retrieval pipelines.",
    models: ["text-embedding-3", "E5-large", "BGE", "Cohere"],
  },
  {
    type: "Vision Models",
    abbr: "VIS",
    desc: "Image classification, object detection, OCR, and visual QA.",
    models: ["GPT-4V", "Gemini Vision", "CLIP", "YOLOv9"],
  },
  {
    type: "Speech & Audio",
    abbr: "STT",
    desc: "Transcription, speaker diarisation, and voice interfaces.",
    models: ["Whisper v3", "Deepgram", "AssemblyAI", "ElevenLabs"],
  },
  {
    type: "ML & Prediction",
    abbr: "ML",
    desc: "Tabular ML, time-series forecasting, and anomaly detection.",
    models: ["XGBoost", "LightGBM", "Prophet", "Scikit-learn"],
  },
];

export function TechAndModels() {
  const doubled = [...TICKER_TOOLS, ...TICKER_TOOLS];

  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="container px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold text-primary">Models & Tooling</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            We work with every major AI platform
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280] sm:text-lg">
            Model-agnostic by design — we choose the right model for your
            use case, budget, and latency requirements.
          </p>
        </div>

        {/* Scrolling ticker */}
        <div className="mt-12 overflow-hidden">
          <div className="relative">
            <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />
            <motion.div
              className="flex gap-3 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {doubled.map((tool, i) => (
                <span
                  key={i}
                  className="inline-flex shrink-0 items-center rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#4B5563] shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Model type cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {MODEL_CARDS.map((card, i) => (
            <motion.div
              key={card.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
              className="group rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_50px_-34px_rgba(90,187,74,0.15)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3F4F6] transition-colors duration-300 group-hover:bg-primary/10">
                <span className="text-xs font-black tracking-wider text-[#9CA3AF] transition-colors duration-300 group-hover:text-primary">
                  {card.abbr}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold tracking-tight text-foreground">{card.type}</h3>
              <p className="mt-2 text-xs leading-5 text-[#6B7280]">{card.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {card.models.map((m) => (
                  <span
                    key={m}
                    className="inline-flex rounded-full border border-[#E5E7EB] bg-background-alt px-2.5 py-1 text-[10px] font-medium text-[#6B7280] transition-all duration-300 hover:border-primary/40 hover:text-foreground"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
