const KEYS = {
    invoices: 'invoices',
    invoiceNumber: 'invoiceNumber'
}

export function insertInvoice(data) {
    let invoices = getAllInvoices();
    data['invoiceNumber'] = generateInvoiceNumber();
    invoices.push(data);
    sessionStorage.setItem(KEYS.invoices, JSON.stringify(invoices));
}

export function updateInvoice(data) {
    let invoices = getAllInvoices();
    let recordIndex = invoices.findIndex(x => x.invoiceNumber == data.invoiceNumber);
    invoices[recordIndex] = { ...data };
    sessionStorage.setItem(KEYS.invoices, JSON.stringify(invoices));
}

export function deleteInvoice(invoiceNumber) {
    let invoices = getAllInvoices();
    invoices = invoices.filter(x => x.invoiceNumber != invoiceNumber);
    sessionStorage.setItem(KEYS.invoices, JSON.stringify(invoices));
}

export function generateInvoiceNumber() {
    if (sessionStorage.getItem(KEYS.invoiceNumber) == null) {
        sessionStorage.setItem(KEYS.invoiceNumber, '0')
    }
    var invoiceNumber = parseInt(sessionStorage.getItem(KEYS.invoiceNumber))
    sessionStorage.setItem(KEYS.invoiceNumber, (++invoiceNumber).toString())
    return invoiceNumber;
}

export function getAllInvoices() {
    if (sessionStorage.getItem(KEYS.invoices) == null) {
        sessionStorage.setItem(KEYS.invoices, JSON.stringify([]))
    }
    let invoices = JSON.parse(sessionStorage.getItem(KEYS.invoices));
    return invoices.map(x => ({
        ...x
    }))
}