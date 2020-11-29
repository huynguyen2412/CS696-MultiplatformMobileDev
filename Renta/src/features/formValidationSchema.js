import * as Yup from 'yup';

export const validSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z\t\s]*$/, 'First name is not valid')
    .required('First name cannot empty'),
  lastName: Yup.string()
    .matches(/^[a-zA-Z\t\s]*$/, 'Last name is not valid')
    .required('Last name cannot empty'),
  email: Yup.string()
    .email('Email is not valid')
    .required('Email cannot empty'),
  userName: Yup.string()
    .matches(/^[a-zA-Z0-9]{1,20}$/, 'Username only alphanumeric and length 1-20')
    .required('Username cannot empty'),
  passWord: Yup.string()
    .required('Password is empty')
    .matches(/^[a-zA-Z](?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Invalid Password')
});
