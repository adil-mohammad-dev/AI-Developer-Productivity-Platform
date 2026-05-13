from fastapi import APIRouter

from app.schemas.readme_schema import ReadmeRequest
from app.services.groq_service import generate_readme

router = APIRouter(
    prefix="/readme",
    tags=["README Generator"]
)


@router.post("/generate")
def create_readme(request: ReadmeRequest):

    readme = generate_readme(
        request.project_name,
        request.description,
        request.tech_stack,
        request.features
    )

    return {
        "readme": readme
    }