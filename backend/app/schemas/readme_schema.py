from pydantic import BaseModel


class ReadmeRequest(BaseModel):
    project_name: str
    description: str
    tech_stack: str
    features: str