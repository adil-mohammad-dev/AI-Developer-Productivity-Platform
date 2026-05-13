import requests


def get_github_repo_data(repo_url):

    repo_path = repo_url.replace(
        "https://github.com/",
        ""
    )

    api_url = f"https://api.github.com/repos/{repo_path}"

    response = requests.get(api_url)

    if response.status_code != 200:
        return None

    data = response.json()

    return {
        "name": data.get("name"),
        "description": data.get("description"),
        "stars": data.get("stargazers_count"),
        "forks": data.get("forks_count"),
        "language": data.get("language"),
        "topics": data.get("topics"),
        "url": data.get("html_url")
    }