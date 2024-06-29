// Function to calculate the total sum of expenses
const TotalSum = (expenses) => {
  let sum = 0;
  expenses.forEach((element) => {
    sum += element.amount;
  });
  return sum;
};

// React component to display the total sum of expenses
const ExpenseSum = ({ expenses, date }) => {
  return (
    <>
        <div style={{display:'flex'}}>
        <p
          className="text-muted"
          style={{ alignContent: "center", margin: "0",padding:'0 30px 0 0' }}
        >
          {date}
        </p>{" "}
        <p
          className="text-muted"
          style={{ alignContent: "center", margin: "0" }}
        >
          {"Total Sum: " + TotalSum(expenses)}
        </p>
        </div>
        </>
  );
};

export default ExpenseSum;
