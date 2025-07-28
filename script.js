// Toggle dark/light mode
function toggleMode() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
}

window.onload = () => {
  document.body.classList.add("dark-mode");
};

// Tip percentages mapped to service rating (1–10)
const tipPercentMap = {
  1: 2, 2: 5, 3: 8, 4: 10, 5: 12,
  6: 14, 7: 15, 8: 18, 9: 20, 10: 25
};

// Extract input values
const serviceRating = document.getElementById("serviceRating");
const tipPercentageDisplay = document.getElementById("tipPercentage");
const recalcBtn = document.querySelector(".recalculate-btn");

// Show tip percentage when a valid rating is selected
serviceRating.addEventListener("change", () => {
  const ratingValue = parseInt(serviceRating.value);
  if (ratingValue >= 1 && ratingValue <= 10) {
    tipPercentageDisplay.textContent = `${tipPercentMap[ratingValue]}%`;
    tipPercentageDisplay.parentElement.style.display = "block";
  } else {
    tipPercentageDisplay.parentElement.style.display = "none";
  }
});

// Validate input fields
function validateFields() {
  const bill = parseFloat(document.getElementById("billAmount").value);
  const rating = parseInt(document.getElementById("serviceRating").value);
  const people = parseInt(document.getElementById("people").value);
 
  if (
    isNaN(bill) ||
    isNaN(rating) || !tipPercentMap[rating] ||
    isNaN(people)
  ) {
    alert("Please enter all valid fields first.");
    return {};
  }

  if( bill <= 0 || people < 1){
    alert("Please enter valid input");
    return {};
  }
  return { bill, rating, people };
}

// Calculate base tip and total
function calculateTip() {
  const { bill, rating, people } = validateFields();
  if (!bill) return;

  const tip = (bill * tipPercentMap[rating]) / 100;
  const total = bill + tip;

  document.getElementById("tipAmount").textContent = `₹ ${(tip / people).toFixed(2)}`;
  document.getElementById("totalTip").textContent = `₹ ${tip.toFixed(2)}`;
  document.getElementById("totalAmount").textContent = `₹ ${(total / people).toFixed(2)}`;
  document.getElementById("totalBill").textContent = `₹ ${total.toFixed(2)}`;
  document.getElementById("extraTipCheckbox").disabled = false;

  removeConfirmationMessage();
}

// Show or hide extra tip input and lock fields
function toggleExtraTipBox() {
  const checkbox = document.getElementById("extraTipCheckbox");
  const extraInputs = document.getElementById("extraTipInputs");
  extraInputs.style.display = checkbox.checked ? "block" : "none";

  ["billAmount", "serviceRating", "people"].forEach(id => {
    document.getElementById(id).disabled = checkbox.checked;
  });

  removeConfirmationMessage();
}

// Update per-person extra tip
function handleExtraTipInput() {
  const extraTip = parseFloat(document.getElementById("extraTipAmount").value) || 0;
  const people = parseInt(document.getElementById("people").value);

  const perPersonExtra = extraTip / people;
  document.getElementById("extraTipPerPerson").textContent = `₹ ${perPersonExtra.toFixed(2)}`;

  ["totalAmount", "totalBill"].forEach(id => {
    document.getElementById(id).textContent = "₹ 0.00";
  });

  if (recalcBtn) recalcBtn.disabled = false;

  removeConfirmationMessage();
}

// Recalculate with supplemental tip
function recalculateWithExtraTip() {
  const { bill, rating, people } = validateFields();
  if (!bill) return;

  const extraTip = parseFloat(document.getElementById("extraTipAmount").value) || 0;
  const baseTip = (bill * tipPercentMap[rating]) / 100;
  const totalTip = baseTip + extraTip;
  const total = bill + totalTip;

  document.getElementById("tipAmount").textContent = `₹ ${(totalTip / people).toFixed(2)}`;
  document.getElementById("totalTip").textContent = `₹ ${totalTip.toFixed(2)}`;
  document.getElementById("totalAmount").textContent = `₹ ${(total / people).toFixed(2)}`;
  document.getElementById("totalBill").textContent = `₹ ${total.toFixed(2)}`;

  removeConfirmationMessage();

  const msg = document.createElement("p");
  msg.textContent = "Bill updated to include supplemental tip.";
  msg.className = "confirmation-message";
  document.querySelector(".results").appendChild(msg);

  document.getElementById("extraTipInputs").style.display = "none";
  document.getElementById("extraTipCheckbox").checked = false;
  if (recalcBtn) recalcBtn.disabled = true;
}

// 🧹 Remove confirmation message
function removeConfirmationMessage() {
  const msg = document.querySelector(".confirmation-message");
  if (msg) msg.remove();
}

// Reset entire calculator
function resetCalculator() {
  ["billAmount", "serviceRating", "people", "extraTipAmount"].forEach(id => {
    const el = document.getElementById(id);
    el.value = "";
    el.disabled = false; // Re-enable input fields
  });

  ["tipAmount", "totalTip","totalAmount", "totalBill", "extraTipPerPerson"].forEach(id => {
    document.getElementById(id).textContent = "₹ 0.00";
  });

  // 🔄 Re-hide tip percentage
  tipPercentageDisplay.textContent = "—";
  tipPercentageDisplay.parentElement.style.display = "none";

  recalcBtn.disabled = true;
  document.getElementById("extraTipCheckbox").disabled = true;
  document.getElementById("extraTipCheckbox").checked = false;
  document.getElementById("extraTipInputs").style.display = "none";

  removeConfirmationMessage();
}
