import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import Creatable from "react-select/creatable";
import { EMAIL, GET_MASTER_DATA_ON_HOME, TEXT } from "./Const.js";
import { useSelector } from "react-redux";
import { selectMasterData } from "../../redux/utils/selectors.js";
import _, { capitalize } from "lodash";
import { useImperativeHandle } from "react";
import { isValueEmpty } from "./reusableMethods.js";

const FormBuilder = forwardRef(({ fields, propsFormData }, ref) => {
  const [formData, setFormData] = useState(propsFormData || {});
  const [fieldErrors, setFieldErrors] = useState({});

  const masterData = useSelector((state) => {
    return selectMasterData(state, GET_MASTER_DATA_ON_HOME || "");
  });

  const validateAllFields = (doNotValidateFields) => {
    let errors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      if (
        field.isRequired &&
        isValueEmpty(value) &&
        !doNotValidateFields.includes(field.name)
      ) {
        errors[field.name] =
          field.requiredErrorMessage || "This field is required.";
      } else if (field.isRequired && field.regex && !field.regex.test(value)) {
        errors[field.name] = field.regexErrorMessage || "Invalid input.";
      }
    });
    console.log("+++++ errors +++++", errors);
    setFieldErrors(errors);
    return errors;
  };

  const finalizeData = (doNotValidateFields = []) => {
    const errors = validateAllFields(doNotValidateFields);
    if (isValueEmpty(errors)) {
      return formData;
    } else {
      console.error(
        "There are errors in the form. Please correct them before saving."
      );
      return null;
    }
  };

  const resetForm = () => {
    setFormData(propsFormData || {});
  };

  // Expose the finalizeData & reset function to the parent using a ref
  useImperativeHandle(ref, () => ({ finalizeData, resetForm }));

  const handleChange = (field, value) => {
    const errors = { ...fieldErrors };
    console.log(field, value);
    if (field.isRequired && isValueEmpty(value)) {
      errors[field.name] =
        field.requiredErrorMessage || "This field is required.";
    } else if (field.regex && !field.regex.test(value)) {
      errors[field.name] =
        field.regexErrorMessage || "Regex is not correct in this field";
    } else {
      delete errors[field.name];
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field.name]: value,
    }));
    // formData[field.name] !== value && propsFormData[field.name] !== value
    setFieldErrors(errors);
    console.log(formData, errors);
  };

  const handleCurrencyChange = (field, existingTotal) => (e, unitType) => {
    let updatedValue = parseInt(e.target.value) || 0;

    if (unitType === "crore") {
      updatedValue = (existingTotal % 10000000) + updatedValue * 10000000;
    } else if (unitType === "lakh") {
      updatedValue =
        Math.floor(existingTotal / 10000000) * 10000000 + updatedValue * 100000;
    }

    handleChange(field, updatedValue);
  };

  return (
    // <form className="max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //     {fields?.map((field) => (
    //       <div key={field.name} className={`subform ${field.parentclassName}`}>
    //         <div
    //           className={`label_and_input_wrapper ${field.className} ${
    //             field.type === "textarea" ? "textarea_wrapper" : ""
    //           }`}
    //         >
    //           <div className="lablediv">
    //             <label
    //               className="block text-gray-700 text-sm font-bold mb-2"
    //               htmlFor={field.name}
    //             >
    //               {field.label}:
    //             </label>
    //           </div>

    //           <div className="inputdiv">
    //             {/* ... (Other input types can be added similarly) */}
    //             {field.type === TEXT && (
    //               <input
    //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //                 type={TEXT}
    //                 disabled={field.disabled}
    //                 id={field.name}
    //                 name={field.name}
    //                 value={formData[field.name] || ""}
    //                 onChange={(e) => handleChange(field, e.target.value)}
    //                 required={field.isRequired}
    //               />
    //             )}

    //             {field.type === EMAIL && (
    //               <input
    //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //                 type={EMAIL}
    //                 id={field.name}
    //                 name={field.name}
    //                 value={formData[field.name] || ""}
    //                 onChange={(e) => handleChange(field, e.target.value)}
    //                 required={field.isRequired}
    //               />
    //             )}

    //             {field.type === "phoneOTP" && (
    //               <div className="phone-otp-button">
    //                 <label
    //                   onClick={() => {
    //                     // handleSendOtp();
    //                     // configureCaptcha();
    //                   }}
    //                 >
    //                   Send Otp
    //                 </label>
    //                 <div id="recaptcha-container"></div>
    //                 <input
    //                   className="inputtag input_elem normal_input"
    //                   type={TEXT}
    //                   id={field.name}
    //                   name={field.name}
    //                   value={
    //                     formData[field.name] || formData[field.dataKey] || ""
    //                   }
    //                   onChange={(e) => handleChange(field, e.target.value)}
    //                   required={field.isRequired}
    //                 />
    //               </div>
    //             )}
    //             {field.type === "emailOtp" && (
    //               <div className="phone-otp-button">
    //                 <label
    //                   onClick={() => {
    //                     // handleSendOtpMail();
    //                   }}
    //                 >
    //                   Send Otp on Mail
    //                 </label>
    //                 <input
    //                   className="inputtag input_elem normal_input"
    //                   type={EMAIL}
    //                   id={field.name}
    //                   name={field.name}
    //                   value={
    //                     formData[field.name] || formData[field.dataKey] || ""
    //                   }
    //                   onChange={(e) => handleChange(field, e.target.value)}
    //                   required={field.isRequired}
    //                 />
    //               </div>
    //             )}
    //             {field.type === "password" && (
    //               <input
    //                 className="inputtag input_elem normal_input"
    //                 type="password"
    //                 id={field.name}
    //                 name={field.name}
    //                 value={
    //                   formData[field.name] || formData[field.dataKey] || ""
    //                 }
    //                 onChange={(e) => handleChange(field, e.target.value)}
    //                 required={field.isRequired}
    //               />
    //             )}
    //             {field.type === "textarea" && (
    //               <textarea
    //                 className="inputtag input_elem textarea border p-3 border-gray-400 outline-none"
    //                 id={field.name}
    //                 name={field.name}
    //                 value={
    //                   formData[field.name] || formData[field.dataKey] || ""
    //                 }
    //                 onChange={(e) => handleChange(field, e.target.value)}
    //                 required={field.isRequired}
    //               />
    //             )}
    //             {field.type === "select" && (
    //               <div>
    //                 <Select
    //                   className="inputtag input_elem"
    //                   id={field.name}
    //                   name={field.name}
    //                   value={
    //                     (formData[field.name] &&
    //                       (typeof formData[field.name] === "string"
    //                         ? {
    //                             label: formData[field.name],
    //                             value: formData[field.name],
    //                           }
    //                         : formData[field.name])) ||
    //                     field.defaultOption
    //                   }
    //                   options={
    //                     field.name === "floorOnePossession" ||
    //                     field.name === "floorTwoPossession" ||
    //                     field.name === "floorThreePossession" ||
    //                     field.name === "floorFourPossession"
    //                       ? masterData?.["possession"]
    //                       : field.options || masterData?.[field.name]
    //                   }
    //                   styles={{
    //                     control: (baseStyles, state) => ({
    //                       ...baseStyles,
    //                       width: "auto",
    //                       display: "flex",
    //                       alignItems: "center",
    //                       border: state.isFocused ? baseStyles.border : "gray",
    //                       borderBottom: "1px solid #ccc",
    //                       borderRadius: state.isFocused
    //                         ? baseStyles.borderRadius
    //                         : "",
    //                       textAlign: "left",
    //                     }),
    //                   }}
    //                   onChange={(selectedOption) => {
    //                     handleChange(field, selectedOption || null);
    //                   }}
    //                   closeMenuOnSelect={!field.isMulti}
    //                   required={field.isRequired}
    //                   isMulti={field.isMulti}
    //                 />
    //                 {field.name === "floor" && <>ho ho ho</>}
    //               </div>
    //             )}
    //             {field.type === "creatable_select" && (
    //               <Creatable
    //                 className="inputtag input_elem"
    //                 id={field.name}
    //                 name={field.name}
    //                 isClearable
    //                 value={
    //                   (formData[field.name] &&
    //                     (typeof formData[field.name] === "string"
    //                       ? {
    //                           label: formData[field.name],
    //                           value: formData[field.name],
    //                         }
    //                       : formData[field.name])) ||
    //                   field.defaultOption
    //                 }
    //                 options={field.options || masterData?.[field.name]}
    //                 styles={{
    //                   control: (baseStyles, state) => ({
    //                     ...baseStyles,
    //                     width: "auto",
    //                     display: "flex",
    //                     alignItems: "center",
    //                     border: state.isFocused ? baseStyles.border : "gray",
    //                     borderBottom: "1px solid #ccc",
    //                     borderRadius: state.isFocused
    //                       ? baseStyles.borderRadius
    //                       : "",
    //                     textAlign: "left",
    //                   }),
    //                 }}
    //                 onChange={(selectedOption) => {
    //                   handleChange(field, selectedOption || null);
    //                 }}
    //                 closeMenuOnSelect={!field.isMulti}
    //                 required={field.isRequired}
    //                 isMulti={field.isMulti}
    //               />
    //             )}
    //             {field.type === "radio" && (
    //               <div className="radio-button-styling radio_options_list">
    //                 {field.options.map((option) => (
    //                   <label key={option.value} className="radio_option_label">
    //                     <input
    //                       className="inputtag normal_input"
    //                       type="radio"
    //                       name={field.name}
    //                       value={option.value}
    //                       checked={
    //                         (formData[field.name] &&
    //                           capitalize(formData[field.name]) ===
    //                             option.value) ||
    //                         capitalize(formData[field.dataKey]) === option.value
    //                       }
    //                       onChange={() => handleChange(field, option.value)}
    //                       required={field.isRequired}
    //                     />
    //                     {option.label}
    //                   </label>
    //                 ))}
    //               </div>
    //             )}
    //             {field.type === "file" && (
    //               <input
    //                 className="file_input"
    //                 type="file"
    //                 name={field.name}
    //                 multiple={field.isMulti}
    //                 onChange={(e) => handleChange(field, e.target.files)}
    //                 accept={field?.acceptedFileTypes}
    //               />
    //             )}
    //             {field.type === "price" && (
    //               <div className={`price_inputs ${field.className}`}>
    //                 <div className="price_unit">
    //                   <input
    //                     className="inputtag input_elem normal_input number_input"
    //                     type="text"
    //                     disabled={field.disabled}
    //                     id={`${field.name}-crore`}
    //                     name={`${field.name}-crore`}
    //                     value={Math.floor(
    //                       (formData[field.name] || 0) / 10000000
    //                     )}
    //                     onChange={(e) =>
    //                       handleCurrencyChange(
    //                         field,
    //                         formData[field.name] || 0
    //                       )(e, "crore")
    //                     }
    //                     required={field.isRequired}
    //                   />
    //                   <label>Cr</label>
    //                 </div>
    //                 <div className="price_unit">
    //                   <input
    //                     className="inputtag input_elem normal_input number_input"
    //                     type="text"
    //                     disabled={field.disabled}
    //                     id={`${field.name}-lakh`}
    //                     name={`${field.name}-lakh`}
    //                     value={
    //                       ((formData[field.name] || 0) % 10000000) / 100000
    //                     }
    //                     onChange={(e) =>
    //                       handleCurrencyChange(
    //                         field,
    //                         formData[field.name] || 0
    //                       )(e, "lakh")
    //                     }
    //                     required={field.isRequired}
    //                   />
    //                   <label>Lakh</label>
    //                 </div>
    //               </div>
    //             )}
    //             {field.type === "size" && (
    //               <div className={`size_input_wrapper ${field.className}`}>
    //                 <input
    //                   className="inputtag input_elem normal_input number_input"
    //                   type={TEXT}
    //                   disabled={field.disabled}
    //                   id={field.name}
    //                   name={field.name}
    //                   value={
    //                     formData[field.name] || formData[field.dataKey] || ""
    //                   }
    //                   onChange={(e) => {
    //                     handleChange(field, e.target.value);
    //                   }}
    //                   required={field.isRequired}
    //                 />
    //                 <Select
    //                   className="inputtag input_elem"
    //                   id={field.nameType}
    //                   name={field.nameType}
    //                   value={
    //                     (formData[field.nameType] &&
    //                       (typeof formData[field.nameType] === "string"
    //                         ? {
    //                             label: formData[field.nameType],
    //                             value: formData[field.nameType],
    //                           }
    //                         : formData[field.nameType])) ||
    //                     field.defaultOption
    //                   }
    //                   styles={{
    //                     control: (baseStyles, state) => ({
    //                       ...baseStyles,
    //                       width: "auto",
    //                       display: "flex",
    //                       alignItems: "center",
    //                       border: state.isFocused ? baseStyles.border : "gray",
    //                       borderBottom: "1px solid #ccc",
    //                       borderRadius: state.isFocused
    //                         ? baseStyles.borderRadius
    //                         : "",
    //                       textAlign: "left",
    //                     }),
    //                   }}
    //                   options={field.options || masterData?.[field.name]}
    //                   onChange={(selectedOption) =>
    //                     handleChange(
    //                       { ...field, name: field.nameType },
    //                       selectedOption || null
    //                     )
    //                   }
    //                   required={field.isRequired}
    //                 />
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //         <span className="input_validation_error_msg">
    //           {fieldErrors[field.name] && <p>{fieldErrors[field.name]}</p>}
    //         </span>
    //       </div>
    //     ))}
    //   </div>
    // </form>
    <form className="max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields?.map((field) => (
          <div key={field.name} className={`mb-4 ${field.parentclassName}`}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={field.name}
            >
              {field.label}
            </label>
            <div
              className={`mb-4 ${field.parentclassName} ${
                field.type === "textarea" ? "md:col-span-1" : ""
              }`}
            >
              {field.type === "text" && (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  disabled={field.disabled}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.isRequired}
                />
              )}

              {field.type === "email" && (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.isRequired}
                />
              )}

              {field.type === "phoneOTP" && (
                <div className="flex items-center">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={
                      formData[field.name] || formData[field.dataKey] || ""
                    }
                    onChange={(e) => handleChange(field, e.target.value)}
                    required={field.isRequired}
                  />
                  <button
                    type="button"
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      // handleSendOtp();
                      // configureCaptcha();
                    }}
                  >
                    Send OTP
                  </button>
                </div>
              )}

              {field.type === "emailOtp" && (
                <div className="flex items-center">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={
                      formData[field.name] || formData[field.dataKey] || ""
                    }
                    onChange={(e) => handleChange(field, e.target.value)}
                    required={field.isRequired}
                  />
                  <button
                    type="button"
                    className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      // handleSendOtpMail();
                    }}
                  >
                    Send OTP
                  </button>
                </div>
              )}

              {field.type === "password" && (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || formData[field.dataKey] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.isRequired}
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || formData[field.dataKey] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required={field.isRequired}
                />
              )}

              {field.type === "select" && (
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  id={field.name}
                  name={field.name}
                  value={
                    (formData[field.name] &&
                      (typeof formData[field.name] === "string"
                        ? {
                            label: formData[field.name],
                            value: formData[field.name],
                          }
                        : formData[field.name])) ||
                    field.defaultOption
                  }
                  options={
                    field.name === "floorOnePossession" ||
                    field.name === "floorTwoPossession" ||
                    field.name === "floorThreePossession" ||
                    field.name === "floorFourPossession"
                      ? masterData?.["possession"]
                      : field.options || masterData?.[field.name]
                  }
                  onChange={(selectedOption) => {
                    handleChange(field, selectedOption || null);
                  }}
                  closeMenuOnSelect={!field.isMulti}
                  required={field.isRequired}
                  isMulti={field.isMulti}
                />
              )}

              {field.type === "creatable_select" && (
                <Creatable
                  className="react-select-container"
                  classNamePrefix="react-select"
                  id={field.name}
                  name={field.name}
                  isClearable
                  value={
                    (formData[field.name] &&
                      (typeof formData[field.name] === "string"
                        ? {
                            label: formData[field.name],
                            value: formData[field.name],
                          }
                        : formData[field.name])) ||
                    field.defaultOption
                  }
                  options={field.options || masterData?.[field.name]}
                  onChange={(selectedOption) => {
                    handleChange(field, selectedOption || null);
                  }}
                  closeMenuOnSelect={!field.isMulti}
                  required={field.isRequired}
                  isMulti={field.isMulti}
                />
              )}

              {field.type === "radio" && (
                <div className="mt-2 space-y-2">
                  {field.options.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex items-center"
                    >
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name={field.name}
                        value={option.value}
                        checked={
                          (formData[field.name] &&
                            capitalize(formData[field.name]) ===
                              option.value) ||
                          capitalize(formData[field.dataKey]) === option.value
                        }
                        onChange={() => handleChange(field, option.value)}
                        required={field.isRequired}
                      />
                      <span className="ml-2">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {field.type === "file" && (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  name={field.name}
                  multiple={field.isMulti}
                  onChange={(e) => handleChange(field, e.target.files)}
                  accept={field?.acceptedFileTypes}
                />
              )}

              {field.type === "price" && (
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      disabled={field.disabled}
                      id={`${field.name}-crore`}
                      name={`${field.name}-crore`}
                      value={Math.floor((formData[field.name] || 0) / 10000000)}
                      onChange={(e) =>
                        handleCurrencyChange(field, formData[field.name] || 0)(
                          e,
                          "crore"
                        )
                      }
                      required={field.isRequired}
                    />
                    <label className="block text-gray-700 text-xs font-bold mt-1">
                      Cr
                    </label>
                  </div>
                  <div className="flex-1">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      disabled={field.disabled}
                      id={`${field.name}-lakh`}
                      name={`${field.name}-lakh`}
                      value={((formData[field.name] || 0) % 10000000) / 100000}
                      onChange={(e) =>
                        handleCurrencyChange(field, formData[field.name] || 0)(
                          e,
                          "lakh"
                        )
                      }
                      required={field.isRequired}
                    />
                    <label className="block text-gray-700 text-xs font-bold mt-1">
                      Lakh
                    </label>
                  </div>
                </div>
              )}

              {field.type === "size" && (
                <div className="flex space-x-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    disabled={field.disabled}
                    id={field.name}
                    name={field.name}
                    value={
                      formData[field.name] || formData[field.dataKey] || ""
                    }
                    onChange={(e) => {
                      handleChange(field, e.target.value);
                    }}
                    required={field.isRequired}
                  />
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    id={field.nameType}
                    name={field.nameType}
                    value={
                      (formData[field.nameType] &&
                        (typeof formData[field.nameType] === "string"
                          ? {
                              label: formData[field.nameType],
                              value: formData[field.nameType],
                            }
                          : formData[field.nameType])) ||
                      field.defaultOption
                    }
                    options={field.options || masterData?.[field.name]}
                    onChange={(selectedOption) =>
                      handleChange(
                        { ...field, name: field.nameType },
                        selectedOption || null
                      )
                    }
                    required={field.isRequired}
                  />
                </div>
              )}
            </div>
            {fieldErrors[field.name] && (
              <p className="text-red-500 text-xs italic mt-1">
                {fieldErrors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>
    </form>
  );
});

FormBuilder.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        TEXT,
        EMAIL,
        "password",
        "textarea",
        "select",
        "radio",
        "file",
      ]).isRequired,
      isRequired: PropTypes.bool.isRequired,
      regex: PropTypes.instanceOf(RegExp),
      regexErrorMessage: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onFormDataChange: PropTypes.func.isRequired,
};

export default FormBuilder;
