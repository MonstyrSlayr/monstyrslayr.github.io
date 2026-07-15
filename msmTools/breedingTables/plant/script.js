import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Plant");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Water"),
                                    stringToElementSigil("Plant"),
                                    stringToElementSigil("Earth"),
                                    stringToElementSigil("Cold")]));
