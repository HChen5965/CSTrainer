from pydantic import BaseModel
from typing import List, Dict
import yaml
import os

class CSTrainerConfig(BaseModel):
    """Configuration class for CSTrainer system with default parameters"""
    # Foundation model settings
    model_list: List[str] = ["gpt-4o", "deepseek-v4-lite", "qwen-3.5", "hunyuan", "doubao-seed"]
    tie_breaker_model: str = "gpt-4o"
    
    # Multi-agent cluster settings
    agent_num_per_cluster: int = 7  # Must be odd for voting
    judge_agent_num: int = 3
    debate_rounds: int = 2
    
    # Distributed ontology settings
    ontology_iter_rounds: int = 5
    bayesian_weight: float = 0.6
    trust_update_step: float = 0.1
    
    # Human-in-the-loop feedback
    max_hil_rounds: int = 10
    feedback_mode: str = "full_comment"  # binary / full_comment
    
    # Task output limits
    max_scientific_questions: int = 5

def load_config(config_path: str = "deploy/config.yaml") -> CSTrainerConfig:
    """Load system configuration from YAML file"""
    with open(config_path, "r", encoding="utf-8") as f:
        config_dict = yaml.safe_load(f)
    return CSTrainerConfig(**config_dict)

# Global config instance
config = load_config()