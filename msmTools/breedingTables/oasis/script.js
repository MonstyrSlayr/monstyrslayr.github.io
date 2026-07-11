import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Oasis");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Air"),
                                    stringToElementSigil("Fire"),
                                    stringToElementSigil("Cold"),
                                    stringToElementSigil("Water")]));
