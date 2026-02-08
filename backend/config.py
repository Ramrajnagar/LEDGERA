from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    """Application configuration settings"""
    
    # API Configuration
    app_name: str = "Decentralized Supply Chain Orchestrator"
    app_version: str = "1.0.0"
    debug: bool = True
    
    # CORS Configuration - using string that will be split
    cors_origins_str: str = "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://127.0.0.1:5173,http://127.0.0.1:5174,http://127.0.0.1:5175"
    
    # Google Gemini Configuration
    google_api_key: str = ""
    gemini_model: str = "gemini-1.5-flash-latest"
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Blockchain Configuration
    blockchain_difficulty: int = 4
    
    # Agent Configuration
    agent_temperature: float = 0.3
    agent_verbose: bool = True
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        extra = "ignore"
    
    @property
    def cors_origins(self) -> List[str]:
        """Parse CORS origins from comma-separated string"""
        if self.cors_origins_str == "*":
            return ["*"]
        return [origin.strip() for origin in self.cors_origins_str.split(",") if origin.strip()]

# Global settings instance
settings = Settings()
