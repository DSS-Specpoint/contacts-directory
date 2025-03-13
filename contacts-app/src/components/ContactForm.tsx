import React, { useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Contact } from '../models/contact';

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (contact: Contact) => void;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSubmit, onCancel }) => {
  const formik = useFormik({
      initialValues: {
        firstName: contact?.firstName || '',
        lastName: contact?.lastName || '',
        email: contact?.email || '',
        phoneNumber: contact?.phoneNumber || '',
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required('First name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phoneNumber: Yup.string()
          .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
          .required('Phone number is required'),
      }),
      onSubmit: async (values, { setSubmitting, setErrors }) => {
        try {
          await onSubmit(values);
        } catch (error) {
          if (error instanceof Error) {
            setErrors({ submit: error.message } as any);
          }
        } finally {
          setSubmitting(false);
        }
      },
    });

  useEffect(() => {
    if (contact) {
      formik.setValues(contact);
    }
  }, [contact]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <TextField
        label="First Name"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        margin="normal"
        required
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        margin="normal"
        required
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        margin="normal"
        required
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
      />
      <Box display="flex" justifyContent="space-between">
        <Button type="submit" variant="contained" color="primary">
          {contact ? 'Update' : 'Create'} Contact
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;