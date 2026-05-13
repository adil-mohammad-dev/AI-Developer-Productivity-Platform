from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models.user import User
from app.models.review import Review
from app.routes.auth import router as auth_router
from app.routes.reviews import router as review_router
from app.routes.github import router as github_router
from app.routes.readme import router as readme_router
from app.routes.chat import router as chat_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Developer Productivity Platform",
    description="AI-powered platform for code review, bug detection, optimization, documentation, and GitHub repository analysis.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "https://ai-developer-productivity-platform-1.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(review_router)
app.include_router(github_router)
app.include_router(readme_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {
        "message": "AI Developer Productivity Platform API is running successfully"
    }