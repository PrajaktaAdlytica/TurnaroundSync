"""Trace the approved option 1 into real vector paths and export brand variants."""
from pathlib import Path
from PIL import Image
import subprocess, tempfile, re, json, zipfile
root = Path(__file__).resolve().parents[1]
out = root / 'public/brand'
im = Image.open(root/'logo-directions/option-1.png').convert('RGB')

def trace(box, selector):
    crop = im.crop(box)
    mask = Image.new('1', crop.size, 1)
    mask.putdata([0 if selector(r,g,b) else 1 for r,g,b in crop.getdata()])
    with tempfile.TemporaryDirectory() as tmp:
        src=Path(tmp)/'mask.pbm'; dst=Path(tmp)/'trace.svg'
        mask.save(src)
        subprocess.run(['potrace', str(src), '-s', '-o', str(dst), '--turdsize','4','--alphamax','1','--opttolerance','0.25'],check=True)
        raw=dst.read_text()
    group=re.search(r'<g transform=.*?</g>',raw,re.S).group(0)
    return group.replace('fill="#000000"','fill="currentColor"'), mask
symbol, mask = trace((60,220,450,567),lambda r,g,b:r>65 and g>45 and r>b*1.5 and r<210)
word, _ = trace((450,338,1485,495),lambda r,g,b:max(r,g,b)<135)

def svg(name,w,h,body):
    (out/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="TurnaroundSync"><title>TurnaroundSync</title>{body}</svg>\n')
colors={'primary':('#86652E','#24272B'),'white':('#FFFFFF','#FFFFFF'),'graphite':('#24272B','#24272B'),'brass':('#86652E','#86652E')}
for name,(mark,ink) in colors.items():
    svg(f'symbol-{name}.svg',390,347,f'<g color="{mark}">{symbol}</g>')
    svg(f'wordmark-{name}.svg',1035,157,f'<g color="{ink}">{word}</g>')
    # Compact horizontal layout retains the source mark and lettering, optical size for navigation.
    svg(f'logo-horizontal-{name}.svg',1245,200,f'<g transform="translate(0 11) scale(.51)" color="{mark}">{symbol}</g><g transform="translate(215 22)" color="{ink}">{word}</g>')
    svg(f'logo-stacked-{name}.svg',1080,610,f'<g transform="translate(345 15)" color="{mark}">{symbol}</g><g transform="translate(22 423)" color="{ink}">{word}</g>')
for name,bg,fg in [('light','#FFFFFF','#86652E'),('dark','#24272B','#FFFFFF'),('brass','#86652E','#FFFFFF')]:
    svg(f'favicon-{name}.svg',512,512,f'<rect width="512" height="512" rx="104" fill="{bg}"/><g transform="translate(51 74) scale(1.05)" color="{fg}">{symbol}</g>')
svg('favicon.svg',512,512,f'<style>.bg{{fill:#fff}}.mark{{color:#86652e}}@media(prefers-color-scheme:dark){{.bg{{fill:#24272b}}.mark{{color:#fff}}}}</style><rect class="bg" width="512" height="512" rx="104"/><g class="mark" transform="translate(51 74) scale(1.05)">{symbol}</g>')
# PNG/ICO fallbacks derived from the same approved silhouette.
alpha=mask.convert('L').point(lambda p:255-p)
for size in [16,32,48,180,192,512]:
    tile=Image.new('RGBA',(512,512),'white')
    shape=Image.new('RGBA',mask.size,'#86652E');shape.putalpha(alpha)
    shape=shape.resize((410,365),Image.Resampling.LANCZOS)
    tile.alpha_composite(shape,(51,74))
    tile.resize((size,size),Image.Resampling.LANCZOS).save(out/f'favicon-{size}.png')
Image.open(out/'favicon-512.png').save(out/'favicon.ico',sizes=[(16,16),(32,32),(48,48)])
(out/'site.webmanifest').write_text(json.dumps({'name':'TurnaroundSync','short_name':'TurnaroundSync','icons':[{'src':f'/brand/favicon-{n}.png','sizes':f'{n}x{n}','type':'image/png'} for n in [192,512]],'theme_color':'#86652E','background_color':'#FFFFFF','display':'standalone'}))
(out/'README.txt').write_text('TurnaroundSync — selected option 1, Sculpted Airframe\n\nSVG files contain genuine outlined vector paths, no embedded bitmaps or font dependencies. Traced from approved concept artwork using scripts/build-brand.py.\n\nPrimary: brass symbol + graphite wordmark on white. White: reversed logo for brass and dark backgrounds. Graphite and brass: single-color editions.\n\nHorizontal, stacked, wordmark-only and symbol-only files included. Use favicon.svg for automatic light/dark browser adaptation. PNG and ICO fallbacks included.\n\nMaintain clear space of at least one tail width. Do not stretch, add shadows, or change the internal seam. At 16px the seam is naturally less distinct; use the provided high-contrast icon tile.\n')
with zipfile.ZipFile(root/'public/turnaroundsync-brand-kit.zip','w',zipfile.ZIP_DEFLATED) as z:
    for f in out.iterdir():z.write(f,'TurnaroundSync/'+f.name)
print('Brand kit:',len(list(out.iterdir())),'files')
