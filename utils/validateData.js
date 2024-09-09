import expenseModel from "../model/expenseModel.js"
const validateData= function(obj){
    const keys = Object.keys(obj)
    for (const key of keys) {
        if (!(key in expenseModel) || (typeof(expenseModel[key]) !== typeof(obj[key]))) return false;
    }
    return true
}
export default validateData