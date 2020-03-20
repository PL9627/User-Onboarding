import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from 'axios';


const UserForm = props => {
  const { touched, errors, status } = props;

  const [users, setUsers] = useState([]);

  useEffect(() => {
      status && setUsers(status);
  }, [status]);

  return (
    <div>
        <Form>
            <label htmlFor="name">Name:</label>
            <Field name="name" placeholder="Type your name here" />
            {touched.name && errors.name ? (
                <span className="error">{errors.name}</span>
            ) : null}
            ;<label htmlFor="email">Email:</label>
            <Field name="email" placeholder="Type your email here" />
            {touched.email && errors.email ? (
                <span className="error">{errors.email}</span>
            ) : null}
            ;<label htmlFor="password">Password:</label>
            <Field name="password" placeholder="Type password here" />
            {touched.password && errors.password ? (
                <span className="error">{errors.password}</span>
            ) : null}
            <label htmlFor="TOS">Please read and agree to the TOS</label>
            <Field name="tos" type="checkbox" />
            {touched.tos && errors.tos ? (
                <span className="error">{errors.tos}</span>
            ) : null}
            <button type="submit" disabled={!props.isValid}>
                Submit
            </button>
        </Form>
        {users.name && (
            <ul key = {users.id}>
                <li>Name: {users.name}</li>
                <li>email: {users.email}</li>
                <li>password: {users.password}</li>
            </ul>
        )}
    </div>
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
    name: Yup.string().required("Name is a required field"),
    email: Yup.string()
      .email("Must be a valid email address")
      .required("Must include email address"),
    password: Yup.string()
      .min(8, "Passwords must be at least 8 characters long")
      .required("A password is required"),
    terms: Yup.boolean().oneOf([true], 'Please agree to the TOS')
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
      //console.log(formikBag);
      axios.post("https://reqres.in/api/users", values)
      .then(response => {
          console.log(response);
          setStatus(response.data);
          resetForm();
      })
      .catch(err => console.log(err.response))
  }
})(UserForm);
