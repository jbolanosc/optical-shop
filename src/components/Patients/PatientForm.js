import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

const ref = firebase.firestore().collection("patients");

const PatientForm = () => {

  const savePatient = data => {
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
        alert("Patient saved...");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div className="container-fluid">
      <h2 className="m-1">Patient Registration</h2>
      <Formik
        onSubmit={data => {
          console.log(data);
          savePatient(data);
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
            <Field name="phone" type="number" step="1" placeholder="Phone" component={InputField} />
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

export default PatientForm;
