document.addEventListener('DOMContentLoaded', async () => {
    const cardSelects = document.querySelectorAll('.card-select');
    const comparisonTable = document.getElementById('comparison-table');
    const compareButton = document.getElementById('compare-button');

    if (!comparisonTable || !compareButton) return;

    // Fetch available cards
    try {
        const response = await fetch(`${API_BASE_URL}/cards`);
        if (!response.ok) {
            throw new Error('Failed to fetch cards');
        }
        const cards = await response.json();
        
        // Populate select options
        cardSelects.forEach(select => {
            Object.entries(cards).forEach(([id, card]) => {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = `${card.bank} ${card.name}`;
                select.appendChild(option);
            });
        });
    } catch (error) {
        handleApiError(error);
    }

    // Handle comparison
    compareButton.addEventListener('click', async () => {
        const selectedCards = Array.from(cardSelects)
            .map(select => select.value)
            .filter(value => value !== '');

        if (selectedCards.length < 2) {
            alert('Please select at least 2 cards to compare');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/compare`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cardIds: selectedCards })
            });

            if (!response.ok) {
                throw new Error('Failed to compare cards');
            }

            const cards = await response.json();
            if (!Array.isArray(cards) || cards.length === 0) {
                throw new Error('Invalid comparison data received');
            }

            updateComparisonTable(cards);
        } catch (error) {
            handleApiError(error);
        }
    });

    function updateComparisonTable(cards) {
        if (!cards || !Array.isArray(cards)) {
            console.error('Invalid cards data');
            return;
        }

        // Clear existing content
        comparisonTable.innerHTML = '';

        // Create header row
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Feature</th>
            ${cards.map(card => `
                <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ${card.bank} ${card.name}
                </th>
            `).join('')}
        `;
        comparisonTable.appendChild(headerRow);

        // Add rows for each feature
        const features = [
            { name: 'Annual Fee', getValue: card => formatCurrency(card.annualFee) },
            { name: 'Welcome Benefits', getValue: card => `Fee reversal: ${formatCurrency(card.welcomeBenefits.feeReversal.amount)}` },
            { name: 'Reward Rate', getValue: card => {
                const rates = [];
                if (card.rewardRate.domestic) rates.push(`${card.rewardRate.domestic}X domestic`);
                if (card.rewardRate.international) rates.push(`${card.rewardRate.international}X international`);
                if (card.rewardRate.dining) rates.push(`${card.rewardRate.dining}X dining`);
                return rates.join(', ') || 'N/A';
            }},
            { name: 'Lounge Access', getValue: card => card.additionalBenefits?.loungeAccess || card.travelBenefits?.loungeAccess || 'N/A' },
            { name: 'Travel Insurance', getValue: card => {
                const insurance = card.insurance || card.travelBenefits;
                return insurance?.airAccident ? `Air accident: ${formatCurrency(insurance.airAccident)}` : 'N/A';
            }}
        ];

        features.forEach(feature => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    ${feature.name}
                </td>
                ${cards.map(card => `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        ${feature.getValue(card)}
                    </td>
                `).join('')}
            `;
            comparisonTable.appendChild(row);
        });
    }
}); 