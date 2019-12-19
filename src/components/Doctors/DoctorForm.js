import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import firebase from "../Firebase/Firebase";
import { InputField, ErrorField } from "../fields/inputField";

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Firstname Too Short!")
    .max(70, "Firstname Too Long!")
    .required("Firstname Required"),
  lastname: Yup.string()
    .min(2, "Lastname Too Short!")
    .max(70, "Lastname Too Long!")
    .required("Lastname Required"),
  email: Yup.string()
    .email("Email Invalid email")
    .required("Email Required"),
  IdNumber: Yup.number()
    .min(2, "ID Number Too Short!")
    .max(999999999999999999, "ID Number Too Long!")
    .integer("Only numbers are allowed"),
  phone: Yup.number()
    .min(2, "Phone Too Short!")
    .max(999999999, "Phone Too Long!")
    .integer("Only numbers are allowed")
});

const generateToast = (err, msg) => {
  const red =
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(215,14,14,1) 99%, rgba(0,212,255,1) 100%)";
  const green =
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(139,213,86,1) 0%)";
  if (err) {
    Toastify({
      text: msg,
      duration: 5000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      backgroundColor: red,
      className: "info",
      stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
  } else {
    Toastify({
      text: msg,
      duration: 5000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      backgroundColor: green,
      className: "info",
      stopOnFocus: true // Prevents dismissing of toast on hover
    }).showToast();
  }
};

const DoctorForm = props => {
  const ref = firebase.firestore().collection("doctors");
  const saveDoctor = data => {
    const { firstname, lastname, IdNumber, phone, email } = data;

    ref
      .add({
        firstname,
        lastname,
        IdNumber,
        phone,
        email
      })
      .then(docRef => {
        generateToast(false, "Doctor saved.");
        props.history.push("/doctors");
      })
      .catch(error => {
        generateToast(true, "Error adding doctor: ", error);
      });
  };

  return (
    <div className="container-fluid">
      <h2 className="m-1">Doctor Registration</h2>
      <Formik
        onSubmit={data => {
          console.log(data);
          saveDoctor(data);
        }}
        validationSchema={SignupSchema}
        initialValues={{
          firstname: "",
          lastname: "",
          IdNumber: "",
          email: "",
          phone: ""
        }}
      >
        {({ touched, errors }) => (
          <Form>
            <Field
              name="firstname"
              placeholder="Firstname"
              component={InputField}
            />
            {errors.firstname && touched.firstname ? (
              <ErrorMessage
                errors={errors.firstname}
                name="firstname"
                component={ErrorField}
              />
            ) : null}
            <Field
              name="lastname"
              placeholder="Lastname"
              component={InputField}
            />
            {errors.lastname && touched.lastname ? (
              <ErrorMessage
                errors={errors.lastname}
                name="lastname"
                component={ErrorField}
              />
            ) : null}
            <Field
              name="IdNumber"
              placeholder="ID number"
              component={InputField}
            />
            {errors.IdNumber && touched.IdNumber ? (
              <ErrorMessage
                errors={errors.IdNumber}
                name="IdNumber"
                component={ErrorField}
              />
            ) : null}
            <Field name="email" placeholder="Email" component={InputField} />
            {errors.email && touched.email ? (
              <ErrorMessage
                errors={errors.email}
                name="email"
                component={ErrorField}
              />
            ) : null}
            <Field
              name="phone"
              type="number"
              step="1"
              placeholder="Phone"
              component={InputField}
            />
            {errors.phone && touched.phone ? (
              <ErrorMessage
                errors={errors.phone}
                name="phone"
                component={ErrorField}
              />
            ) : null}
            <button type="submit" className="btn btn-info">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorForm;
