const TodayExpenses = ({mainObject}) => {
    const currentTime=new Date();
    const date=currentTime.toLocaleDateString();
    let count=0;
    let amount=0;
    if(mainObject.has(date)){
        const todayArray=mainObject.get(date);//todays array of expenses
        todayArray.forEach((curr)=>{
            count++;
            amount+=parseFloat(curr.amount);
        })
    }
    
    
    return (  
        <>
        {
            count!==0?<p className="text">{"Today's total Expense is "+amount+", with " +count +" transactions"}</p>: <p className="text">{"No Transactions Today. "}</p>
        }
        </>
    );
}
 
export default TodayExpenses;