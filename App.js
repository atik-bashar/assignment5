let accountBalance = 5500;  
const historyContent = document.getElementById("historyContent"); 
const accountBalanceDisplay = document.getElementById("account-balance"); 

function toggleSection(showDonation) {
  const donationSection = document.getElementById("donationSection");
  const historySection = document.getElementById("historySection");
  const donationBtn = document.getElementById("donationBtn");
  const historyBtn = document.getElementById("historyBtn");

  if (showDonation) {
    donationSection.classList.remove("hidden");
    historySection.classList.add("hidden");
    donationBtn.classList.add("btn-primary");
    historyBtn.classList.remove("btn-primary");
  } else {
    donationSection.classList.add("hidden");
    historySection.classList.remove("hidden");
    donationBtn.classList.remove("btn-primary");
    historyBtn.classList.add("btn-primary");
  }
}

document.getElementById("donationBtn").addEventListener("click", () => toggleSection(true));
document.getElementById("historyBtn").addEventListener("click", () => toggleSection(false));

function processDonation(charityId, donationAmount) {
  const charityAmountId = `charity${charityId}Amount`;
  const charityAmountElement = document.getElementById(charityAmountId);
  const donationAmountValue = parseInt(donationAmount);

  const currentCharityAmount = parseInt(charityAmountElement.innerText.split(" ")[0]);
  charityAmountElement.innerText = `${currentCharityAmount + donationAmountValue} BDT`;

  accountBalance -= donationAmountValue;
  accountBalanceDisplay.innerText = `${accountBalance} BDT`;
}

function addToHistory(charityName, donationAmount) {
  const transaction = document.createElement("div");
  const date = new Date();
  transaction.classList.add("p-2", "mb-2", "bg-white", "rounded", "shadow");
  transaction.innerHTML = `
    <p><strong>Donation to:</strong> ${charityName}</p>
    <p><strong>Amount:</strong> ${donationAmount} BDT</p>
    <p><strong>Date:</strong> ${date.toLocaleString()}</p>
  `;
  historyContent.appendChild(transaction);
}

function donate(charityId) {
  let donationInput = document.getElementById(`donationAmount${charityId}`);
  let donationAmount = donationInput.value;

  if (isNaN(donationAmount) || donationAmount === "" || parseInt(donationAmount) <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }

  donationAmount = parseInt(donationAmount);
  
  if (donationAmount > accountBalance) {
    alert("Insufficient balance for this donation.");
    return;
  }

  processDonation(charityId, donationAmount);

  const charityName = document.querySelector(`#donationSection section:nth-child(${charityId}) .card-title`).innerText;

  addToHistory(charityName, donationAmount);
  
  showModal();
  
  donationInput.value = "";
}

function showModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("successModal");
  modal.classList.add("hidden");
}

document.getElementById("successModal").classList.add("hidden");

document.querySelector("#successModal button").addEventListener("click", closeModal);

