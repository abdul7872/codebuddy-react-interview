import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

const schema = yup.object({
  emailId: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(/[A-Z].*[A-Z]/, "Must contain 2 capital letters")
    .matches(/[a-z].*[a-z]/, "Must contain 2 small letters")
    .matches(/\d.*\d/, "Must contain 2 numbers")
    .matches(/[^A-Za-z0-9].*[^A-Za-z0-9]/, "Must contain 2 special characters")
    .required("Password is required"),
});

const Form1 = ({ onNext, formData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData, resolver: yupResolver(schema) });

  console.log(formData);
  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email ID</label>
        <input
          {...register("emailId")}
          className="mt-1 w-full rounded-md border border-gray-300 p-2"
          placeholder="Email ID"
        />
        {errors.emailId && <p className="text-sm text-red-500">{errors.emailId.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          {...register("password")}
          type="password"
          className="mt-1 w-full rounded-md border border-gray-300 p-2"
          placeholder="Password"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-md bg-gray-500 px-4 py-2 text-white"
        >
          Back
        </button>
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Save
        </button>
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white">
          Save and Next
        </button>
      </div>
    </form>
  );
};

export default Form1;

Form1.propTypes = {
  formData: PropTypes.object,
  onNext: PropTypes.func,
};
