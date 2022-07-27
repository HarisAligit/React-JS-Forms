import React, { useState, useEffect } from "react";
import { TextField, SelectField, FormikForm } from "./FormElements";
import * as Yup from "yup";

const formSchema = {
  name: {
    type: "text",
    label: "Name",
    required: true,
  },
  email: {
    type: "email",
    label: "Email",
    required: true,
  },
  address: {
    type: "text",
    label: "Address",
    required: false,
  },
  role: {
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
};

const OwnSimpleForm = () => {
  const [FormData, setFormData] = useState({});
  const [ValidationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    validate(formSchema);
  }, []);

  const validate = () => {
    let data = {};
    let validation = {};

    for (var key of Object.keys(formSchema)) {
      data[key] = "";

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

    setFormData(data);
    setValidationSchema(Yup.object().shape({ ...validation }));
  };

  const FormComponents = ({ name, schema }) => {
    const props = {
      name: name,
      label: schema.label,
      options: schema.options,
    };

    const type = schema.type;

    if (type === "text" || type === "email") return <TextField {...props} />;
    return <SelectField {...props} />;
  };

  const onSubmit = (values, { setSubmitting }) => {
    alert(JSON.stringify(values));
    setSubmitting(false);
  };

  return (
    <div className="App">
      <FormikForm
        enableReinitialize
        initialValues={FormData}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        {Object.keys(formSchema).map((key, ind) => (
          <div key={key}>
            {<FormComponents name={key} schema={formSchema[key]} />}
          </div>
        ))}
        <button type="submit">Submit</button>
      </FormikForm>
    </div>
  );
};

export default OwnSimpleForm;
