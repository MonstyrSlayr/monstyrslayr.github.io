import { funcDocs, VARTYPES } from "./colorToolsDoc.js";

function varTypeToString(type)
{
    switch (type)
    {
        case VARTYPES.RGB: return "r, g, b";
        case VARTYPES.HSL: return "h, s, l";
        case VARTYPES.HEX: return "hex";
        case VARTYPES.RGBFUNC: return "rgb()";
        case VARTYPES.HEXARR: return "[hex]";
        case VARTYPES.PERC: return "percent";
        case VARTYPES.BOOL: return "bool";
        default: return "unknown";
    }
}

const infoDiv = document.getElementById("info");

    const infoHeading = document.createElement("h2");
    infoHeading.textContent = "Variable info";
    infoDiv.appendChild(infoHeading);

    const infoList = document.createElement("ul");
    infoDiv.appendChild(infoList);

        const infoItemRgb = document.createElement("li");
        infoItemRgb.textContent = "r, g, b: int [0 - 255]";
        infoList.appendChild(infoItemRgb);

        const infoItemH = document.createElement("li");
        infoItemH.textContent = "h: int [0 - 360)";
        infoList.appendChild(infoItemH);

        const infoItemSl = document.createElement("li");
        infoItemSl.textContent = "s, l: int [0 - 100)";
        infoList.appendChild(infoItemSl);

        const infoItemHex = document.createElement("li");
        infoItemHex.textContent = "hex: string (e.g. #ff00aa)";
        infoList.appendChild(infoItemHex);

        const infoItemRgbFunc = document.createElement("li");
        infoItemRgbFunc.textContent = "rgb(): string (e.g. rgb(255, 0, 170))";
        infoList.appendChild(infoItemRgbFunc);

        const infoItemHexArr = document.createElement("li");
        infoItemHexArr.textContent = "[hexes]: [string] (e.g., [\"#ff0000\", \"#00ff00\"])";
        infoList.appendChild(infoItemHexArr);

        const infoItemPerc = document.createElement("li");
        infoItemPerc.textContent = "percent: float (0.0 - 1.0)";
        infoList.appendChild(infoItemPerc);

        const infoItemBool = document.createElement("li");
        infoItemBool.textContent = "bool: boolean (true or false)";
        infoList.appendChild(infoItemBool);

const docsDiv = document.getElementById("docs");

    for (const funcDoc of funcDocs)
    {
        const docDiv = document.createElement("div");
        docsDiv.appendChild(docDiv);

            const funcTitle = document.createElement("h2");
            funcTitle.textContent = funcDoc.func.name;
            docDiv.appendChild(funcTitle);

            const funcData = document.createElement("p");
            funcData.textContent += "(";

                for (const varType of funcDoc.input)
                {
                    funcData.textContent += varTypeToString(varType) + ", ";
                }

                funcData.textContent = funcData.textContent.substring(0, funcData.textContent.length - 2);
                funcData.textContent += ") -> ";

                for (const varType of funcDoc.output)
                {
                    funcData.textContent += varTypeToString(varType) + ", ";
                }

                funcData.textContent = funcData.textContent.substring(0, funcData.textContent.length - 2);

            docDiv.appendChild(funcData);

            const funcDesc = document.createElement("p");
            funcDesc.textContent = funcDoc.desc;
            docDiv.appendChild(funcDesc);
    }
