import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = props => {
    const { touched, errors, status } = props;

    return(
        <Form>
            <label htmlFor = 'name'>Name:</label>
            <Field name ='name' placeholder = 'Type your name here'/>
            {touched.name && errors.name ? (
                <span className = 'error'>{errors.name}</span>
            ) : null};
            <label htmlFor = 'email'>Email:</label>
            <Field name = 'email' placeholder = 'Type your email here'/>
            {touched.email && errors.email ? (
                <span className = 'error'>{errors.email}</span>
            ) : null};
            <label htmlFor = 'password'>Password:</label>
            <Field name = 'password' placeholder = 'Type password here'/>
            {touched.password && errors.password ? (
                <span className = 'error'>{errors.password}</span>
            ) : null}
            <label htmlFor = 'TOS'>Please read and agree to the TOS</label>
            <Field name = 'tos' type = 'checkbox'/>
            {touched.tos && errors.tos ? (
                <span className = 'error'>{errors.tos}</span>
            ) : null}
            <button type = 'submit' disabled = {!props.isValid}>Submit</button>
        </Form>
    );
};

export default withFormik({
    mapPropsToValues: props => {
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            tos: props.tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is a required field')
    })
})(UserForm);