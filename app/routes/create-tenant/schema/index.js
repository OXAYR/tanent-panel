import * as Yup from 'yup';
import { LOGO_MAX_BYTES, validateLogoFile } from '@/lib/logo-file';
import { validateLottieJsonFile } from '@/lib/lottie-json-file';
import { CREATE_TENANT_STEPS } from '../constants';

const domainPattern =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

const hexColor = Yup.string().matches(
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  'Must be a valid hex color'
);

const adminUserFields = {
  first_name: Yup.string().trim().required('First name is required'),
  last_name: Yup.string().trim().required('Last name is required'),
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  username: Yup.string().trim().required('Username is required'),
};

const adminUserSchema = Yup.object(adminUserFields);

export const tenantProfileSchema = Yup.object({
  name: Yup.string().trim().required('Tenant name is required'),
  brand_name: Yup.string().trim().required('Brand name is required'),
  domain: Yup.string()
    .trim()
    .required('Domain is required')
    .matches(domainPattern, 'Enter a valid domain (e.g. acme.example.com)'),
  logo: Yup.mixed()
    .nullable()
    .test('logo-file', 'Logo must be a PNG file', (value) => {
      if (value == null || typeof value === 'string') return true;
      if (!(value instanceof File)) return true;
      return validateLogoFile(value) === null;
    })
    .test('logo-size', 'Logo must be 2MB or smaller', (value) => {
      if (!(value instanceof File)) return true;
      return value.size <= LOGO_MAX_BYTES;
    }),
});

export const contactDetailsSchema = Yup.object({
  description: Yup.string().trim().max(500, 'Description must be 500 characters or less'),
  contact_name: Yup.string().trim().required('Contact name is required'),
  contact_email: Yup.string()
    .trim()
    .email('Enter a valid email')
    .required('Contact email is required'),
  contact_phone: Yup.string().trim(),
});

export const brandConfigurationSchema = Yup.object({
  primary_main: hexColor.required('Primary main color is required'),
  primary_mid: hexColor.required('Primary mid color is required'),
  primary_deep: hexColor.required('Primary deep color is required'),
  primary_soft: hexColor.required('Primary soft color is required'),
  secondary_colors: Yup.object({
    c1r1: hexColor,
    c1r2: hexColor,
    c1r3: hexColor,
    c2r1: hexColor,
    c2r2: hexColor,
    c2r3: hexColor,
    c2r4: hexColor,
    c2r5: hexColor,
    c2r6: hexColor,
  }),
  anims: Yup.mixed()
    .nullable()
    .test('lottie-json', 'Upload a valid Lottie JSON file (.json)', (value) => {
      if (value == null || typeof value === 'string') return true;
      if (!(value instanceof File)) return true;
      return validateLottieJsonFile(value) === null;
    }),
});

export const accessControlSchema = Yup.object({
  access_control: Yup.object({
    whatsapp_comm_number: Yup.string().when('ENABLE_WHATSAPP_COMM', {
      is: true,
      then: (schema) => schema.trim().required('WhatsApp number is required when enabled'),
      otherwise: (schema) => schema,
    }),
    external_merchandise_module_link: Yup.string().when(
      'ENABLE_EXTERNAL_MERCHANDISE_MODULE',
      {
        is: true,
        then: (schema) =>
          schema
            .trim()
            .url('Enter a valid URL')
            .required('External merchandise link is required when enabled'),
        otherwise: (schema) => schema,
      }
    ),
  }),
});

export const statusSchema = Yup.object({
  status: Yup.string().oneOf(['0', '1'], 'Select a valid status').required('Status is required'),
});

export const administratorSchema = Yup.object({
  master_admin: adminUserSchema,
  head_admins: Yup.array()
    .of(Yup.object(adminUserFields))
    .test('first-head-admin', 'First head administrator is required', (admins) => {
      const first = admins?.[0];
      if (!first) return false;
      try {
        adminUserSchema.validateSync(first, { abortEarly: true });
        return true;
      } catch {
        return false;
      }
    }),
});

export const CREATE_TENANT_STEP_SCHEMAS = {
  [CREATE_TENANT_STEPS.TENANT_PROFILE]: tenantProfileSchema,
  [CREATE_TENANT_STEPS.CONTACT_DETAILS]: contactDetailsSchema,
  [CREATE_TENANT_STEPS.BRAND_CONFIGURATION]: brandConfigurationSchema,
  [CREATE_TENANT_STEPS.ACCESS_CONTROL]: accessControlSchema,
  [CREATE_TENANT_STEPS.STATUS_MANAGEMENT]: statusSchema,
  [CREATE_TENANT_STEPS.PLAN_MANAGEMENT]: null,
  [CREATE_TENANT_STEPS.ADMINISTRATOR_ACCOUNT]: administratorSchema,
};
