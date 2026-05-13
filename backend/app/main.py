from fastapi import FastAPI
from app.database import engine, Base
from app.models.user import User
from app.models.review import Review
from app.routes.auth import router as auth_router
from app.routes.reviews import router as review_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Developer Productivity Platform",
    description="AI-powered platform for code review, bug detection, optimization, documentation, and GitHub repository analysis.",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(review_router)

@app.get("/")
def root():
    return {
        "message": "AI Developer Productivity Platform API is running successfully"
    }