from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def analyze_code(language, code):

    prompt = f"""
You are a senior software engineer.

Analyze this {language} code.

Return ONLY valid JSON.
Do not use markdown.
Do not wrap response inside backticks.
Do not add explanation outside JSON.

Use this exact JSON structure:

{{
  "score": 0,
  "summary": "",
  "bugs": [],
  "security_issues": [],
  "performance_suggestions": [],
  "best_practices": [],
  "improved_code": "",
  "explanation": ""
}}

Code:
{code}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.1
    )

    ai_response = response.choices[0].message.content

    ai_response = ai_response.replace("```json", "")
    ai_response = ai_response.replace("```", "")
    ai_response = ai_response.strip()

    try:
        return json.loads(ai_response)
    except Exception:
        return {
            "score": 0,
            "summary": "AI response could not be converted into JSON.",
            "bugs": [],
            "security_issues": [],
            "performance_suggestions": [],
            "best_practices": [],
            "improved_code": "",
            "explanation": ai_response
        }