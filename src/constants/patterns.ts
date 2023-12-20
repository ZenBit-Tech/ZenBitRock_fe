export const patterns = {
  name: /^[a-zA-Z\s]{2,50}$/,
  street: /^[a-zA-Z0-9,.\-\s]{2,100}$/,
  city: /^[a-zA-Z0-9,.\-\s]{2,50}$/,
  state: /^([a-zA-Z0-9\s,.-]{2,100})?$/,
  phone: /^\+?\d{3,15}$/,
  phoneEdit: /^\+?[\d\s().-]{7,20}$/,
  zipCode: /^[a-zA-Z0-9,.-]{5,15}$/,
  email:
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  password: /^.{8,}$/i,
  about: /^[a-zA-Z0-9,.\-\s]{1,300}$/,
  agency: /^[a-zA-Z0-9,.\-\s]{2,30}$/,
};
