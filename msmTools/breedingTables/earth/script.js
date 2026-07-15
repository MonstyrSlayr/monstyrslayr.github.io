import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Earth");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Air"),
                                    stringToElementSigil("Plant"),
                                    stringToElementSigil("Earth"),
                                    stringToElementSigil("Cold")]));
