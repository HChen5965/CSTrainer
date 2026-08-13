import math
from typing import Dict

def calculate_bayesian_trust_update(
    prior_trust: float,
    omega: float,
    judge_votes: int,
    total_judges: int,
    performance_score: float,
    prior_p0: float = 0.5
) -> Dict[str, float]:
    """
    根据 SPE-235946-MS 论文公式 (1) 与 (2) 计算贝叶斯后验信任度更新:
    P_i(t+1) = P_i(t) * [ omega * P(correct|V_i) + (1-omega) * sigma_i ]
    """
    p_correct = judge_votes / float(total_judges)
    p_incorrect = (1.0 - p_correct) + 1e-5
    
    # 公式 (2): 贝叶斯后验概率 P(correct|V_i)
    numerator = p_correct * prior_p0
    denominator = (p_correct * prior_p0) + (p_incorrect * (1.0 - prior_p0))
    p_post_correct = numerator / denominator
    
    # 公式 (1): 动态信任度更新 P_i(t+1)
    updated_trust = prior_trust * (omega * p_post_correct + (1.0 - omega) * performance_score)
    bounded_trust = min(max(updated_trust, 0.05), 0.99)
    
    return {
        "prior_trust": round(prior_trust, 4),
        "post_correct_prob": round(p_post_correct, 4),
        "updated_trust": round(bounded_trust, 4)
    }
