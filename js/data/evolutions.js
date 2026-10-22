/* ============ evolutions.js — evoluciones de nivel de Kanto ============ */
G.EvolutionData = (() => {
  const PARENTS = {
    2: 1, 3: 2, 5: 4, 6: 5, 8: 7, 9: 8, 11: 10, 12: 11, 14: 13, 15: 14,
    17: 16, 18: 17, 20: 19, 22: 21, 24: 23, 26: 25, 28: 27, 30: 29, 31: 30,
    33: 32, 34: 33, 36: 35, 38: 37, 40: 39, 42: 41, 44: 43, 45: 44, 47: 46,
    49: 48, 51: 50, 53: 52, 55: 54, 57: 56, 59: 58, 61: 60, 62: 61, 64: 63,
    65: 64, 67: 66, 68: 67, 70: 69, 71: 70, 73: 72, 75: 74, 76: 75, 78: 77,
    80: 79, 82: 81, 85: 84, 87: 86, 89: 88, 91: 90, 93: 92, 94: 93, 97: 96,
    99: 98, 101: 100, 103: 102, 105: 104, 110: 109, 112: 111, 117: 116, 119: 118,
    121: 120, 130: 129, 134: 133, 135: 133, 136: 133, 139: 138, 141: 140,
    148: 147, 149: 148
  };
  const STORY_STARTERS = new Set([
    1, 4, 7, 10, 13, 16, 19, 21, 23, 25, 27, 29, 32, 35, 37, 39, 41, 43,
    46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 74, 77, 79, 81, 83, 84,
    86, 88, 90, 92, 95, 96, 98, 100, 102, 104, 106, 107, 108, 109, 111,
    113, 114, 115, 116, 118, 120, 122, 123, 124, 125, 126, 127, 128, 129,
    131, 132, 133, 137, 138, 140, 142, 144, 145, 146, 147, 150, 151
  ]);
  const LEVEL_TO = {};
  const CHILDREN = {};
  // If a species branches, its first child in Pokédex order evolves automatically.
  for (const child of Object.keys(PARENTS).map(Number)) {
    const parent = PARENTS[child];
    (CHILDREN[parent] = CHILDREN[parent] || []).push(child);
    if (!LEVEL_TO[parent]) LEVEL_TO[parent] = child;
  }

  function rootOf(dex) {
    let root = dex;
    while (PARENTS[root]) root = PARENTS[root];
    return root;
  }

  function depthFromRoot(dex) {
    let depth = 0;
    while (PARENTS[dex]) { dex = PARENTS[dex]; depth++; }
    return depth;
  }

  function maxDepth(dex) {
    const children = CHILDREN[dex] || [];
    return children.length ? 1 + Math.max(...children.map(maxDepth)) : 0;
  }

  function evolutionLevel(dex) {
    const root = rootOf(dex);
    const phases = maxDepth(root);
    return phases >= 2 ? (depthFromRoot(dex) === 0 ? 15 : 30) : 20;
  }

  function isBase(dex) {
    return Number.isInteger(dex) && dex >= 1 && dex <= 151 &&
      !Object.prototype.hasOwnProperty.call(PARENTS, dex);
  }

  function isStoryStarter(dex) {
    const number = Number(dex);
    return Number.isInteger(number) && STORY_STARTERS.has(number);
  }

  function next(dex, level) {
    const to = LEVEL_TO[dex];
    const required = to ? evolutionLevel(dex) : null;
    return to && level >= required ? { from: dex, to, level: required } : null;
  }

  function hasEvolution(dex) {
    let current = dex;
    while (LEVEL_TO[current]) {
      current = LEVEL_TO[current];
      if (current === dex) return false;
    }
    return current !== dex;
  }

  function nextLevel(dex) {
    return LEVEL_TO[dex] ? evolutionLevel(dex) : null;
  }

  return { isBase, isStoryStarter, next, hasEvolution, nextLevel };
})();
