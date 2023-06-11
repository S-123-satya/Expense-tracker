// Check if there are any expenses in local storage and load them
let expenses = localStorage.getItem('expenses');
expenses = expenses ? JSON.parse(expenses) : [];

// Function to render the expense lists
function renderExpenses() {
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const { expenseAmount, description, category } = expense;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>${expenseAmount}</span>
      <span>${description}</span>
      <span>${category}</span>
      <div>
        <button class="btn btn-danger btn-sm mr-2" onclick="deleteExpense(${index})">Delete</button>
        <button class="btn btn-secondary btn-sm" onclick="editExpense(${index})">Edit</button>
      </div>
    `;

    expenseList.appendChild(li);
  });
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

// Function to edit an expense
function editExpense(index) {
  const expense = expenses[index];
  const expenseInput = document.getElementById('expenseInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const categoryInput = document.getElementById('categoryInput');

  expenseInput.value = expense.expenseAmount;
  descriptionInput.value = expense.description;
  categoryInput.value = expense.category;

  deleteExpense(index);
}

// Event listener for form submission
document.getElementById('expenseForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const expenseInput = document.getElementById('expenseInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const categoryInput = document.getElementById('categoryInput');

  const expenseAmount = parseFloat(expenseInput.value);
  const description = descriptionInput.value;
  const category = categoryInput.value;

  // Add the expense to the list
  expenses.push({ expenseAmount, description, category });
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Clear the form inputs
  expenseInput.value = '';
  descriptionInput.value = '';
  categoryInput.value = '';

  // Render the updated expense list
  renderExpenses();
});

// Initial rendering of the expense list
renderExpenses();
