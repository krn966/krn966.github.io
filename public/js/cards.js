// Card data (expand as needed)
const cards = [
  {
    bank: 'ICICI',
    name: 'ICICI Sapphiro',
    category: 'Travel',
    fee: 3500,
    feeLabel: '₹3,500',
    rewards: [
      '2X rewards on international spends',
      'Comprehensive travel insurance'
    ],
    link: 'ICICI_Sapphiro_CC.html',
    sort: 'Newest',
  },
  {
    bank: 'SBI',
    name: 'SBI Elite',
    category: 'Travel',
    fee: 4999,
    feeLabel: '₹4,999',
    rewards: [
      '5X rewards on dining & groceries',
      'International lounge access'
    ],
    link: 'SBI_Elite_CC.html',
    sort: 'Newest',
  },
  // Add more cards here
];

// Filter elements
const categoryFilter = document.getElementById('category-filter');
const feeFilter = document.getElementById('fee-filter');
const bankFilter = document.getElementById('bank-filter');
const sortFilter = document.getElementById('sort-filter');
const cardsGrid = document.querySelector('.grid.grid-cols-1.md\:grid-cols-2.lg\:grid-cols-3');

function filterCards() {
  let filtered = [...cards];

  // Category
  const category = categoryFilter.value;
  if (category !== 'All Categories') {
    filtered = filtered.filter(card => card.category === category);
  }

  // Fee
  const fee = feeFilter.value;
  if (fee === 'Free') {
    filtered = filtered.filter(card => card.fee === 0);
  } else if (fee === 'Under ₹1,000') {
    filtered = filtered.filter(card => card.fee > 0 && card.fee < 1000);
  } else if (fee === 'Under ₹5,000') {
    filtered = filtered.filter(card => card.fee < 5000);
  } else if (fee === 'Above ₹5,000') {
    filtered = filtered.filter(card => card.fee > 5000);
  }

  // Bank
  const bank = bankFilter.value;
  if (bank !== 'All Banks') {
    filtered = filtered.filter(card => card.bank === bank);
  }

  // Sort
  const sort = sortFilter.value;
  if (sort === 'Lowest Fee') {
    filtered.sort((a, b) => a.fee - b.fee);
  } else if (sort === 'Highest Rewards') {
    // Placeholder: sort by fee descending (replace with actual rewards logic)
    filtered.sort((a, b) => b.fee - a.fee);
  } else if (sort === 'Newest') {
    // Already sorted as newest in data
  } // else Most Popular: keep as is

  renderCards(filtered);
}

function renderCards(cardsToShow) {
  cardsGrid.innerHTML = '';
  if (cardsToShow.length === 0) {
    cardsGrid.innerHTML = '<div class="col-span-3 text-center text-gray-500 dark:text-gray-400 py-12">No cards match your filters.</div>';
    return;
  }
  cardsToShow.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition duration-300';
    cardDiv.innerHTML = `
      <div class="p-6">
        <div class="flex items-center mb-4">
          <div class="h-8 w-24 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">${card.bank}</div>
          <h3 class="text-xl font-semibold ml-4">${card.name}</h3>
        </div>
        <div class="space-y-4">
          ${card.rewards.map(r => `<div class="flex items-center"><span class="mr-2">💲</span><span>${r}</span></div>`).join('')}
        </div>
        <div class="mt-6 flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">Annual Fee: ${card.feeLabel}</span>
          <a href="${card.link}" class="text-primary-600 hover:text-primary-700">View Details →</a>
        </div>
      </div>
    `;
    cardsGrid.appendChild(cardDiv);
  });
}

// Event listeners
categoryFilter.addEventListener('change', filterCards);
feeFilter.addEventListener('change', filterCards);
bankFilter.addEventListener('change', filterCards);
sortFilter.addEventListener('change', filterCards);

document.addEventListener('DOMContentLoaded', () => {
  filterCards(); // Initial render
}); 