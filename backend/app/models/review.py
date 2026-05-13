from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    language = Column(String, nullable=False)
    code = Column(Text, nullable=False)
    review_result = Column(Text, nullable=False)