import React, { useState, useEffect } from "react";
import { TextField, SelectField, FormikForm } from "./FormElements";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

let formSchema = [
  {
    key: "name",
    type: "text",
    label: "Name",
    required: true,
  },
  {
    key: "email",
    type: "email",
    label: "Email",
    required: true,
  },
  {
    key: "address",
    type: "text",
    label: "Address",
    required: false,
  },
  {
    key: "role",
    type: "select",
    label: "Role",
    required: true,
    options: [
      {
        label: "Admin",
        value: "admin",
      },
      {
        label: "User",
        value: "user",
      },
      {
        label: "Employee",
        value: "Employee",
      },
    ],
  },
];

const OwnSimpleForm = () => {
  const [FormData, setFormData] = useState(formSchema);
  const [ValidationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    validate(formSchema);
  }, []);

  const validate = () => {
    let validation = {};

    for (var key of Object.keys(formSchema)) {
      if (formSchema[key].type === "text") {
        validation[key] = Yup.string().min(2, "Too Short").max(200, "Too Long");
      } else if (formSchema[key].type === "email") {
        validation[key] = Yup.string().email();
      } else if (formSchema[key].type === "select") {
        validation[key] = Yup.string().oneOf(
          formSchema[key].options.map((o) => o.value)
        );
      }

      if (formSchema[key].required) {
        validation[key] = validation[key].required("Required");
      }
    }

    setValidationSchema(Yup.object().shape({ ...validation }));
  };

  const FormComponents = ({ name, schema, values, touched, setValues }) => {
    const props = {
      name: name,
      label: schema.label,
      options: schema.options,
      values: values,
      touched: touched,
      setValues: setValues,
      setForm: setFormData,
    };

    const type = schema.type;

    if (type === "text" || type === "email") return <TextField {...props} />;
    return <SelectField {...props} />;
  };

  const onSubmit = (values, { setSubmitting }) => {
    setFormData(values);
    alert(JSON.stringify(values));
    setSubmitting(false);
    // setFormData(formSchema);
  };

  return (
    <div className="App">
      <Formik
        enableReinitialize
        initialValues={FormData}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, values, touched, setValues }) => (
          <Form className="needs-validation" noValidate="">
            {FormData.map((obj, key) => (
              <div key={key}>
                <FormComponents
                  name={FormData[key].key}
                  schema={FormData[key]}
                  values={values}
                  touched={touched}
                  setValues={setValues}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OwnSimpleForm;
