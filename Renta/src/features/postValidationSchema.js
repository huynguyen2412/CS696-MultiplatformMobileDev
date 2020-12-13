import * as Yup from 'yup';

export default validSchema = Yup.object().shape({
  price: Yup.string()
    .matches(/^[0-9\,\.]*$/, 'Price is not valid')
    .required('Price is empty'),
  room: Yup.string()
    .required('Room and area are required'),
  street: Yup.string()
    .required('Street is required'),
  city: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'City is not valid')
    .required('City is required'),    
  state: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'State is not valid')
    .required('State is required'),    
  zipcode: Yup.string()
    .matches(/^[0-9]*$/, 'Zipcode is not valid')
    .required('Zipcode is required')    
});
