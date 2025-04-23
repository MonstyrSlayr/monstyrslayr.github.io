export class CubeAlg
{
    constructor(moves, color)
    {
        this.moves = moves;
        this.color = color;
    }
}

function rgbToHex(r, g, b)
{
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c)
{
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function hueToHex(hue)
{
    hue = hue % 360;
    if (hue < 0) hue += 360;
  
    const chroma = 1;
    const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = 0;
  
    let r = 0, g = 0, b = 0;
  
    if (hue < 60)
    {
        r = chroma;
        g = x;
    }
    else if (hue < 120)
    {
        r = x;
        g = chroma;
    }
    else if (hue < 180)
    {
        g = chroma;
        b = x;
    }
    else if (hue < 240)
    {
        g = x;
        b = chroma;
    }
    else if (hue < 300)
    {
        r = x;
        b = chroma;
    }
    else
    {
        r = chroma;
        b = x;
    }
  
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
  
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function desaturateColor(hexColor, amount)
{
    // Remove the '#' if it exists and convert to uppercase
    hexColor = hexColor.replace("#", "").toUpperCase();
  
    // Parse hex color to RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
  
    // Calculate grayscale value
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
  
    // Desaturate RGB values
    const newR = Math.round(r * (1 - amount) + gray * amount);
    const newG = Math.round(g * (1 - amount) + gray * amount);
    const newB = Math.round(b * (1 - amount) + gray * amount);
    
    // Ensure values are within valid range
    const clampedR = Math.max(0, Math.min(255, newR));
    const clampedG = Math.max(0, Math.min(255, newG));
    const clampedB = Math.max(0, Math.min(255, newB));
    
    // Convert back to hex
    const newHex = rgbToHex(clampedR, clampedG, clampedB);
  
    return newHex;
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

function hexToRgb(hex)
{
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
    {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function mixHexColors(colors)
{
    // Convert hex colors to RGB
    const rgbColors = colors.map(hexToRgb);
  
    // Calculate average RGB values
    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;
  
    for (const rgb of rgbColors)
    {
        totalRed += rgb.r;
        totalGreen += rgb.g;
        totalBlue += rgb.b;
    }
  
    const avgRed = Math.round(totalRed / colors.length);
    const avgGreen = Math.round(totalGreen / colors.length);
    const avgBlue = Math.round(totalBlue / colors.length);
  
    // Convert back to hex
    return rgbToHex(avgRed, avgGreen, avgBlue);
}

const baseMoves = ["R", "U", "F", "L", "D", "B"];
const baseHues = [0, 300, 120, 30, 60, 240];
const moveModifiers = ["", "'", "2"];
const algSet = [];

for (let i = 0; i < baseMoves.length; i++)
{
    for (let j = 0; j < moveModifiers.length; j++)
    {
        let baseMove1 = baseMoves[i] + moveModifiers[j];
        let baseHex1 = hueToHex(baseHues[i]);
        algSet.push(new CubeAlg(baseMove1, baseHex1));

        for (let k = 0; k < baseMoves.length; k++)
        {
            if (i == k) continue;
            for (let l = 0; l < moveModifiers.length; l++)
            {
                let baseMove2 = baseMoves[k] + moveModifiers[l];
                let baseHex2 = hueToHex(baseHues[k]);
                algSet.push(new CubeAlg(baseMove1 + " " + baseMove2, mixHexColors([baseHex1, baseHex2])));
            }
        }
    }
}

// special algs
const specialAlgs =
[
    "R2 L2 U2 D2 F2 B2",
    "R32",
    "M",
    "M'",
    "M2"
];

for (const alg of specialAlgs)
{
    algSet.push(new CubeAlg(alg, "#ffffff"));
}

export function getAlgSet()
{
    return algSet;
}

export function algToCubeAlg(algString)
{
    return algSet.filter((cubeAlg) => cubeAlg.moves == algString)[0];
}

export function renderVote(daAlg, createdAt)
{
    const bgColor = desaturateColor(daAlg.color, 0.5);

    const daOption = document.createElement("div");
    daOption.classList.add("algOption");
    daOption.style.backgroundColor = bgColor;
    daOption.style.borderColor = daAlg.color;
    daOption.daAlg = daAlg;
    daOption.createdAt = createdAt;

    const daOptionText = document.createElement("p");
    daOptionText.textContent = daAlg.moves;
    daOptionText.style.color = invertColor(bgColor, true);
    daOption.appendChild(daOptionText);

    return daOption;
}
