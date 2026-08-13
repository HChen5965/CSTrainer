import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """全局配置类 / Global Settings"""
    APP_NAME: str = "CSTrainer AI4S Engine"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # 大模型 API 密钥 / API Keys
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    DEEPSEEK_API_KEY: str = os.getenv("DEEPSEEK_API_KEY", "")
    QWEN_API_KEY: str = os.getenv("QWEN_API_KEY", "")
    HUNYUAN_API_KEY: str = os.getenv("HUNYUAN_API_KEY", "")
    DOUBAO_API_KEY: str = os.getenv("DOUBAO_API_KEY", "")
    
    # RAG 凭证 / Token
    ATHENS_TOKEN: str = os.getenv("ATHENS_INSTITUTION_TOKEN", "")

    class Config:
        env_file = ".env"

settings = Settings()
