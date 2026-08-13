from fastapi import APIRouter
import numpy as np
from models.schemas import WorkflowMatchRequest

router = APIRouter(prefix="/api/v1/workflow", tags=["Workflow & Matching"])

def cosine_similarity(v1, v2):
    a = np.array(v1)
    b = np.array(v2)
    norm = (np.linalg.norm(a) * np.linalg.norm(b))
    return float(np.dot(a, b) / norm) if norm > 0 else 0.0

@router.post("/match-models", summary="领域模型特征余弦相似度匹配")
def match_domain_models(req: WorkflowMatchRequest):
    """计算余弦相似度匹配领域模型库"""
    results = []
    for m in req.models:
        score = cosine_similarity(req.task_feature, m.feature_vector)
        results.append({
            "model_name": m.model_name,
            "category": m.category,
            "similarity_score": round(score, 4),
            "passed": score >= req.threshold
        })
    return {"matched_models": results}
