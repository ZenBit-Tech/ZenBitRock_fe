export interface VerificationData {
  firstName: string;
  lastName: string;
  rolesAutocomplete: Object | null;
  genderRadioGroup: string;
  dateOfBirth: Date | null;
  nationalityAutocomplete: Object | null;
  identityRadioGroup: string;
  statusRadioGroup: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  countryAutocomplete: Object | null;
  phone: string;
  singleUpload: File | null;
  confirmationCheckbox: boolean;
}
