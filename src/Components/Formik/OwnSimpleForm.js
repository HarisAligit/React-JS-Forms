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
      case "string":
        values[attr?.key] = "";
        break;
      case "text":
        values[attr?.key] = "";
        break;
      case "number":
        values[attr?.key] = 0;
        break;
      default:
        values[attr?.key] = "";
    }
  });
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
    schema,
    values,
    touched,
    setValues,
    handleChange,
  }) => {
    const props = {
      name: name,
      label: schema.label,
      options: schema.options,
      values: values,
      touched: touched,
      setValues: setValues,
      handleChange,
    };

    const type = schema.type;

    if (type === "text" || type === "email") return <TextField {...props} />;
    else if (type === "number") return <NumberField {...props} />;
    else return <SelectField {...props} />;
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    alert(JSON.stringify(values));
    setSubmitting(false);
  };

  return (
    <div className="App">
      <Formik
        enableReinitialize
        initialValues={getInitialValues(attributes)}
        validationSchema={ValidationSchema}
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
                      // schema={FormData[key]}
                      values={formikProps?.values}
                      touched={formikProps?.touched}
                      setValues={formikProps?.setValues}
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
