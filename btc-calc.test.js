import { calculateSales } from "./btc-calc";

describe("BTC Sale Calculator", () => {
  test("calculates a linear sale correctly", () => {
    const result = calculateSales({
      desiredBtcToSell: 5,
      btcToSell: 1,
      startingPrice: 10000,
      priceIncrement: 1000,
      scenarioTop: 15000,
      percentageAdjustment: 0,
    });

    expect(result.totalCash).toBeCloseTo(45000);
    expect(result.remainingBtc).toBeCloseTo(0);
  });

  test("calculates a progressive sale with a 10% increase", () => {
    const result = calculateSales({
      desiredBtcToSell: 5,
      btcToSell: 1,
      startingPrice: 10000,
      priceIncrement: 1000,
      scenarioTop: 20000,
      percentageAdjustment: 10,
    });

    // Expect progressively increasing sales
    expect(result.saleRounds[0].btcForThisSale).toBeCloseTo(1);
    expect(result.saleRounds[1].btcForThisSale).toBeCloseTo(1.1);
    expect(result.saleRounds[2].btcForThisSale).toBeCloseTo(1.21);
    expect(result.totalCash).toBeGreaterThan(45000);
    expect(result.remainingBtc).toBeCloseTo(0, 1);
  });

  test("calculates a degressive sale with a -10% decrease", () => {
    const result = calculateSales({
      desiredBtcToSell: 5,
      btcToSell: 1,
      startingPrice: 10000,
      priceIncrement: 1000,
      scenarioTop: 20000,
      percentageAdjustment: -10,
    });

    // Expect degressively decreasing sales
    expect(result.saleRounds[0].btcForThisSale).toBeCloseTo(1);
    expect(result.saleRounds[1].btcForThisSale).toBeCloseTo(0.9);
    expect(result.saleRounds[2].btcForThisSale).toBeCloseTo(0.81);
    expect(result.totalCash).toBeLessThan(45000);
    expect(result.remainingBtc).toBeCloseTo(0, 1);
  });
});
