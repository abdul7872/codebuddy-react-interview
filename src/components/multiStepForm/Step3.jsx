import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

const schema = yup.object({
  countryCode: yup
    .string()
    .oneOf(["+91", "+1"], "Invalid country code")
    .required("Country code is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  acceptTermsAndCondition: yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const Form3 = ({ onSave, onBack, formData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Country Code</label>
        <select
          {...register("countryCode")}
          className="mt-1 w-full rounded-md border border-gray-300 p-2"
        >
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {errors.countryCode && <p className="text-sm text-red-500">{errors.countryCode.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          {...register("phoneNumber")}
          className="mt-1 w-full rounded-md border border-gray-300 p-2"
          placeholder="Phone Number"
        />
        {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          <input type="checkbox" {...register("acceptTermsAndCondition")} className="mr-2" />
          Accept Terms and Conditions
        </label>
        {errors.acceptTermsAndCondition && (
          <p className="text-sm text-red-500">{errors.acceptTermsAndCondition.message}</p>
        )}
      </div>
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
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
        <button
          type="submit"
          disabled
          className="cursor-not-allowed rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Save and Next
        </button>
      </div>
    </form>
  );
};

export default Form3;

Form3.propTypes = {
  onSave: PropTypes.func,
  onBack: PropTypes.func,
  formData: PropTypes.object,
};
