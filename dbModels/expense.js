import {  getDbInstance } from "../service/storageIndexDB.js";


class ExpenseModel {

    static #handleTransaction(transaction){
        return new Promise((resolve,reject)=>{
            transaction.oncomplete=(event) => resolve(event.target.result)
            transaction.onerror= () => {
                console.error("Transaction error:", transaction.error)
                reject(transaction.error)
            }
        })
    }
    static #handleRequest(request){
        return new Promise((resolve,reject)=>{
            request.onsuccess=(event) => resolve(event.target.result)
            request.onerror= () => {
                console.error("Transaction error:", transaction.error)
                reject(transaction.error)
            }
        })
    }

    static #createRequest(mode){
        const db = getDbInstance()
        const transaction=db.transaction(["expenses"], mode)
        const objectStore= transaction.objectStore("expenses")
        return {transaction,objectStore}
    }
    
    static deleteExpense(expenseId){
       const {transaction,objectStore} = this.#createRequest("readwrite")
       objectStore.delete(expenseId)
        return this.#handleTransaction(transaction)
    }

    
    static addBulkExpenses(expenses){
        const {transaction,objectStore} = this.#createRequest("readwrite")
        expenses.forEach(element => {
            objectStore.add(element);
        });
        return this.#handleTransaction(transaction)
    }

    static addExpense(expense){
        const {transaction,objectStore} = this.#createRequest("readwrite")
        objectStore.add(expense);
        return this.#handleTransaction(transaction)
    }
    static getExpense(expenseId){
        const {transaction,objectStore} = this.#createRequest("readonly")
        objectStore.get(expenseId)
        return this.#handleTransaction(transaction)
    }
    static async updateExpense(expenseId,updateObj){
        const {transaction,objectStore} = this.#createRequest("readwrite")
        const request =objectStore.get(expenseId)
        try {
            const data =await this.#handleRequest(request)
            
            const keys = Object.keys(updateObj)
            for(const key of keys){
                if(key === "category") data[key].name = updateObj[key]
                else data[key] = updateObj[key]
            }
            objectStore.put(data)
            return this.#handleTransaction(transaction)
        } catch (error) {
            
        }

        
    }

    
}
export default ExpenseModel