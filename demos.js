'use strict';
(() => {
  const dialog = document.querySelector('#demo-dialog');
  const content = document.querySelector('#demo-content');
  const title = document.querySelector('#demo-title');
  const label = document.createElement('p');
  label.className = 'demo-label';
  title.after(label);
  let cleanup = () => {}, opener, closeTimer, oldOverflow;
  const el = (tag, text, cls) => { const n = document.createElement(tag); if(text !== undefined) n.textContent = text; if(cls) n.className = cls; return n; };
  const button = (text, action, cls) => { const n = el('button', text, cls); n.type = 'button'; n.addEventListener('click', action); return n; };
  function close() {
    if (!dialog.open || closeTimer) return;
    dialog.classList.remove('demo-visible');
    closeTimer = setTimeout(() => { cleanup(); dialog.close(); document.body.style.overflow = oldOverflow; opener?.focus(); closeTimer = null; }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200);
  }
  document.querySelector('#close-dialog').addEventListener('click', close);
  dialog.addEventListener('cancel', e => { e.preventDefault(); close(); });
  dialog.addEventListener('click', e => { const r = dialog.getBoundingClientRect(); if(e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) close(); });
  // Native modal dialog contains keyboard focus and makes the page behind it inert.
  window.PortfolioDemos = { open(item, trigger) {
    if (dialog.open) return;
    opener = trigger; content.replaceChildren(); title.textContent = item.title;
    const names = { calculator:'Simple Calculator', quiz:'Mini Quiz', 'daily-list':'Daily List' };
    label.textContent = `Interactive Demo — ${names[item.demoType] || item.title}`;
    cleanup = (renderers[item.demoType] || (() => { content.append(el('p','Jenis demo belum dikonfigurasi.')); })) (item) || (() => {});
    oldOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    dialog.showModal(); requestAnimationFrame(() => dialog.classList.add('demo-visible'));
  }};
  function calculator() {
    let expression = '', finished = false;
    const screen = el('div', undefined, 'calc-screen');
    const display = el('output', '0', 'calc-expression'); display.setAttribute('aria-label','Angka dan operasi');
    const result = el('output', '', 'calc-result'); result.setAttribute('aria-live','polite');
    screen.append(display,result); const grid = el('div', undefined, 'calc-grid');
    content.append(screen,grid,el('p','Keyboard: 0–9, + − * /, Enter, Backspace, dan C untuk clear.', 'demo-hint'));
    // Explicit arithmetic parser: multiplication/division precede addition/subtraction. No eval.
    function evaluate(s) {
      const tokens = s.match(/(?:\d*\.)?\d+|\d+\.?\d*|[+\-*/]/g) || [];
      let i = 0;
      const number = () => { let sign=1; if(tokens[i]==='-'){sign=-1;i++;} const t=tokens[i++]; if(t===undefined || !/^\d*\.?\d+$|^\d+\.$/.test(t)) throw Error('Lengkapi perhitungan'); return sign*Number(t); };
      const term = () => { let n=number(); while(tokens[i]==='*'||tokens[i]==='/'){const op=tokens[i++], b=number(); if(op==='/'&&b===0)throw Error('Tidak bisa dibagi nol'); n=op==='*'?n*b:n/b;} return n; };
      let n=term(); while(i<tokens.length){const op=tokens[i++]; if(op!=='+'&&op!=='-')throw Error('Lengkapi perhitungan'); const b=term(); n=op==='+'?n+b:n-b;} if(!Number.isFinite(n))throw Error('Hasil terlalu besar'); return Number(n.toPrecision(12));
    }
    function update() { display.textContent = expression.replaceAll('*','×').replaceAll('/','÷').replaceAll('-','−') || '0'; try { result.textContent = expression ? '= '+evaluate(expression) : 'Siap menghitung'; } catch(e){ result.textContent = e.message; } }
    function press(key) {
      if(key==='C'){expression='';finished=false;}
      else if(key==='Backspace'){expression=expression.slice(0,-1);finished=false;}
      else if(key==='='){try{const n=evaluate(expression); expression=n.toLocaleString('en-US',{useGrouping:false,maximumFractionDigits:12});finished=true;}catch{} }
      else if(/^[0-9.]$/.test(key)) { if(finished){expression='';finished=false;} if(expression.length>=100)return; const last=expression.split(/[+\-*/]/).pop(); if(key==='.'&&last.includes('.'))return; expression += key==='.'&&!last?'0.':key; }
      else if(/^[+\-*/]$/.test(key)){finished=false; if(!expression){if(key==='-')expression='-';}else if(/[+\-*/]$/.test(expression))expression=expression.slice(0,-1)+key;else expression+=key;}
      update();
    }
    [['Clear','C','calc-wide'],['Delete ⌫','Backspace','calc-wide'],['7','7'],['8','8'],['9','9'],['÷','/'],['4','4'],['5','5'],['6','6'],['×','*'],['1','1'],['2','2'],['3','3'],['−','-'],['0','0'],['.','.'],['=','=','demo-primary'],['+','+']].forEach(([text,key,cls])=>grid.append(button(text,()=>press(key),cls)));
    const onKey=e=>{if(e.ctrlKey||e.metaKey||e.altKey)return;const key=e.key==='Enter'?'=':e.key.toLowerCase()==='c'?'C':e.key;if(/^[0-9.+*/=\-]$/.test(key)||['Backspace','C','Delete'].includes(key)){e.preventDefault();press(key==='Delete'?'C':key);}};
    dialog.addEventListener('keydown',onKey); update();return ()=>dialog.removeEventListener('keydown',onKey);
  }
  function quiz(item) {
    const questions = (item.questions || window.PORTFOLIO_QUIZ || []).filter(q=>Array.isArray(q.options)&&q.options.length===4&&Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
    let index=0,score=0;
    function render(){
      content.replaceChildren();
      if(index===questions.length){const finish=el('div',undefined,'quiz-finish');finish.append(el('h3','Quiz selesai!'),el('p',`Skor kamu: ${score}/${questions.length}`,'quiz-score'),button('Coba Lagi',()=>{index=0;score=0;render();},'demo-primary'));content.append(finish);return;}
      const q=questions[index];content.append(el('p',`SOAL ${index+1} / ${questions.length} · Skor ${score}`));
      const visual=el('div',undefined,'quiz-visual');const fallback=el('span',q.visual || '✦');fallback.setAttribute('role','img');fallback.setAttribute('aria-label',q.imageAlt||'Visual soal');visual.append(fallback);
      if(q.imageUrl){const img=el('img');img.alt=q.imageAlt||q.question;img.hidden=true;img.onload=()=>{img.hidden=false;fallback.hidden=true;};img.onerror=()=>{img.remove();fallback.hidden=false;};img.src=q.imageUrl;visual.append(img);}
      const choices=el('div',undefined,'quiz-options'),feedback=el('p','','quiz-feedback');feedback.setAttribute('role','status');let answered=false;
      const next=button(index===questions.length-1?'Lihat Hasil':'Soal Berikutnya',()=>{index++;render();content.querySelector('button')?.focus();},'demo-primary');next.disabled=true;
      q.options.forEach((option,i)=>choices.append(button(option,()=>{if(answered)return;answered=true;const correct=i===q.answer;if(correct)score++;[...choices.children].forEach((b,j)=>{b.disabled=true;if(j===q.answer)b.classList.add('answer-correct');else if(j===i)b.classList.add('answer-wrong');});feedback.textContent=correct?'✓ Benar!':'✕ Salah. Jawaban benar: '+q.options[q.answer];next.disabled=false;next.focus();})));
      content.append(visual,el('h3',q.question),choices,feedback,next);
    }render();
  }
  function dailyList(){
    const key='gita-daily-demo-v1';let tasks, persistent=true;
    try{const raw=localStorage.getItem(key);tasks=raw===null?null:JSON.parse(raw);if(tasks!==null&&(!Array.isArray(tasks)||!tasks.every(t=>t&&typeof t.text==='string'&&typeof t.done==='boolean')))tasks=null;}catch{persistent=false;}
    if(!tasks)tasks=[{text:'Belajar JavaScript 20 menit',done:false},{text:'Rapikan catatan hari ini',done:true}];
    const form=el('form',undefined,'task-form'),input=el('input');input.placeholder='Tulis kegiatan baru…';input.maxLength=200;input.required=true;input.setAttribute('aria-label','Tugas baru');const add=el('button','Tambah','demo-primary');add.type='submit';form.append(input,add);
    const summary=el('p','','task-summary');summary.setAttribute('role','status');const list=el('ul',undefined,'task-list');const notice=el('p','','demo-hint');content.append(form,summary,list,notice);
    function save(){try{localStorage.setItem(key,JSON.stringify(tasks));}catch{persistent=false;}notice.textContent=persistent?'Tersimpan otomatis di browser ini.':'Penyimpanan browser tidak tersedia; tugas tersimpan selama demo ini terbuka.';}
    function render(){list.replaceChildren();const done=tasks.filter(t=>t.done).length;summary.textContent=`${tasks.length} tugas · ${done} selesai · ${tasks.length-done} belum selesai`;
      tasks.forEach((task,i)=>{const row=el('li',undefined,'task-row'),label=el('label'),check=el('input');check.type='checkbox';check.checked=task.done;const text=el('span',undefined,'task-text');text.append(el('span',task.text,'task-title'),el('small',task.done?'Selesai':'Belum selesai'));check.addEventListener('change',()=>{task.done=check.checked;save();render();list.children[i]?.querySelector('input').focus();});label.append(check,text);const remove=button('×',()=>{tasks.splice(i,1);save();render();(list.children[Math.min(i,tasks.length-1)]?.querySelector('button')||input).focus();});remove.setAttribute('aria-label','Hapus '+task.text);row.append(label,remove);list.append(row);});
      if(!tasks.length)list.append(el('li','Belum ada tugas. Tambahkan kegiatan pertamamu.'));}
    form.addEventListener('submit',e=>{e.preventDefault();const text=input.value.trim();if(!text){input.value='';input.focus();return;}tasks.push({text,done:false});input.value='';save();render();input.focus();});save();render();
  }
  const renderers={calculator,quiz,'daily-list':dailyList};
})();
