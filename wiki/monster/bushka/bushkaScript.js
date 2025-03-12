import { createInfoSiteHeader } from "../../wikiTools.js";

const header = document.querySelector("header");
header.replaceWith(createInfoSiteHeader("Bushka"));
