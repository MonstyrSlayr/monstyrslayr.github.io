import { createInfoSiteHeader } from "../../wikiTools.js";

const header = document.querySelector("header");
header.replaceWith(createInfoSiteHeader("Bushka"));

const daEvent = new CustomEvent("pageScriptRun",
{
    detail: { message: "site built" },
    bubbles: true,
    cancelable: true
});
document.dispatchEvent(daEvent);
