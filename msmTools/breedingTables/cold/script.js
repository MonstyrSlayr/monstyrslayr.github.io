import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Cold");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Air"),
                                    stringToElementSigil("Plant"),
                                    stringToElementSigil("Water"),
                                    stringToElementSigil("Cold")]));
