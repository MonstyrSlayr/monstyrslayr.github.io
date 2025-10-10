async function loadPuzzles() {
  const dataFile = await fetch('../data_files.txt');
  const text = await dataFile.text();
  const filenames = text.split('\n').map(f => f.trim()).filter(f => f);

  const puzzles = [];
  for (const filename of filenames) {
    try {
      const res = await fetch(`../data/${filename}`);
      const json = await res.json();
      puzzles.push({
        name: json.metadata?.name ?? filename,
        author: json.metadata?.author ?? "Unknown",
        dateCreated: json.metadata?.dateCreated ?? null,
        filename
      });
    } catch (e) {
      console.error(`Failed to load ${filename}:`, e);
    }
  }
  return puzzles;
}

function renderPuzzles(puzzles) {
  const container = document.getElementById('sudokuList');
  container.innerHTML = '';
  for (const p of puzzles) {
    const div = document.createElement('div');
    div.className = 'puzzle';
    div.innerHTML = `
      <a href="../play/${p.filename.replace('.json', '')}">
        <strong>${p.name}</strong><br>
        <span class="author">by ${p.author}</span><br>
        ${p.dateCreated ? `<span class="date">${p.dateCreated}</span>` : ''}
      </a>
    `;
    container.appendChild(div);
  }
}

function applyFilters(puzzles) {
  const query = document.getElementById('search').value.toLowerCase();
  const sortOption = document.getElementById('sort').value;

  let filtered = puzzles.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.author.toLowerCase().includes(query)
  );

  const [key, direction] = sortOption.split('-');
  filtered.sort((a, b) => {
    let valA = a[key] ?? '';
    let valB = b[key] ?? '';
    if (key === 'date') {
      valA = a.dateCreated ?? '';
      valB = b.dateCreated ?? '';
    }
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  renderPuzzles(filtered);
}

(async () => {
  const puzzles = await loadPuzzles();
  renderPuzzles(puzzles);

  document.getElementById('search').addEventListener('input', () => applyFilters(puzzles));
  document.getElementById('sort').addEventListener('change', () => applyFilters(puzzles));
})();
