from fastapi import APIRouter

from app.services.github_service import (
    get_github_repo_data
)

from app.services.groq_service import (
    analyze_github_repo
)

router = APIRouter(
    prefix="/github",
    tags=["GitHub Analyzer"]
)


@router.post("/analyze")
def analyze_repository(data: dict):

    repo_url = data.get("repo_url")

    repo_data = get_github_repo_data(repo_url)

    if not repo_data:
        return {
            "error": "Repository not found"
        }

    analysis = analyze_github_repo(repo_data)

    return {
        "repository": repo_data,
        "analysis": analysis
    }