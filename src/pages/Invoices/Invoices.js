import React, { useState } from 'react'
import PageHeader from "../../components/PageHeader";

import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import * as invoiceService from "../../services/invoiceService";

import { useNavigate } from 'react-router';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'invoiceNumber', label: 'Invoice Number' },
    { id: 'dateCreated', label: 'Date Created' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'paymentDue', label: 'Payment Due' },
    { id: 'invoiceDue', label: 'Invoice Due' },
    { id: 'status', label: 'Status' }
]

function Invoices() {

    let navigate = useNavigate();

    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records] = useState(invoiceService.getAllInvoices());

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <>
            <PageHeader
                title="Invoices"
                subTitle="View and add invoices"

            />
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Invoices"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.PageButton
                        text="New Invoice"
                        variant="outlined"
                        style={{position: 'absolute'}}
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => navigate("/InvoiceForm")}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.invoiceNumber}>
                                    <TableCell>{item.invoiceNumber}</TableCell>
                                    <TableCell>{item.createDate}</TableCell>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.paymentDue}</TableCell>
                                    <TableCell>{item.invoiceDue}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>

        </>
    )
}

export default Invoices;