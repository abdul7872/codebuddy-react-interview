import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const schema = yup.object({
  emailId: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=(?:\D*\d){2})(?=(?:[^a-z]*[a-z]){2})(?=(?:[^A-Z]*[A-Z]){2})(?=(?:\w*\W){2}).*/,
      "Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters",
    ),
});

const Form1 = ({ onNext, onSave, formData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData, resolver: yupResolver(schema) });

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
      <div className="relative mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          className="mt-1 w-full rounded-md border border-gray-300 p-2"
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-11 right-0 flex items-center pr-3 text-gray-500"
        >
          <Icon icon={showPassword ? "mdi:eye" : "ion:eye-off"} className="h-5 w-5" />
        </button>
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <button
          type="button"
          disabled
          className="rounded-md bg-gray-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          Back
        </button>
        <button
          onClick={handleSubmit((data) => onSave(data))}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
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
  onSave: PropTypes.func,
};
