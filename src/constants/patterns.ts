export const patterns = {
  name: /^[a-zA-Z\s]{2,50}$/,
  street: /^[a-zA-Z0-9,.\-\s]{2,100}$/,
  city: /^[a-zA-Z0-9,.\-\s]{2,100}$/,
  state: /^([a-zA-Z0-9\s,.\-]{2,100})?$/,
  phone: /^\+?\d{3,15}$/,
  zipCode: /^[a-zA-Z0-9,.\-]{5,15}$/,
};
