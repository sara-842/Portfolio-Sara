import os
import re
from PIL import Image

file_path = 'data/portfolioData.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def repl_projects(match):
    folder = match.group(1)
    projects_str = match.group(2)
    
    def repl_images(img_match):
        img_str = img_match.group(1)
        if '{' in img_str:
            return img_match.group(0)
            
        filenames = re.findall(r'"([^"]+)"', img_str)
        objects = []
        for filename in filenames:
            img_path = os.path.join('assets', 'images', folder, filename)
            width, height = 800, 600
            try:
                with Image.open(img_path) as img:
                    width, height = img.size
            except Exception as e:
                print(f"Error reading {img_path}: {e}")
                
            objects.append(f'\n            {{ filename: "{filename}", width: {width}, height: {height} }}')
            
        return 'images: [' + ','.join(objects) + '\n          ]'
        
    updated_projects = re.sub(r'images:\s*\[([\s\S]*?)\]', repl_images, projects_str)
    return match.group(0).replace(projects_str, updated_projects)

updated_content = re.sub(r'folder:\s*"([^"]+)"[\s\S]*?projects:\s*\[([\s\S]*?)\]\n    \}', repl_projects, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Done")
