let accountBalance = document.getElementById('account-balance');

function toggleSection(section) {
  const donationSection = document.getElementById('donationSection');
  const historySection = document.getElementById('historySection');
  const donationBtn = document.getElementById('donationBtn');
  const historyBtn = document.getElementById('historyBtn');

  if (section === 'donation') {
    donationSection.classList.remove('hidden');
    historySection.classList.add('hidden');
    donationBtn.classList.add('text-white');
    historyBtn.classList.remove('text-white');
  } else {
    donationSection.classList.add('hidden');
    historySection.classList.remove('hidden');
    donationBtn.classList.remove('text-white');
    historyBtn.classList.add('text-white');
  }
}

function donate(charityNumber) {
  const donationAmount = parseFloat(document.getElementById(`donationAmount${charityNumber}`).value);
  const charityAmount = document.getElementById(`charity${charityNumber}Amount`);
  
  // Validation
  if (isNaN(donationAmount) || donationAmount <= 0) {
    alert('Invalid donation amount.');
    return;
  }

  if (donationAmount > accountBalance) {
    alert('Donation exceeds your current balance.');
    return;
  }

  // Deduct from balance
  accountBalance -= donationAmount;
  document.getElementById('accountBalance').innerText = accountBalance;

  // Update charity's donation amount
  charityAmount.innerText = parseFloat(charityAmount.innerText) + donationAmount;

  // Add to history
  const historyContent = document.getElementById('historyContent');
  const historyItem = document.createElement('p');
  historyItem.innerText = `Donated $${donationAmount} to Charity ${charityNumber} on ${new Date().toLocaleString()}`;
  historyContent.appendChild(historyItem);

  // Show success modal
  document.getElementById('successModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('successModal').classList.add('hidden');
}
