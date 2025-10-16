import { decryptFromURL, gaugeSudokuDifficulty, getConditionalById, monsters } from "../script.js";

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
            const json = await decryptFromURL(`../data/${filename}`);
            sudokus.push({
                name: json.metadata?.name ?? filename,
                author: json.metadata?.author ?? "Unknown",
                dateCreated: json.metadata?.dateCreated ?? null,
                color: json.metadata?.color ?? "#ffffff",
                img: json.metadata?.img ?? "https://monstyrslayr.github.io/msmTools/webp/square/monster_portrait_prize.webp",
                rows: json.conditionalRows,
                cols: json.conditionalCols,
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

function invertColor(hex, bw)
{
    if (hex.indexOf("#") === 0)
    {
        hex = hex.slice(1);
    }

    if (hex.length === 3)
    {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    if (hex.length !== 6)
    {
        throw new Error("Invalid HEX color.");
    }

    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    
    if (bw)
    {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? "#000000"
            : "#FFFFFF";
    }
    
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);

    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function renderSudokus(sudokus)
{
    const container = document.getElementById("sudokuList");
    container.innerHTML = "";
    for (const s of sudokus)
    {
        const textColor = invertColor(s.color, true);

        const div = document.createElement("div");
        div.classList.add("sudokuResult");
        div.style.backgroundColor = s.color;
        container.appendChild(div);

            const link = document.createElement("a");
            link.href = `../play/${s.filename.replace(".sud", "")}`;
            div.appendChild(link);

                const textSide = document.createElement("div");
                link.appendChild(textSide);

                    const title = document.createElement("strong");
                    title.textContent = s.name;
                    title.style.color = textColor;
                    textSide.appendChild(title);

                    const br1 = document.createElement("br");
                    textSide.appendChild(br1);

                    const authorSpan = document.createElement("span");
                    authorSpan.classList.add("author");
                    authorSpan.textContent = `by ${s.author}`;
                    authorSpan.style.color = textColor;
                    textSide.appendChild(authorSpan);

                    if (s.dateCreated)
                    {
                        const br2 = document.createElement("br");
                        const dateSpan = document.createElement("span");
                        dateSpan.classList.add("date");
                        dateSpan.textContent = new Date(s.dateCreated).toDateString();
                        dateSpan.style.color = textColor;
                        textSide.appendChild(br2);
                        textSide.appendChild(dateSpan);
                    }

                    const br3 = document.createElement("br");
                    textSide.appendChild(br3);

                    const diffSpan = document.createElement("span");
                    diffSpan.classList.add("difficulty");
                    const daRows = s.rows.map((cond) => getConditionalById(cond.id));
                    const daCols = s.cols.map((cond) => getConditionalById(cond.id));
                    const daRInverse = s.rows.map((cond) => cond.inverse);
                    const daCInverse = s.cols.map((cond) => cond.inverse);
                    s.difficulty = gaugeSudokuDifficulty(monsters, daRows, daRInverse, daCols, daCInverse);
                    diffSpan.textContent = `Difficulty: ${s.difficulty}`;
                    diffSpan.style.color = textColor;
                    textSide.appendChild(diffSpan);
                
                const imgSide = document.createElement("div");
                link.appendChild(imgSide);
                    
                    const daImg = document.createElement("img");
                    daImg.src = s.img;
                    imgSide.appendChild(daImg);
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
    document.getElementById("loading").classList.add("gone");

    document.getElementById("search").addEventListener("input", () => applyFilters(sudokus));
    document.getElementById("sort").addEventListener("change", () => applyFilters(sudokus));
    applyFilters(sudokus);
})();
