// Function to calculate the total sum of expenses
const TotalSum = (expenses) => {
    let sum = 0;
    expenses.forEach(element => {
        sum += element.amount;
    });
    return sum;
}

// React component to display the total sum of expenses
const ExpenseSum = ({ expenses }) => {
    return (
        <p className="text-muted">{'Total Sum: ' + TotalSum(expenses)}</p>
    );
}

export default ExpenseSum;
