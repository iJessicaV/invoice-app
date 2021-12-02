export function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

export function getTotalItemPrice(val1, val2) {
    if (!isNaN(val1) &&!isNaN(val2)) {
        return val1 * val2;
    }
}

export function getTotalPayment(values) {
    let totalPayment = 0;
    values.forEach(item => {
        const qty = item.qty == null ? 0 : item.qty;
        const price = item.price == null ? 0 : item.price;
        totalPayment = totalPayment + (qty * price);
    });

    return totalPayment;

}