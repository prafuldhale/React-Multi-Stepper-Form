// constants.js (or a dedicated constants file)
export const pincodeAPIURL = "https://api.postalpincode.in/pincode/";
export const relations = [
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Husband",
  "Wife",
  "Grandfather",
  "Grandmother",
  "Grandson",
  "Granddaughter",
  "Brother",
  "Sister",
];

export const identityNumberRegex = [
  /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  /^\d{12}$/,
  /^[A-Z][0-9]{8}$/,
];
export const today = new Date().toISOString().split('T')[0];
export const maxDate = "1950-01-01"
export const timeline = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });