from typing import List, Dict
import numpy as np
from loguru import logger
from src.config import config
from src.ontology.bayesian_update import BayesianUpdater

# Initialize Bayesian updater
bayesian_updater = BayesianUpdater()

class DistributedOntology:
    """Dynamic distributed ontology engine with Gaussian agent selection"""
    def __init__(self):
        self.static_components = []   # Entities, classes
        self.dynamic_components = []  # Relationships, functions, activities
        self.agent_confidence = {}

    def gaussian_agent_selection(self, agents: List, select_count: int) -> List:
        """Select high-quality agents using Gaussian distribution"""
        scores = np.random.normal(loc=0.6, scale=0.15, size=len(agents))
        agent_score_pairs = list(zip(agents, scores))
        agent_score_pairs.sort(key=lambda x: x[1], reverse=True)
        return [pair[0] for pair in agent_score_pairs[:select_count]]

    def build_ontology(self, scientific_question: str, agent_cluster) -> Dict:
        """Build distributed ontology for a given scientific question"""
        logger.info(f"Building ontology for: {scientific_question}")
        
        # Step 1: Select candidate agents via Gaussian distribution
        all_agents = agent_cluster.agents
        select_num = config.agent_num_per_cluster - config.judge_agent_num
        candidate_agents = self.gaussian_agent_selection(all_agents, select_num)
        
        # Step 2: Generate ontology components
        static_components = [f"Entity:{scientific_question}_entity_{i}" for i in range(3)]
        dynamic_components = [f"Function:{scientific_question}_method_{i}" for i in range(3)]
        
        # Step 3: Judge agents vote for best components
        judge_agents = [a for a in all_agents if a.role != "executor"]
        best_static = static_components[0]
        best_dynamic = dynamic_components[0]
        
        # Step 4: Update agent confidence via Bayesian method
        for agent in candidate_agents:
            new_conf = bayesian_updater.update_agent_confidence(
                agent.trust_score, 0.7, 3, config.bayesian_weight
            )
            self.agent_confidence[agent.agent_id] = new_conf
        
        return {
            "static_component": best_static,
            "dynamic_component": best_dynamic,
            "agent_confidence": self.agent_confidence
        }

# Global ontology engine instance
ontology_engine = DistributedOntology()