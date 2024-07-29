import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

const schema = yup.object({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must be at most 50 characters")
    .required("First name is required"),
  lastName: yup.string().matches(/^[A-Za-z]*$/, "Only alphabets are allowed"),
  address: yup
    .string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),
});

const Form2 = ({ onNext, onBack, formData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          {...register("firstName")}
          className="mt-1 w-full rounded-md border border-gray-300 p-2"
          placeholder="First Name"
        />
        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          {...register("lastName")}
          className="mt-1 w-full rounded-md border border-gray-300 p-2"
          placeholder="Last Name"
        />
        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          {...register("address")}
          className="mt-1 w-full rounded-md border border-gray-300 p-2"
          placeholder="Address"
        />
        {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md bg-gray-500 px-4 py-2 text-white"
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

export default Form2;

Form2.propTypes = {
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  formData: PropTypes.object,
};
