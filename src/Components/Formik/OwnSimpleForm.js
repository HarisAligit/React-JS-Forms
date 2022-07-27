import React, { useState, useEffect } from "react";
import { Form, TextField, SelectField } from "./FormElements";
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

  useEffect(() => {}, []);

  const FormComponents = (name, schema) => {
    const props = {
      name: name,
      label: schema.label,
      options: schema.options,
    };

    const type = schema.type;

    if (type === "text" || type === "email") return <TextField {...props} />;
    return <SelectField {...props} />;
  };
};
