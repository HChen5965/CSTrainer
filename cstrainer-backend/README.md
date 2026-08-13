# CSTrainer Backend API Service (SPE-235946-MS)

> Ontology-Driven Multi-AIGC Agentic Approach for Oil & Gas Scientific Research Supporting.

## 📌 核心特性 (Features)
- **5 大 LLM Agent 集群编排引擎**：集成 GPT-4o, DeepSeek-V4, Qwen-3.5, Tencent Hunyuan, Doubao-Seed 7.0。
- **动态贝叶斯信任度更新**：严格遵循 SPE-235946-MS 论文公式 (1) 与 (2) 进行 Agent 信任度迭代。
- **分布式动态本体框架**：构建静态实体概念与动态路线计划约束，有效消除 AIGC 幻觉。
- **工作流匹配与代码编译**：余弦相似度匹配领域模型库并生成可执行 Python 代码。

## 🚀 Docker 一键快速启动 (Quick Start)

1. **配置环境变量**：
```bash
cp .env.example .env
```

2. **使用 Docker Compose 一键启动**：
```bash
docker compose up -d
```

3. **访问交互式 API 文档**：
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
