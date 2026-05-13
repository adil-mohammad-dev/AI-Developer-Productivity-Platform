from groq import Groq
from dotenv import load_dotenv
import os
import json
import re

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def clean_ai_json_response(ai_response):
    ai_response = ai_response.replace("```json", "")
    ai_response = ai_response.replace("```", "")
    ai_response = ai_response.strip()

    match = re.search(r"\{.*\}", ai_response, re.DOTALL)

    if match:
        ai_response = match.group(0)

    return ai_response


def analyze_code(language, code):

    prompt = f"""
You are an expert senior software engineer and code reviewer.

Analyze the following {language} code carefully.

Your job is to review the code quality itself.

Do NOT talk about JSON formatting.
Do NOT explain API responses.
Do NOT explain serialization.

Focus ONLY on:
- code quality
- bugs
- security issues
- performance improvements
- best practices
- cleaner implementation

Return ONLY valid JSON.
Do not use markdown.
Do not use ```json.
Do not use triple quotes.
For improved_code, use a normal JSON string with \\n for new lines.
All list items must be strings only, not objects.

Return JSON in this exact format:

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
        temperature=0
    )

    ai_response = response.choices[0].message.content
    ai_response = clean_ai_json_response(ai_response)

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


def analyze_github_repo(repo_data):

    prompt = f"""
You are an expert software architect.

Analyze this GitHub repository data.

Provide:
- project summary
- detected tech stack
- strengths
- weaknesses
- scalability feedback
- improvement suggestions

Return ONLY valid JSON.
Do not use markdown.
Do not use ```json.
All list items must be strings only, not objects.

Format:

{{
  "summary": "",
  "tech_stack": [],
  "strengths": [],
  "weaknesses": [],
  "scalability": "",
  "suggestions": []
}}

Repository Data:
{repo_data}
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
    ai_response = clean_ai_json_response(ai_response)

    try:
        return json.loads(ai_response)
    except Exception:
        return {
            "summary": ai_response,
            "tech_stack": [],
            "strengths": [],
            "weaknesses": [],
            "scalability": "",
            "suggestions": []
        }


def generate_readme(project_name, description, tech_stack, features):

    prompt = f"""
You are a senior software engineer.

Generate a professional GitHub README.md file.

Project Name:
{project_name}

Description:
{description}

Tech Stack:
{tech_stack}

Features:
{features}

Include:
- Project title
- Professional description
- Features
- Tech stack
- Installation steps
- Environment variables
- API endpoints section if applicable
- Folder structure
- Future improvements
- Author section

Return only markdown.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content