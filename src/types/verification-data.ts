export interface VerificationData {
  firstName: string;
  lastName: string;
  rolesAutocomplete: { value: string; label: string } | null;
  genderRadioGroup: string;
  dateOfBirth: Date | null;
  nationalityAutocomplete: { value: string; label: string } | null;
  identityRadioGroup: string;
  statusRadioGroup: string;
  street: string;
  city: string;
  state: string;
  countryAutocomplete: { value: string; label: string } | null;
  zip: string;
  phone: string;
  singleUpload: File | string | null;
  confirmationCheckbox: boolean;
  confirmationFirstName: string;
  confirmationLastName: string;
}
