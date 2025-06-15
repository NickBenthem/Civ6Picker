#!/usr/bin/env python3
import sys
import json
from urllib.parse import unquote

def convert_unicode(text):
    # First replace double-escaped Unicode with single-escaped
    text = text.replace('\\\\u', '\\u')
    # Then decode the Unicode escape sequences
    return text.encode('utf-8').decode('unicode-escape')

def convert_value(value):
    if isinstance(value, str):
        # Handle URL-encoded strings
        if '%' in value:
            value = unquote(value)
        return convert_unicode(value)
    elif isinstance(value, dict):
        return {k: convert_value(v) for k, v in value.items()}
    elif isinstance(value, list):
        return [convert_value(item) for item in value]
    return value

def main():
    if len(sys.argv) != 2:
        print("Usage: ./convert_unicode.py <json_file>")
        sys.exit(1)

    try:
        with open(sys.argv[1], 'r', encoding='utf-8') as f:
            data = json.load(f)
            converted_data = convert_value(data)
            # Write the output with proper UTF-8 encoding
            with open(sys.argv[1], 'w', encoding='utf-8') as out:
                json.dump(converted_data, out, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error processing file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 