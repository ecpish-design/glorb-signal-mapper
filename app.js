const app = document.getElementById('app');
const progressWrap = document.getElementById('progressWrap');
const progressBar = document.getElementById('progressBar');
const progressCount = document.getElementById('progressCount');
const progressLabel = document.getElementById('progressLabel');
const readBtn = document.getElementById('readBtn');
const clearBtn = document.getElementById('clearBtn');

const SIGNAL_ORDER = ['low', 'steady', 'rising', 'overload'];
const STORAGE_KEY = 'glorbFeelingMapperV4';

const signalData = {
  low: {
    label: 'LOW SIGNAL', className: 'low', img: 3,
    definition: 'Energy or attention may be dropping. The student may need recovery, help getting started, or a change in demand.'
  },
  steady: {
    label: 'STEADY SIGNAL', className: 'steady', img: 4,
    definition: 'The student has enough capacity for the current situation. Steady does not have to mean silent, still, or perfectly calm.'
  },
  rising: {
    label: 'RISING SIGNAL', className: 'rising', img: 5,
    definition: 'An early warning signal. Activation, tension, speed, or urgency is increasing. Support at this stage can help the student respond before the system is overloaded.'
  },
  overload: {
    label: 'SIGNAL OVERLOAD', className: 'overload', img: 6,
    definition: 'Thinking, language, and flexible responding may be much harder. Prioritise safety, reduce demands and language, support regulation, and return to reflection later.'
  }
};

const EMOTIONS = [
  { id:'calm', label:'Calm / okay', short:'calm', img:24, examples:'settled, comfortable, focused' },
  { id:'tired', label:'Tired / flat', short:'tired or flat', img:22, examples:'drained, bored, low energy' },
  { id:'sad', label:'Sad / upset', short:'sad or upset', img:18, examples:'hurt, disappointed, down' },
  { id:'lonely', label:'Lonely / left out', short:'lonely or left out', img:20, examples:'disconnected, left out, alone' },
  { id:'nervous', label:'Nervous / worried', short:'nervous or worried', img:17, examples:'anxious, unsure, stressed' },
  { id:'embarrassed', label:'Embarrassed', short:'embarrassed', img:19, examples:'awkward, exposed, self-conscious' },
  { id:'frustrated', label:'Frustrated / angry', short:'frustrated or angry', img:15, examples:'annoyed, irritated, mad' },
  { id:'overwhelmed', label:'Overwhelmed', short:'overwhelmed', img:11, examples:'too much, panicked, cannot think clearly' }
];

const BODY_OPTIONS = [
  { label:'My heart beats faster', img:55, scores:{rising:2,overload:1} },
  { label:'My breathing gets fast or shaky', img:30, scores:{rising:1,overload:2} },
  { label:'My face or body feels hot', img:31, scores:{rising:2,overload:1} },
  { label:'My muscles, jaw or hands get tight', img:61, scores:{rising:2,overload:1} },
  { label:'My body shakes or trembles', img:59, scores:{rising:1,overload:2} },
  { label:'My body feels heavy or tired', img:46, scores:{low:3} },
  { label:'My breathing gets slow or shallow', img:40, scores:{low:2} },
  { label:'My body goes very still or freezes', img:28, scores:{overload:2,low:1} },
  { label:'My body feels relaxed', img:49, scores:{steady:3} },
  { label:'My breathing feels easy', img:50, scores:{steady:3} },
  { label:'My energy feels steady', img:53, scores:{steady:3} },
  { label:'My head feels clear', img:52, scores:{steady:3} }
];

const URGE_OPTIONS = [
  { label:'Keep doing what I am doing', img:79, scores:{steady:3} },
  { label:'Talk, join in or take part', img:80, scores:{steady:2} },
  { label:'Rest or slow down', img:88, scores:{low:3} },
  { label:'Be alone for a bit', img:43, scores:{low:2} },
  { label:'Put my head down or stop', img:39, scores:{low:3} },
  { label:'Move, walk or pace', img:74, scores:{rising:2} },
  { label:'Get away or leave the space', img:73, scores:{rising:1,overload:2} },
  { label:'Yell or talk much louder', img:57, scores:{rising:2,overload:1} },
  { label:'Argue or push back', img:29, scores:{overload:3} },
  { label:'Cry or shut down', img:36, scores:{overload:3} },
  { label:'Freeze or go very quiet', img:28, scores:{overload:2,low:1} },
  { label:'Ask someone for help', img:67, scores:{steady:1,rising:1} }
];

const BOTHER_OPTIONS = [
  'Too much noise or too many people',
  'Lots of questions or people talking to me',
  'Being rushed',
  'Work feels too hard',
  'Not knowing what I am meant to do',
  'Plans changing suddenly',
  'Being corrected in front of other people',
  'Someone standing too close or touching me',
  'Arguments or conflict',
  'Feeling left out, ignored or misunderstood',
  'Having to stop something I like',
  'Being tired, hungry, thirsty or unwell'
];

const SELF_HELP_OPTIONS = [
  { label:'Take a short break', img:76 },
  { label:'Step away for a moment', img:73 },
  { label:'Move my body', img:74 },
  { label:'Go somewhere quieter', img:83 },
  { label:'Use slow, comfortable breathing if it helps me', img:72 },
  { label:'Use a fidget or something for my hands', img:77 },
  { label:'Rest for a few minutes', img:88 },
  { label:'Get water or my usual snack if appropriate', img:87 },
  { label:'Talk to someone I trust', img:85 },
  { label:'Change what I am doing for a bit', img:84 },
  { label:'Use strong muscle movement if I know it helps and it is safe', img:69 },
  { label:'Give myself time before deciding anything', img:71 }
];

const OTHER_HELP_OPTIONS = [
  { label:'Give me some space', icon:'↔' },
  { label:'Stay nearby', icon:'•' },
  { label:'Talk quietly', img:107 },
  { label:'Use fewer words', img:107 },
  { label:'Help me know the next step', img:106 },
  { label:'Give me two simple choices', icon:'2' },
  { label:'Listen to me', img:103 },
  { label:'Give me time to answer', icon:'…' },
  { label:'Let me move or take a break', img:99 },
  { label:'Check on me later', img:109 },
  { label:'Ask me what I need', img:109 },
  { label:'Help me get started', img:106 }
];

const NOT_HELP_OPTIONS = [
  'Too many questions',
  'Being told to calm down',
  'Being rushed',
  'Being corrected in front of other people',
  'People standing too close',
  'Being touched when I do not want to be',
  'Someone raising their voice',
  'Talking about what happened straight away',
  'Lots of instructions at once',
  'Taking away a break or support that is helping',
  'Being left completely alone',
  'People joking or laughing about it'
];

const QUESTION_FLOW = [
  { key:'body', title:e=>`When you feel ${e.short}, what happens in your body?`, help:'Pick anything that sounds like you.', type:'visual', choices:()=>BODY_OPTIONS },
  { key:'urge', title:e=>`When you feel ${e.short}, what does your body want to do?`, help:'There are no wrong answers.', type:'visual', choices:()=>URGE_OPTIONS },
  { key:'bothers', title:e=>`What makes ${e.short} feel bigger?`, help:'Pick the things that tend to bother you.', type:'text', choices:()=>BOTHER_OPTIONS.map(label=>({label})) },
  { key:'selfHelp', title:e=>`What helps you when you feel ${e.short}?`, help:'Choose what you can do for yourself.', type:'visual', choices:()=>SELF_HELP_OPTIONS },
  { key:'otherHelp', title:e=>`What can someone else do that helps?`, help:`Think about when you feel ${e.short}.`, type:'support', choices:()=>OTHER_HELP_OPTIONS },
  { key:'notHelp', title:e=>`What does NOT help when you feel ${e.short}?`, help:'Choose anything that can make it harder.', type:'text', choices:()=>NOT_HELP_OPTIONS.map(label=>({label})) }
];

const freshState = () => ({
  stage:'intro',
  name:'',
  selectedEmotions:[],
  customEmotion:'',
  emotionIndex:0,
  questionIndex:0,
  answers:{}
});

let state = loadState() || freshState();

const VALID_STAGES = new Set(['intro','name','pick','questions','emotionComplete','report']);
if (!state || !VALID_STAGES.has(state.stage)) {
  state = freshState();
  saveState();
}

function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveState() { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function resetState() { sessionStorage.removeItem(STORAGE_KEY); state=freshState(); render(); }
function asset(n) { return `assets/${n}.webp`; }
function esc(str='') { return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

function emotionById(id) {
  if (id === 'custom') return { id:'custom', label:state.customEmotion || 'My own feeling', short:(state.customEmotion || 'this feeling').toLowerCase(), img:23, examples:'your own words' };
  return EMOTIONS.find(e=>e.id===id);
}
function currentEmotion() { return emotionById(state.selectedEmotions[state.emotionIndex]); }
function ensureEmotionAnswers(id) {
  if (!state.answers[id]) state.answers[id] = {};
  return state.answers[id];
}
function answerFor(id,key) {
  const e = ensureEmotionAnswers(id);
  if (!e[key]) e[key] = {selected:[],other:''};
  return e[key];
}
function totalQuestionCount() { return Math.max(1,state.selectedEmotions.length * QUESTION_FLOW.length); }
function currentStepNumber() { return state.emotionIndex * QUESTION_FLOW.length + state.questionIndex + 1; }

function setProgress() {
  if (state.stage !== 'questions') { progressWrap.classList.add('hidden'); return; }
  progressWrap.classList.remove('hidden');
  const emotion=currentEmotion();
  const step=currentStepNumber();
  const total=totalQuestionCount();
  progressBar.style.width=`${((step-1)/total)*100}%`;
  progressLabel.textContent=`${emotion.label.toUpperCase()} // MY MAP`;
  progressCount.textContent=`STEP ${step} OF ${total}`;
}

function render() {
  try {
    setProgress();
    if (state.stage==='intro') return renderIntro();
    if (state.stage==='name') return renderName();
    if (state.stage==='pick') return renderFeelingPicker();
    if (state.stage==='questions') return renderQuestion();
    if (state.stage==='emotionComplete') return renderEmotionComplete();
    if (state.stage==='report') return renderReport();

    // Safety fallback for stale browser-session data from an older build.
    state = freshState();
    saveState();
    return renderIntro();
  } catch (error) {
    console.error('GLORB Signal Mapper render error:', error);
    sessionStorage.removeItem(STORAGE_KEY);
    state = freshState();
    app.innerHTML = `
      <section class="screen intro-screen kid-intro">
        <div class="intro-art intro-art-overlap"><img src="${asset(1)}" alt="Glorb, an alien researcher" /></div>
        <div class="paper-card intro-card">
          <p class="eyebrow">INCOMING TRANSMISSION</p>
          <h1>GLORB // SIGNAL MAPPER</h1>
          <p class="lead">The mapper needed a quick reset.</p>
          <button class="primary-btn" id="recoveryStart" type="button">START →</button>
        </div>
      </section>`;
    document.getElementById('recoveryStart')?.addEventListener('click', () => {
      state = freshState();
      saveState();
      render();
    });
  }
}

function renderIntro() {
  app.innerHTML=`
    <section class="screen intro-screen kid-intro">
      <div class="intro-art intro-art-overlap"><img src="${asset(1)}" alt="Glorb, an alien researcher" /></div>
      <div class="paper-card intro-card">
        <p class="eyebrow">INCOMING TRANSMISSION</p>
        <h1>GLORB // SIGNAL MAPPER</h1>
        <p class="lead">Tell me what feelings show up for you, what your body does, and what actually helps.</p>
        <div class="not-test"><strong>NOT A TEST.</strong><span>No right answers. Just your answers.</span></div>
        <blockquote class="glorb-quote">Human feelings appear to come with clues. I need your help mapping yours.</blockquote>
        <button class="primary-btn" id="introNext" type="button">START →</button>
      </div>
    </section>`;
  document.getElementById('introNext').addEventListener('click',()=>{state.stage='name';saveState();render();});
}

function renderName() {
  app.innerHTML=`
    <section class="screen name-screen kid-name">
      <div class="name-art name-art-overlap"><img src="${asset(1)}" alt="Glorb" /></div>
      <div class="paper-card">
        <p class="eyebrow">FIRST THING</p>
        <h1>WHAT SHOULD I CALL YOU?</h1>
        <p class="short-copy">First name, nickname or initials. Your choice.</p>
        <label class="eyebrow" for="studentName">NAME</label>
        <input id="studentName" class="name-input" autocomplete="off" maxlength="40" value="${esc(state.name)}" placeholder="Type here" />
        <button id="nameNext" class="primary-btn" type="button">NEXT →</button>
      </div>
    </section>`;
  const input=document.getElementById('studentName'); input.focus();
  document.getElementById('nameNext').addEventListener('click',()=>{
    state.name=input.value.trim()||'Student'; state.stage='pick'; saveState(); render();
  });
}

function emotionCard(e) {
  const selected=state.selectedEmotions.includes(e.id);
  return `<button class="emotion-pick-card ${selected?'selected':''}" type="button" data-emotion="${e.id}" aria-pressed="${selected}">
    <img src="${asset(e.img)}" alt="" />
    <strong>${esc(e.label)}</strong>
    <span>${esc(e.examples)}</span>
  </button>`;
}

function renderFeelingPicker() {
  app.innerHTML=`
    <section class="screen picker-screen">
      <div class="paper-card picker-card">
        <div class="picker-top">
          <div>
            <p class="eyebrow">YOUR TURN, ${esc(state.name).toUpperCase()}</p>
            <h1>WHICH FEELINGS SHOW UP FOR YOU AT SCHOOL?</h1>
            <p class="lead short-lead">Pick up to 4.</p>
          </div>
          <img class="picker-glorb" src="${asset(1)}" alt="Glorb" />
        </div>
        <div class="emotion-pick-grid">${EMOTIONS.map(emotionCard).join('')}</div>
        <div class="custom-feeling-row">
          <button class="emotion-pick-card custom-pick ${state.selectedEmotions.includes('custom')?'selected':''}" type="button" data-emotion="custom" aria-pressed="${state.selectedEmotions.includes('custom')}">
            <div class="custom-plus">+</div><strong>Something else</strong><span>My feeling is not here.</span>
          </button>
          <div class="custom-entry ${state.selectedEmotions.includes('custom')?'':'hidden'}">
            <label for="customEmotion">MY FEELING</label>
            <input id="customEmotion" value="${esc(state.customEmotion)}" maxlength="40" placeholder="Type it here" />
          </div>
        </div>
        <div class="picker-actions">
          <span id="pickCount">${state.selectedEmotions.length} selected</span>
          <button id="pickNext" class="primary-btn" type="button" ${state.selectedEmotions.length?'':'disabled'}>MAP THESE FEELINGS →</button>
        </div>
      </div>
    </section>`;

  app.querySelectorAll('[data-emotion]').forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.dataset.emotion;
    const index=state.selectedEmotions.indexOf(id);
    if (index>=0) state.selectedEmotions.splice(index,1);
    else if (state.selectedEmotions.length<4) state.selectedEmotions.push(id);
    else { flashMessage('Pick up to 4 feelings.'); return; }
    saveState(); renderFeelingPicker();
  }));
  const customInput=document.getElementById('customEmotion');
  if (customInput) customInput.addEventListener('input',e=>{state.customEmotion=e.target.value;saveState();});
  document.getElementById('pickNext').addEventListener('click',()=>{
    if (!state.selectedEmotions.length) return;
    if (state.selectedEmotions.includes('custom') && !state.customEmotion.trim()) { flashMessage('Type your feeling first.'); customInput?.focus(); return; }
    state.emotionIndex=0; state.questionIndex=0; state.stage='questions'; saveState(); render();
  });
}

function flashMessage(message) {
  const old=document.getElementById('flashMessage'); if(old)old.remove();
  const el=document.createElement('div'); el.id='flashMessage'; el.className='flash-message'; el.textContent=message; document.body.appendChild(el);
  setTimeout(()=>el.remove(),1800);
}

function renderOption(option, selected, textOnly=false) {
  const isSelected=selected.includes(option.label);
  return `<button type="button" class="choice-card ${textOnly?'text-only':''} ${isSelected?'selected':''}" data-choice="${esc(option.label)}" aria-pressed="${isSelected}">
    ${option.img?`<img src="${asset(option.img)}" alt="" />`:option.icon?`<div class="choice-icon">${esc(option.icon)}</div>`:''}
    <span>${esc(option.label)}</span>
  </button>`;
}

function renderQuestion() {
  const emotion=currentEmotion();
  const q=QUESTION_FLOW[state.questionIndex];
  const ans=answerFor(emotion.id,q.key);
  const choices=q.choices(emotion);
  const textOnly=q.type==='text';
  app.innerHTML=`
    <section class="screen question-screen">
      <aside class="emotion-rail">
        <img src="${asset(emotion.img)}" alt="${esc(emotion.label)}" />
        <p class="eyebrow">RIGHT NOW</p>
        <h3>${esc(emotion.label)}</h3>
        <p>${state.questionIndex+1} of ${QUESTION_FLOW.length}</p>
      </aside>
      <div class="question-card kid-question-card">
        <p class="question-kicker">${esc(emotion.label.toUpperCase())} // ${state.questionIndex+1} OF ${QUESTION_FLOW.length}</p>
        <h2>${esc(q.title(emotion))}</h2>
        <p class="question-help">${esc(q.help)}</p>
        <div class="choice-grid ${textOnly?'text-grid':''} ${q.type==='support'?'support-grid':''}">
          ${choices.map(o=>renderOption(o,ans.selected,textOnly)).join('')}
        </div>
        <div class="other-box compact-other">
          <label for="otherInput">+ ADD MY OWN</label>
          <textarea id="otherInput" class="other-input" rows="2" placeholder="Something else...">${esc(ans.other)}</textarea>
        </div>
        <div class="question-actions">
          <button id="backBtn" class="ghost-btn" type="button">← BACK</button>
          <div class="right"><button id="nextBtn" class="primary-btn" type="button">${state.questionIndex===QUESTION_FLOW.length-1?'DONE →':'NEXT →'}</button></div>
        </div>
      </div>
    </section>`;

  app.querySelectorAll('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>{
    const value=btn.dataset.choice; const i=ans.selected.indexOf(value);
    if(i>=0)ans.selected.splice(i,1); else ans.selected.push(value);
    saveState(); btn.classList.toggle('selected'); btn.setAttribute('aria-pressed',btn.classList.contains('selected'));
  }));
  document.getElementById('otherInput').addEventListener('input',e=>{ans.other=e.target.value;saveState();});
  document.getElementById('backBtn').addEventListener('click',goBack);
  document.getElementById('nextBtn').addEventListener('click',()=>{
    saveState();
    if(state.questionIndex<QUESTION_FLOW.length-1){state.questionIndex++;render();}
    else {state.stage='emotionComplete';render();}
  });
}

function goBack() {
  if(state.questionIndex>0){state.questionIndex--;render();return;}
  if(state.emotionIndex>0){state.emotionIndex--;state.questionIndex=QUESTION_FLOW.length-1;render();return;}
  state.stage='pick';render();
}

function renderEmotionComplete() {
  progressWrap.classList.add('hidden');
  const emotion=currentEmotion();
  const isLast=state.emotionIndex===state.selectedEmotions.length-1;
  app.innerHTML=`
    <section class="screen emotion-complete-screen">
      <div class="paper-card emotion-complete-card">
        <img src="${asset(emotion.img)}" alt="" />
        <p class="eyebrow">MAPPED ✓</p>
        <h1>${esc(emotion.label.toUpperCase())}</h1>
        <p class="lead">Got it. I know more about what this feeling is like for you.</p>
        <button id="completeNext" class="primary-btn" type="button">${isLast?'BUILD MY PLAN →':`NEXT FEELING →`}</button>
      </div>
    </section>`;
  document.getElementById('completeNext').addEventListener('click',()=>{
    if(isLast){state.stage='report';saveState();render();}
    else{state.emotionIndex++;state.questionIndex=0;state.stage='questions';saveState();render();}
  });
}

function optionByLabel(pool,label){return pool.find(o=>o.label===label);}
function scoreEmotion(emotionId){
  const scores={low:0,steady:0,rising:0,overload:0};
  const body=answerFor(emotionId,'body').selected;
  const urge=answerFor(emotionId,'urge').selected;
  body.forEach(label=>{const o=optionByLabel(BODY_OPTIONS,label); if(o?.scores)Object.entries(o.scores).forEach(([k,v])=>scores[k]+=v);});
  urge.forEach(label=>{const o=optionByLabel(URGE_OPTIONS,label); if(o?.scores)Object.entries(o.scores).forEach(([k,v])=>scores[k]+=v);});
  return scores;
}

function mapEmotionToSignals(emotionId){
  const scores=scoreEmotion(emotionId);
  const ranked=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const top=ranked[0][1];
  if(top===0)return [];
  const result=[ranked[0][0]];
  const second=ranked[1];
  if(second[1]>=3 && second[1]>=top*0.72) result.push(second[0]);
  return result;
}

function mappedEmotionIds(signalKey){
  return state.selectedEmotions.filter(id=>mapEmotionToSignals(id).includes(signalKey));
}
function unique(arr){return [...new Set(arr.filter(Boolean))];}
function collectForSignal(signalKey,key){
  const ids=mappedEmotionIds(signalKey);
  const items=[];
  ids.forEach(id=>{
    const a=answerFor(id,key);
    items.push(...a.selected);
    if(a.other.trim())items.push(a.other.trim());
  });
  return unique(items);
}
function findImageForLabel(label){
  const pools=[BODY_OPTIONS,URGE_OPTIONS,SELF_HELP_OPTIONS,OTHER_HELP_OPTIONS];
  for(const p of pools){const o=p.find(x=>x.label===label);if(o?.img)return o.img;}
  return null;
}
function chips(items,showImages=true){
  if(!items.length)return '<span class="report-chip">Not identified yet</span>';
  return items.map(label=>{const img=showImages?findImageForLabel(label):null;return `<span class="report-chip">${img?`<img src="${asset(img)}" alt=""/>`:''}${esc(label)}</span>`;}).join('');
}
function mappedFeelingChips(signalKey){
  const ids=mappedEmotionIds(signalKey);
  if(!ids.length)return '<span class="report-chip">No clear feeling pattern mapped here yet</span>';
  return ids.map(id=>{const e=emotionById(id);return `<span class="report-chip"><img src="${asset(e.img)}" alt=""/>${esc(e.label)}</span>`;}).join('');
}

function reportSignal(signalKey){
  const s=signalData[signalKey];
  return `<section class="signal-report">
    <div class="signal-report-head ${s.className}"><img src="${asset(s.img)}" alt=""/><div><h3>${s.label}</h3><div class="report-note">When ${esc(state.name)} is in ${s.label}, they have identified the following body clues, responses and supports. This grouping is based on their selected body and action patterns, not the emotion label alone.</div></div></div>
    <div class="signal-report-body">
      <div class="report-block"><h4>Feelings that may show up</h4><div class="report-list">${mappedFeelingChips(signalKey)}</div></div>
      <div class="report-block"><h4>Body clues</h4><div class="report-list">${chips(collectForSignal(signalKey,'body'))}</div></div>
      <div class="report-block"><h4>May want to do</h4><div class="report-list">${chips(collectForSignal(signalKey,'urge'))}</div></div>
      <div class="report-block"><h4>Can make the feeling bigger</h4><div class="report-list">${chips(collectForSignal(signalKey,'bothers'),false)}</div></div>
      <div class="report-block"><h4>Student-identified self supports</h4><div class="report-list">${chips(collectForSignal(signalKey,'selfHelp'))}</div></div>
      <div class="report-block"><h4>Other people can help by</h4><div class="report-list">${chips(collectForSignal(signalKey,'otherHelp'))}</div></div>
      <div class="report-block"><h4>Please avoid or reduce</h4><div class="report-list">${chips(collectForSignal(signalKey,'notHelp'),false)}</div></div>
    </div>
  </section>`;
}

function topSupports(signalKey,limit=3){
  const items=collectForSignal(signalKey,'selfHelp').slice(0,limit);
  if(!items.length)return '<div class="priority-card"><span>No priority strategy identified yet.</span></div>';
  return items.map(label=>{const img=findImageForLabel(label);return `<div class="priority-card">${img?`<img src="${asset(img)}" alt=""/>`:''}<span>${esc(label)}</span></div>`;}).join('');
}

function buildShareText(){
  const lines=SIGNAL_ORDER.map(k=>{
    const s=signalData[k]; const feelings=mappedEmotionIds(k).map(id=>emotionById(id).label).join(', ')||'not clearly mapped';
    const self=collectForSignal(k,'selfHelp').join(', ')||'not identified yet';
    const others=collectForSignal(k,'otherHelp').join(', ')||'not identified yet';
    return `${s.label}\nFeelings/patterns: ${feelings}\nHelps: ${self}\nOther people can help by: ${others}`;
  }).join('\n\n');
  return `${state.name}'s Signal Plan\n\nThe Signal System describes changes in energy, attention, tension and thinking. It is not a diagnosis or behaviour ranking. This tool groups patterns from the student's own body and action selections.\n\n${lines}\n\nReview this plan collaboratively with the student.`;
}

function renderReport(){
  progressWrap.classList.add('hidden');
  const today=new Date().toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'});
  const risingFeelings=mappedEmotionIds('rising').map(id=>emotionById(id).label);
  const overloadFeelings=mappedEmotionIds('overload').map(id=>emotionById(id).label);
  const risingOther=collectForSignal('rising','otherHelp');
  const overloadOther=collectForSignal('overload','otherHelp');
  app.innerHTML=`
    <section class="screen report-screen">
      <div class="report-toolbar no-print">
        <button id="editBtn" class="ghost-btn" type="button">← EDIT ANSWERS</button>
        <button id="printBtn" class="primary-btn" type="button">PRINT OR SAVE PDF</button>
        <button id="shareBtn" class="secondary-btn" type="button">SHARE WITH AN ADULT</button>
        <button id="copyBtn" class="ghost-btn" type="button">COPY SUMMARY</button>
      </div>
      <div class="report">
        <div class="report-page">
          <header class="report-head"><div><p class="eyebrow">ZORBAX-9 RESEARCH DIVISION // STUDENT SUPPORT</p><h1 class="report-title">${esc(state.name)}'S SIGNAL PLAN</h1></div><div class="report-id">GLORB SIGNAL MAPPER<br>DATE: ${esc(today)}<br>STUDENT SELF-REPORT</div></header>
          <div class="report-intro">
            <div>
              <h3>WHAT IS THE SIGNAL SYSTEM?</h3>
              <p class="report-note">The Signal System is a student-friendly way to describe changes in energy, attention, tension and thinking across the school day. It is not a diagnosis, a score, or a ranking of behaviour. A student can move between signals, and the same feeling can occur in more than one signal.</p>
              <p class="report-note"><strong>Steady does not mean silent, still or perfectly calm.</strong> The aim is to understand what each signal looks and feels like for this student, notice early changes, and match support to the student's current needs.</p>
              <p class="report-note"><strong>How this report was mapped:</strong> ${esc(state.name)} answered questions about feelings, body cues, action urges and supports. The tool then grouped those patterns into signals. Emotion names alone do not decide the signal.</p>
            </div>
            <img src="${asset(7)}" alt="The four Glorb signal groups" />
          </div>
          <div class="signal-definitions">${SIGNAL_ORDER.map(k=>`<div class="signal-definition ${k}"><strong>${signalData[k].label}</strong>${signalData[k].definition}</div>`).join('')}</div>
          <div class="priority-panel">
            <p class="eyebrow">CATCH IT EARLY</p><h3>WHEN ${esc(state.name).toUpperCase()}'S PATTERN LOOKS LIKE RISING SIGNAL</h3>
            <p class="report-note">Feelings currently mapped here: <strong>${esc(risingFeelings.join(' • ')||'No clear Rising pattern identified yet')}</strong></p>
            <div class="priority-grid">${topSupports('rising')}</div>
            ${risingOther.length?`<p class="report-note"><strong>Helpful response from others:</strong> ${esc(risingOther.join(' • '))}</p>`:''}
          </div>
          <div class="priority-panel">
            <p class="eyebrow">IF THE PATTERN LOOKS LIKE OVERLOAD</p><h3>SUPPORT FIRST. REFLECTION LATER.</h3>
            <p class="report-note">Feelings currently mapped here: <strong>${esc(overloadFeelings.join(' • ')||'No clear Overload pattern identified yet')}</strong></p>
            <div class="priority-grid">${topSupports('overload')}</div>
            ${overloadOther.length?`<p class="report-note"><strong>Helpful response from others:</strong> ${esc(overloadOther.join(' • '))}</p>`:''}
          </div>
          <div class="footer-note"><strong>Evidence-informed use note:</strong> This is a formative SEL self-report and collaborative planning tool, not a clinical diagnostic assessment. Regulation strategies are not one-size-fits-all. Use the student's selections as hypotheses to test, observe what works in context, follow existing school and health plans, and revise the plan with the student over time.</div>
        </div>
        <div class="report-page page-break"><header class="report-head"><div><p class="eyebrow">PERSONAL SIGNAL MAP</p><h2>LOW + STEADY</h2></div><div class="report-id">${esc(state.name)}<br>PAGE 2</div></header>${reportSignal('low')}${reportSignal('steady')}</div>
        <div class="report-page page-break"><header class="report-head"><div><p class="eyebrow">PERSONAL SIGNAL MAP</p><h2>RISING + OVERLOAD</h2></div><div class="report-id">${esc(state.name)}<br>PAGE 3</div></header>${reportSignal('rising')}${reportSignal('overload')}<div class="footer-note"><strong>For adults:</strong> The wording “student has identified” is intentional. This plan records the student's own observations and preferences. The signal grouping is an organisational aid based on selected cues, not a diagnosis. Review it with the student and combine it with adult observation and any existing individual support, safety, health or disability plans.</div></div>
      </div>
    </section>`;
  document.getElementById('printBtn').addEventListener('click',()=>window.print());
  document.getElementById('editBtn').addEventListener('click',()=>{state.stage='pick';saveState();render();});
  document.getElementById('copyBtn').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(buildShareText());alert('Signal Plan summary copied.');}catch{alert('Copy was blocked by this browser.');}});
  document.getElementById('shareBtn').addEventListener('click',sharePlan);
}

async function sharePlan(){
  const text=buildShareText(); const title=`${state.name}'s Signal Plan`;
  if(navigator.share){try{await navigator.share({title,text});return;}catch(e){if(e.name==='AbortError')return;}}
  const subject=encodeURIComponent(title); const body=encodeURIComponent(text+'\n\nFor the full visual plan, print or save the report as a PDF and attach it to your message.');
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
}

readBtn.addEventListener('click',()=>{
  if(!('speechSynthesis' in window)){alert('Read Aloud is not supported in this browser.');return;}
  window.speechSynthesis.cancel(); const text=app.innerText.replace(/\s+/g,' ').trim(); const utter=new SpeechSynthesisUtterance(text); utter.rate=.95; window.speechSynthesis.speak(utter);
});
clearBtn.addEventListener('click',()=>{if(confirm('Start over and clear the answers from this browser session?'))resetState();});

render();
