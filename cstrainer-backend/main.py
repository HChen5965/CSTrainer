from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import agent_router, ontology_router, workflow_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="CSTrainer AI-for-Science Ontology-Driven Multi-Agent API Engine"
)

# 允许跨域请求 / CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册 API 路由 / Register Routers
app.include_router(agent_router.router)
app.include_router(ontology_router.router)
app.include_router(workflow_router.router)

@app.get("/health", tags=["Health Check"])
def health_check():
    return {
        "status": "HEALTHY",
        "app_name": settings.APP_NAME,
        "version": settings.APP_VERSION
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
