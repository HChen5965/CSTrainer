from typing import List, Dict
from loguru import logger
from src.config import config

class ModelAPI:
    """Unified API manager for all foundation models"""
    def __init__(self):
        self.model_list = config.model_list
        self.model_clients = self._initialize_clients()

    def _initialize_clients(self) -> Dict:
        """Initialize API clients for all supported models (replace with real API keys in production)"""
        clients = {}
        for model in self.model_list:
            clients[model] = self._mock_model_client(model)
        return clients

    def _mock_model_client(self, model_name: str):
        """Mock client for testing; replace with real LLM API calls"""
        def mock_call(prompt: str) -> str:
            logger.info(f"[{model_name}] Invoked with prompt: {prompt[:50]}...")
            return f"[{model_name}] Response generated for input"
        return mock_call

    def generate(self, model_name: str, prompt: str) -> str:
        """Generate response using specified model"""
        if model_name not in self.model_clients:
            raise ValueError(f"Model {model_name} is not configured")
        return self.model_clients[model_name](prompt)

    def cross_model_voting(self, candidates: List[str]) -> str:
        """Cross-model voting to select the best candidate; tiebreaker uses GPT-4o"""
        vote_scores = {candidate: 0 for candidate in candidates}
        
        # Simulate voting from all models
        for model in self.model_list:
            best_candidate = candidates[0]
            vote_scores[best_candidate] += 1

        # Sort candidates by vote count
        sorted_candidates = sorted(vote_scores.items(), key=lambda x: x[1], reverse=True)
        
        # Resolve tie using judge model
        if len(sorted_candidates) > 1 and sorted_candidates[0][1] == sorted_candidates[1][1]:
            return self.generate(config.tie_breaker_model, f"Select the best candidate: {candidates}")
        
        return sorted_candidates[0][0]

# Global model API instance
model_api = ModelAPI()