import os
import openai
import argparse
import re
from typing import List

MAX_INPUT_LENGTH = 32


def main():

    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    if validate_length(user_input):
        branding_result = generate_branding_snippet(user_input)
        keyword_result = generate_keywords(user_input)
        print(branding_result)
        print(keyword_result)

    else:
        raise ValueError(
            f"Input length is too long {len(user_input)}. Must be under {MAX_INPUT_LENGTH}"
        )


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH


def generate_branding_snippet(subject: str) -> str:
    openai.api_key = os.getenv("OPENAI_API_KEY")

    prompt = f"Generate upbeat branding snippet for {subject}"
    print(prompt)
    response = openai.Completion.create(
        engine="davinci-instruct-beta-v3", prompt=prompt, max_tokens=32
    )

    # Extract output text.
    branding_text: str = response["choices"][0]["text"]
    branding_text = branding_text.strip()
    last_char = branding_text[-1]
    if last_char not in {".", "!", "?"}:
        branding_text += "..."

    return branding_text


def generate_keywords(subject: str) -> List[str]:
    openai.api_key = os.getenv("OPENAI_API_KEY")

    prompt = f"Generate related branding keywords for {subject}"
    print(prompt)

    response = openai.Completion.create(
        engine="davinci-instruct-beta-v3", prompt=prompt, max_tokens=32
    )

    # Extract output text.
    keywords_text: str = response["choices"][0]["text"]
    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|-", keywords_text)
    keywords_array = [k.lower().strip() for k in keywords_array if len(k) > 0]

    return keywords_array


if __name__ == "__main__":
    main()
