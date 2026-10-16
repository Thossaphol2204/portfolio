from pathlib import Path

root = Path(r"c:\portfolio\src")
broken = ":root[data-theme='dark'], :root[data-theme='halloween']"
fixed = ":root:is([data-theme='dark'], [data-theme='halloween'])"
changed = []
for path in root.rglob("*.css"):
    text = path.read_text(encoding="utf-8")
    if broken not in text:
        continue
    path.write_text(text.replace(broken, fixed), encoding="utf-8")
    changed.append(str(path))
print("\n".join(changed) if changed else "no changes")
