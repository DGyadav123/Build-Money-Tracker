document.addEventListener('DOMContentLoaded', () => {
    updateBalance();
    displayTransactions();
});

function addTransaction() {
    const amountInput = document.getElementById('amount');
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    const transactionType = amount >= 0 ? 'income' : 'expense';
    const transaction = { amount, type: transactionType, timestamp: new Date().toISOString() };

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    amountInput.value = '';
    updateBalance();
    displayTransactions();
}

function updateBalance() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
}

function displayTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const transactionElement = document.createElement('div');
        transactionElement.classList.add('transaction');
        transactionElement.classList.add(transaction.type);

        const amountElement = document.createElement('span');
        amountElement.textContent = `$${transaction.amount.toFixed(2)}`;

        const typeElement = document.createElement('span');
        typeElement.textContent = transaction.type === 'income' ? 'Income' : 'Expense';

        const timeElement = document.createElement('span');
        const transactionDate = new Date(transaction.timestamp);
        timeElement.textContent = `${transactionDate.toLocaleDateString()} ${transactionDate.toLocaleTimeString()}`;

        transactionElement.appendChild(amountElement);
        transactionElement.appendChild(typeElement);
        transactionElement.appendChild(timeElement);

        transactionList.appendChild(transactionElement);
    });
}
