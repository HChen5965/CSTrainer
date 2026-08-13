from fastapi import APIRouter, HTTPException, status
from models.schemas import ResearchIntentRequest
from services.agent_cluster import MultiLLMAgentCluster

router = APIRouter(prefix="/api/v1/agent", tags=["Agent Cluster"])
agent_cluster = MultiLLMAgentCluster()

@router.post("/squeezing", summary="多 Agent 辩论与问题提炼")
def squeeze_research_questions(intent: ResearchIntentRequest):
    """调度 5 大 LLM Agent 集群提炼 Top-N 核心科研问题"""
    try:
        return agent_cluster.run_squeezing_debate(
            background=intent.background,
            future_directions=intent.future_directions,
            target_n=intent.target_questions
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
