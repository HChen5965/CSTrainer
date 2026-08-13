from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class ResearchIntentRequest(BaseModel):
    """科研意图请求体 / Research Intent Request"""
    background: str = Field(..., description="科研背景")
    prospect: str = Field(..., description="当前研究课题")
    future_directions: str = Field(..., description="未来突破方向")
    target_questions: int = Field(3, ge=1, le=5, description="目标问题收敛数量")

class BayesianTrustRequest(BaseModel):
    """贝叶斯信任度更新请求 / Bayesian Update Request"""
    prior_trust: float = Field(0.92, ge=0.0, le=1.0, description="先验信任度 P_i(t)")
    omega: float = Field(0.6, ge=0.0, le=1.0, description="投票权重系数 omega")
    judge_votes: int = Field(4, ge=0, le=5, description="裁决赞成票 V_i")
    total_judges: int = Field(5, ge=1, description="裁决 Agent 总数")
    performance_score: float = Field(0.90, ge=0.0, le=1.0, description="方案质量得分 sigma_i")

class ModelMatchItem(BaseModel):
    """领域模型项 / Domain Model Item"""
    model_name: str
    category: str
    feature_vector: List[float]

class WorkflowMatchRequest(BaseModel):
    """工作流匹配请求 / Workflow Match Request"""
    task_feature: List[float]
    models: List[ModelMatchItem]
    threshold: float = 0.75
