(() => {
  const year = document.querySelector('#year');
  const clock = document.querySelector('#utc-clock');
  const output = document.querySelector('#terminal-output');
  const command = document.querySelector('#boot-command');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = new Date().getFullYear();

  const updateClock = () => {
    if (!clock) return;
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = `UTC ${now.toISOString().slice(11, 19)}`;
  };
  updateClock();
  window.setInterval(updateClock, 1000);

  if (!output || !command || reduceMotion) return;
  const lines = [
    '<span class="muted">[boot]</span> mounting research archive...',
    '<span class="ok">[ ok ]</span> loading operator profile',
    '<span class="ok">[ ok ]</span> secure channel established'
  ];
  output.innerHTML = '';
  command.textContent = '';
  const target = './countzero.sh';
  let character = 0;

  const typeCommand = () => {
    if (character < target.length) {
      command.textContent += target[character++];
      window.setTimeout(typeCommand, 65);
      return;
    }
    lines.forEach((line, index) => window.setTimeout(() => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = line;
      output.append(paragraph);
    }, 220 + index * 250));
  };
  window.setTimeout(typeCommand, 350);
})();
