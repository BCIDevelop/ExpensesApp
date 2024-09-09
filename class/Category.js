class Category{
    static categories = ["Food","Travel","Entertainment","Education","Transport"]
    constructor(name){
        if(!Category.categories.includes(name)) this.name = "None"
        else this.name = name
    }
    static listCatgories(){
        return this.categories
    }
    addCategory(category){
        Category.categories.push(category)
    }
}
export default Category