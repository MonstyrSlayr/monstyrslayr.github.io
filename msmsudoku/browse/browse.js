async function loadSudokus()
{
    const dataFile = await fetch("../data_files.txt");
    const text = await dataFile.text();
    const filenames = text.split("\n").map(f => f.trim()).filter(f => f);

    const sudokus = [];
    for (const filename of filenames)
    {
        try
        {
            const res = await fetch(`../data/${filename}`);
            const json = await res.json();
            sudokus.push({
                name: json.metadata?.name ?? filename,
                author: json.metadata?.author ?? "Unknown",
                dateCreated: json.metadata?.dateCreated ?? null,
                filename
            });
        }
        catch (e)
        {
            console.error(`Failed to load ${filename}:`, e);
        }
    }
    return sudokus;
}

function renderSudokus(sudokus)
{
    const container = document.getElementById("sudokuList");
    container.innerHTML = "";
    for (const s of sudokus)
    {
        const div = document.createElement("div");
        div.className = "sudoku";
        div.innerHTML = `
            <a href="../play/${s.filename.replace(".json", "")}">
                <strong>${s.name}</strong><br>
                <span class="author">by ${p.author}</span><br>
                ${s.dateCreated ? `<span class="date">${s.dateCreated}</span>` : ""}
            </a>
        `;
        container.appendChild(div);
    }
}

function applyFilters(sudokus)
{
    const query = document.getElementById("search").value.toLowerCase();
    const sortOption = document.getElementById("sort").value;

    let filtered = sudokus.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query)
    );

    const [key, direction] = sortOption.split("-"); // my hatred is palpable
    filtered.sort((a, b) =>
    {
        let valA = a[key] ?? "";
        let valB = b[key] ?? "";
        if (key === "date")
        {
            valA = a.dateCreated ?? "";
            valB = b.dateCreated ?? "";
        }

        if (valA < valB) return direction === "asc" ? -1 : 1;
        if (valA > valB) return direction === "asc" ? 1 : -1;
        return 0;
    });

    renderSudokus(filtered);
}

(async () =>
{
    const sudokus = await loadSudokus();
    renderSudokus(sudokus);

    document.getElementById("search").addEventListener("input", () => applyFilters(sudokus));
    document.getElementById("sort").addEventListener("change", () => applyFilters(sudokus));
})();
