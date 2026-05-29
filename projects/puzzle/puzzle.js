/* ── Floating Particles ── */
const pCont = document.getElementById('particles');
const particleColors = ['#f7971e', '#ffd200', '#21d4fd', '#00f260', '#f7374f', '#b721ff'];

for (let i = 0; i < 22; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 14 + 5;
  p.style.cssText = `
    width:${size}px;
    height:${size}px;
    left:${Math.random() * 100}%;
    background:${particleColors[Math.floor(Math.random() * particleColors.length)]};
    animation-duration:${Math.random() * 12 + 8}s;
    animation-delay:${Math.random() * 10}s;
  `;
  pCont.appendChild(p);
}

/* ── Game State ── */
let score = 0;
let streak = 0;
let hintsLeft = 3;

const ANSWERS = { box1: 7, box2: 12, box3: 15, box4: 21 };
const BOX_IDS  = ['box1', 'box2', 'box3', 'box4'];

/* ── Live Progress Dot Updates ── */
BOX_IDS.forEach((id, idx) => {
  document.getElementById(id).addEventListener('input', () => {
    const val = parseInt(document.getElementById(id).value);
    const dot = document.getElementById('dot' + (idx + 1));
    if (isNaN(val)) {
      dot.className = 'dot';
      return;
    }
    dot.className = val === ANSWERS[id] ? 'dot filled' : 'dot wrong-dot';
  });
});

/* ── Check Answer ── */
function checkAnswer() {
  let allCorrect = true;

  BOX_IDS.forEach((id, idx) => {
    const v    = parseInt(document.getElementById(id).value);
    const cell = document.getElementById('cell' + (idx + 1));
    const dot  = document.getElementById('dot'  + (idx + 1));

    cell.classList.remove('cell-correct', 'cell-wrong');

    if (v === ANSWERS[id]) {
      cell.classList.add('cell-correct');
      dot.className = 'dot filled';
    } else {
      cell.classList.add('cell-wrong');
      dot.className = 'dot wrong-dot';
      allCorrect = false;
    }
  });

  const res = document.getElementById('Result');

  if (allCorrect) {
    streak++;
    score += 10 + streak * 2;
    updateScore();
    res.textContent = '🎉 Brilliant! Perfect Solution!';
    res.className   = 'correct';
    launchConfetti();
  } else {
    streak = 0;
    updateScore();
    res.textContent = '❌ Not quite — keep trying!';
    res.className   = 'wrong';
  }
}

/* ── Hint ── */
function giveHint() {
  if (hintsLeft <= 0) {
    showResult('No hints left! 🙈', 'hint');
    return;
  }

  const unsolved = BOX_IDS.filter(id => {
    const v = parseInt(document.getElementById(id).value);
    return isNaN(v) || v !== ANSWERS[id];
  });

  if (unsolved.length === 0) {
    showResult('All correct already! 🎉', 'hint');
    return;
  }

  const pick = unsolved[Math.floor(Math.random() * unsolved.length)];
  const idx  = BOX_IDS.indexOf(pick);
  const cell = document.getElementById('cell' + (idx + 1));
  const dot  = document.getElementById('dot'  + (idx + 1));

  document.getElementById(pick).value = ANSWERS[pick];
  cell.classList.remove('cell-wrong');
  cell.classList.add('cell-correct');
  dot.className = 'dot filled';

  hintsLeft--;
  document.getElementById('hintVal').textContent = hintsLeft;
  showResult('💡 Hint used — one box revealed!', 'hint');
}

/* ── Reset Game ── */
function resetGame() {
  BOX_IDS.forEach((id, idx) => {
    document.getElementById(id).value = '';
    document.getElementById('cell' + (idx + 1)).classList.remove('cell-correct', 'cell-wrong');
    document.getElementById('dot'  + (idx + 1)).className = 'dot';
  });

  hintsLeft = 3;
  document.getElementById('hintVal').textContent = 3;
  document.getElementById('Result').textContent  = '';
  document.getElementById('Result').className    = '';
}

/* ── Helpers ── */
function showResult(msg, cls) {
  const r = document.getElementById('Result');
  r.textContent = msg;
  r.className   = cls;
}

function updateScore() {
  document.getElementById('scoreVal').textContent  = score;
  document.getElementById('streakVal').textContent = streak;
}

/* ── Confetti Burst ── */
function launchConfetti() {
  const cont = document.getElementById('confetti');
  const cols = ['#f7971e', '#ffd200', '#21d4fd', '#00f260', '#f7374f', '#b721ff', '#fff'];

  cont.innerHTML = '';

  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `
      left:${Math.random() * 100}%;
      background:${cols[Math.floor(Math.random() * cols.length)]};
      width:${Math.random() * 10 + 6}px;
      height:${Math.random() * 10 + 6}px;
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation-delay:${Math.random() * 0.6}s;
      animation-duration:${Math.random() * 0.8 + 1}s;
    `;
    cont.appendChild(p);
  }

  setTimeout(() => { cont.innerHTML = ''; }, 2500);
}
