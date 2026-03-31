# CSTrainer: An ontology driven multiple AIGC agentic approach for oil and gas scientific research supporting
# Paper: CSTrainer V0.8
# GitHub: https://github.com/你的用户名/CSTrainer
# Version 0.8.0

import json
import random
import uuid
import time
import numpy as np
from typing import List, Dict, Any
from dataclasses import dataclass
from enum import Enum
from sklearn.metrics.pairwise import cosine_similarity

VERSION = "0.8.0"
BASE_MODELS = ["GPT4O", "Hunyuan", "DeepSeekV4Lite", "Qwen3.5", "DoubaoSeed2Lite"]

class AgentRole(Enum):
    PLANNER     = "planner"
    SUPERVISOR  = "supervisor"
    EXECUTOR    = "executor"
    DEBATER     = "debater"
    RESEARCHER  = "researcher"
    JUDGE       = "judge"

@dataclass
class UserInput:
    user_id: str
    intent: str
    background: str
    current_project: str
    future_directions: str
    past_research: List[str]
    expected_questions: int = 5
    max_iterations: int = 10

@dataclass
class CandidateSolution:
    content: str
    model: str
    votes: int = 0

@dataclass
class ScientificQuestion:
    content: str
    innovation: float
    feasibility: float
    relevance: float
    source: str
    confidence: float = 0.0

@dataclass
class OntologyComponent:
    entity: str
    attributes: Dict[str, Any]
    relations: List[str]
    functions: List[str]
    trust: float
    creativity: float

@dataclass
class ExecutionScheme:
    model_select: str
    strategy: str
    post_process: str
    votes: int = 0

class BaseModelAgent:
    def __init__(self, name):
        self.name = name
    def generate(self, intent, research, step):
        return f"[{self.name}] {step[:40]}..."
    def vote(self, candidate, pool):
        return random.choice([0,1])
    def generate_question(self, task, ctx, residual):
        return f"Q_{self.name}_{random.randint(100,999)}"
    def evaluate(self, qs, top_n, metric):
        return qs[:top_n]
    def choose_metric(self):
        return random.choice(["bayes","markov","entropy"])
    def build_ontology(self, q, trust, creat):
        return OntologyComponent(
            entity=f"Entity_{self.name}",
            attributes={"type":"scientific"},
            relations=["causes","affects"],
            functions=["simulate","predict","optimize"],
            trust=trust, creativity=creat
        )
    def judge_ontology(self, ont):
        return random.choice([0,1])
    def select_task_model(self, candidates, constraint):
        return random.choice(candidates) if candidates else "BaseModel"
    def make_strategy(self, model, constraint):
        return f"Train & infer pipeline for {model}"
    def post_process(self, constraint):
        return "Evaluate → log → iterate"
    def sim(self, a, b):
        return random.uniform(0.5, 1.0)

class AgentCluster:
    def __init__(self, model_name):
        self.model = BaseModelAgent(model_name)
        self.planner = BaseModelAgent(model_name)
        self.supervisor = BaseModelAgent(model_name)
        self.executors = [BaseModelAgent(model_name) for _ in range(3)]
        self.debater = BaseModelAgent(model_name)

class CSTrainer:
    def __init__(self):
        self.clusters = {n: AgentCluster(n) for n in BASE_MODELS}
        self.kb = {"best_practices":[],"literatures":[],"records":[]}
        self.user = None
        self.solution = None
        self.questions = []
        self.ontology = None
        self.schemes = []

    def fit_skill(self, user: UserInput) -> CandidateSolution:
        steps = ["Problem definition","Literature review","Method design","Experiment"]
        candidates = []
        for step in steps[:3]:
            for name, cluster in self.clusters.items():
                cont = cluster.model.generate(user.intent, user.past_research, step)
                candidates.append(CandidateSolution(cont, name))
        for c in candidates:
            for clu in self.clusters.values():
                c.votes += clu.model.vote(c.content, [x.content for x in candidates])
        candidates.sort(key=lambda x:x.votes, reverse=True)
        self.solution = candidates[0]
        return self.solution

    def generate_questions(self, user: UserInput) -> List[ScientificQuestion]:
        pool = []
        for name, clu in self.clusters.items():
            for e in clu.executors:
                q = e.generate_question("scientific", str(self.kb), "residual")
                pool.append(q)
        vote = {}
        for clu in self.clusters.values():
            metric = clu.model.choose_metric()
            top = clu.model.evaluate(pool, user.expected_questions, metric)
            for q in top:
                vote[q] = vote.get(q, 0)+1
        sorted_q = sorted(vote.items(), key=lambda x:x[1], reverse=True)
        out = [
            ScientificQuestion(
                content=q,
                innovation=random.uniform(0.7,1),
                feasibility=random.uniform(0.7,1),
                relevance=random.uniform(0.7,1),
                source=random.choice(BASE_MODELS)
            )
            for q,_ in sorted_q[:user.expected_questions]
        ]
        self.questions = out
        return out

    def build_ontology(self, questions: List[ScientificQuestion]):
        M, m = 7, 4
        trusts = [random.uniform(0.4,0.9) for _ in range(M)]
        creats = [random.uniform(0.3,0.9) for _ in range(M)]
        candidates = []
        for q in questions[:2]:
            for i in range(m):
                ag = random.choice(list(self.clusters.values()))
                candidates.append(ag.model.build_ontology(q.content, trusts[i], creats[i]))
        judges = [random.choice(list(self.clusters.values())) for _ in range(M-m)]
        scores = [sum(j.model.judge_ontology(o) for j in judges) for o in candidates]
        self.ontology = candidates[np.argmax(scores)]
        return self.ontology

    def select_candidate_models(self, task_feat, lib, thresh=0.6):
        sel = []
        v1 = np.random.rand(10).reshape(1,-1)
        for mod in lib:
            v2 = np.random.rand(10).reshape(1,-1)
            if cosine_similarity(v1, v2)[0][0] >= thresh:
                sel.append(mod)
        return sel

    def gen_execution_schemes(self, candidates, constraint):
        schemes = []
        for name, clu in self.clusters.items():
            m = clu.model.select_task_model(candidates, constraint)
            s = clu.model.make_strategy(m, constraint)
            p = clu.model.post_process(constraint)
            schemes.append(ExecutionScheme(m,s,p))
        self.schemes = schemes
        return schemes

    def vote_schemes(self, thresh=0.7):
        votes = [0]*len(self.schemes)
        agents = list(self.clusters.values())
        for i, a in enumerate(agents):
            own = self.schemes[i]
            for j, o in enumerate(self.schemes):
                if i==j: continue
                s1 = a.model.sim(own.model_select, o.model_select)
                s2 = a.model.sim(own.strategy, o.strategy)
                s3 = a.model.sim(own.post_process, o.post_process)
                total = 0.4*s1 + 0.3*s2 + 0.3*s3
                if total >= thresh:
                    votes[j] +=1
        return votes

    def run(self, user: UserInput) -> Dict:
        print("[CSTrainer] Running full pipeline...")
        self.fit_skill(user)
        self.generate_questions(user)
        self.build_ontology(self.questions)
        
        model_lib = ["LSTM","Transformer","RF","XGBoost","PhysicsModel"]
        candidates = self.select_candidate_models("reservoir", model_lib)
        self.gen_execution_schemes(candidates, self.ontology.entity)
        votes = self.vote_schemes()
        best = self.schemes[np.argmax(votes)]
        
        return {
            "user": user.user_id,
            "solution": self.solution.__dict__,
            "questions": [q.__dict__ for q in self.questions],
            "ontology": self.ontology.__dict__,
            "best_scheme": best.__dict__,
            "version": VERSION,
            "time": time.time()
        }

if __name__ == "__main__":
    user = UserInput(
        user_id=str(uuid.uuid4()),
        intent="Reservoir dynamic prediction & well connectivity",
        background="Petroleum engineering",
        current_project="UNISIM-IV reservoir study",
        future_directions="AI for smart oilfields",
        past_research=["Production optimization","Pressure analysis"],
        expected_questions=5
    )
    system = CSTrainer()
    result = system.run(user)
    print("\n✅ Pipeline done!")
    print(f"Generated {len(result['questions'])} scientific questions")
    print(f"Ontology: {result['ontology']['entity']}")
    print(f"Best model: {result['best_scheme']['model_select']}")
