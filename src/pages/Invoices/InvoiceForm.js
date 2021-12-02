import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {FieldArray, Formik, useFormikContext, useField} from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@mui/styles';
import { Form } from '../../components/useForm';
import * as invoiceService from "../../services/invoiceService";
import Button from '@mui/material/Button';
import Divider  from '@mui/material/Divider';
import PageHeader from '../../components/PageHeader';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router';
import { TextField } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

import { formatDate, getTotalItemPrice, getTotalPayment } from '../../util/util';
import Controls from "../../components/controls/Controls";


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

function InvoiceForm() {

    let navigate = useNavigate();

    const classes = useStyles();

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Name is required")
    })

    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/Invoices");
    }

    const add = (invoice) => {
        if (invoice.invoiceNumber == 0) {
            invoice.status = 'pending';
            invoiceService.insertInvoice(invoice);
        } else {
            invoiceService.updateInvoice(invoice);
        }
    }

    const DependentField = (props) => {
        const { values } = useFormikContext();
        const [field] = useField(props);

        return (
            <TextField
            id={props.name}
            value={values[props.name]}
            {...props} {...field}
            />
        )
    }

    const PaymentField = (props) => {

        const { values, setFieldValue } = useFormikContext();
        const [field] = useField(props);

        React.useEffect(() => {

          setFieldValue(props.name, getTotalPayment(values.columns));
        }, [values.columns, setFieldValue, props.name]);
      
        return (
          <>
            <TextField {...props} {...field} />
          </>
        );
      };

    return (
        <>
            <PageHeader
                    title="Create Invoice"
                    subTitle="Edit invoice details"

            />
            <Paper className={classes.pageContent}>
                <Formik
                initialValues={{
                    invoiceNumber: 0,
                    fullName: '',
                    email: '',
                    address: '',
                    city: '',
                    mobile: '',
                    postCode: '',
                    country: '',
                    createDate: formatDate(new Date()),
                    invoiceDue: formatDate(new Date()),
                    paymentDue: 0,
                    status: 'pending',
                    columns: [
                        {
                            item: '',
                            price: 0,
                            qty: 0,
                            total: 0
                        }
                    ]

                }}
                validationSchema={validationSchema}
                onSubmit={ (values) => {
                    add(values);
                    console.log(values);
                    navigate("/Invoices");
                    
                }}
                >
                { formik => (
                <Form onSubmit={formik.handleSubmit}>
                        <Typography sx={{fontSize: 18, p: 1}} color="text.secondary">
                            Customer's Details
                        </Typography>
                        <Stack spacing={2} direction="row">
                            <Controls.Input
                                fullWidth
                                name="fullName"
                                label="Full Name"
                                style={{width: 300}}
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                error={formik.errors.fullName}
                            />
                            <Controls.Input
                                fullWidth
                                label="Email"
                                name="email"
                                style={{width: 400}}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.errors.email}
                            />
                        </Stack>
                        <Stack spacing={2} direction="row">
                            <Controls.Input
                                fullWidth
                                label="Street Address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.errors.email}
                            />
                        </Stack>
                        <Stack spacing={2} direction="row">
                            <Controls.Input
                                label="City"
                                name="city"
                                style={{width: 200}}
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                
                            />
                            <Controls.Input
                                label="Post Code"
                                name="postCode"
                                style={{width: 200}}
                                value={formik.values.postCode}
                                onChange={formik.handleChange}
                            />
                            <Controls.Input
                                label="Country"
                                name="country"
                                style={{width: 300}}
                                value={formik.values.country}
                                onChange={formik.handleChange}
                            />
                        </Stack>
                        <Stack spacing={2} direction="row">
                            <Controls.Input
                                label="Mobile"
                                name="mobile"
                                style={{width: 300}}
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                            />
                        </Stack>
                        <Typography sx={{fontSize: 18, p: 1}} color="text.secondary">
                            Item List
                        </Typography>
                        <FieldArray name="columns">
                            {({insert, remove, push}) => (
                                <div>
                                    <Table>
                                        <colgroup>
                                            <col/>
                                            <col/>
                                            <col/>
                                            <col/>
                                            <col/>
                                        </colgroup>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Item
                                                </TableCell>
                                                <TableCell>
                                                    Price
                                                </TableCell>
                                                <TableCell>
                                                    Qty
                                                </TableCell>
                                                <TableCell>
                                                    Total Price
                                                </TableCell>
                                                <TableCell>
                                                    Remove?
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {formik.values.columns.length > 0 && formik.values.columns.map((row, index) => (
                                                <TableRow
                                                key={`columns-${index}`}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell>
                                                        <DependentField 
                                                            name={`columns.${index}.item`}
                                                            index={index}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <DependentField 
                                                            name={`columns.${index}.price`}
                                                            index={index}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <DependentField 
                                                            name={`columns.${index}.qty`}
                                                            index={index}
                                                            onChange={formik.handleChange}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id={`columns.${index}.total`}
                                                            name={`columns.${index}.total`}
                                                            index={index}
                                                            disabled
                                                            onChange={formik.handleChange}
                                                            value={getTotalItemPrice(formik.values.columns[index].qty, formik.values.columns[index].price)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => remove(index)}>
                                                            <ClearIcon/>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Button fullWidth varian="text" onClick={() => push({name: ""})}><AddIcon/></Button>
                                </div>
                            )}
                        </FieldArray>
                    <Typography sx={{fontSize: 18, p: 1}} color="text.secondary">
                        Payment Details
                    </Typography>
                    <Stack spacing={2} direction="row">
                        <Controls.Input
                            name="invoiceDue"
                            style={{width: 300}}
                            label="Invoice Due"
                            value={formik.values.invoiceDue}
                            onChange={formik.handleChange}
                        />
                        <PaymentField
                            name="paymentDue"
                            style={{width: 300}}
                            label="Payment Due"
                            onChange={formik.handleChange}
                            disabled

                        />
                    </Stack>
                    <div style={{marginTop: 20}}>
                        <Divider light />
                        <Stack style={{marginTop: 15}} spacing={1} direction="row">
                            <Button type="submit" variant="contained" size="small">Submit</Button>
                            <Button type="button" onClick={handleCancel} variant="outlined" size="small">Cancel</Button>
                        </Stack>
                    </div>
                </Form>
                )}
            </Formik>
            </Paper>
        </>
    )
}

export default InvoiceForm;