export function hexToRgb(hex)
{
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
    {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
  
export function rgbToHex(r, g, b)
{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function rgbFuncToHex(rgb)
{
    const values = rgb.substring(4, rgb.length - 1).split(',').map(Number);
    const r = values[0];
    const g = values[1];
    const b = values[2];
  
    const componentToHex = (c) =>
    {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
  
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function rgbFuncToRgb(rgb)
{
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return {r: r, g: g, b: b};
}

export function mixHexColors(colors)
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

export function blendHexColors(hexA, hexB, percentage)
{
    const toRgb = hex => (
    {
        r: parseInt(hex.slice(1, 3), 16),
        g: parseInt(hex.slice(3, 5), 16),
        b: parseInt(hex.slice(5, 7), 16)
    });
  
    const toHex = rgb => '#' + [rgb.r, rgb.g, rgb.b]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
  
    const rgbA = toRgb(hexA);
    const rgbB = toRgb(hexB);
  
    const blendedRgb =
    {
        r: Math.round(rgbA.r * (1 - percentage) + rgbB.r * percentage),
        g: Math.round(rgbA.g * (1 - percentage) + rgbB.g * percentage),
        b: Math.round(rgbA.b * (1 - percentage) + rgbB.b * percentage)
    };
  
    return toHex(blendedRgb);
}

function padZero(str, len)
{
    len = len || 2;
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
}

export function invertColor(hex, bw)
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

export function rgbToHsl(r, g, b)
{
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
            case g: h = ((b - r) / d + 2); break;
            case b: h = ((r - g) / d + 4); break;
        }
        h *= 60;
    }
    return {h: h, s: s, l: l};
}
