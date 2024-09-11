import Expense from "./Expense.js";
import { addExpenses, getList } from "../service/storage.js";
import Category from "./Category.js";
import ExpenseModel from "../dbModels/expense.js";
class Tracker{
    constructor(expenses=[]){
        this.expenses= expenses
    }

    async addExpense(expenseObj){
        const {amount,date,title,description,category} = expenseObj
        const expense = new Expense(amount,description,title,date,category)
        this.expenses.push(expense)
        addExpenses('expenses',this.expenses)
        /* IndexDB implementation */
        await ExpenseModel.addExpense(expense)
    }

    calculateTotal(category,expenses = this.expenses){
        const total = expenses.reduce((acc,element)=>{
            if(!category)  acc += element.amount
            else if(element.category.name === category) {
                acc += element.amount
            }
            return acc
        },0)
        return total
    }
    
    async removeExpense(expenseId){
        this.expenses = this.expenses.filter(element=> element.id !== expenseId  )
        addExpenses('expenses',this.expenses)
        /* IndexDB implementation */
        await ExpenseModel.deleteExpense(expenseId)

    }

    async updateExpense(expenseId,updateObj){
        const index = this.expenses.findIndex(element => element.id === expenseId)
        const keys = Object.keys(updateObj)
        for( const key of keys){
            if(key === "category") this.expenses[index][key] = new Category(updateObj[key])
            else this.expenses[index][key] = updateObj[key]
        }
        addExpenses('expenses',this.expenses)
        /* IndexDB implementation */
        await ExpenseModel.updateExpense(expenseId,updateObj)
    }
    findExpense(expenseId){
        return this.expenses.find(element=> element.id === expenseId)
    }
}
export default Tracker