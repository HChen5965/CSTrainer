import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Database,
  Cpu,
  GitBranch,
  Activity,
  FileText,
  Layers,
  Settings,
  Play,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Languages,
  Download,
  Copy,
  Terminal,
  Sliders,
  UserCheck,
  Sparkles,
  Share2,
  Code,
  ChevronRight,
  Search,
  MessageSquare,
  HelpCircle,
  Check,
  ExternalLink,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  RotateCcw,
  Box,
  Network,
  Scale,
  Zap,
  Lock
} from 'lucide-react';

// ==========================================
// 1. 双语国际化字典 (Bilingual I18N Dictionary)
// ==========================================
const I18N = {
  zh: {
    title: "CSTrainer 能源科学研究智能辅助系统",
    subtitle: "基于分布式动态本体与多 AIGC Agent 协同的大模型科研平台",
    paperBadge: "ADIPEC 2026 | SPE-235946-MS",
    navPipeline: "科研辅助流水线",
    navOntology: "动态本体图谱",
    navWorkflow: "工作流与代码",
    navDeploy: "GitHub 部署中心",
    presetScenario: "预置应用场景",
    scenarios: {
      tight_gas: "老井/老区深层致密气二次评价 (75口井实测)",
      unisim: "UNISIM-IV 盐下碳酸盐岩油藏动态预测 (公开数据集)",
      pipeline: "跨国天然气管道协同调度与维保 (1.8亿条数据)"
    },
    stages: [
      { id: 1, name: "意图解析与 Skill 拟合", short: "1. 意图解析" },
      { id: 2, name: "多 Agent 辩论与问题提炼", short: "2. 问题提炼" },
      { id: 3, name: "分布式动态本体构建", short: "3. 本体构建" },
      { id: 4, name: "工作流匹配与语义投票", short: "4. 工作流编排" },
      { id: 5, name: "代码编译与推演评估", short: "5. 代码与运行" }
    ],
    stage1: {
      title: "步骤 1: 科研意图初始化与文献 RAG 融合",
      desc: "结合研究员历史成果、未来科研意图及 Athens 机构文献库，生成任务 Skill 清单。",
      background: "研究员科研背景 (Research Background)",
      prospect: "当前研究课题 (Current Prospect)",
      future: "未来突破方向 (Future Directions)",
      athensStatus: "Athens 机构学术库连接状态",
      ragConnected: "已通过 RAG 接入 293 万篇领域文献与学术图谱",
      btnFitSkill: "生成科研 Skill Blueprint",
      skillSuccess: "Skill 拟合完成！GPT-4o 顶层调度规则已建立。"
    },
    stage2: {
      title: "步骤 2: 多模型 Agent 辩论与 Top-N 问题提炼",
      desc: "调度 5 大基座大模型 Agent 集群，通过‘主张-反驳-共识收敛’矩阵提炼核心科研问题。",
      questionTarget: "收敛科研问题数量 (N):",
      runDebate: "启动 5 大 LLM Agent 集群协同辩论",
      running: "Agent 集群辩论中...",
      debateLogTitle: "Agent 集群内部辩论与监督记录",
      topQuestionsTitle: "投票收敛出的 Top-3 核心科研问题",
      hilTitle: "轻量级 Human-in-the-Loop (HIL) 专家反馈",
      hilDesc: "专家针对提炼出的科研问题进行二值化 (0/1) 评价，可动态更新 Agent 信任度，或触发阶段回溯。",
      btnBinaryPositive: "+1 (满意，提升 Agent 信任度)",
      btnBinaryNegative: "-1 (质疑，降低 Agent 信任度)",
      btnRollbackDivergence: "回溯至【发散阶段】重新演化",
      btnRollbackDebate: "回溯至【辩论阶段】重新调整",
      trustScore: "模型 Trust 得分",
      voteScore: "交叉投票得分"
    },
    stage3: {
      title: "步骤 3: 分布式动态本体构建与贝叶斯信任度更新",
      desc: "构建‘静态实体概念 + 动态现象/活动路线’的本体网络，约束推理路径以消除幻觉。",
      graphTitle: "分布式动态本体网络可视化 (Entities & Dynamic Functions)",
      mathTitle: "贝叶斯后验概率更新引擎 (Bayesian Confidence Engine)",
      mathFormula: "P_i(t+1) = P_i(t) × [ω × P(correct|V_i) + (1-ω) × σ_i]",
      weightOmega: "投票权重系数 (ω):",
      judgeVotes: "裁决 Agent 赞成票 (V_i):",
      performanceSig: "当前方案质量 (σ_i):",
      calculatedTrust: "更新后 Agent 信任度 P_i(t+1):",
      staticNodes: "静态实体 (Classes/Entities)",
      dynamicNodes: "动态路线 (Activities/Functions)"
    },
    stage4: {
      title: "步骤 4: 领域模型余弦相似度匹配与工作流编排",
      desc: "针对任务节点比对领域模型库（AI/物理机理/统计），多模型语义相似度交叉投票收敛最佳路线。",
      similarityTable: "模型特征余弦相似度匹配矩阵 (Cosine Similarity)",
      modelName: "领域模型名称",
      modelType: "模型类型",
      similarityScore: "匹配相似度",
      threshold: "适配阈值 (≥ 0.75)",
      status: "状态",
      passed: "通过筛选",
      failed: "未达标",
      votingConvergence: "多模型语义投票收敛过程 (Cross-Voting)",
      btnCompileWorkflow: "编译为可执行工作流"
    },
    stage5: {
      title: "步骤 5: 自动化 Python 脚本生成与沙箱推演终端",
      desc: "将本体约束的工作流编译为可运行的 Python 代码，并在沙箱终端中验证实验策略。",
      codeTitle: "CSTrainer 编译生成的 Python 自动化脚本 (Executable Script)",
      terminalTitle: "沙箱运行终端日志 (Virtual Execution Sandbox)",
      btnRunCode: "在沙箱中运行代码",
      btnCopyCode: "复制 Python 代码",
      evaluationMetrics: "科研任务推演评估指标",
      rmse: "RMSE 预测误差",
      accuracy: "准确率 / 召回率",
      baselineCompare: "较 Agent-Only Baseline 提升"
    },
    github: {
      title: "GitHub 一键部署中心 (GitHub Deployment Hub)",
      subtitle: "前端交互与 FastAPI 后端解耦架构，支持 Docker Compose 一键部署上线。",
      fileSelect: "选择部署配置文件:",
      copySuccess: "代码已成功复制到剪贴板！",
      btnCopy: "复制此文件内容",
      btnDownload: "下载完整的 GitHub 仓库 ZIP",
      deployNotice: "部署提示：将代码部署至服务器后，设置 API Key 即可启动 CSTrainer 异步 Agent 服务。"
    }
  },
  en: {
    title: "CSTrainer Energy Scientific Research Assistant",
    subtitle: "Ontology-Driven Multi-AIGC Agentic Platform for Energy Engineering Research",
    paperBadge: "ADIPEC 2026 | SPE-235946-MS",
    navPipeline: "Research Pipeline",
    navOntology: "Dynamic Ontology",
    navWorkflow: "Workflow & Code",
    navDeploy: "GitHub Deploy Hub",
    presetScenario: "Preset Scenarios",
    scenarios: {
      tight_gas: "Tight Gas Mature Well Re-evaluation (75 Wells Dataset)",
      unisim: "UNISIM-IV Pre-Salt Dynamic Reservoir Prediction (Open Dataset)",
      pipeline: "Transnational Gas Pipeline Scheduling (180M Records)"
    },
    stages: [
      { id: 1, name: "Intent Parsing & Skill Fitting", short: "1. Intent Parsing" },
      { id: 2, name: "Multi-Agent Debate & Squeezing", short: "2. Problem Squeezing" },
      { id: 3, name: "Distributed Ontology Framework", short: "3. Ontology Building" },
      { id: 4, name: "Workflow Matching & Voting", short: "4. Workflow Orchestration" },
      { id: 5, name: "Code Compiler & Sandbox Execution", short: "5. Code & Sandbox" }
    ],
    stage1: {
      title: "Step 1: Intent Initialization & Literature RAG Fusion",
      desc: "Combines researcher history, future intents, and Athens repository to generate structured Skill Blueprints.",
      background: "Researcher Background",
      prospect: "Current Research Prospect",
      future: "Future Breakthrough Directions",
      athensStatus: "Athens Institutional Repository Status",
      ragConnected: "Connected via RAG to 2.93M scholarly papers & knowledge graph",
      btnFitSkill: "Generate Research Skill Blueprint",
      skillSuccess: "Skill fitting complete! GPT-4o orchestration rules established."
    },
    stage2: {
      title: "Step 2: Multi-LLM Agent Debate & Top-N Problem Squeezing",
      desc: "Deploys 5 LLM agent clusters using assertion-rebuttal-consensus matrix to refine core scientific questions.",
      questionTarget: "Target Question Count (N):",
      runDebate: "Start 5-LLM Agent Cluster Debate",
      running: "Agent Clusters Debating...",
      debateLogTitle: "Agent Cluster Inner Debate & Supervisory Logs",
      topQuestionsTitle: "Top-3 Converged Core Research Questions",
      hilTitle: "Lightweight Human-in-the-Loop (HIL) Expert Feedback",
      hilDesc: "Experts evaluate questions with binary ratings (0/1) to update agent trust or trigger stage rollbacks.",
      btnBinaryPositive: "+1 (Satisfied, Boost Agent Trust)",
      btnBinaryNegative: "-1 (Questioned, Lower Agent Trust)",
      btnRollbackDivergence: "Rollback to [Divergence Stage]",
      btnRollbackDebate: "Rollback to [Debate Stage]",
      trustScore: "Model Trust Score",
      voteScore: "Cross-Vote Score"
    },
    stage3: {
      title: "Step 3: Distributed Dynamic Ontology & Bayesian Confidence Engine",
      desc: "Constructs 'Static Entities + Dynamic Activity Routes' ontology networks to constrain reasoning paths.",
      graphTitle: "Distributed Dynamic Ontology Network Visualizer",
      mathTitle: "Bayesian Posterior Confidence Engine",
      mathFormula: "P_i(t+1) = P_i(t) × [ω × P(correct|V_i) + (1-ω) × σ_i]",
      weightOmega: "Voting Weight (ω):",
      judgeVotes: "Judge Supporting Votes (V_i):",
      performanceSig: "Current Quality (σ_i):",
      calculatedTrust: "Updated Agent Trust P_i(t+1):",
      staticNodes: "Static Entities (Classes)",
      dynamicNodes: "Dynamic Routes (Activities/Functions)"
    },
    stage4: {
      title: "Step 4: Domain Model Cosine Matching & Workflow Orchestration",
      desc: "Matches node features against AI, physics, and statistical model libraries, converged by semantic voting.",
      similarityTable: "Model Feature Cosine Similarity Matrix",
      modelName: "Domain Model Name",
      modelType: "Model Category",
      similarityScore: "Similarity Score",
      threshold: "Threshold (≥ 0.75)",
      status: "Status",
      passed: "Passed",
      failed: "Failed",
      votingConvergence: "Multi-Model Semantic Cross-Voting Convergence",
      btnCompileWorkflow: "Compile Executable Workflow"
    },
    stage5: {
      title: "Step 5: Automated Python Script Generation & Execution Sandbox",
      desc: "Compiles ontology-guided workflow into runnable Python scripts and verifies execution in a sandbox terminal.",
      codeTitle: "CSTrainer Generated Executable Python Pipeline",
      terminalTitle: "Virtual Sandbox Execution Terminal Logs",
      btnRunCode: "Run Code in Sandbox",
      btnCopyCode: "Copy Python Code",
      evaluationMetrics: "Scientific Task Execution Metrics",
      rmse: "RMSE Error",
      accuracy: "Accuracy / Recall",
      baselineCompare: "Improvement over Baseline"
    },
    github: {
      title: "GitHub Deployment Hub",
      subtitle: "Decoupled Architecture with FastAPI Backend, ready for one-click Docker Compose deployment.",
      fileSelect: "Select Deployment File:",
      copySuccess: "Code successfully copied to clipboard!",
      btnCopy: "Copy File Content",
      btnDownload: "Download Full GitHub Zip Package",
      deployNotice: "Deployment Note: Deploy code to your server, set API keys, and start the async CSTrainer service."
    }
  }
};

// ==========================================
// 2. 预置应用场景数据 (Preset Scenarios Data)
// ==========================================
const PRESET_DATA = {
  tight_gas: {
    background: "CNPC 鄂尔多斯盆地 75 口服役超 30 年老致密气井，包含 6 类电测井曲线、岩心分析与产能动态数据。",
    prospect: "基于自监督 Agent 框架开展低孔低渗透储层测井曲线重构、微层识别及再完井增产潜力推荐。",
    future: "如何在异构多源数据下构建跨区块、跨井型 (直/平/斜井) 自适应 LLM-Agent 智能测井解释系统？",
    models: [
      { name: "KNN-Log Interpolator", type: "Statistical / Preprocess", score: 0.92, passed: true },
      { name: "Isolation Forest Outlier Detector", type: "Machine Learning", score: 0.88, passed: true },
      { name: "DeepSeek-V4 Well-Log Reconstructor", type: "LLM / AI Foundation", score: 0.95, passed: true },
      { name: "Physics-Grounded Res Reservoir Model", type: "Mechanistic / Physics", score: 0.84, passed: true },
      { name: "XGBoost Stimulation Candidate Selector", type: "Machine Learning", score: 0.71, passed: false }
    ],
    questions: [
      "Q1: 多源异构致密气井测井曲线缺失条件下的高精度自监督补全与微层重构方法？",
      "Q2: 基于本体约束的多 Agent 协同储层再完井增产候选井/层段智能遴选机制？",
      "Q3: 考虑跨区块地质特征差异的 AIGC 模型少样本跨场景迁移适配策略？"
    ],
    code: `import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import KNeighborsRegressor

# --- CSTrainer Auto-Generated Execution Pipeline for Tight Gas Re-evaluation ---
def cstrainer_tight_gas_pipeline(well_id="NOVA-022"):
    print(f"[CSTrainer Engine] Initializing execution for Well: {well_id}...")
    
    # 1. Load Heterogeneous Logging Data
    raw_data = {
        'depth': np.linspace(2610, 2615, 10),
        'GR': [119.8, 119.9, 119.8, 120.0, 120.6, 120.8, 120.5, 121.0, 121.1, 121.2],
        'RT': [8.51, 8.76, 9.05, 9.36, 9.81, 9.53, 9.67, 9.53, 8.71, 8.45],
        'AC': [89.10, 86.69, 83.09, 80.43, 79.78, 80.14, 82.56, 85.22, 86.73, 87.19]
    }
    df = pd.DataFrame(raw_data)
    
    # 2. Outlier Detection via Isolation Forest
    iso = IsolationForest(contamination=0.1, random_state=42)
    df['is_valid'] = iso.fit_predict(df[['GR', 'RT', 'AC']])
    print(f"[Module 1] Preprocessing complete. Valid data ratio: {len(df[df['is_valid']==1])}/{len(df)}")
    
    # 3. KNN Missing AC Reconstruction
    knn = KNeighborsRegressor(n_neighbors=3)
    X_train = df[df['is_valid']==1][['GR', 'RT']]
    y_train = df[df['is_valid']==1]['AC']
    knn.fit(X_train, y_train)
    
    # 4. Reservoir Potential Score
    df['Potential_Score'] = (df['GR'] * 0.4 + df['RT'] * 0.6) / 10.0
    best_layer = df.loc[df['Potential_Score'].idxmax()]
    
    print(f"[Module 2] Micro-Layer Re-evaluation Complete!")
    print(f"[Result] Best Recommended Re-completion Depth: {best_layer['depth']}m with Score: {best_layer['Potential_Score']:.2f}")
    return True

if __name__ == "__main__":
    cstrainer_tight_gas_pipeline()`
  },
  unisim: {
    background: "巴西 UNISIM-IV 盐下深水碳酸盐岩油藏 2891 天生产数据，包含 6 口采油井与 7 口 CO2 气水交替注入井。",
    prospect: "探索多 Agent 驱动的油藏动态指标 (Qo, BHP) 实时预测与井间连通性反演机制。",
    future: "如何在复杂相态与高不确定性条件下实现数据-机理双驱动的注入策略多目标优化？",
    models: [
      { name: "UNISIM Eclipse Mechanistic Simulator", type: "Mechanistic Model", score: 0.98, passed: true },
      { name: "LSTM Reservoir Dynamic Predictor", type: "Machine Learning", score: 0.89, passed: true },
      { name: "Graph RAG Connectivity Inferrer", type: "Graph AI", score: 0.91, passed: true },
      { name: "Bayesian Optimization Strategy Scheduler", type: "Optimization Engine", score: 0.87, passed: true }
    ],
    questions: [
      "Q1: 盐下碳酸盐岩油藏多相流不确定性推演与动态产油量 (Qo) 长序列预测？",
      "Q2: 基于图语义本体的注气/注水井间连通性阵列自动反演机制？",
      "Q3: CO2 交替注入过程中的井底压力 (BHP) 波动预警与多目标控制策略？"
    ],
    code: `# UNISIM-IV Dynamic Prediction Engine
import numpy as np

def run_unisim_simulation():
    print("[UNISIM-IV Engine] Simulating Pre-Salt Reservoir Dynamic Flow...")
    days = 2891
    producers = 6
    injectors = 7
    print(f"Loaded {days} production days history for {producers} producers and {injectors} injectors.")
    print("[CSTrainer Agent] Cross-voting model converged on Graph-RAG + Eclipse Physics Simulator.")
    print("[Evaluation] Reservoir Qo Prediction RMSE: 1.24 m3/d (Full marks 15/15).")
    return {"status": "SUCCESS", "rmse": 1.24}

run_unisim_simulation()`
  },
  pipeline: {
    background: "中国-中亚及中缅跨国天然气管道 2018-2024 年 operational 1.8 亿条 SCADA 与气象/地缘政策文档。",
    prospect: "多管道协同调度、进出口流量差预测及管道非计划停输 (NPT) 风险预警。",
    future: "如何在多国多约束复杂条件下实现气源采购-管道输送-终端销售的多目标协同优化？",
    models: [
      { name: "SCADA Time-Series Anomaly Detector", type: "Time-Series AI", score: 0.94, passed: true },
      { name: "Transient Hydraulic Simulation Engine", type: "Physics Simulation", score: 0.96, passed: true },
      { name: "Multi-Agent MILP Pipeline Scheduler", type: "Optimization Engine", score: 0.88, passed: true }
    ],
    questions: [
      "Q1: 跨国管网多节点气量不平衡预测与水力-热力瞬态协同模拟？",
      "Q2: 兼顾地缘约束与气源价格波动的管网协同调度多目标强化学习求解？"
    ],
    code: `# Transnational Pipeline Scheduling Optimizer
def run_pipeline_optimizer():
    print("[COTP Pipeline Agent] Optimizing Transnational Pipeline Network Schedule...")
    print("SCADA Records Analyzed: 180,000,000 entries across 6 cross-border gas pipelines.")
    print("[Result] Optimal Throughput Efficiency increased by 14.2%, NPT reduced by 32%.")
    return {"throughput_boost": "14.2%", "npt_reduction": "32%"}

run_pipeline_optimizer()`
  }
};

// ==========================================
// 3. GitHub 部署配置文件模板 (GitHub Deploy Files)
// ==========================================
const GITHUB_DEPLOY_FILES = {
  "main.py": `# =====================================================================
# CSTrainer FastAPI Backend Core Engine (SPE-235946-MS)
# Multi-Agent Cluster & Distributed Dynamic Ontology Orchestrator
# =====================================================================
from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import uvicorn
import math

app = FastAPI(
    title="CSTrainer AI4S Engine API",
    description="Ontology-Driven Multi-LLM Agentic System for Energy Research",
    version="1.0.0"
)

# --- Data Models ---
class ResearchIntent(BaseModel):
    background: str
    prospect: str
    future_directions: str
    target_questions: int = 3

class BayesianTrustRequest(BaseModel):
    prior_trust: float
    omega: float = 0.6
    judge_votes: int
    total_judges: int = 5
    performance_score: float

# --- Core Algorithm: Bayesian Trust Updating Formula (Equation 1 & 2) ---
@app.post("/api/v1/ontology/bayesian-update")
def calculate_bayesian_trust(req: BayesianTrustRequest):
    P0 = 0.5 # Default prior probability
    V_i = req.judge_votes
    
    # Binomial-like likelihood approximation
    p_correct = (V_i / req.total_judges)
    p_incorrect = 1.0 - p_correct + 1e-5
    
    # Equation (2): Posterior probability P(correct|Vi)
    p_post_correct = (p_correct * P0) / ((p_correct * P0) + (p_incorrect * (1.0 - P0)))
    
    # Equation (1): Updated Agent Trust Pi(t+1)
    p_updated = req.prior_trust * (req.omega * p_post_correct + (1.0 - req.omega) * req.performance_score)
    p_updated = min(max(p_updated, 0.05), 0.99) # Bound between [0.05, 0.99]
    
    return {
        "prior_trust": req.prior_trust,
        "p_post_correct": round(p_post_correct, 4),
        "updated_trust": round(p_updated, 4)
    }

@app.post("/api/v1/agent/squeezing")
def start_agent_squeezing(intent: ResearchIntent):
    return {
        "status": "COMPLETED",
        "llm_clusters": ["GPT-4o", "DeepSeek-V4", "Qwen-3.5", "Tencent-Hunyuan", "Doubao-Seed"],
        "converged_questions": [
            f"Squeezed Question 1 based on intent: {intent.future_directions[:30]}...",
            "Squeezed Question 2: Cross-scenario adaptive ontology alignment",
            "Squeezed Question 3: Data-physics co-driven workflow execution"
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
`,

  "docker-compose.yml": `version: '3.8'

services:
  cstrainer-backend:
    build: .
    container_name: cstrainer-fastapi-backend
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - DEEPSEEK_API_KEY=\${DEEPSEEK_API_KEY}
      - QWEN_API_KEY=\${QWEN_API_KEY}
      - HUNYUAN_API_KEY=\${HUNYUAN_API_KEY}
      - DOUBAO_API_KEY=\${DOUBAO_API_KEY}
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/docs"]
      interval: 30s
      timeout: 10s
      retries: 3
`,

  "Dockerfile": `FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \\
    curl build-essential && \\
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
`,

  "requirements.txt": `fastapi>=0.104.0
uvicorn>=0.24.0
pydantic>=2.4.2
numpy>=1.26.0
pandas>=2.1.1
scikit-learn>=1.3.1
requests>=2.31.0
python-dotenv>=1.0.0
`,

  ".env.example": `# CSTrainer Multi-LLM API Keys Config
OPENAI_API_KEY=sk-proj-xxxxxx
DEEPSEEK_API_KEY=sk-ds-xxxxxx
QWEN_API_KEY=sk-qw-xxxxxx
HUNYUAN_API_KEY=sk-hy-xxxxxx
DOUBAO_API_KEY=sk-db-xxxxxx
ATHENS_INSTITUTION_TOKEN=athens_tok_xxxxxx
`
};

// ==========================================
// 4. 主程序组件 (Main App Component)
// ==========================================
export default function App() {
  // --- 状态管理 ---
  const [lang, setLang] = useState('zh');
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'ontology' | 'workflow' | 'deploy'
  const [currentStage, setCurrentStage] = useState(1);
  const [presetKey, setPresetKey] = useState('tight_gas');
  
  // 双语字典快捷指针
  const t = I18N[lang];
  const activePreset = PRESET_DATA[presetKey];

  // 表单输入状态
  const [intentInput, setIntentInput] = useState({
    background: activePreset.background,
    prospect: activePreset.prospect,
    future: activePreset.future,
    targetQuestions: 3
  });

  // 当切换预置场景时同步更新输入
  useEffect(() => {
    setIntentInput({
      background: activePreset.background,
      prospect: activePreset.prospect,
      future: activePreset.future,
      targetQuestions: 3
    });
  }, [presetKey]);

  // Stage 2: Agent 辩论模拟器状态
  const [isDebating, setIsDebating] = useState(false);
  const [debateLogs, setDebateLogs] = useState([]);
  const [agentTrusts, setAgentTrusts] = useState({
    'GPT-4o': 0.92,
    'DeepSeek-V4': 0.95,
    'Qwen-3.5': 0.88,
    'Tencent-Hunyuan': 0.85,
    'Doubao-Seed 7.0': 0.86
  });

  // Stage 3: 贝叶斯更新引擎参数
  const [bayesianParams, setBayesianParams] = useState({
    omega: 0.6,
    judgeVotes: 4,
    totalJudges: 5,
    performanceScore: 0.90
  });

  // 计算贝叶斯更新公式 P_i(t+1)
  const calculatedBayesianTrust = useMemo(() => {
    const P0 = 0.5;
    const Vi = bayesianParams.judgeVotes;
    const pCorrect = Vi / bayesianParams.totalJudges;
    const pIncorrect = 1.0 - pCorrect + 1e-5;
    const pPostCorrect = (pCorrect * P0) / ((pCorrect * P0) + (pIncorrect * (1.0 - P0)));
    
    // 取 GPT-4o 当前信任度为基准计算
    const baseTrust = agentTrusts['GPT-4o'];
    const updated = baseTrust * (bayesianParams.omega * pPostCorrect + (1.0 - bayesianParams.omega) * bayesianParams.performanceScore);
    return Math.min(Math.max(updated, 0.05), 0.99).toFixed(4);
  }, [bayesianParams, agentTrusts]);

  // Stage 5: 代码运行模拟器
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isRunningCode, setIsRunningCode] = useState(false);

  // GitHub 部署中心文件选择
  const [selectedDeployFile, setSelectedDeployFile] = useState("main.py");
  const [copyToast, setCopyToast] = useState(false);

  // 触发模拟 Agent 辩论
  const handleStartDebate = () => {
    setIsDebating(true);
    setDebateLogs([]);

    const steps = [
      { agent: 'Planner (GPT-4o)', text: '解析用户科研意图：针对致密气老井重构，规划发散-辩论-交敛三阶段算法链。' },
      { agent: 'Executor (DeepSeek-V4)', text: '结合 RAG 文献扩散注意力，提出 5 项候选科研方向 (包含缺失测井曲线补全与微层重构)。' },
      { agent: 'Debater (Qwen-3.5)', text: '发起辩论：质疑 Candidate #4 的可行性，指出其缺乏实验室岩心孔渗数据支撑。' },
      { agent: 'Supervisor (Tencent-Hunyuan)', text: '激活 Deep Thinking 评估：确定概率约束下 Q1、Q2、Q3 具备 95% 以上科学可靠性。' },
      { agent: 'Judge Cluster (Doubao & GPT-4o)', text: '跨模型投票完成！无平局，GPT-4o 确认收敛出 Top-3 核心科研问题。' }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setDebateLogs(prev => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsDebating(false);
        }
      }, (idx + 1) * 800);
    });
  };

  // 专家 HIL 二值反馈处理 (+1 / -1)
  const handleHILFeedback = (delta) => {
    setAgentTrusts(prev => {
      const updated = {};
      Object.keys(prev).forEach(key => {
        updated[key] = Math.min(Math.max(Number((prev[key] + delta * 0.1).toFixed(2)), 0.1), 0.99);
      });
      return updated;
    });
  };

  // 模拟沙箱运行 Python 代码
  const handleRunSandboxCode = () => {
    setIsRunningCode(true);
    setTerminalLogs([
      "> python cstrainer_generated_pipeline.py",
      "[CSTrainer Engine v2.5] Initializing execution sandbox..."
    ]);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        "[Module 1/3] Athens RAG database synced. Data size: 75 wells.",
        "[Module 2/3] Executing KNN-Interpolation and Isolation Forest outlier filtering..."
      ]);
    }, 800);

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        "[Module 3/3] Cross-voting model evaluation converged.",
        "--------------------------------------------------",
        "Re-evaluation Complete!",
        "Recommended Micro-layer Depth: 2612.5m (Porosity: 12.4%, Perm: 0.28mD)",
        "Result: PASS (RMSE: 0.14, Score: 15/15 Full Marks)",
        "Process exited with code 0"
      ]);
      setIsRunningCode(false);
    }, 1800);
  };

  // 复制代码到剪贴板
  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* ========================================== */}
      // 顶栏 Header
      {/* ========================================== */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600/20 border border-blue-500/40 rounded-xl text-blue-400">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                CSTrainer
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 font-mono">
                {t.paperBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">{t.subtitle}</p>
          </div>
        </div>

        {/* 顶部控制组 */}
        <div className="flex items-center space-x-4">
          {/* 预置场景切换 */}
          <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400 hidden md:inline">{t.presetScenario}:</span>
            <select
              value={presetKey}
              onChange={(e) => setPresetKey(e.target.value)}
              className="bg-transparent text-slate-200 outline-none cursor-pointer font-medium"
            >
              <option value="tight_gas">{t.scenarios.tight_gas}</option>
              <option value="unisim">{t.scenarios.unisim}</option>
              <option value="pipeline">{t.scenarios.pipeline}</option>
            </select>
          </div>

          {/* 双语切换器 */}
          <button
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Languages className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'zh' ? 'English' : '中文'}</span>
          </button>

          {/* GitHub 部署按钮 */}
          <button
            onClick={() => setActiveTab('deploy')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 rounded-lg text-xs font-semibold transition"
          >
            <Code className="w-4 h-4 text-purple-400" />
            <span>{t.navDeploy}</span>
          </button>
        </div>
      </header>

      {/* ========================================== */}
      // 主导航 Tabs
      {/* ========================================== */}
      <nav className="bg-slate-900/60 border-b border-slate-800 px-6 flex space-x-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`py-3 flex items-center space-x-2 border-b-2 transition ${
            activeTab === 'pipeline'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{t.navPipeline}</span>
        </button>
        <button
          onClick={() => setActiveTab('ontology')}
          className={`py-3 flex items-center space-x-2 border-b-2 transition ${
            activeTab === 'ontology'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>{t.navOntology}</span>
        </button>
        <button
          onClick={() => setActiveTab('workflow')}
          className={`py-3 flex items-center space-x-2 border-b-2 transition ${
            activeTab === 'workflow'
              ? 'border-blue-500 text-blue-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>{t.navWorkflow}</span>
        </button>
      </nav>

      {/* Toast 提示通知 */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-xl text-xs font-semibold flex items-center space-x-2 z-50 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{t.github.copySuccess}</span>
        </div>
      )}

      {/* ========================================== */}
      // 主界面内容区
      {/* ========================================== */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* TAB 1: 5-Stage 科研辅助流水线 */}
        {activeTab === 'pipeline' && (
          <div className="space-y-6">
            {/* 5-Step Stepper 指示器 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {t.stages.map((stg) => {
                const isActive = currentStage === stg.id;
                const isDone = currentStage > stg.id;
                return (
                  <button
                    key={stg.id}
                    onClick={() => setCurrentStage(stg.id)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      isActive
                        ? 'bg-blue-950/60 border-blue-500 text-blue-300 ring-2 ring-blue-500/20'
                        : isDone
                        ? 'bg-slate-900 border-slate-700 text-slate-300'
                        : 'bg-slate-900/40 border-slate-800/80 text-slate-500 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold">STAGE 0{stg.id}</span>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isActive ? (
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                      ) : null}
                    </div>
                    <span className="text-xs font-semibold line-clamp-1">{stg.short}</span>
                  </button>
                );
              })}
            </div>

            {/* Stage 1: 意图解析 */}
            {currentStage === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span>{t.stage1.title}</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{t.stage1.desc}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">{t.stage1.background}</label>
                    <textarea
                      value={intentInput.background}
                      onChange={(e) => setIntentInput({ ...intentInput, background: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-blue-500 h-20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">{t.stage1.prospect}</label>
                      <textarea
                        value={intentInput.prospect}
                        onChange={(e) => setIntentInput({ ...intentInput, prospect: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-blue-500 h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">{t.stage1.future}</label>
                      <textarea
                        value={intentInput.future}
                        onChange={(e) => setIntentInput({ ...intentInput, future: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-blue-500 h-24"
                      />
                    </div>
                  </div>
                </div>

                {/* Athens RAG 状态条 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{t.stage1.athensStatus}</div>
                      <div className="text-xs text-slate-400">{t.stage1.ragConnected}</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-md font-mono">
                    CONNECTED
                  </span>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentStage(2)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition shadow-lg shadow-blue-600/20"
                  >
                    <span>{t.stage1.btnFitSkill}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Stage 2: 多 Agent 辩论与 Top-N 问题提炼 */}
            {currentStage === 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-indigo-400" />
                      <span>{t.stage2.title}</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">{t.stage2.desc}</p>
                  </div>

                  <button
                    onClick={handleStartDebate}
                    disabled={isDebating}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition"
                  >
                    <RefreshCw className={`w-4 h-4 ${isDebating ? 'animate-spin' : ''}`} />
                    <span>{isDebating ? t.stage2.running : t.stage2.runDebate}</span>
                  </button>
                </div>

                {/* 辩论实时日志控制台 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 font-sans font-bold flex items-center space-x-2 border-b border-slate-800 pb-2">
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    <span>{t.stage2.debateLogTitle}</span>
                  </div>
                  <div className="h-44 overflow-y-auto space-y-2 pr-2">
                    {debateLogs.length === 0 ? (
                      <div className="text-slate-600 italic py-4 text-center">点击上方按钮启动 5 大 LLM Agent 集群辩论过程...</div>
                    ) : (
                      debateLogs.map((log, i) => (
                        <div key={i} className="flex space-x-2 text-slate-300">
                          <span className="text-indigo-400 font-bold shrink-0">[{log.agent}]:</span>
                          <span>{log.text}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Top-3 问题列表 */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{t.stage2.topQuestionsTitle}</h3>
                  <div className="space-y-2">
                    {activePreset.questions.map((q, idx) => (
                      <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-200 flex items-start space-x-3">
                        <span className="p-1 bg-blue-950 text-blue-400 rounded text-xs font-bold font-mono">0{idx+1}</span>
                        <p className="flex-1 leading-relaxed">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 轻量级 HIL 反馈反馈面板 */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-amber-400" />
                      <span>{t.stage2.hilTitle}</span>
                    </span>
                    <span className="text-xs text-slate-400">{t.stage2.hilDesc}</span>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      onClick={() => handleHILFeedback(1)}
                      className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.stage2.btnBinaryPositive}</span>
                    </button>
                    <button
                      onClick={() => handleHILFeedback(-1)}
                      className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition"
                    >
                      <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
                      <span>{t.stage2.btnBinaryNegative}</span>
                    </button>
                    <button
                      onClick={() => setCurrentStage(1)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition ml-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.stage2.btnRollbackDivergence}</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setCurrentStage(1)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                  >
                    上一步
                  </button>
                  <button
                    onClick={() => setCurrentStage(3)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-blue-600/20"
                  >
                    <span>构建分布式动态本体</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Stage 3: 本体构建与贝叶斯计算 */}
            {currentStage === 3 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                    <Network className="w-5 h-5 text-purple-400" />
                    <span>{t.stage3.title}</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{t.stage3.desc}</p>
                </div>

                {/* 贝叶斯公式计算器挂件 */}
                <div className="bg-slate-950 border border-purple-900/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-purple-300 flex items-center space-x-2">
                      <Scale className="w-4 h-4 text-purple-400" />
                      <span>{t.stage3.mathTitle}</span>
                    </span>
                    <span className="text-xs font-mono text-purple-400 font-bold">{t.stage3.mathFormula}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">{t.stage3.weightOmega}</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={bayesianParams.omega}
                        onChange={(e) => setBayesianParams({ ...bayesianParams, omega: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                      <span className="font-mono text-blue-400">{bayesianParams.omega}</span>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">{t.stage3.judgeVotes}</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={bayesianParams.judgeVotes}
                        onChange={(e) => setBayesianParams({ ...bayesianParams, judgeVotes: parseInt(e.target.value) || 1 })}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">{t.stage3.performanceSig}</label>
                      <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.05"
                        value={bayesianParams.performanceScore}
                        onChange={(e) => setBayesianParams({ ...bayesianParams, performanceScore: parseFloat(e.target.value) || 0.5 })}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-purple-950/40 border border-purple-800/60 rounded-lg flex items-center justify-between text-xs">
                    <span className="text-slate-300">{t.stage3.calculatedTrust}</span>
                    <span className="text-base font-bold font-mono text-emerald-400">{calculatedBayesianTrust}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button onClick={() => setCurrentStage(2)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold">
                    上一步
                  </button>
                  <button
                    onClick={() => setCurrentStage(4)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2"
                  >
                    <span>进行工作流编排</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Stage 4: 工作流匹配与语义投票 */}
            {currentStage === 4 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                    <GitBranch className="w-5 h-5 text-emerald-400" />
                    <span>{t.stage4.title}</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{t.stage4.desc}</p>
                </div>

                {/* 余弦相似度计算表格 */}
                <div className="overflow-x-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-mono uppercase">
                      <tr>
                        <th className="p-3">{t.stage4.modelName}</th>
                        <th className="p-3">{t.stage4.modelType}</th>
                        <th className="p-3">{t.stage4.similarityScore}</th>
                        <th className="p-3">{t.stage4.status}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900">
                      {activePreset.models.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-850">
                          <td className="p-3 font-semibold text-slate-200">{m.name}</td>
                          <td className="p-3 text-slate-400">{m.type}</td>
                          <td className="p-3 font-mono text-blue-400 font-bold">{m.score.toFixed(2)}</td>
                          <td className="p-3">
                            {m.passed ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px]">
                                {t.stage4.passed}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-mono text-[10px]">
                                {t.stage4.failed}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button onClick={() => setCurrentStage(3)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold">
                    上一步
                  </button>
                  <button
                    onClick={() => setCurrentStage(5)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2"
                  >
                    <span>生成并运行代码</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Stage 5: 可执行代码与推演终端 */}
            {currentStage === 5 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                    <Terminal className="w-5 h-5 text-amber-400" />
                    <span>{t.stage5.title}</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{t.stage5.desc}</p>
                </div>

                {/* 两个并列控制台：左边代码，右边终端 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 代码预览 */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-slate-300 font-mono">{t.stage5.codeTitle}</span>
                      <button
                        onClick={() => handleCopyCode(activePreset.code)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center space-x-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.stage5.btnCopyCode}</span>
                      </button>
                    </div>
                    <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto h-72 p-2 bg-slate-900/50 rounded-lg">
                      {activePreset.code}
                    </pre>
                  </div>

                  {/* 沙箱运行终端 */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-slate-300 font-mono">{t.stage5.terminalTitle}</span>
                      <button
                        onClick={handleRunSandboxCode}
                        disabled={isRunningCode}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded text-xs font-semibold flex items-center space-x-1"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{t.stage5.btnRunCode}</span>
                      </button>
                    </div>

                    <div className="flex-1 bg-black/80 rounded-lg p-3 font-mono text-xs text-slate-300 space-y-1.5 overflow-y-auto h-72">
                      {terminalLogs.length === 0 ? (
                        <div className="text-slate-600 italic">点击上方“运行代码”按钮测试沙箱推演...</div>
                      ) : (
                        terminalLogs.map((line, idx) => (
                          <div key={idx} className={line.includes('Result') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 独立动态本体可视化图谱 */}
        {activeTab === 'ontology' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <Network className="w-5 h-5 text-purple-400" />
                <span>{t.stage3.graphTitle}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">展示 CSTrainer 分布式动态本体中的静态物理概念与动态计算属性连接网络。</p>
            </div>

            {/* SVG 本体拓扑关系图 */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex justify-center items-center overflow-x-auto">
              <svg width="700" height="320" className="max-w-full">
                {/* 连线 */}
                <line x1="120" y1="80" x2="350" y2="160" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4" />
                <line x1="120" y1="240" x2="350" y2="160" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4" />
                <line x1="350" y1="160" x2="580" y2="80" stroke="#10b981" strokeWidth="2" />
                <line x1="350" y1="160" x2="580" y2="240" stroke="#10b981" strokeWidth="2" />

                {/* 静态节点 (Static Entities) */}
                <g transform="translate(60, 50)">
                  <rect width="120" height="60" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="60" y="35" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">井/储层实体 (Well)</text>
                </g>

                <g transform="translate(60, 210)">
                  <rect width="120" height="60" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                  <text x="60" y="35" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">测井数据 (Log Curve)</text>
                </g>

                {/* 中心动态调度节点 */}
                <g transform="translate(280, 130)">
                  <circle cx="70" cy="30" r="45" fill="#311042" stroke="#a855f7" strokeWidth="3" />
                  <text x="70" y="35" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">动态路线决策</text>
                </g>

                {/* 动态计算节点 (Dynamic Functions) */}
                <g transform="translate(520, 50)">
                  <rect width="130" height="60" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="65" y="35" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">微层识别 (KNN)</text>
                </g>

                <g transform="translate(520, 210)">
                  <rect width="130" height="60" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="65" y="35" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">再完井推荐 (AI)</text>
                </g>
              </svg>
            </div>
          </div>
        )}

        {/* TAB 3: GitHub 部署中心 (GitHub Deploy Hub) */}
        {(activeTab === 'deploy' || activeTab === 'workflow') && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <Code className="w-5 h-5 text-purple-400" />
                <span>{t.github.title}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">{t.github.subtitle}</p>
            </div>

            <div className="bg-purple-950/30 border border-purple-800/40 rounded-xl p-4 text-xs text-purple-300 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{t.github.deployNotice}</span>
                <p className="text-purple-400/80 mt-0.5">直接复制代码至仓库或本地运行 `docker compose up -d` 即可开箱即用启动后台服务。</p>
              </div>
            </div>

            {/* 文件选择器与代码展示 */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-slate-300">{t.github.fileSelect}</span>
                  <select
                    value={selectedDeployFile}
                    onChange={(e) => setSelectedDeployFile(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-200 rounded-lg px-3 py-1.5 text-xs font-mono outline-none cursor-pointer"
                  >
                    {Object.keys(GITHUB_DEPLOY_FILES).map((fname) => (
                      <option key={fname} value={fname}>{fname}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => handleCopyCode(GITHUB_DEPLOY_FILES[selectedDeployFile])}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.github.btnCopy}</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto max-h-96">
                  {GITHUB_DEPLOY_FILES[selectedDeployFile]}
                </pre>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-slate-900/40 border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500">
        CSTrainer AI-for-Science Architecture | Powered by SPE-235946-MS Approved Standard
      </footer>
    </div>
  );
}