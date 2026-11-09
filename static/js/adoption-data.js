// VLMBias adoption tracker: model cards, papers, frameworks and citation counts.
// This is the single source for the stat strip and the "Who uses VLMBias" section.
// The body after "window.VLMBIAS_ADOPTION = " must stay valid JSON (scripts/update_adoption.py parses it).
// Each model card lists the VLMBias scores exactly as printed in that card's own table;
// the same model can differ across cards because each lab runs its own evaluation.
window.VLMBIAS_ADOPTION = {
  "updated": "2026-11-09",
  "citations": {
    "semantic_scholar": 79,
    "openalex": 82,
    "semantic_scholar_url": "https://www.semanticscholar.org/arxiv/2505.23941",
    "openalex_url": "https://openalex.org/W4414855608"
  },
  "log": [
    {"date": "2026-11-09", "text": "Started the tracker: 4 model cards (Gemini 3 Pro, Seed1.8, Seed2.0, Qwen3.8), 12 papers, 3 frameworks. Citations: 79 on Semantic Scholar, 82 on OpenAlex."}
  ],
  "model_cards": [
    {
      "lab": "Google DeepMind",
      "icon": "./static/icons/sources/deepmind.com.png",
      "release": "Gemini 3 Pro",
      "date": "2025-12",
      "url": "https://twitter.com/googleaidevs/status/1996973083467333736",
      "source": "Gemini 3 Pro vision results table",
      "headline": "Gemini 3 Pro",
      "scores": [
        {"model": "Gemini 3 Pro", "score": 50.6},
        {"model": "Claude Opus 4.5", "score": 32.7},
        {"model": "Gemini 2.5 Pro", "score": 24.3},
        {"model": "GPT-5.1", "score": 21.7}
      ]
    },
    {
      "lab": "ByteDance Seed",
      "icon": "./static/icons/sources/seed.bytedance.com.png",
      "release": "Seed1.8",
      "date": "2025-12",
      "url": "https://arxiv.org/abs/2603.20633",
      "source": "Seed1.8 model card, Table 2",
      "headline": "Seed1.8",
      "scores": [
        {"model": "Seed1.8", "score": 62.0},
        {"model": "Gemini 3 Pro", "score": 50.6},
        {"model": "Claude Sonnet 4.5", "score": 30.2},
        {"model": "Seed1.5-VL", "score": 26.5},
        {"model": "Gemini 2.5 Pro", "score": 24.3},
        {"model": "GPT-5.1", "score": 21.7}
      ]
    },
    {
      "lab": "ByteDance Seed",
      "icon": "./static/icons/sources/seed.bytedance.com.png",
      "release": "Seed2.0",
      "date": "2026-02",
      "url": "https://arxiv.org/abs/2607.00248",
      "source": "Seed2.0 model card, Table 8",
      "headline": "Seed2.0 Pro",
      "scores": [
        {"model": "Seed2.0 Pro", "score": 77.4},
        {"model": "Seed2.0 Lite", "score": 74.8},
        {"model": "Seed1.8", "score": 62.0},
        {"model": "Seed2.0 Mini", "score": 58.4},
        {"model": "Gemini 3 Pro", "score": 50.6},
        {"model": "GPT-5.2", "score": 28.0},
        {"model": "Claude Opus 4.5", "score": 21.4}
      ]
    },
    {
      "lab": "Alibaba Qwen",
      "icon": "./static/icons/sources/qwen.ai.png",
      "release": "Qwen3.8",
      "date": "2026-08",
      "url": "https://qwen.ai/blog?id=qwen3.8",
      "source": "Qwen3.8 release blog",
      "headline": "Qwen3.8-Max",
      "scores": [
        {"model": "Qwen3.8-Max", "score": 88.3},
        {"model": "Gemini 3.1 Pro", "score": 74.1},
        {"model": "Claude Fable 5", "score": 61.2},
        {"model": "GPT-5.6 Sol", "score": 59.8},
        {"model": "Claude Opus 4.8", "score": 43.8},
        {"model": "Qwen3.7-Plus", "score": 36.6}
      ]
    }
  ],
  "derived": [
    {
      "lab": "Moonshot AI",
      "icon": "./static/icons/sources/kimi.ai.jpg",
      "name": "PerceptionBench",
      "date": "2026-07",
      "url": "https://arxiv.org/abs/2607.24957",
      "before": "used VLMBias as one of 42 source benchmarks to build",
      "after": ", which the Kimi K3 and Kimi K3.1-Pro model cards report"
    }
  ],
  "papers": [
    {"title": "ProQuant: Progressive Quantization-aware Training for Edge MLLMs", "url": "https://arxiv.org/abs/2611.08216", "date": "2026-11-05", "venue": "NeurIPS 2026"},
    {"title": "PixelBench: Can LLMs Understand and Generate Images Pixel by Pixel?", "url": "https://arxiv.org/abs/2611.02540", "date": "2026-11-02", "venue": "arXiv"},
    {"title": "See, Think, Use: Diagnosing Perception and Reasoning Failures in VLMs", "url": "https://arxiv.org/abs/2611.01467", "date": "2026-11-01", "venue": "arXiv"},
    {"title": "In-Context Learning Can Help Vision-Language Models Overcome Training Priors", "url": "https://arxiv.org/abs/2610.12942", "date": "2026-10-09", "venue": "NeurIPS 2026"},
    {"title": "Hard Vision, Easy Vision: What GPT-6 Astra Reveals Across Computer Vision", "url": "https://arxiv.org/abs/2609.35718", "date": "2026-09-28", "venue": "arXiv"},
    {"title": "SABRE: Scalable and Automated Benchmarking of VLMs under Stress", "url": "https://arxiv.org/abs/2608.07435", "date": "2026-08-07", "venue": "arXiv"},
    {"title": "Seeing or Knowing? Visual Context Sensitivity in Multimodal Large Language Models", "url": "https://arxiv.org/abs/2607.26326", "date": "2026-07-28", "venue": "arXiv"},
    {"title": "PerceptionBench: Evaluating Atomic Visual Perception in Multimodal Large Language Models", "url": "https://arxiv.org/abs/2607.24957", "date": "2026-07-27", "venue": "arXiv"},
    {"title": "Information-Regularized Attention for Visual-Centric Reasoning", "url": "https://arxiv.org/abs/2607.00434", "date": "2026-07-01", "venue": "ECCV 2026"},
    {"title": "Beyond Perception Errors: Semantic Fixation in Large Vision-Language Models", "url": "https://arxiv.org/abs/2604.12119", "date": "2026-04-13", "venue": "arXiv"},
    {"title": "Same or Not? Enhancing Visual Perception in Vision-Language Models", "url": "https://arxiv.org/abs/2512.23592", "date": "2025-12-29", "venue": "CVPR 2026"},
    {"title": "Can Structured Prompting Overcome Knowledge Bias in Vision-Language Models?", "url": "https://www.semanticscholar.org/paper/cb0289b7dccede65f55c66369a661da475d41e9b", "date": "", "venue": ""}
  ],
  "frameworks": [
    {"name": "lmms-eval", "url": "https://github.com/EvolvingLMMs-Lab/lmms-eval/tree/main/lmms_eval/tasks/vlms_are_biased", "date": "2025-12"},
    {"name": "VLMEvalKit", "url": "https://github.com/open-compass/VLMEvalKit", "date": "2026"},
    {"name": "EvalScope", "url": "https://evalscope.readthedocs.io/en/latest/benchmarks/vlms_are_biased.html", "date": "2026-10"}
  ]
};
