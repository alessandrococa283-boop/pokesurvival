/* ============ acquisition.js — balance configurable de obtención ============ */
G.Acquisition = {
  gacha: {
    costs: {
      single: { t1: 1, coins: 500 },
      ten: { t1: 10, coins: 4000 }
    },
    rates: [[1, 65], [2, 23], [3, 9], [4, 2.5], [5, 0.5]],
    pityFive: 70,
    tenGuaranteeRarity: 4,
    shinyRate: 1 / 100,
    duplicateRefund: { 1: 15, 2: 30, 3: 60, 4: 120, 5: 300 },
    shinyDuplicateMultiplier: 3
  },
  babyGacha: {
    cost: { t10: 1, coins: 700 },
    rates: [[1, 50], [2, 25], [3, 15], [4, 8], [5, 2]],
    duplicateCoins: { 1: 100, 2: 200, 3: 350, 4: 600, 5: 1000 }
  },
  tickets: {
    unitsPerBundle: 10,
    normalEnemyChance: 1 / 400,
    normalEnemyAmount: 1,
    bossBundleChance: 1 / 8,
    bossBundleAmount: 1,
    riftLegendBundleChance: 1 / 4,
    riftLegendBundleAmount: 1,
    riftLegendTickets: 1,
    riftLegendTicketAmount: 1,
    bigChestTickets: [1, 2],
    bigChestBundleChance: 0.05,
    bigChestBundleAmount: 1,
    lostPokemonTicketChance: 0.5,
    lostPokemonTicketAmount: 1,
    treasureBundleChance: 1 / 8,
    treasureBundleAmount: 1
  },
  rewardMultipliers: {
    missionTickets: 0.5,
    achievementTickets: 0.5
  }
};
