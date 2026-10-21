/* ============ acquisition.js — balance configurable de obtención ============ */
G.Acquisition = {
  gacha: {
    costs: {
      single: { t1: 10, coins: 2000 },
      ten: { t1: 100, t10: 10, coins: 20000 }
    },
    rates: [[1, 65], [2, 23], [3, 9], [4, 2.5], [5, 0.5]],
    pityFive: 70,
    tenGuaranteeRarity: 4,
    shinyRate: 1 / 100,
    duplicateRefund: { 1: 15, 2: 30, 3: 60, 4: 120, 5: 300 },
    shinyDuplicateMultiplier: 3
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
