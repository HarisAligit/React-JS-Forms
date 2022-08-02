import { Formik, Form, Field, FieldArray } from "formik";

const OwnFormik = () => {
  const initialValues = {
    NoOfTickets: 0,
    tickets: [],
  };

  const list = [1, 2, 3, 4, 5, 6];

  const onTicketChange = (e, field, values, setValues) => {
    const tickets = values.tickets;
    const NoOfTickets = values.NoOfTickets;

    const prevValue = parseInt(field.value) || 0;

    let i = prevValue;

    if (prevValue < NoOfTickets)
      for (; i < NoOfTickets; i++) tickets.push({ name: "", email: "" });
    else for (; i > NoOfTickets; i--) tickets.splice(i, 1); // removes from array (startNumber, deleteCount)

    setValues({ ...values, tickets });

    field.onChange(e); // Formik onChange Method
  };

  const onSubmit = (fields) => {
    alert("Form Submitted!");
  };
};
