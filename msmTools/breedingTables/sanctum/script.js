import { stringToIsland, stringToElementSigil } from "../../monsters.js";
import { makeNaturalTable } from "../common.js";

const daIsland = stringToIsland("Sanctum");
makeNaturalTable(daIsland, new Set([stringToElementSigil("Light"),
                                    stringToElementSigil("Psychic"),
                                    stringToElementSigil("Faerie"),
                                    stringToElementSigil("Bone")]));
