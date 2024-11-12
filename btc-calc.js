import { closePopup } from "./popup.js";

// Function to update the explanation text based on the percentage value
function updatePercentageExplanation() {
  const percentageAdjustmentField = document.getElementById("incrementPercent");
  const percentageExplanation = document.getElementById(
    "percentageExplanation"
  );
  const value = parseFloat(percentageAdjustmentField.value);

  if (!isNaN(value)) {
    if (value > 0) {
      percentageExplanation.textContent = `This will test selling off a ${value}% bigger amount of BTC with each next sale event. To test degressive selling, input a negative value. i.e., -10`;
    } else if (value < 0) {
      percentageExplanation.textContent = `This will test selling off a ${Math.abs(
        value
      )}% smaller amount of BTC with each next sale event.`;
    } else {
      percentageExplanation.textContent = "No adjustment for linear selling.";
    }
  } else {
    percentageExplanation.textContent = "";
  }
}

// Function to calculate the sales strategy
export function calculateSales({
  desiredBtcToSell,
  btcToSell,
  startingPrice,
  priceIncrement,
  scenarioTop,
  percentageAdjustment,
}) {
  let remainingBtc = desiredBtcToSell;
  let currentPrice = startingPrice;
  let totalCash = 0;
  let currentBtcToSell = btcToSell;
  let saleRounds = [];

  while (remainingBtc > 0 && currentPrice <= scenarioTop) {
    let btcForThisSale = Math.min(currentBtcToSell, remainingBtc);
    let saleAmount = btcForThisSale * currentPrice;

    totalCash += saleAmount;
    saleRounds.push({ btcForThisSale, saleAmount, currentPrice });

    remainingBtc -= btcForThisSale;
    currentPrice += priceIncrement;

    // Adjust the next BTC amount if there's a percentage adjustment
    if (!isNaN(percentageAdjustment)) {
      currentBtcToSell *= 1 + percentageAdjustment / 100;
    }
  }

  return { totalCash, remainingBtc, saleRounds };
}

function handleCalculateClick() {
  const desiredBtcToSell = parseFloat(
    document.getElementById("desiredBtcToSell").value
  );
  const btcToSell = parseFloat(document.getElementById("btcToSell").value);
  const startingPrice = parseFloat(
    document.getElementById("startingPrice").value
  );
  const priceIncrement = parseFloat(
    document.getElementById("priceIncrement").value
  );
  const scenarioTop = parseFloat(document.getElementById("scenarioTop").value);
  const percentageAdjustment = parseFloat(
    document.getElementById("incrementPercent").value
  );

  if (
    isNaN(desiredBtcToSell) ||
    isNaN(btcToSell) ||
    isNaN(startingPrice) ||
    isNaN(priceIncrement) ||
    isNaN(scenarioTop) ||
    btcToSell <= 0 ||
    priceIncrement <= 0
  ) {
    alert("Please enter valid values for all fields.");
    return;
  }

  const result = calculateSales({
    desiredBtcToSell,
    btcToSell,
    startingPrice,
    priceIncrement,
    scenarioTop,
    percentageAdjustment,
  });

  // Display the results in the popup
  document.getElementById("resultsText").innerHTML = formatResults(result);
  document.getElementById("popupContainer").style.display = "flex";
}

function formatResults({ totalCash, remainingBtc, saleRounds }) {
  let salesPlan = saleRounds
    .map(
      (round, index) =>
        `Round ${index + 1}: Sell ${round.btcForThisSale.toFixed(
          4
        )} BTC at $${round.currentPrice.toFixed(
          2
        )} generating $${round.saleAmount.toFixed(2)} in revenue.<br>`
    )
    .join("");

  salesPlan += `<br>Total cash from sales: $${totalCash.toFixed(2)}<br>`;
  salesPlan += `Remaining BTC: ${remainingBtc.toFixed(4)} BTC<br>`;

  return salesPlan;
}

// Event listeners
document
  .getElementById("calculateButton")
  .addEventListener("click", handleCalculateClick);
document
  .getElementById("incrementPercent")
  .addEventListener("input", updatePercentageExplanation);
document
  .getElementById("closePopupButton")
  .addEventListener("click", closePopup);

document
  .getElementById("advancedToggleButton")
  .addEventListener("click", () => {
    const advancedSection = document.getElementById("advancedSection");
    advancedSection.style.display =
      advancedSection.style.display === "none" ? "block" : "none";
  });

document.getElementById("disclaimerToggle").addEventListener("click", () => {
  const disclaimerContent = document.getElementById("disclaimerContent");
  disclaimerContent.style.display =
    disclaimerContent.style.display === "none" ? "block" : "none";
});
