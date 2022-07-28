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

function TextField(props) {
  const { name, label, placeholder } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        type="text"
        name={name}
        id={name}
        placeholder={placeholder || ""}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
}

const AddInput = (e, field, values, touched, setValues) => {
  // setValues({
  //   ...values,
  //   ...{ userid: { type: "text", label: "Name", required: true } },
  // });
  // console.log("values: ", values);

  // values["userid"] = {
  //   type: "text",
  //   label: `${e.target.value} Id: `,
  //   required: true,
  // };

  if (!flag) {
    values.push({
      userid: { type: "text", label: `${e.target.value} Id: `, required: true },
    });
    flag = true;
    setValues(values);
  } else {
    values[values.length - 1].userid.label = `${e.target.value} Id: `;
    setValues(values);
  }

  console.log("values: ", values);

  field.onChange(e);
};

function SelectField(props) {
  const { name, label, options, values, touched, setValues, setForm } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field as="select" id={name} name={name}>
        {({ field }) => (
          <select
            {...field}
            onChange={(e) =>
              AddInput(e, field, values, touched, setValues, setForm)
            }
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

export { SelectField, TextField, FormikForm };
