import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputField, ErrorField } from "../fields/inputField";
import * as Yup from "yup";

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
  idNumber: Yup.string()
    .min(2, "ID Number Too Short!")
    .max(70, "ID Number Too Long!")
    .required("ID Number Required"),
  phone: Yup.string()
    .min(2, "Phone Too Short!")
    .max(70, "Phone Too Long!")
    .required("Phone Required")
});

const ExamForm = () => (
  <div className="container-fluid">
    <h2 className="m-1">Exam Registration</h2>
    <Formik
      onSubmit={data => {
        console.log(data);
      }}
      validationSchema={SignupSchema}
      initialValues={{
        firstname: "",
        lastname: "",
        idNumber: "",
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
            name="idNumber"
            placeholder="ID number"
            component={InputField}
          />
          {errors.idNumber && touched.idNumber ? (
            <ErrorMessage
              errors={errors.idNumber}
              name="idNumber"
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
          <Field name="phone" placeholder="Phone" component={InputField} />
          {errors.phone && touched.phone ? (
            <ErrorMessage
              errors={errors.phone}
              name="phone"
              component={ErrorField}
            />
          ) : null}
          <button className="btn btn-info" type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ExamForm;
