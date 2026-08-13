from fastapi import APIRouter
from models.schemas import BayesianTrustRequest
from services.bayesian_engine import calculate_bayesian_trust_update

router = APIRouter(prefix="/api/v1/ontology", tags=["Dynamic Ontology"])

@router.post("/bayesian-update", summary="贝叶斯 Agent 信任度更新")
def update_bayesian_trust(req: BayesianTrustRequest):
    """更新 Agent 信任度 Pi(t+1)"""
    return calculate_bayesian_trust_update(
        prior_trust=req.prior_trust,
        omega=req.omega,
        judge_votes=req.judge_votes,
        total_judges=req.total_judges,
        performance_score=req.performance_score
    )
