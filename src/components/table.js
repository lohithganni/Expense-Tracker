import ExpenseSum from "./expenseSum";
const Table = ({catArray,value}) => {
    return (  
        <>
        <table className="table">
        <thead>
          <tr>
            <th className="description">Description</th>
            <th style={{width:'100px | 10%'}}>Amount</th>
            <th style={{width:'100px | 10%'}}>Date </th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
        <tr>
                <td colSpan="5" ><ExpenseSum expenses={catArray} date={value}/></td>
              </tr>
              {catArray.slice().reverse().map((expense, index) => (
                <tr >
                  <td className="description" style={{alignContent:"center", justifyContent:'space-around'}}>{expense.description}</td>               
                  <td className="amount" style={{alignContent:"center"}}>{expense.amount}</td>
                  <td style={{alignContent:"center"}}>{expense.date}</td>
                  <td style={{alignContent:"center"}}>{expense.time}</td>
                </tr>
                
              ))}
         
        </tbody>
        </table>
        </>
    );
}
 
export default Table;