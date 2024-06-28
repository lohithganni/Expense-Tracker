const Table = ({catArray}) => {
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
              {catArray.slice().reverse().map((expense, index) => (
                <tr key={`${index}`}>
                  <td className="description" style={{alignContent:"center", justifyContent:'space-around'}}>{expense.description}</td>               
                  <td style={{alignContent:"center", justifyContent:'space-around'}}>{expense.amount}</td>
                  <td style={{alignContent:"center", justifyContent:'space-around'}}>{expense.date}</td>
                  <td style={{alignContent:"center", justifyContent:'space-around'}}>{expense.time}</td>
                  
                </tr>
              ))}
         
        </tbody>
        </table>
        </>
    );
}
 
export default Table;