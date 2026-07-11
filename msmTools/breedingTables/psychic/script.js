import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Psychic");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Psychic"),
                                    stringToElementSigil("Water"),
                                    stringToElementSigil("Plant"),
                                    stringToElementSigil("Fire")]));
