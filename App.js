// let accountBalance = document.getElementById('account-balance');

// function toggleSection(section) {
//   const donationSection = document.getElementById('donationSection');
//   const historySection = document.getElementById('historySection');
//   const donationBtn = document.getElementById('donationBtn');
//   const historyBtn = document.getElementById('historyBtn');

//   if (section === 'donation') {
//     donationSection.classList.remove('hidden');
//     historySection.classList.add('hidden');
//     donationBtn.classList.add('text-white');
//     historyBtn.classList.remove('text-white');
//   } else {
//     donationSection.classList.add('hidden');
//     historySection.classList.remove('hidden');
//     donationBtn.classList.remove('text-white');
//     historyBtn.classList.add('text-white');
//   }
// }

// function donate(charityNumber) {
//   const donationAmount = parseFloat(document.getElementById(`donationAmount${charityNumber}`).value);
//   const charityAmount = document.getElementById(`charity${charityNumber}Amount`);
  
//   // Validation
//   if (isNaN(donationAmount) || donationAmount <= 0) {
//     alert('Invalid donation amount.');
//     return;
//   }

//   if (donationAmount > accountBalance) {
//     alert('Donation exceeds your current balance.');
//     return;
//   }

//   // Deduct from balance
//   accountBalance -= donationAmount;
//   document.getElementById('accountBalance').innerText = accountBalance;

//   // Update charity's donation amount
//   charityAmount.innerText = parseFloat(charityAmount.innerText) + donationAmount;

//   // Add to history
//   const historyContent = document.getElementById('historyContent');
//   const historyItem = document.createElement('p');
//   historyItem.innerText = `Donated $${donationAmount} to Charity ${charityNumber} on ${new Date().toLocaleString()}`;
//   historyContent.appendChild(historyItem);

//   // Show success modal
//   document.getElementById('successModal').classList.remove('hidden');
// }

// function closeModal() {
//   document.getElementById('successModal').classList.add('hidden');
// }



// new criteria

// Global Variables
let accountBalance = 5500;  // Initial account balance
const historyContent = document.getElementById("historyContent"); // History section content
const accountBalanceDisplay = document.getElementById("account-balance"); // Display for current balance

// Common function to toggle between Donation and History sections
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

// Initialize with Donation section visible
document.getElementById("donationBtn").addEventListener("click", () => toggleSection(true));
document.getElementById("historyBtn").addEventListener("click", () => toggleSection(false));

// Reusable function to update donation amounts and balance
function processDonation(charityId, donationAmount) {
  const charityAmountId = `charity${charityId}Amount`;
  const charityAmountElement = document.getElementById(charityAmountId);
  const donationAmountValue = parseInt(donationAmount);

  // Update donation amount for the selected charity
  const currentCharityAmount = parseInt(charityAmountElement.innerText.split(" ")[0]);
  charityAmountElement.innerText = `${currentCharityAmount + donationAmountValue} BDT`;

  // Deduct from account balance and update display
  accountBalance -= donationAmountValue;
  accountBalanceDisplay.innerText = `${accountBalance} BDT`;
}

// Reusable function to add a transaction to the history
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

// Function to handle donation for a specific charity
function donate(charityId) {
  let donationInput = document.getElementById(`donationAmount${charityId}`);
  let donationAmount = donationInput.value;

  // Input validation
  if (isNaN(donationAmount) || donationAmount === "" || parseInt(donationAmount) <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }

  donationAmount = parseInt(donationAmount);
  
  if (donationAmount > accountBalance) {
    alert("Insufficient balance for this donation.");
    return;
  }

  // Process the donation
  processDonation(charityId, donationAmount);

  // Get the charity name
  const charityName = document.querySelector(`#donationSection section:nth-child(${charityId}) .card-title`).innerText;

  // Add transaction to history
  addToHistory(charityName, donationAmount);

  // Show success modal
  showModal();
  
  // Clear the input field after a successful donation
  donationInput.value = "";
}

// Modal handling
function showModal() {
  const modal = document.getElementById("successModal");
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("successModal");
  modal.classList.add("hidden");
}

// Initially hide the success modal
document.getElementById("successModal").classList.add("hidden");
