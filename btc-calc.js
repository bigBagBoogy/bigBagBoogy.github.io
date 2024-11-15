import { closePopup } from "./popup.js";

let isUSD = true;

function toggleCurrency() {
  // Toggle between USD and EUR
  isUSD = !isUSD;

  // Update the button text to show the opposite option
  document.getElementById("currencyToggleButton").textContent = isUSD
    ? "Switch to EUR"
    : "Switch to USD";

  // Update all instances of the currency label (e.g., USD to EUR)
  document.querySelectorAll(".currency-label").forEach((element) => {
    element.textContent = isUSD ? "USD" : "EUR"; // Switch between USD and EUR
  });

  // Refresh the results with the updated currency setting
  if (currentResults) {
    displayResults(currentResults); // Re-display results using the current currency format
  }
}

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

    if (!isNaN(percentageAdjustment)) {
      currentBtcToSell *= 1 + percentageAdjustment / 100;
    }
  }

  return { totalCash, remainingBtc, saleRounds };
}

// Store results for re-display
let currentResults = null;

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

  currentResults = calculateSales({
    desiredBtcToSell,
    btcToSell,
    startingPrice,
    priceIncrement,
    scenarioTop,
    percentageAdjustment,
  });

  displayResults(currentResults);
  document.getElementById("popupContainer").style.display = "flex";
}

function formatResults({ totalCash, remainingBtc, saleRounds }, currency) {
  const currencySymbol = currency === "USD" ? "$" : "€";

  let salesPlan = saleRounds
    .map(
      (round, index) =>
        `Round ${index + 1}: Sell ${round.btcForThisSale.toFixed(
          4
        )} BTC at ${currencySymbol}${round.currentPrice.toFixed(
          2
        )} generating ${currencySymbol}${round.saleAmount.toFixed(
          2
        )} in revenue.<br>`
    )
    .join("");

  salesPlan += `<br>Total cash from sales: ${currencySymbol}${totalCash.toFixed(
    2
  )}<br>`;
  salesPlan += `Remaining BTC: ${remainingBtc.toFixed(4)} BTC<br>`;

  return salesPlan;
}

function displayResults(results) {
  const currency = isUSD ? "USD" : "EUR";
  const formattedResults = formatResults(results, currency);
  document.getElementById("resultsText").innerHTML = formattedResults;
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

document
  .getElementById("toggleNegative")
  .addEventListener("click", function () {
    const inputField = document.getElementById("incrementPercent");
    const currentValue = parseFloat(inputField.value);

    if (!isNaN(currentValue)) {
      inputField.value =
        currentValue > 0 ? -Math.abs(currentValue) : Math.abs(currentValue);
    }
  });

document
  .getElementById("currencyToggleButton")
  .addEventListener("click", toggleCurrency);
