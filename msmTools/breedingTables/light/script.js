import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Light");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Light"),
                                    stringToElementSigil("Cold"),
                                    stringToElementSigil("Plant"),
                                    stringToElementSigil("Fire")]));
