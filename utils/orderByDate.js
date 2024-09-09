const orderByDate = function(array){
    const ordered= array.sort((a,b)=>{
        const [dia,mes,año] = a.date.split('-')
        const aDate = new Date( `${mes}-${dia}-${año}`)
        const [dia1,mes1,año1] = b.date.split('-')
        const bDate = new Date( `${mes1}-${dia1}-${año1}`)
        return aDate-bDate
    })
    return array
}
export default orderByDate