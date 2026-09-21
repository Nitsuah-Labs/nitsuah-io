import json
import re

BLOGS_JSON = r'c:\Users\ajhar\code\nitsuah-io\src\data\blogs.json'

with open(BLOGS_JSON, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Common bare URLs to fix
URL_REPLACEMENTS = {
    'https://nextjs.org/docs': '[Next.js Docs](https://nextjs.org/docs)',
    'https://docs.docker.com/develop/': '[Docker Best Practices](https://docs.docker.com/develop/)',
    'https://ollama.ai/docs/': '[Ollama Guide](https://ollama.ai/docs/)',
    'https://api.example.com/data': '[API Example](https://api.example.com/data)',
}

for post in data:
    content = post['content']
    original = content
    
    for bare, linked in URL_REPLACEMENTS.items():
        # Replace bare URLs that aren't already in markdown links
        # Pattern: bare URL not preceded by ]( and not followed by )
        pattern = rf'(?<!\]\()({re.escape(bare)})(?!\))'
        content = re.sub(pattern, linked, content)
    
    if content != original:
        post['content'] = content
        print(f'Fixed bare URLs in {post["slug"]}')

with open(BLOGS_JSON, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Done fixing bare URLs')