import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Haven");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Air"),
                                    stringToElementSigil("Fire"),
                                    stringToElementSigil("Earth"),
                                    stringToElementSigil("Plant")]));
