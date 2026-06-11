import os
import re
import urllib.request

def main():
    css_url = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
    }

    print("Fetching Google Fonts CSS stylesheet...")
    req = urllib.request.Request(css_url, headers=headers)
    with urllib.request.urlopen(req) as response:
        css_content = response.read().decode('utf-8')

    # Find subset comments and their corresponding font-face blocks
    pattern = re.compile(r'\/\*\s*([a-z0-9\-]+)\s*\*\/[\s\r\n]*@font-face\s*\{([^}]+)\}', re.MULTILINE)
    matches = pattern.findall(css_content)

    os.makedirs('fonts', exist_ok=True)
    rebuilt_css = []

    print(f"Found {len(matches)} font declarations in CSS. Extracting Latin subset...")

    for subset, block_content in matches:
        if subset != 'latin':
            continue
        
        # Extract metadata
        family_match = re.search(r'font-family:\s*\'?([^\';]+)\'?;', block_content)
        weight_match = re.search(r'font-weight:\s*([0-9]+);', block_content)
        style_match = re.search(r'font-style:\s*([a-z]+);', block_content)
        url_match = re.search(r'src:\s*url\(([^)]+)\)', block_content)
        
        if family_match and weight_match and style_match and url_match:
            family = family_match.group(1).replace(' ', '')
            weight = weight_match.group(1)
            style = style_match.group(1)
            font_url = url_match.group(1)
            
            filename = f"{family.lower()}-{weight}-{style}.woff2"
            filepath = os.path.join('fonts', filename)
            
            print(f"Downloading {filename}...")
            file_req = urllib.request.Request(font_url, headers=headers)
            with urllib.request.urlopen(file_req) as file_resp:
                with open(filepath, 'wb') as f:
                    f.write(file_resp.read())
            
            # Rebuild with local font file url
            local_block = block_content.strip()
            local_block = re.sub(r'src:\s*url\([^)]+\)\s*format\(\'woff2\'\);', f"src: url('fonts/{filename}') format('woff2');", local_block)
            local_block = re.sub(r'src:\s*url\([^)]+\);', f"src: url('fonts/{filename}') format('woff2');", local_block)
            
            rebuilt_css.append(f"/* {subset} */\n@font-face {{\n  {local_block}\n}}")

    with open('fonts.css', 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(rebuilt_css))

    print(f"Successfully generated fonts.css and downloaded {len(rebuilt_css)} Latin font files to fonts/ directory.")

if __name__ == '__main__':
    main()
