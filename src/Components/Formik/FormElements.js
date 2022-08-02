import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

let flag = false;

function FormikForm(props) {
  return (
    <Formik {...props}>
      <Form className="needs-validation" noValidate="">
        {props.children}
      </Form>
    </Formik>
  );
}

function NumberField(props) {
  const { name, value, label, placeholder, handleChange } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        type="number"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder || ""}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
}

function TextField(props) {
  const { name, value, label, placeholder, handleChange } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        type="text"
        name={name}
        id={name}
        onChange={handleChange}
        value={value}
        placeholder={placeholder || ""}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
}

const AddInput = (
  e,
  field,
  values,
  touched,
  setFieldValue,
  setForm,
  handleChange
) => {
  // setValues({
  //   ...values,
  //   ...{
  //     key: `${e.target.value}id`,
  //     type: "number",
  //     label: `${e.target.value} id: `,
  //     required: true,
  //   },
  // });

  if (!flag) {
    values.push({
      key: `${e.target.value}id`,
      type: "number",
      label: `${e.target.value} id: `,
      required: true,
    });
    flag = true;
    setFieldValue(values);
  } else {
    values.pop();
    values.push({
      key: `${e.target.value}id`,
      type: "number",
      label: `${e.target.value} id: `,
      required: true,
    });
    setFieldValue(values);
  }
  console.log("\nvalues: ", values, "\n");

  // values["userid"] = {
  //   type: "text",
  //   label: `${e.target.value} Id: `,
  //   required: true,
  // };

  // console.log(field, values, touched, setValues, setForm);
  // if (!flag) {
  //   values.push({
  //     key: "userid",
  //     type: "number",
  //     label: `${e.target.value} Id: `,
  //     required: true,
  //   });
  //   flag = true;
  //   setValues(values);
  //   setForm(values);
  // } else {
  //   values[values.length - 1].label = `${e.target.value} Id: `;
  //   setValues(values);
  //   setForm(values);
  // }

  field.onChange(e);
};

function SelectField(props) {
  const { name, label, options, values, touched, setFieldValue } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field as="select" id={name} name={name}>
        {({ field }) => (
          <select
            {...field}
            onChange={(e) => AddInput(e, field, values, touched, setFieldValue)}
          >
            <option value="">Choose...</option>
            {options.map((opt, index) => (
              <option
                key={index}
                value={opt.value}
                label={opt.label || opt.value}
              />
            ))}
          </select>
        )}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
}

export { SelectField, NumberField, TextField, FormikForm };
