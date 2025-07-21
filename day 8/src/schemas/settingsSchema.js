
import * as yup from 'yup';

export const settingsSchema = yup.object().shape({
  companyName: yup.string().required('Company name is required'),
  address: yup.string().required('Address is required'),
  contact: yup.string().required('Contact is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
});
