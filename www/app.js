const P = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8]
};

let count = 2;
let rolling = false;
let vals = [1, 1];

const dice = document.querySelector('#dice');

function draw() {
  dice.innerHTML = vals.map(v => {
    const points = [0,1,2,3,4,5,6,7,8]
      .map(i => `<span class="${P[v].includes(i) ? 'pip' : 'empty'}"></span>`)
      .join('');

    return `<div class="die ${rolling ? 'rolling' : ''}">${points}</div>`;
  }).join('');
}

function roll() {
  if (rolling) return;

  rolling = true;
  let n = 0;

  const timer = setInterval(() => {
    vals = Array.from(
      { length: count },
      () => Math.floor(Math.random() * 6) + 1
    );

    draw();
    n++;

    if (n >= 7) {
      clearInterval(timer);
      rolling = false;
      draw();
    }
  }, 70);
}

document.querySelector('#table').addEventListener('click', roll);

document.querySelector('#one').addEventListener('click', e => {
  e.stopPropagation();
  count = 1;
  vals = [1];

  document.querySelector('#one').classList.add('active');
  document.querySelector('#two').classList.remove('active');

  draw();
});

document.querySelector('#two').addEventListener('click', e => {
  e.stopPropagation();
  count = 2;
  vals = [1, 1];

  document.querySelector('#two').classList.add('active');
  document.querySelector('#one').classList.remove('active');

  draw();
});

draw();
