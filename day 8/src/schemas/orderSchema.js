
import * as yup from 'yup';

export const orderSchema = yup.object().shape({
  customer: yup.string().required('Customer is required'),
  address: yup.string().required('Address is required'),
  items: yup.array().of(
    yup.object({
      name: yup.string().required('Item name required'),
      qty: yup.number().min(1).required('Quantity required'),
    })
  ).min(1, 'At least one item'),
  urgent: yup.boolean(),
  notes: yup.string().when('urgent', {
    is: true,
    then: s => s.required('Notes required for urgent orders'),
    otherwise: s => s,
  }),
});
