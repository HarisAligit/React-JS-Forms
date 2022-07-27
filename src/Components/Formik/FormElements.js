import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function FormikForm(props) {
  return (
    <Formik {...props}>
      <Form className="needs-validation" noValidate="">
        {props.children}
      </Form>
    </Formik>
  );
}

function TextField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        type="text"
        name={name}
        id={name}
        placeholder={placeholder || ""}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
}

function SelectField(props) {
  const { name, label, options } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field as="select" id={name} name={name}>
        <option value="">Choose...</option>
        {options.map((opt, index) => (
          <option
            key={index}
            value={opt.value}
            label={opt.label || opt.value}
          />
        ))}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
}

export { SelectField, TextField, FormikForm };
