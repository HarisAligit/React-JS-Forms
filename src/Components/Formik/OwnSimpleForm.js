import React, { useState, useEffect } from "react";
import { TextField, SelectField, NumberField } from "./FormElements";
import * as Yup from "yup";
import { Formik, Form } from "formik";

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
    validate(FormData);
  }, []);

  const validate = () => {
    let validation = {};

    console.log("FormData Length: ", FormData.length);
    for (let i = 0; i < FormData.length; i++) {
      const key = FormData[i].key;
      if (FormData[i].type === "text") {
        validation[key] = Yup.string().min(2, "Too Short").max(200, "Too Long");
        console.log("After validate: ", validation[key]);
      } else if (FormData[i].type === "email") {
        validation[key] = Yup.string().email();
      } else if (FormData[i].type === "select") {
        validation[key] = Yup.string().oneOf(
          FormData[i].options.map((o) => o.value)
        );
      } else if (FormData[i].type === "number") {
        // validation[i] = yup.string();
      }

      if (FormData[i].required) {
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
    else if (type === "number") return <NumberField {...props} />;
    else return <SelectField {...props} />;
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
            {FormData.map((obj, key) => {
              return (
                <div key={key}>
                  <FormComponents
                    name={FormData[key].key}
                    schema={FormData[key]}
                    values={values}
                    touched={touched}
                    setValues={setValues}
                  />
                </div>
              );
            })}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OwnSimpleForm;
