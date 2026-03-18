import os
import glob

directory = r"a:\kczm salon\headmaster website\headmaster website"
files = glob.glob(os.path.join(directory, "*.html"))

target_text = """                        <div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.1;">
                            <span class="logo-head" style="font-size: 1.8rem; text-shadow: 0 0 8px rgba(212, 175, 55, 0.4); margin: 0;">KCOZM</span>
                            <span class="logo-masters" style="font-size: 0.85rem; letter-spacing: 5px; margin: 0; color: var(--text-dark);">SALON</span>
                        </div>"""

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We remove the target text, and also change the parent anchor tag to not use flex gap since the text is gone
    if target_text in content:
        content = content.replace(target_text, '')
        content = content.replace('style="display: flex; align-items: center; gap: 15px; text-decoration: none;"', 'style="display: inline-block; text-decoration: none;"')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            print(f"Updated {os.path.basename(filepath)}")
