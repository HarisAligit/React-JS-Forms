import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

var flag = false;

const SimpleHookForm = () => {
  let validation = yup.object({
    name: yup
      .string()
      .min(3, "Name is too Short (Minimum 3 characters required)")
      .max(30, "Name is too Long (Max 30 characters allowed)")
      .required("Required"),
    email: yup.string().email().required("Required"),
    address: yup
      .string()
      .min(10, "Address cannot be under 10 characters")
      .max(500, "Address is too long")
      .required("Required"),
    role: yup
      .string()
      .required("Required")
      .oneOf(["admin", "user", "employee"]),
    userid: yup
      .number()
      .when("role", {
        is: "admin",
        then: yup
          .number()
          .min(1, "Admin ID must be greater than 0")
          .max(10, "Admin ID must be less than 11")
          .required("Required"),
      })
      .when("role", {
        is: "user",
        then: yup
          .number()
          .min(11, "User ID must be greater than 10")
          .max(20, "User ID must be less than 21")
          .required("Required"),
      })
      .when("role", {
        is: "employee",
        then: yup
          .number()
          .min(21, "Employee ID must be greater than 20")
          .max(30, "Employee ID must be less than 31")
          .required("Required"),
      }),
  });

  const optionsDf = { resolver: yupResolver(validation) };

  const { register, control, handleSubmit, reset, formState, watch } =
    useForm(optionsDf);

  const { errors } = formState;
  const { fields, append, remove } = useFieldArray(
    { name: "name", control },
    { name: "email", control },
    { name: "address", control },
    { name: "role", control }
  );

  const Role = watch("role");

  function onSubmit(data) {
    alert(JSON.stringify(data));
  }

  useEffect(() => {
    if (flag) {
      remove(fields.length - 1);
    }
    console.log("\nRole: ", Role);
    const currentProp = Role || "";

    if (currentProp != "") {
      flag = true;
    }

    if (currentProp === "admin") {
      append({ userid: "" });
    } else if (currentProp === "user") {
      append({ userid: "" });
    } else if (currentProp === "employee") {
      append({ userid: "" });
    }
  }, [Role]);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-3">React Hook Dynamic Form Tutorial</h2>
        <div className="form-group">
          <label className="mb-2">Choose Role</label>
          <select
            name="role"
            {...register("role")}
            className={`form-control ${errors.Role ? "is-invalid" : ""}`}
          >
            {["Select Options", "admin", "user", "employee"].map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {fields.map((item, i) => (
            <div key={i} className="list-group list-group-flush">
              <div className="list-group-item">
                <h5 className="card-title">Please Enter your UserID: </h5>
                <div className="form-row">
                  <div className="form-group col-6">
                    <label>User ID: </label>
                    <input
                      name={"userid"}
                      {...register("userid")}
                      type="number"
                      className={`form-control ${
                        errors.userid ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.userid?.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-success mt-3 mb-2">
          Submit
        </button>
        <button
          onClick={() => reset()}
          type="button"
          className="btn btn-info mt-3 mb-2"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default SimpleHookForm;
