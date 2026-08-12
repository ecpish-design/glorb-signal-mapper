const app = document.getElementById('app');
const progressWrap = document.getElementById('progressWrap');
const progressBar = document.getElementById('progressBar');
const progressCount = document.getElementById('progressCount');
const progressLabel = document.getElementById('progressLabel');
const readBtn = document.getElementById('readBtn');
const clearBtn = document.getElementById('clearBtn');

const SIGNAL_ORDER = ['low', 'steady', 'rising', 'overload'];
const TOTAL_QUESTIONS = 24;

const feelings = [
  ['Furious',8],['Panicked',9],['Terrified',10],['Overwhelmed',11],
  ['Upset',12],['Disrespected',13],['Excited',14],['Frustrated',15],
  ['Anxious',16],['Nervous',17],['Sad',18],['Embarrassed',19],
  ['Lonely',20],['Bored',21],['Tired',22],['Unsure',23],
  ['Calm',24],['Focused',25],['Proud',26],['Content',27]
].map(([label,img]) => ({ value: label, label, img }));

const signalData = {
  low: {
    label: 'LOW SIGNAL', short: 'LOW', img: 3, className: 'low',
    simple: 'Energy or attention is dropping.',
    definition: 'Energy or attention may be dropping. The student may need recovery, help getting started, or a change in demand.',
    glorb: 'Low data can be quiet. Quiet signals are still signals.',
    feelings: ['Sad','Lonely','Bored','Tired','Unsure','Upset','Content','Frustrated'],
    body: [
      ['Slouched body',39],['Slow or shallow breathing',40],['Stuck on one thought',41],['Getting quieter',42],
      ['Wanting to be alone',43],['Foggy thinking',44],['Yawning',45],['Heavy arms or legs',46],['Not very hungry',47]
    ],
    observed: [
      ['I get quieter',42],['I pull away or want to be alone',43],['I yawn or look very tired',45],
      ['My body slumps or my head goes down',39],['I move more slowly',46],['I seem foggy or far away',44]
    ],
    contexts: ['Not enough sleep','Hungry or thirsty','A long lesson or task','Work feels repetitive','Work feels too hard','Too much social time','Feeling left out','Conflict with someone','Feeling unwell','After lunch','A change in routine','Too much noise or sensory input'],
    strategies: [
      ['Rest for a few minutes',88],['Get a drink of water or my usual snack if appropriate',87],['Do gentle movement or take a short walk',86],
      ['Talk to someone about it',85],['Change what I am doing for a bit',84],['Ask for some quiet space',83]
    ],
    adults: ['Check in quietly','Help me get started','Use fewer words','Break the task into smaller steps','Offer quiet space','Offer movement','Give me a little recovery time','Ask me what I need','Offer two simple choices'],
    avoid: ['Repeated questions','Rushing me','Calling attention to me in front of others','Assuming I am refusing on purpose','Giving many instructions at once','Taking away a support that is helping']
  },
  steady: {
    label: 'STEADY SIGNAL', short: 'STEADY', img: 4, className: 'steady',
    simple: 'Your system has enough capacity for what you are doing.',
    definition: 'The student has enough capacity for the current situation. Steady does not have to mean silent, still, or perfectly calm.',
    glorb: 'Steady does not mean motionless. Apparently some humans focus better while moving. Noted.',
    feelings: ['Calm','Focused','Proud','Content','Excited','Unsure','Happy'],
    body: [
      ['Steady, relaxed heartbeat',48],['Calm or relaxed body',49],['Easy breathing',50],['Remembering what was said',51],['Clear thinking',52],['Feeling ready in my body',53],['Calm, focused mind',54]
    ],
    observed: [
      ['I can keep doing what works',79],['I can focus on the task',54],['I can remember what was said',51],['I can think clearly',52],['I look ready to take part',53],['I can notice when things are going well',78]
    ],
    contexts: ['Clear expectations','A predictable routine','Enough movement','Useful breaks','Being with safe people','Work feels manageable','Having some choice','A space that is quiet enough','Enough food, water and rest','Feeling successful','An interesting task','Knowing what is happening next'],
    strategies: [
      ['Keep doing what is working',79],['Notice how good this feels',78],['Take on a challenge or help someone else',80],['Set a goal while my mind is clear',81],['Enjoy it. Nothing needs fixing right now',82],['Use the tools that already help me focus',77]
    ],
    adults: ['Keep expectations clear','Let me work independently when I can','Let me use tools that help me focus','Offer an appropriate challenge','Keep routines predictable when possible','Notice what is working','Give specific positive feedback','Ask before changing a support that works'],
    avoid: ['Unnecessary interruptions','Removing a useful support because I look okay','Assuming steady must look silent or still','Changing the plan without warning when warning is possible','Giving extra help I have not asked for']
  },
  rising: {
    label: 'RISING SIGNAL', short: 'RISING', img: 5, className: 'rising',
    simple: 'An early warning signal. Tension, speed, or urgency is increasing.',
    definition: 'An early warning signal. Activation, tension, speed, or urgency is increasing. Support at this stage can help the student respond before the system is overloaded.',
    glorb: 'This is the signal I should have noticed before my third ship incident. Early data is useful data.',
    feelings: ['Frustrated','Anxious','Nervous','Excited','Upset','Disrespected','Unsure','Embarrassed'],
    body: [
      ['Heart beating faster',55],['Tight chest',56],['Wanting to yell or move',57],['Thinking or talking faster or louder',58],['Shaking or trembling',59],['Harder to think',60],['Clenched fists or jaw',61],['Only seeing one thing',62],['Hard to think about someone else',63],['Hard to wait',64],['Thoughts going fast',65]
    ],
    observed: [
      ['My voice gets faster or louder',58],['I move more or feel like I need to move',57],['My hands or jaw get tight',61],['I find waiting harder',64],['I get stuck on one thing',62],['I respond more quickly than usual',65]
    ],
    contexts: ['Work feels too hard','An unexpected change','Waiting for something','Noise or crowds','Conflict','Being corrected in front of others','Feeling misunderstood','Time pressure','Too many instructions','Social pressure','Being stuck on a problem','Body discomfort or feeling unwell'],
    strategies: [
      ['Step away for a moment',73],['Use slow, comfortable breathing if it helps me',72],['Move my body',74],['Say how I am feeling out loud',75],['Ask for a break before it gets bigger',76],['Use a fidget tool',77],['Ask for some quiet space',83],['Ask a trusted adult for help',67]
    ],
    adults: ['Speak quietly','Use fewer words','Offer two simple choices','Let me take a break','Reduce the audience or move me away from attention','Give me physical space','Help me get somewhere quieter','Ask one simple question at a time','Give me time to respond'],
    avoid: ['Repeated questions','Telling me to calm down','Correcting me in front of other people','Standing too close','Touching me without asking','Raising your voice','Rushing me','Demanding eye contact','Giving many instructions at once']
  },
  overload: {
    label: 'SIGNAL OVERLOAD', short: 'OVERLOAD', img: 6, className: 'overload',
    simple: 'Thinking and communicating may be much harder. Support comes first.',
    definition: 'Thinking, language, and flexible responding may be much harder. Prioritise safety, reduce demands and language, support regulation, and return to reflection later.',
    glorb: 'At Overload, complicated questions are extremely poor engineering. We will keep this section simple.',
    feelings: ['Furious','Panicked','Terrified','Overwhelmed','Upset','Anxious','Frustrated','Disrespected'],
    body: [
      ['Freezing or going still',28],['Wanting to fight or push back',29],['Fast or shaky breathing',30],['Feeling very hot',31],['Cannot think clearly',32],['Cannot remember what was said',33],['Everything feels much bigger',35],['Shutting down',36],['Time feels strange',37],['Wanting to run',38]
    ],
    observed: [
      ['I freeze or go very still',28],['I might push back or react strongly',29],['I shut down',36],['I try to get away or run',38],['I cannot answer or remember well',33],['I look overwhelmed by what is happening',32]
    ],
    contexts: ['My Rising Signal was missed or kept building','Lots of noise or people','Conflict','Feeling trapped','Repeated demands or questions','Being rushed','A lot of attention on me','Unexpected change','A task feels impossible','I could not access a break','Someone is too close to me','Feeling unsafe'],
    strategies: [
      ['Get to a safe, quiet space',66],['Ask a trusted adult for help',67],['Use slow, comfortable breathing if it helps me',68],['Use strong muscle movement if I know it helps and it is safe',69],['It is okay not to talk yet',70],['Give it time before deciding anything',71]
    ],
    adults: ['Prioritise safety','Use very few words','Reduce demands for now','Help me get to a quieter place','Have a familiar adult stay nearby if I want that','Give me physical space','Give one step at a time','Wait before problem solving or reflection','Let me communicate without speaking if possible'],
    avoid: ['Lots of questions','Demanding an explanation immediately','Raising your voice','Standing over me or blocking my space','Touching me without permission unless required for immediate safety','Public correction or an audience','Threatening consequences in the moment','Forcing eye contact','Starting reflection before I have recovered']
  }
};

const questionBlueprints = [
  { key:'feelings', type:'feelings', title:s => `When you are in ${s.label}, what feelings can show up?`, help:'Feelings do not belong to only one signal. Choose anything that fits you. You can show the full feeling bank if you need it.' },
  { key:'body', type:'visual', source:'body', title:s => `What do you notice inside your body or mind in ${s.label}?`, help:'These are body and thinking clues. Choose the ones you notice in yourself.' },
  { key:'observed', type:'visual', source:'observed', title:s => `What might another person notice you doing in ${s.label}?`, help:'This helps adults recognise your signal without guessing what you feel.' },
  { key:'contexts', type:'text', source:'contexts', title:s => s.className === 'steady' ? 'What helps you get to or stay in STEADY SIGNAL at school?' : `What can move your system toward ${s.label} at school?`, help:'This question is optional. Choose common situations, or add your own.' },
  { key:'strategies', type:'visual', source:'strategies', title:s => s.className === 'rising' ? 'What helps before your Rising Signal gets bigger?' : s.className === 'overload' ? 'What helps FIRST when your system is overloaded?' : s.className === 'steady' ? 'What helps you stay in Steady Signal?' : 'What can help when your signal is Low?', help:'Choose strategies that actually help you. A strategy can work in one situation and not another.' },
  { key:'adults', type:'adult', title:s => `What do you need from adults when you are in ${s.label}?`, help:'Choose what helps. You can also tell adults what can make things harder.' }
];

const freshState = () => ({
  stage:'intro', name:'', signalIndex:0, questionIndex:0, showAllFeelings:false,
  answers: Object.fromEntries(SIGNAL_ORDER.map(k => [k, {}]))
});

let state = loadState() || freshState();

function loadState() {
  try {
    const raw = sessionStorage.getItem('glorbSignalPlan');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveState() {
  sessionStorage.setItem('glorbSignalPlan', JSON.stringify(state));
}
function resetState() {
  sessionStorage.removeItem('glorbSignalPlan');
  state = freshState();
  render();
}

function asset(n) { return `assets/${n}.webp`; }
function esc(str='') { return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function currentSignalKey() { return SIGNAL_ORDER[state.signalIndex]; }
function answerFor(signalKey, key) {
  if (!state.answers[signalKey][key]) state.answers[signalKey][key] = { selected:[], other:'', avoidSelected:[], avoidOther:'' };
  return state.answers[signalKey][key];
}

function setProgress() {
  if (state.stage !== 'questions') {
    progressWrap.classList.add('hidden');
    return;
  }
  progressWrap.classList.remove('hidden');
  const done = state.signalIndex * questionBlueprints.length + state.questionIndex;
  progressBar.style.width = `${(done / TOTAL_QUESTIONS) * 100}%`;
  progressLabel.textContent = `${signalData[currentSignalKey()].label} // SIGNAL MAP`;
  progressCount.textContent = `QUESTION ${done + 1} OF ${TOTAL_QUESTIONS}`;
}

function render() {
  setProgress();
  state.showAllFeelings = false;
  if (state.stage === 'intro') return renderIntro();
  if (state.stage === 'name') return renderName();
  if (state.stage === 'teach') return renderTeach();
  if (state.stage === 'questions') return renderQuestion();
  if (state.stage === 'sectionComplete') return renderSectionComplete();
  if (state.stage === 'report') return renderReport();
}

function renderIntro() {
  app.innerHTML = document.getElementById('introTemplate').innerHTML;
  app.querySelector('[data-action="intro-next"]').addEventListener('click', () => { state.stage='name'; saveState(); render(); });
}

function renderName() {
  app.innerHTML = `
    <section class="screen name-screen">
      <div class="name-art"><img src="${asset(1)}" alt="Glorb" /></div>
      <div class="paper-card">
        <p class="eyebrow">EARTH RESEARCH SUBJECT</p>
        <h1>WHAT SHOULD WE CALL YOU?</h1>
        <p>Your name will appear on your Signal Plan. You can use a first name, nickname, or initials.</p>
        <label class="eyebrow" for="studentName">NAME</label>
        <input id="studentName" class="name-input" autocomplete="off" maxlength="40" value="${esc(state.name)}" placeholder="Type here" />
        <div class="not-test"><strong>PRIVACY NOTE</strong><span>This build does not send your answers to a server. Your answers stay in this browser session unless you choose to print or share them.</span></div>
        <button id="nameNext" class="primary-btn" type="button">CONTINUE →</button>
      </div>
    </section>`;
  const input = document.getElementById('studentName');
  input.focus();
  document.getElementById('nameNext').addEventListener('click', () => {
    state.name = input.value.trim() || 'Student';
    state.stage = 'teach'; saveState(); render();
  });
}

function renderTeach() {
  app.innerHTML = `
    <section class="screen">
      <div class="paper-card signal-teach">
        <div>
          <p class="eyebrow">BEFORE THE SIGNAL SCAN</p>
          <h1>YOU DO NOT NEED TO KNOW THE GLORB FRAMEWORK.</h1>
          <p class="lead">The Signal System is just a way to describe changes in your energy, attention, tension and thinking. You can use this tool on its own or with the Glorb program.</p>
        </div>
        <div class="signal-grid">
          ${SIGNAL_ORDER.map(k => {
            const s=signalData[k]; return `<article class="signal-teach-card"><img src="${asset(s.img)}" alt="${s.label} visual"/><h3>${s.label}</h3><p>${s.simple}</p></article>`;
          }).join('')}
        </div>
        <div class="signal-note"><strong>NO SIGNAL IS A BAD SIGNAL.</strong>Your signal gives information about what your system may need. Steady does not mean you must be silent or still. Different people can look different in every signal.</div>
        <blockquote class="glorb-quote">${esc(state.name)}, your job is not to fit my categories perfectly. Your job is to tell me what your own system does. This is much better science.</blockquote>
        <button id="teachNext" class="primary-btn" type="button">START WITH LOW SIGNAL →</button>
      </div>
    </section>`;
  document.getElementById('teachNext').addEventListener('click', () => {
    state.stage='questions'; state.signalIndex=0; state.questionIndex=0; saveState(); render();
  });
}

function getQuestionChoices(signalKey, q) {
  const s = signalData[signalKey];
  if (q.type === 'feelings') {
    const suggested = new Set(s.feelings);
    let list = state.showAllFeelings ? feelings : feelings.filter(f => suggested.has(f.value));
    return list;
  }
  const src = s[q.source] || [];
  if (q.type === 'text') return src.map(label => ({value:label,label}));
  return src.map(([label,img]) => ({value:label,label,img}));
}

function renderChoice(choice, selected, textOnly=false) {
  const isSelected = selected.includes(choice.value);
  return `<button type="button" class="choice-card ${textOnly ? 'text-only' : ''} ${isSelected ? 'selected' : ''}" data-choice="${esc(choice.value)}" aria-pressed="${isSelected}">
    ${choice.img ? `<img src="${asset(choice.img)}" alt="" />` : ''}<span>${esc(choice.label)}</span>
  </button>`;
}

function renderQuestion() {
  const signalKey = currentSignalKey();
  const s = signalData[signalKey];
  const q = questionBlueprints[state.questionIndex];
  const ans = answerFor(signalKey,q.key);
  const choices = getQuestionChoices(signalKey,q);
  const kicker = `${s.label} // ${state.questionIndex + 1} OF ${questionBlueprints.length}`;

  let mainChoices = '';
  if (q.type !== 'adult') {
    mainChoices = `<div class="choice-grid">${choices.map(c => renderChoice(c, ans.selected, q.type==='text')).join('')}</div>`;
    if (q.type === 'feelings') {
      mainChoices += `<button id="feelingsToggle" type="button" class="ghost-btn">${state.showAllFeelings ? 'SHOW FEWER FEELINGS' : 'SHOW ALL FEELINGS'}</button>`;
    }
    mainChoices += `<div class="other-box"><label for="otherInput">OTHER // ADD MY OWN</label><textarea id="otherInput" class="other-input" rows="2" placeholder="Write something that is not listed here">${esc(ans.other)}</textarea></div>`;
  } else {
    mainChoices = `
      <div class="adult-subhead">ADULTS CAN HELP BY...</div>
      <div class="choice-grid">${s.adults.map(label => renderChoice({value:label,label}, ans.selected, true)).join('')}</div>
      <div class="other-box"><label for="otherInput">OTHER // SOMETHING ELSE ADULTS CAN DO</label><textarea id="otherInput" class="other-input" rows="2">${esc(ans.other)}</textarea></div>
      <div class="adult-subhead">OPTIONAL // THINGS THAT CAN MAKE IT HARDER</div>
      <div class="choice-grid">${s.avoid.map(label => renderChoice({value:label,label}, ans.avoidSelected, true).replace('data-choice=', 'data-avoid=').replace(/class="choice-card ([^"]*) selected"/, 'class="choice-card $1 selected"')).join('')}</div>
      <div class="other-box"><label for="avoidOtherInput">OTHER // PLEASE AVOID</label><textarea id="avoidOtherInput" class="other-input" rows="2">${esc(ans.avoidOther)}</textarea></div>`;
  }

  app.innerHTML = `
    <section class="screen question-layout">
      <aside class="signal-rail">
        <div><img src="${asset(s.img)}" alt="${s.label}"/><p class="eyebrow">CURRENT SIGNAL</p><h3>${s.label}</h3><p>${s.simple}</p></div>
        <div class="glorb-mini"><img src="${asset(1)}" alt="Glorb"/><div>${s.glorb}</div></div>
      </aside>
      <div class="question-card">
        <p class="question-kicker">${kicker}</p>
        <h2>${q.title(s)}</h2>
        <p class="question-help">${q.help}</p>
        <p class="selection-note">Choose as many as fit. It is also okay to leave this blank if you are not sure yet.</p>
        ${mainChoices}
        <div class="question-actions">
          <button id="backBtn" class="ghost-btn" type="button">← BACK</button>
          <div class="right"><button id="notSureBtn" class="ghost-btn" type="button">I'M NOT SURE YET</button><button id="nextBtn" class="primary-btn" type="button">CONTINUE →</button></div>
        </div>
      </div>
    </section>`;

  bindQuestionEvents(signalKey,q,ans);
}

function bindQuestionEvents(signalKey,q,ans) {
  app.querySelectorAll('[data-choice]').forEach(btn => btn.addEventListener('click', () => {
    const value = btn.dataset.choice;
    const idx = ans.selected.indexOf(value);
    if (idx >= 0) ans.selected.splice(idx,1); else ans.selected.push(value);
    saveState();
    btn.classList.toggle('selected');
    btn.setAttribute('aria-pressed', btn.classList.contains('selected'));
  }));
  app.querySelectorAll('[data-avoid]').forEach(btn => btn.addEventListener('click', () => {
    const value = btn.dataset.avoid;
    const idx = ans.avoidSelected.indexOf(value);
    if (idx >= 0) ans.avoidSelected.splice(idx,1); else ans.avoidSelected.push(value);
    saveState();
    btn.classList.toggle('selected');
    btn.setAttribute('aria-pressed', btn.classList.contains('selected'));
  }));
  const other = document.getElementById('otherInput');
  if (other) other.addEventListener('input', e => { ans.other = e.target.value; saveState(); });
  const avoidOther = document.getElementById('avoidOtherInput');
  if (avoidOther) avoidOther.addEventListener('input', e => { ans.avoidOther = e.target.value; saveState(); });
  const toggle = document.getElementById('feelingsToggle');
  if (toggle) toggle.addEventListener('click', () => { state.showAllFeelings = !state.showAllFeelings; renderQuestion(); });
  document.getElementById('notSureBtn').addEventListener('click', () => {
    if (!ans.selected.includes('Not sure yet')) ans.selected.push('Not sure yet');
    saveState(); goNextQuestion();
  });
  document.getElementById('nextBtn').addEventListener('click', goNextQuestion);
  document.getElementById('backBtn').addEventListener('click', goBackQuestion);
}

function goNextQuestion() {
  if (state.questionIndex < questionBlueprints.length - 1) {
    state.questionIndex += 1; saveState(); render();
  } else {
    state.stage='sectionComplete'; saveState(); render();
  }
}
function goBackQuestion() {
  if (state.questionIndex > 0) {
    state.questionIndex -= 1; saveState(); render();
  } else if (state.signalIndex > 0) {
    state.signalIndex -= 1; state.questionIndex = questionBlueprints.length - 1; saveState(); render();
  } else {
    state.stage='teach'; saveState(); render();
  }
}

function renderSectionComplete() {
  const signalKey = currentSignalKey();
  const s = signalData[signalKey];
  const ans = state.answers[signalKey];
  const highlight = [
    ...(ans.feelings?.selected || []).slice(0,2),
    ...(ans.body?.selected || []).slice(0,2),
    ...(ans.strategies?.selected || []).slice(0,2)
  ];
  const last = state.signalIndex === SIGNAL_ORDER.length - 1;
  app.innerHTML = `
    <section class="screen section-complete">
      <div class="signal-big"><img src="${asset(s.img)}" alt="${s.label}" /></div>
      <div class="paper-card">
        <p class="eyebrow">SIGNAL CALIBRATED</p>
        <h1>${s.label} MAPPED.</h1>
        <p class="lead">${esc(state.name)}, your answers are being added to your personal Signal Plan.</p>
        <div class="summary-pills">${highlight.length ? highlight.map(x => `<span class="summary-pill">${esc(x)}</span>`).join('') : '<span class="summary-pill">No details selected yet. You can edit this later.</span>'}</div>
        <blockquote class="glorb-quote">Excellent. We have collected actual data instead of assuming what a human should feel. This has improved my research methods by a measurable amount.</blockquote>
        <button id="sectionNext" class="primary-btn" type="button">${last ? 'BUILD MY SIGNAL PLAN →' : `CONTINUE TO ${signalData[SIGNAL_ORDER[state.signalIndex+1]].label} →`}</button>
      </div>
    </section>`;
  document.getElementById('sectionNext').addEventListener('click', () => {
    if (last) { state.stage='report'; saveState(); render(); }
    else { state.signalIndex += 1; state.questionIndex=0; state.stage='questions'; saveState(); render(); }
  });
}

function findVisual(signalKey,key,label) {
  const s=signalData[signalKey];
  if (key==='feelings') return feelings.find(f=>f.value===label)?.img;
  const list = s[key];
  if (Array.isArray(list) && Array.isArray(list[0])) return list.find(x=>x[0]===label)?.[1];
  return null;
}

function chips(signalKey,key,items) {
  if (!items || !items.length) return '<span class="report-chip">Not identified yet</span>';
  return items.map(label => {
    const img = findVisual(signalKey,key,label);
    return `<span class="report-chip">${img ? `<img src="${asset(img)}" alt=""/>` : ''}${esc(label)}</span>`;
  }).join('');
}

function reportSignal(signalKey) {
  const s = signalData[signalKey], a = state.answers[signalKey];
  const get = k => a[k] || {selected:[],other:'',avoidSelected:[],avoidOther:''};
  const adult = get('adults');
  const otherLines = [
    get('feelings').other && `<strong>Other feelings:</strong> ${esc(get('feelings').other)}`,
    get('body').other && `<strong>Other body or thinking signs:</strong> ${esc(get('body').other)}`,
    get('observed').other && `<strong>Other things people might notice:</strong> ${esc(get('observed').other)}`,
    get('contexts').other && `<strong>Other context:</strong> ${esc(get('contexts').other)}`,
    get('strategies').other && `<strong>Student's own strategy:</strong> ${esc(get('strategies').other)}`,
    adult.other && `<strong>Other adult support:</strong> ${esc(adult.other)}`,
    adult.avoidOther && `<strong>Please also avoid:</strong> ${esc(adult.avoidOther)}`
  ].filter(Boolean);
  return `
    <section class="signal-report">
      <div class="signal-report-head ${s.className}"><img src="${asset(s.img)}" alt=""/><div><h3>${s.label}</h3><div class="report-note">When ${esc(state.name)} is in ${s.label}, they have identified the following information and supports.</div></div></div>
      <div class="signal-report-body">
        <div class="report-block"><h4>May feel</h4><div class="report-list">${chips(signalKey,'feelings',get('feelings').selected)}</div></div>
        <div class="report-block"><h4>Body or thinking signs</h4><div class="report-list">${chips(signalKey,'body',get('body').selected)}</div></div>
        <div class="report-block"><h4>Others might notice</h4><div class="report-list">${chips(signalKey,'observed',get('observed').selected)}</div></div>
        <div class="report-block"><h4>${signalKey==='steady' ? 'Conditions that support Steady' : 'Contexts that can move the signal'}</h4><div class="report-list">${chips(signalKey,'contexts',get('contexts').selected)}</div></div>
        <div class="report-block"><h4>Student-identified strategies</h4><div class="report-list">${chips(signalKey,'strategies',get('strategies').selected)}</div></div>
        <div class="report-block"><h4>Adults can help by</h4><div class="report-list">${chips(signalKey,'adults',adult.selected)}</div></div>
        ${(adult.avoidSelected?.length) ? `<div class="report-block"><h4>Please avoid or reduce</h4><div class="report-list">${chips(signalKey,'adults',adult.avoidSelected)}</div></div>` : ''}
        ${otherLines.length ? `<div class="report-other">${otherLines.join('<br>')}</div>` : ''}
      </div>
    </section>`;
}

function priorityCards(signalKey, limit=3) {
  const a = answerFor(signalKey,'strategies');
  const selected = a.selected.filter(x=>x!=='Not sure yet').slice(0,limit);
  if (!selected.length && a.other.trim()) return `<div class="priority-card"><span>${esc(a.other)}</span></div>`;
  if (!selected.length) return `<div class="priority-card"><span>No priority strategy identified yet.</span></div>`;
  return selected.map(label => {
    const img=findVisual(signalKey,'strategies',label);
    return `<div class="priority-card">${img?`<img src="${asset(img)}" alt=""/>`:''}<span>${esc(label)}</span></div>`;
  }).join('');
}

function buildShareText() {
  const name=state.name;
  const line = k => {
    const s=signalData[k];
    const strat=answerFor(k,'strategies');
    const adult=answerFor(k,'adults');
    const strategy=[...strat.selected, strat.other].filter(Boolean).join(', ') || 'not identified yet';
    const support=[...adult.selected, adult.other].filter(Boolean).join(', ') || 'not identified yet';
    return `${s.label}\nHelps: ${strategy}\nAdult support: ${support}`;
  };
  return `${name}'s Signal Plan\n\nThe Signal System describes changes in energy, attention, tension and thinking. It is not a diagnosis or behaviour ranking.\n\n${SIGNAL_ORDER.map(line).join('\n\n')}\n\nThis plan reflects student self-report and should be reviewed collaboratively.`;
}

function renderReport() {
  progressWrap.classList.add('hidden');
  const risingAdults = answerFor('rising','adults');
  const overloadAdults = answerFor('overload','adults');
  const today = new Date().toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'});
  app.innerHTML = `
    <section class="screen report-screen">
      <div class="report-toolbar no-print">
        <button id="editBtn" class="ghost-btn" type="button">← EDIT ANSWERS</button>
        <button id="printBtn" class="primary-btn" type="button">PRINT OR SAVE PDF</button>
        <button id="shareBtn" class="secondary-btn" type="button">SHARE WITH AN ADULT</button>
        <button id="copyBtn" class="ghost-btn" type="button">COPY SUMMARY</button>
      </div>
      <div class="report">
        <div class="report-page">
          <header class="report-head">
            <div><p class="eyebrow">ZORBAX-9 RESEARCH DIVISION // STUDENT SUPPORT</p><h1 class="report-title">${esc(state.name)}'S SIGNAL PLAN</h1></div>
            <div class="report-id">EARTH SIGNAL CALIBRATION<br>DATE: ${esc(today)}<br>STUDENT SELF-REPORT</div>
          </header>
          <div class="report-intro">
            <div>
              <h3>WHAT IS THE SIGNAL SYSTEM?</h3>
              <p class="report-note">The Signal System is a student-friendly way to describe changes in energy, attention, tension and thinking across the school day. It is not a diagnosis, a score, or a ranking of behaviour. A student can move between signals, and the same feeling can occur in more than one signal.</p>
              <p class="report-note"><strong>Steady does not mean silent, still or perfectly calm.</strong> The aim is to understand what each signal looks and feels like for this student, notice early changes, and match support to the student's current needs.</p>
            </div>
            <img src="${asset(7)}" alt="The four Glorb signal groups" />
          </div>
          <div class="signal-definitions">
            ${SIGNAL_ORDER.map(k=>`<div class="signal-definition ${k}"><strong>${signalData[k].label}</strong>${signalData[k].definition}</div>`).join('')}
          </div>
          <div class="priority-panel">
            <p class="eyebrow">CATCH IT EARLY</p>
            <h3>WHEN ${esc(state.name).toUpperCase()}'S SIGNAL STARTS RISING</h3>
            <p class="report-note">${esc(state.name)} has identified that these strategies may help before the signal gets bigger:</p>
            <div class="priority-grid">${priorityCards('rising')}</div>
            ${risingAdults.selected.length || risingAdults.other ? `<p class="report-note"><strong>Helpful adult response:</strong> ${esc([...risingAdults.selected, risingAdults.other].filter(Boolean).join(' • '))}</p>` : ''}
          </div>
          <div class="priority-panel">
            <p class="eyebrow">IF THE SIGNAL REACHES OVERLOAD</p>
            <h3>SUPPORT FIRST. REFLECTION LATER.</h3>
            <p class="report-note">When ${esc(state.name)} is overloaded, reduce language and demands and prioritise safety and regulation. ${esc(state.name)} has identified these first supports:</p>
            <div class="priority-grid">${priorityCards('overload')}</div>
            ${overloadAdults.selected.length || overloadAdults.other ? `<p class="report-note"><strong>Helpful adult response:</strong> ${esc([...overloadAdults.selected, overloadAdults.other].filter(Boolean).join(' • '))}</p>` : ''}
          </div>
          <div class="signal-message">
            <h3>MY SIGNAL MESSAGE</h3>
            <div class="options"><strong>MY SIGNAL IS RISING. I MAY NEED:</strong><span>☐ a break</span><span>☐ quiet</span><span>☐ help</span><span>☐ movement</span><span>☐ time</span><span>☐ something else: __________</span></div>
          </div>
          <div class="footer-note"><strong>Evidence-informed use note:</strong> This is a formative SEL self-report and collaborative planning tool, not a clinical diagnostic assessment. Regulation strategies are not one-size-fits-all. Use the student's selections as hypotheses to test, observe what works in context, follow existing school and health plans, and revise the plan with the student over time.</div>
        </div>
        <div class="report-page page-break">
          <header class="report-head"><div><p class="eyebrow">PERSONAL SIGNAL MAP</p><h2>LOW + STEADY</h2></div><div class="report-id">${esc(state.name)}<br>PAGE 2</div></header>
          ${reportSignal('low')}
          ${reportSignal('steady')}
        </div>
        <div class="report-page page-break">
          <header class="report-head"><div><p class="eyebrow">PERSONAL SIGNAL MAP</p><h2>RISING + OVERLOAD</h2></div><div class="report-id">${esc(state.name)}<br>PAGE 3</div></header>
          ${reportSignal('rising')}
          ${reportSignal('overload')}
          <div class="footer-note"><strong>For adults:</strong> The wording "student has identified" is intentional. This plan records the student's own observations and preferences. It should be combined with adult observation and updated collaboratively. If a student has an existing individual support, safety, behaviour, health or disability plan, that plan takes priority where relevant.</div>
        </div>
      </div>
    </section>`;

  document.getElementById('printBtn').addEventListener('click', () => window.print());
  document.getElementById('editBtn').addEventListener('click', () => { state.stage='questions'; state.signalIndex=0; state.questionIndex=0; saveState(); render(); });
  document.getElementById('copyBtn').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(buildShareText()); alert('Signal Plan summary copied.'); }
    catch { alert('Copy was blocked by this browser. You can use Share with an Adult instead.'); }
  });
  document.getElementById('shareBtn').addEventListener('click', sharePlan);
}

async function sharePlan() {
  const text=buildShareText();
  const title=`${state.name}'s Signal Plan`;
  if (navigator.share) {
    try { await navigator.share({title,text}); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  const subject=encodeURIComponent(title);
  const body=encodeURIComponent(text + '\n\nFor the full visual plan, print or save the report as a PDF and attach it to your message.');
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
}

readBtn.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) { alert('Read Aloud is not supported in this browser.'); return; }
  window.speechSynthesis.cancel();
  const text = app.innerText.replace(/\s+/g,' ').trim();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
});
clearBtn.addEventListener('click', () => {
  if (confirm('Start over and clear the answers from this browser session?')) resetState();
});

render();
