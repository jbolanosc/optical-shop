import React, { Fragment, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import firebase from "../Firebase/Firebase";

import Loading from "../layout/Loader";
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

const EditPatient = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [key, setkey] = useState("");
  const [patient, setPatient] = useState({
    firstname: "",
    lastname: "",
    IdNumber: "",
    email: "",
    phone: ""
  });

  const loadPatient = () => {
    const ref = firebase
      .firestore()
      .collection("patients")
      .doc(props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const data = doc.data();
        setkey(props.match.params.id);
        setPatient(data);
      } else {
        console.log("no such document");
      }
    });
  };

  const loading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  const savePatient = () => {
    const { firstname, lastname, IdNumber, phone, email } = patient;
    const updateRef = firebase
      .firestore()
      .collection("patients")
      .doc(key);

    updateRef
      .set({
        firstname,
        lastname,
        IdNumber,
        phone,
        email
      })
      .then(docRef => {
        alert("patient updated");
        props.history.push("/patients");
      });
  };

  const handleChange = name => event => {
    setPatient({ ...patient, [name]: event.target.value });
  };

  useEffect(() => {
    loadPatient();
    loading();
  }, [,]);

  return (
    <div className="container">
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <Fragment>
          <h2 className="m-1">Edit Patient</h2>
          <Formik
            onSubmit={data => {
              savePatient();
            }}
            validationSchema={SignupSchema}
            initialValues={{
              firstname: patient.firstname,
              lastname: patient.lastname,
              IdNumber: patient.IdNumber,
              email: patient.email,
              phone: patient.phone
            }}
          >
            {({ touched, errors }) => (
              <Form>
                <Field
                  name="firstname"
                  placeholder="Firstname"
                  component={InputField}
                  value={patient.firstname}
                  onChange={handleChange("firstname")}
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
                  value={patient.lastname}
                  onChange={handleChange("lastname")}
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
                  value={patient.IdNumber}
                  onChange={handleChange("IdNumber")}
                />
                {errors.IdNumber && touched.IdNumber ? (
                  <ErrorMessage
                    errors={errors.IdNumber}
                    name="IdNumber"
                    component={ErrorField}
                  />
                ) : null}
                <Field
                  name="email"
                  placeholder="Email"
                  component={InputField}
                  value={patient.email}
                  onChange={handleChange("email")}
                />
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
                  value={patient.phone}
                  onChange={handleChange("phone")}
                />
                {errors.phone && touched.phone ? (
                  <ErrorMessage
                    errors={errors.phone}
                    name="phone"
                    component={ErrorField}
                  />
                ) : null}
                <button type="submit" className="btn btn-info">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </Fragment>
      )}
    </div>
  );
};

export default EditPatient;
