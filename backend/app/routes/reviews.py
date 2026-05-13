from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from app.database import get_db
from app.schemas.review_schema import CodeReviewRequest
from app.services.groq_service import analyze_code
from app.models.review import Review

router = APIRouter(
    prefix="/reviews",
    tags=["AI Code Review"]
)


@router.post("/code")
def review_code(
    request: CodeReviewRequest,
    db: Session = Depends(get_db)
):

    result = analyze_code(
        request.language,
        request.code
    )

    new_review = Review(
        language=request.language,
        code=request.code,
        review_result=json.dumps(result)
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return {
        "message": "Review completed successfully",
        "review": result
    }


@router.get("/history")
def get_review_history(
    db: Session = Depends(get_db)
):

    reviews = db.query(Review).all()

    formatted_reviews = []

    for review in reviews:
        formatted_reviews.append({
            "id": review.id,
            "language": review.language,
            "code": review.code,
            "review_result": json.loads(review.review_result)
        })

    return formatted_reviews