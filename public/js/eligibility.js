document.addEventListener('DOMContentLoaded', () => {
    const eligibilityForm = document.getElementById('eligibility-form');
    if (!eligibilityForm) return;

    const monthlyIncomeInput = document.getElementById('monthly-income');
    const creditScoreInput = document.getElementById('credit-score');

    // Add input validation
    monthlyIncomeInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value < 0) e.target.value = 0;
    });

    creditScoreInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value < 300) e.target.value = 300;
        if (value > 900) e.target.value = 900;
    });

    eligibilityForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const monthlyIncome = parseInt(monthlyIncomeInput.value);
        const creditScore = parseInt(creditScoreInput.value);

        // Validate inputs
        if (!monthlyIncome || monthlyIncome < 0) {
            alert('Please enter a valid monthly income');
            return;
        }

        if (!creditScore || creditScore < 300 || creditScore > 900) {
            alert('Please enter a valid credit score (300-900)');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/check-eligibility`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ monthlyIncome, creditScore })
            });

            if (!response.ok) {
                throw new Error('Failed to check eligibility');
            }

            const result = await response.json();

            // Show result
            const resultDiv = document.getElementById('eligibility-result');
            if (!resultDiv) return;

            if (result.eligible) {
                resultDiv.innerHTML = `
                    <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p class="text-green-700 dark:text-green-300 font-medium">
                            Congratulations! You are eligible for premium credit cards.
                        </p>
                        <p class="text-sm text-green-600 dark:text-green-400 mt-2">
                            Based on your monthly income of ${formatCurrency(monthlyIncome)} and credit score of ${creditScore}.
                        </p>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <p class="text-red-700 dark:text-red-300 font-medium">
                            Sorry, you don't meet the eligibility criteria for premium cards.
                        </p>
                        <p class="text-sm text-red-600 dark:text-red-400 mt-2">
                            Consider applying for basic cards or improving your credit score.
                            Current monthly income: ${formatCurrency(monthlyIncome)}, Credit score: ${creditScore}
                        </p>
                    </div>
                `;
            }
        } catch (error) {
            handleApiError(error);
        }
    });
}); 