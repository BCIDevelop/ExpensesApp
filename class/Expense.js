import formatDate from "../utils/formatDate.js";
import Category from "./Category.js";
class Expense{
    constructor(amount,description,title,date=formatDate(new Date(),title),category="None"){
        this.amount = amount
        this.description = description
        this.date = date
        this.category =new Category(category)
        this.id = crypto.randomUUID()
        this.title = title
    }

}
export default Expense