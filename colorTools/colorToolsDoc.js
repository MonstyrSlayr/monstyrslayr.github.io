import * as colorTools from "./colorTools.js";

export const VARTYPES = Object.freeze
({
    RGB: 0,
    HSL: 1,
    HEX: 2,
    RGBFUNC: 3,
    HEXARR: 4,
    PERC: 5,
    BOOL: 6
});

class FuncDoc
{
    constructor (func, inputs, outputs, desc)
    {
        this.func = func;
        this.input = inputs;
        this.output = outputs;
        this.desc = desc;
    }
}

export const funcDocs = [];

funcDocs.push(new FuncDoc(colorTools.hexToRgb, [VARTYPES.HEX], [VARTYPES.RGB], "converts a hex code to an rgb object"));
funcDocs.push(new FuncDoc(colorTools.rgbToHex, [VARTYPES.RGB], [VARTYPES.HEX], "converts r, g, b components to a hex code"));
funcDocs.push(new FuncDoc(colorTools.rgbFuncToHex, [VARTYPES.RGBFUNC], [VARTYPES.HEX], "converts an rgb() string to a hex code"));
funcDocs.push(new FuncDoc(colorTools.rgbFuncToRgb, [VARTYPES.RGBFUNC], [VARTYPES.RGB], "converts an rgb() string to an rgb object"));
funcDocs.push(new FuncDoc(colorTools.mixHexColors, [VARTYPES.HEXARR], [VARTYPES.HEX], "averages a list of hex codes into one hex code"));
funcDocs.push(new FuncDoc(colorTools.blendHexColors, [VARTYPES.HEX, VARTYPES.HEX, VARTYPES.PERC], [VARTYPES.HEX], "blends two hex colors by a percentage"));
funcDocs.push(new FuncDoc(colorTools.invertColor, [VARTYPES.HEX, VARTYPES.BOOL], [VARTYPES.HEX], "inverts a hex color; returns black or white if bool is true"));
funcDocs.push(new FuncDoc(colorTools.rgbToHsl, [VARTYPES.RGB], [VARTYPES.HSL], "converts r, g, b components to h, s, l"));
