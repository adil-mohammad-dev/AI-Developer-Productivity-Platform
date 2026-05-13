from fastapi import APIRouter
from pydantic import BaseModel

from app.services.groq_service import chat_with_ai


class ChatRequest(BaseModel):
    message: str


router = APIRouter(
    prefix="/chat",
    tags=["AI Chat Assistant"]
)


@router.post("/ask")
def ask_ai(request: ChatRequest):

    answer = chat_with_ai(request.message)

    return {
        "answer": answer
    }