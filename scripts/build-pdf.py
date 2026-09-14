"""Export all three complete editions from the built HTML, using ReportLab.
Dependencies: reportlab, beautifulsoup4, pillow, pypdf.
Render diagrams first with scripts/render-pdf-diagrams.mjs.
Set BOOK_FONT_DIR to a directory containing Arial, Georgia and Malgun fonts,
or use the default Windows font directory. Fonts are embedded as subsets.
"""
from pathlib import Path
import os, sys, re, json, html, hashlib
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.qa/python'))
from bs4 import BeautifulSoup, NavigableString, Tag
from PIL import Image as PILImage
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4, A3, landscape
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak, Image, LongTable, TableStyle, NextPageTemplate, Flowable
from reportlab.platypus.tableofcontents import TableOfContents
from pypdf import PdfReader

OUT=ROOT/'output/pdf';OUT.mkdir(parents=True,exist_ok=True)
FONTS=Path(os.environ.get('BOOK_FONT_DIR','C:/Windows/Fonts'))
for name,file in [('Body','arial.ttf'),('BodyBold','arialbd.ttf'),('Title','georgia.ttf'),('Korean','malgun.ttf'),('KoreanBold','malgunbd.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(FONTS/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='BodyBold',italic='Body',boldItalic='BodyBold')
pdfmetrics.registerFontFamily('Korean',normal='Korean',bold='KoreanBold',italic='Korean',boldItalic='KoreanBold')
INK=colors.HexColor('#203c35');ACCENT=colors.HexColor('#426653');PAPER=colors.HexColor('#f5f4ec');MUTED=colors.HexColor('#65776c')
WIDTH,HEIGHT=A4; MARGIN=48; CONTENT=WIDTH-2*MARGIN
BASE='https://buicongnguyen.github.io/Better_skill/'

class Anchor(Flowable):
    def __init__(self,name):
        super().__init__();self.name=name;self.width=0;self.height=0
    def draw(self):self.canv.bookmarkPage(self.name)

def clean(t):
    return t.replace('\u00a0',' ').replace('\u2011','-').replace('\u2013','-').replace('\u2014','-').replace('\u2212','-').replace('↗','').replace('↘','').replace('↳','').replace('✳','*').replace('✓','OK')

class BookDoc(BaseDocTemplate):
    def __init__(self,path,lang,title):
        self.book_title=title;self.current_chapter='';self.anchor_names=set()
        super().__init__(str(path),pagesize=A4,leftMargin=MARGIN,rightMargin=MARGIN,topMargin=48,bottomMargin=48,title=title,author='The Better Field Notes',pageCompression=1,lang=lang)
        self.addPageTemplates([
          # Draw running headers after headings have updated the current chapter.
          PageTemplate(id='portrait',frames=[Frame(MARGIN,48,CONTENT,HEIGHT-98,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)],onPageEnd=self.decorate,pagesize=A4),
          PageTemplate(id='landscape',frames=[Frame(MARGIN,48,HEIGHT-96,WIDTH-98,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)],onPageEnd=self.decorate,pagesize=landscape(A4)),
          PageTemplate(id='foldout',frames=[Frame(MARGIN,48,A3[0]-96,A3[1]-98,leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)],onPageEnd=self.decorate,pagesize=A3)])
    def beforeDocument(self):self.current_chapter=''
    def decorate(self,c,doc):
        w,h=c._pagesize;c.saveState();c.setStrokeColor(colors.HexColor('#c9d1c5'));c.setLineWidth(.5)
        c.line(MARGIN,35,w-MARGIN,35);c.setFillColor(MUTED);c.setFont('Korean' if self.lang=='ko' else 'Body',8)
        # Use the document language for the running text as well as the body.
        running=ParagraphStyle('running',fontName='Korean' if self.lang=='ko' else 'Body',fontSize=8,leading=10,textColor=MUTED)
        footer=Paragraph(html.escape(clean(self.book_title)),running)
        footer.wrap(w-2*MARGIN-35,20);footer.drawOn(c,MARGIN,23)
        c.drawRightString(w-MARGIN,23,str(doc.page))
        if doc.page>2:
            header=Paragraph(html.escape(clean(self.current_chapter)[:86]),running)
            _,hh=header.wrap(w-2*MARGIN,25);header.drawOn(c,MARGIN,h-20-hh)
        c.restoreState()
    def afterFlowable(self,flow):
        if isinstance(flow,Paragraph) and getattr(flow,'book_heading',False):
            title=flow.getPlainText();anchor=flow.book_anchor
            self.current_chapter=title
            self.canv.bookmarkPage(anchor);self.canv.addOutlineEntry(title,anchor,level=0,closed=False)
            self.notify('TOCEntry',(0,title,self.page,anchor))

def build(lang,ui):
    bodyfont='Korean' if lang=='ko' else 'Body';bold='KoreanBold' if lang=='ko' else 'BodyBold';headfont='KoreanBold' if lang=='ko' else ('BodyBold' if lang=='vi' else 'Title')
    styles={
      'body':ParagraphStyle('body',fontName=bodyfont,fontSize=10.5,leading=16,spaceAfter=8,textColor=INK,wordWrap='CJK' if lang=='ko' else None,splitLongWords=True),
      'lead':ParagraphStyle('lead',fontName=bodyfont,fontSize=13,leading=20,spaceAfter=15,textColor=ACCENT),
      'h2':ParagraphStyle('h2',fontName=headfont,fontSize=28,leading=35,spaceBefore=8,spaceAfter=20,textColor=INK,keepWithNext=True),
      'h3':ParagraphStyle('h3',fontName=bold,fontSize=14,leading=20,spaceBefore=18,spaceAfter=9,textColor=INK,keepWithNext=True),
      'h4':ParagraphStyle('h4',fontName=bold,fontSize=11,leading=16,spaceBefore=12,spaceAfter=6,textColor=INK,keepWithNext=True),
      'small':ParagraphStyle('small',fontName=bodyfont,fontSize=8.7,leading=13,spaceAfter=7,textColor=MUTED,splitLongWords=True,wordWrap='CJK' if lang=='ko' else None),
      'code':ParagraphStyle('code',fontName=bodyfont,fontSize=8.5,leading=13,spaceBefore=7,spaceAfter=10,backColor=PAPER,borderPadding=9,splitLongWords=True,wordWrap='CJK'),
      'cell':ParagraphStyle('cell',fontName=bodyfont,fontSize=9,leading=13,textColor=INK,wordWrap='CJK' if lang=='ko' else None,splitLongWords=True),
      'kicker':ParagraphStyle('kicker',fontName=bold,fontSize=9,leading=13,spaceBefore=6,spaceAfter=7,textColor=ACCENT),
    }
    soup=BeautifulSoup((ROOT/'dist'/ui['file']).read_text(encoding='utf8'),'html.parser')
    heading_text=ui['bookTitle']+ui['menu']+''.join(n.get_text() for n in soup.select('section.chapter > h2'))
    missing={c for c in clean(heading_text) if not c.isspace() and ord(c) not in pdfmetrics.getFont(headfont).face.charToGlyph}
    if missing:raise ValueError('Missing heading glyphs: '+repr(missing))
    story=[];anchors=set();expected_text=[]
    def anchor(node):
        key=node.get('id')
        if key and key not in anchors:
            anchors.add(key);return f'<a name="{html.escape(key)}"/>'
        return ''
    def inline(node):
        if isinstance(node,NavigableString):return html.escape(clean(str(node)))
        if not isinstance(node,Tag):return ''
        if node.name in ['script','style','button','noscript','svg']:return ''
        content=''.join(inline(c) for c in node.children)
        if node.name in ['strong','b']:return f'<b>{content}</b>'
        if node.name in ['em','i']:return f'<i>{content}</i>'
        if node.name=='br':return '<br/>'
        if node.name=='a' and node.get('href'):
            href=node['href'];href=href if href.startswith(('https:','http:','#','mailto:')) else BASE+href
            return f'<link href="{html.escape(href,quote=True)}" color="#426653">{content}</link>'
        return content
    def para(t,style='body'):return Paragraph(t or ' ',styles[style])
    def add_image(p,max_w,max_h):
        with PILImage.open(p) as im:w,h=im.size
        scale=min(max_w/w,max_h/h);return Image(str(p),width=w*scale,height=h*scale)
    def walk(node):
        if not isinstance(node,Tag):return
        classes=node.get('class',[]);name=node.name
        if name in ['script','style','button','noscript','svg'] or any(x in classes for x in ['prompt-bar','diagram-actions','diagram-source','diagram-canvas','source-jumps','endmark']):return
        if name=='a' and 'download-link' in classes:return
        a=anchor(node)
        if a:story.append(Anchor(node['id']))
        if name=='h2':
            p=para(inline(node),'h2');p.book_heading=True;p.book_anchor=node.get('id');story.append(p);return
        if name in ['h3','h4']:story.append(para(inline(node),name));return
        if name=='p':story.append(para(inline(node),'lead' if 'lead' in classes else 'body'));return
        if name=='pre':
            text=clean(node.get_text());expected_text.append(text)
            # Paragraph lines can split across pages, unlike a single preformatted block.
            story.append(para(html.escape(text).replace('\n','<br/>'),'code'));return
        if name=='table':
            rows=[]
            for tr in node.find_all('tr'):
                cells=tr.find_all(['td','th'],recursive=False)
                rows.append([para(('<b>'+inline(c)+'</b>') if c.name=='th' else inline(c),'cell') for c in cells])
            n=max(len(row) for row in rows);ratios={2:[.3,.7],3:[.23,.36,.41],4:[.20,.25,.25,.30]}.get(n,[1/n]*n)
            table=LongTable(rows,colWidths=[CONTENT*r for r in ratios],repeatRows=1,splitByRow=1,splitInRow=1,hAlign='LEFT')
            table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e4ebdf')),('ROWBACKGROUNDS',(0,1),(-1,-1),[colors.white,PAPER]),('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('LINEBELOW',(0,0),(-1,0),.6,ACCENT)]))
            story.extend([table,Spacer(1,12)]);return
        if name=='figure' and 'diagram' in classes:
            ident=node['id'].removeprefix('diagram-');p=ROOT/'illustrations/diagrams'/lang/(ident+'.png')
            if not p.exists():raise FileNotFoundError(f'Render diagram first: {p}')
            with PILImage.open(p) as im:w,h=im.size
            wide=w>h*1.4
            max_w,max_h=(HEIGHT-96,WIDTH-225) if wide else (CONTENT,HEIGHT-235)
            # Mermaid's 18px text is exported at 3x. Keep print labels >=9pt.
            foldout=54*min(max_w/w,max_h/h)<9
            if foldout:max_w,max_h=A3[0]-96,A3[1]-235
            story.extend([NextPageTemplate('foldout' if foldout else ('landscape' if wide else 'portrait')),PageBreak()])
            story.append(para(html.escape(node.find('figcaption').get_text(' ',strip=True)),'h3'))
            desc=node.find('p',class_='diagram-description')
            if desc:story.append(para(inline(desc),'small'))
            story.append(add_image(p,max_w,max_h))
            rel=('' if lang=='en' else lang+'/')+ident+'.mmd'
            story.append(para(f'<link href="{BASE}diagrams/{rel}" color="#426653">{html.escape(clean(ui["downloadMermaid"]))}</link>','small'))
            story.extend([NextPageTemplate('portrait'),PageBreak()]);return
        if name=='figure' and 'book-illustration' in classes:
            p=ROOT/'dist'/node.img['src'];story.append(add_image(p,CONTENT,340));story.append(para(inline(node.figcaption),'small'));return
        if name in ['ul','ol']:
            for idx,li in enumerate(node.find_all('li',recursive=False),1):
                if li.find(['div','h3','h4','p','table','pre','ul','ol']):walk(li)
                else:
                    aa=anchor(li);prefix=f'{idx}. ' if name=='ol' else '• '
                    if aa:story.append(Anchor(li['id']))
                    story.append(para(prefix+inline(li)))
            return
        if name=='summary':story.append(para(inline(node),'h4'));return
        if name=='section' and 'chapter' in classes:story.append(PageBreak())
        if 'chapter-kicker' in classes or 'callout-label' in classes or 'source-type' in classes:
            story.append(para(inline(node),'kicker'));return
        if 'source-meta' in classes:
            story.append(para(html.escape(clean(node.get_text(' · ',strip=True))),'small'));return
        if 'loop' in classes:
            for child in node.find_all('div',recursive=False):
                story.append(para(html.escape(clean(child.get_text(' / ',strip=True)))))
            return
        if name=='span':
            if 'source-number' in classes:story.append(para(ui['source']+' '+inline(node),'kicker'))
            return
        if name=='a' and node.get_text(strip=True):story.append(para(inline(node),'small'));return
        for child in node.children:walk(child)

    story.extend([Anchor('cover'),Spacer(1,24),para('FIELD BOOK 01 · 2026 / '+lang.upper(),'kicker'),para(html.escape(ui['bookTitle']),'h2'),para(inline(soup.select_one('.cover-deck')),'lead'),Spacer(1,16),add_image(ROOT/'illustrations/signal-garden-concept.png',CONTENT,355),Spacer(1,16),para(html.escape(ui['coverImage']),'small'),para('14 September 2026 · '+html.escape(ui['language']),'small'),para(f'<link href="{BASE}{ui["file"]}">Web edition</link> · <link href="https://github.com/buicongnguyen/Better_skill">GitHub</link>','small'),PageBreak()])
    story.append(para(ui['menu'],'h2'));toc=TableOfContents();toc.levelStyles=[ParagraphStyle('toc',fontName=bodyfont,fontSize=10.5,leading=16,textColor=INK,spaceBefore=3)];story.append(toc)
    article=soup.article
    for node in article.children:
        if isinstance(node,Tag) and not ('cover' in node.get('class',[])):walk(node)
    pdf=OUT/f'how-to-do-better-{lang}.pdf'
    doc=BookDoc(pdf,lang,ui['bookTitle']);doc.multiBuild(story)
    reader=PdfReader(pdf);full='\n'.join(page.extract_text() or '' for page in reader.pages)
    if len(reader.pages)<35:raise AssertionError('Unexpectedly short full-book export')
    if '\x00' in full:raise AssertionError('Missing glyphs detected in extracted PDF text')
    for title in soup.select('section.chapter > h2'):
        expected=re.sub(r'\s+','',clean(title.get_text()))
        if expected not in re.sub(r'\s+','',full):raise AssertionError('Missing chapter: '+expected)
    for s in soup.select('.source-number'):
        # Source links are also present as PDF annotations and readable reading notes.
        if not soup.select_one('#source-'+s.text):raise AssertionError('Missing source')
    print(json.dumps({'language':lang,'pages':len(reader.pages),'bytes':pdf.stat().st_size,'links':sum(len(p.get('/Annots',[])) for p in reader.pages)},ensure_ascii=False))
    return {'file':pdf.name,'pages':len(reader.pages),'sha256':hashlib.sha256(pdf.read_bytes()).hexdigest()}

ui=json.loads((ROOT/'locales/ui.json').read_text(encoding='utf8'))
outputs=[build(lang,ui[lang]) for lang in ['en','vi','ko']]
(OUT/'manifest.json').write_text(json.dumps({'date':'2026-09-14','outputs':outputs},indent=2)+'\n',encoding='utf8')
