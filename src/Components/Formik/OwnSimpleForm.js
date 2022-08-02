import React, { useState, useEffect, startTransition } from "react";
import { TextField, SelectField, NumberField } from "./FormElements";
import * as Yup from "yup";
import { Formik, Form } from "formik";

let attributes = [
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

const getInitialValues = (data) => {
  const values = {};
  data.map((attr) => {
    switch (startTransition.type) {
      case "text":
        values[attr?.key] = "";
        break;
      case "number":
        values[attr?.key] = 0;
        break;
      case "role":
        values[attr?.key] = "";
        break;
      default:
        values[attr?.key] = "";
    }
  });

  return values;
};

const OwnSimpleForm = () => {
  const [ValidationSchema, setValidationSchema] = useState({});

  // useEffect(() => {
  //   debugger;
  //   validate(FormData);
  // }, []);

  const validate = () => {
    let validation = {};

    console.log("FormData Length: ", FormData.length);
    for (let i = 0; i < FormData.length; i++) {
      const key = FormData[i].key;
      if (FormData[i].type === "text") {
        validation[key] = Yup.string().min(2, "Too Short").max(200, "Too Long");
      } else if (FormData[i].type === "email") {
        validation[key] = Yup.string().email();
      } else if (FormData[i].type === "select") {
        validation[key] = Yup.string().oneOf(
          FormData[i].options.map((o) => console.log("\no.value: ", o.value))
        );
      } else if (FormData[i].type === "number") {
        // validation[i] = yup.string();
      }

      if (FormData[i].required) {
        console.log("\nValdition Key: ", validation[key]);
        validation[key] = validation[key].required("Required");
      }
    }

    console.log("After validate: ", validation);

    setValidationSchema(Yup.object().shape({ ...validation }));
  };

  const FormComponents = ({
    name,
    label,
    value,
    values,
    touched,
    setFieldValue,
    handleChange,
    type,
    options,

    // name, label, placeholder, handleChange, key
  }) => {
    const props = {
      name: name,
      label: label,
      value: value,
      values: values,
      touched: touched,
      setFieldValue: setFieldValue,
      options: options,
      handleChange,
    };

    const fieldType = type;

    if (fieldType === "text" || fieldType === "email")
      return <TextField {...props} />;
    else if (fieldType === "select") return <SelectField {...props} />;
    else if (type === "number") return <NumberField {...props} />;
  };

  const onSubmit = (values, { setSubmitting }) => {
    alert(JSON.stringify(values));
    setSubmitting(false);
  };

  return (
    <div className="App">
      <Formik
        enableReinitialize
        initialValues={getInitialValues(attributes)}
        // validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => {
          return (
            <Form className="needs-validation" noValidate="">
              {attributes.map((obj, index) => {
                return (
                  <div key={obj?.key}>
                    <FormComponents
                      name={obj?.key}
                      label={obj?.label}
                      type={obj?.type}
                      options={obj?.options}
                      value={formikProps?.values.key}
                      values={attributes}
                      touched={formikProps?.touched}
                      setFieldValue={formikProps?.setFieldValue}
                      handleChange={formikProps?.handleChange}
                    />
                  </div>
                );
              })}
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default OwnSimpleForm;
