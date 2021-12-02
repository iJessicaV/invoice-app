import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';

export function useForm(initialValues) {


    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    return {
        values,
        setValues,
        errors,
        setErrors,
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

