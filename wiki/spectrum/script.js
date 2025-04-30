import { getAmeliorates, waitForElement } from "../data.js";
import { createInfoSiteHeader } from "../wikiTools.js";

waitForElement(".centeredT").then(function()
{
    const daDiv = document.getElementsByClassName("hueCircleDiv")[0];
    const daMarkersDiv = document.createElement("div");
    daDiv.appendChild(daMarkersDiv);
    const canvas = document.getElementsByClassName("hueCircle")[0];
    const ctx = canvas.getContext("2d");

    function easeOutExpo(x)
    {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    function drawHueCircle()
    {
        const w = canvas.width;
        const h = canvas.height;
        const radius = w / 2;

        for (let y = 0; y < h; y++)
        {
            for (let x = 0; x < w; x++)
            {
                const dx = x - radius;
                const dy = y - radius;
                const r = Math.sqrt(dx * dx + dy * dy);

                if (r > radius) continue; // outside the circle

                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                const hue = (angle + 360) % 360;
                const sat = (r / radius) * 100;
                const light = 100 - (r / radius) * 100;

                ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
                ctx.globalAlpha = easeOutExpo((radius - r)/radius);
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    function hexToHSL(hex)
    {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
    
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max === min)
        {
            h = s = 0; // achromatic
        }
        else
        {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h *= 60;
        }
    
        return { h, s: s * 100, l: l * 100 };
    }

    function hslToXY(h, s, l, canvasSize)
    {
        const radius = canvasSize / 2;
        const sat = s / 100;
        const light = l / 100;
    
        // Estimate radial distance by inverting the light function
        const r = radius * (1 - light); // reverse of light = 1 - (r / radius)
    
        const angleRad = (h / 180) * Math.PI;
        const x = radius + r * Math.cos(angleRad);
        const y = radius + r * Math.sin(angleRad);
        return { x, y };
    }

    const monsterArray = [];

    for (const daMonster of getAmeliorates())
    {
        const { h, s, l } = hexToHSL(daMonster.dominantColor);
        const { x, y } = hslToXY(h, s, l, canvas.height);
        monsterArray.push(
        {
            monster: daMonster,
            x: x,
            y: y
        });
    }

    monsterArray.sort((a, b) =>
    {
        return -(b.y - a.y);
    });

    function placeImageAtHex(hex, imgURL, scale)
    {
        const { h, s, l } = hexToHSL(hex);
        const radiusRatio = 1 - l / 100;
        const angle = h * Math.PI / 180;
        const xNorm = radiusRatio * 0.5 * Math.cos(angle) + 0.5;
        const yNorm = -radiusRatio * 0.5 * Math.sin(angle) + 0.5;
    
        return addImage(imgURL, xNorm, yNorm, scale);
    }
    

    function addImage(url, xNorm, yNorm, scale) {
        return new Promise((resolve, reject) =>
        {
            const img = document.createElement("img");
            img.src = url;
            img.className = "marker";
            daMarkersDiv.appendChild(img);
    
            const daImg = new Image();
            daImg.src = url;
    
            daImg.onload = function()
            {
                img.style.left = "calc(" + (xNorm * 100) + "% - " + (this.width * scale * 0.5) + "px)";
                img.style.bottom = (yNorm * 100) + "%";
                resolve(img); // resolve when positioned
            };
    
            daImg.onerror = () => reject(new Error("Failed to load: " + url));
        });
    }
    

    function redrawMarkers(scale, zeropacity)
    {
        daMarkersDiv.innerHTML = "";
    
        const loadPromises = monsterArray.map(async (daMonsterThing) =>
        {
            const daMonster = daMonsterThing.monster;
            const img = await placeImageAtHex(daMonster.dominantColor, daMonster.images.default, scale);
            if (zeropacity) img.style.opacity = "0";
        });
    
        return Promise.all(loadPromises);
    }    

    function resizeCanvas(zeropacity = false)
    {
        const daWidth = Math.min(window.innerWidth - 16, window.innerHeight - 16);
        daDiv.style.width = daWidth + "px";
        canvas.width = daWidth;
        canvas.height = daWidth;
        drawHueCircle();

        const scale = window.innerWidth > 750 ? 0.2 : 0.1;

        redrawMarkers(scale, zeropacity).then(function()
        {
            setTimeout(function()
            {
                const images = Array.from(daMarkersDiv.children);
                gsap.fromTo(images, { opacity: 0 }, { duration: 0.25, opacity: 1, stagger: 0.02 });
            }, 1000);

            if (zeropacity === true) // actually the worst (zeropacity can be an event????)
            {
                const daEvent = new CustomEvent("pageScriptRun",
                {
                    detail: { message: "site built" },
                    bubbles: true,
                    cancelable: true
                });
                document.dispatchEvent(daEvent);
            }
        });
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(true);
});

const header = document.querySelector("header");
header.replaceWith(createInfoSiteHeader("Monster Color ID Spectrum"));
