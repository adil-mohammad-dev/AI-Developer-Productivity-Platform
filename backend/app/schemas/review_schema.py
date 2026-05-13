from pydantic import BaseModel


class CodeReviewRequest(BaseModel):
    language: str
    code: str