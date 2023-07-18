// const axios = require('axios');
// Check if there are any expenses in local storage and load them
let url='http://localhost:3000';
let expenses = localStorage.getItem('expenses');
expenses = expenses ? JSON.parse(expenses) : [];
const remeoveFromDisplay=(id)=>{
  const expenseList = document.getElementById('expenseList');
  let ele=document.getElementById(`id${id}`);
  console.log(id);
  console.log(ele);
  ele.innerHTML="";
  ele.parentNode.removeChild(ele);
}
const display=({ expenses, description, category,id })=>{
  const li = document.createElement('li');
    li.id=`id${id}`
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>${expenses}</span>
      <span>${description}</span>
      <span>${category}</span>
      <div>
        <button class="btn btn-danger btn-sm mr-2" onclick="deleteExpense(`+`${id}`+`)">Delete</button>
        <button class="btn btn-secondary btn-sm"  onclick="editExpense(${id})">Edit</button>
      </div>
    `;

    expenseList.appendChild(li);
}
// Function to render the expense lists
function renderExpenses() {
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = '';
  axios.get(`${url}/expense`)
    .then(result=>{
      console.log(result);
      result.data.forEach((expense) => {
        display(expense);
      });
    })
    .catch(err=>console.log(err));
}

// Function to delete an expense
function deleteExpense(id) {
  remeoveFromDisplay(id);

  axios.delete(`${url}/expense/${id}`)
  .then(result=>console.log(result))
  .catch(err=>console.log(err));
}

// Function to edit an expense
function editExpense(id) {
  axios.get(`${url}/expense/${id}`)
    .then(res=>{
      console.log(res.data[0]);
      const expense=res.data[0];
      const expenseInput = document.getElementById('expenseInput');
      const descriptionInput = document.getElementById('descriptionInput');
      const categoryInput = document.getElementById('categoryInput');
      expenseInput.value = expense.expenses;
      descriptionInput.value = expense.description;
      categoryInput.value = expense.category;
      deleteExpense(expense.id);
    })
    .catch(err=>console.log(err));

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

  const obj={
    expenses:expenseAmount,
    description:description,
    category:category
  }
  axios.post(`${url}/expense`,obj)
    .then(result=>{
      console.log(result.data);
      display(result.data);
    })
    .catch(err=>console.log(err));

  // Clear the form inputs
  expenseInput.value = '';
  descriptionInput.value = '';
  categoryInput.value = '';

  // Render the updated expense list
  // renderExpenses();
});

// Initial rendering of the expense list
renderExpenses();
