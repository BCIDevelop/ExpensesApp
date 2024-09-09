import { getList } from "../service/storage.js"

const filterByDate= function(start,end,category){
    const expenses = getList('expenses')
    return expenses.filter(element=>{
        const [dia,mes,año] = element.date.split('-')
        const dateConverted = `${mes}-${dia}-${año}`
        const expenseDate = new Date(dateConverted)
  
        if(category) return element.category.name===category && expenseDate <= end && expenseDate>= start 
        return expenseDate <= end && expenseDate>= start 
    })
}
export default filterByDate