// src/utils/validateForm.js
export function validateRequired(fields, values) {
  for (const field of fields) {
    if (!values[field] || values[field].trim() === "") {
      return `El campo ${field} es obligatorio`;
    }
  }
  return null;
}
