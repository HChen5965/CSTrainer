from typing import List, Dict
from loguru import logger
from src.config import config
from src.models.model_api import model_api

class BaseAgent
    Base class for all intelligent agents in the cluster
    def __init__(self, agent_id str, role str, trust_score float = 0.5)
        self.agent_id = agent_id
        self.role = role  # planner, supervisor, executor, debater
        self.trust_score = trust_score
        self.imagination_score = 0.5

class AgentCluster
    Multi-agent cluster for a single foundation model
    def __init__(self, model_name str)
        self.model_name = model_name
        self.agents = self._initialize_agents()
        self.supervisor_agent = self._get_supervisor_agent()

    def _initialize_agents(self) - List[BaseAgent]
        Create agent group with defined roles
        agents = []
        roles = [planner, supervisor, executor, executor, executor, debater, debater]
        for idx, role in enumerate(roles)
            agents.append(BaseAgent(f{self.model_name}_agent_{idx}, role))
        return agents

    def _get_supervisor_agent(self) - BaseAgent
        Return the supervisor agent for the cluster
        for agent in self.agents
            if agent.role == supervisor
                return agent
        return self.agents[1]

    def generate_candidates(self, user_intent str, skill_template str) - List[str]
        Generate candidate scientific questions using executor agents
        logger.info(f{self.model_name} cluster generating candidate questions)
        candidates = []
        for agent in self.agents
            if agent.role == executor
                response = model_api.generate(self.model_name, fIntent{user_intent}, Skill{skill_template})
                candidates.append(response)
        return candidates

    def internal_debate(self, candidates List[str]) - List[str]
        Internal agent debate to rank and filter candidates
        logger.info(f{self.model_name} cluster conducting internal debate)
        return sorted(candidates, key=lambda x len(x), reverse=True)[3]

# Initialize agent clusters for all models
agent_clusters = {model AgentCluster(model) for model in config.model_list}