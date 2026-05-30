import {
  ACCESS_CONTROL_TOGGLES,
  CREATE_TENANT_STEPS,
  EMPTY_FAVICONS,
  FAVICON_FIELDS,
  PRIMARY_COLOR_TYPES,
  TENANT_CREATION_STEPS,
} from '../constants';

// --- API helpers (load / save) ---

function toFormBool(value, defaultValue = false) {
  if (value === true || value === 1 || value === '1') return true;
  if (value === false || value === 0 || value === '0') return false;
  return defaultValue;
}

function readApiColor(colors, apiKey, alternateKey) {
  if (!colors) return undefined;
  if (colors[apiKey] != null) return colors[apiKey];
  if (alternateKey && colors[alternateKey] != null) return colors[alternateKey];
  return undefined;
}

function readMetadataText(settings, metadata, key) {
  const fromMeta = metadata?.[key];
  if (fromMeta != null && fromMeta !== '' && !isSettingFlagValue(fromMeta)) {
    return String(fromMeta);
  }

  const fromSettings = settings?.[key];
  if (fromSettings == null || isSettingFlagValue(fromSettings)) return '';
  return String(fromSettings);
}

function isSettingFlagValue(value) {
  return (
    value === '0' ||
    value === '1' ||
    value === 0 ||
    value === 1 ||
    value === true ||
    value === false
  );
}

function metadataPrimaryColorKey(type) {
  return `metadata[colors][primary-${type}]`;
}

function metadataSecondaryColorKey(formKey) {
  return `metadata[colors][secondary-${formKey}]`;
}

// --- Wizard UI ---

export const TENANT_QUERY_PARAM = 'tenant';
export const STEP_QUERY_PARAM = 'step';

export function getStepSuccessMessage(stepLabel, isNewTenant) {
  if (stepLabel === CREATE_TENANT_STEPS.TENANT_PROFILE && isNewTenant) {
    return 'Tenant created successfully.';
  }
  if (stepLabel === CREATE_TENANT_STEPS.ADMINISTRATOR_ACCOUNT) {
    return 'Tenant setup completed.';
  }
  return `${stepLabel} was saved.`;
}

export function getPrimaryButtonLabel({ isSaving, isLastStep, showSaveAndContinue }) {
  if (isSaving) return 'Saving…';
  if (isLastStep) return 'Complete Setup';
  if (showSaveAndContinue) return 'Save & Continue';
  return 'Next';
}

export function getStepById(stepId) {
  return TENANT_CREATION_STEPS.find((s) => s.id === stepId);
}

export function getStepByLabel(label) {
  return TENANT_CREATION_STEPS.find((s) => s.label === label);
}

export function getStepIndex(stepId) {
  return TENANT_CREATION_STEPS.findIndex((s) => s.id === stepId);
}

export function buildCreateTenantSearch({ tenantId, stepId }) {
  const params = new URLSearchParams();
  if (tenantId) params.set(TENANT_QUERY_PARAM, tenantId);
  if (stepId) params.set(STEP_QUERY_PARAM, stepId);
  const query = params.toString();
  return query ? `/create-tenant?${query}` : '/create-tenant';
}

export function deriveTenantStepsProgress(steps, stepId, hasTenant) {
  const currentIndex = stepId ? getStepIndex(stepId) : 0;
  const safeIndex = currentIndex < 0 ? 0 : currentIndex;

  return steps.map((step, index) => ({
    ...step,
    completed:
      step.completed ||
      (hasTenant && index === 0) ||
      (hasTenant && index < safeIndex),
  }));
}

export function getMaxEditableStepIndex(steps, hasTenant) {
  let lastCompleted = -1;
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].completed) lastCompleted = i;
  }
  if (hasTenant && lastCompleted < 0) return 0;
  return lastCompleted + 1;
}

export function isTenantProfileLocked(hasTenant, stepIndex = 0) {
  return hasTenant && stepIndex === 0;
}

export function isStepFormEditable(stepIndex, steps, hasTenant) {
  if (isTenantProfileLocked(hasTenant, stepIndex)) return false;
  return stepIndex <= getMaxEditableStepIndex(steps, hasTenant);
}

// --- Payload (form → API) ---

function appendIfPresent(formData, key, value) {
  if (value !== undefined && value !== null && value !== '') {
    formData.append(key, value);
  }
}

function appendBooleanSetting(formData, key, value) {
  formData.append(`settings[${key}]`, value ? '1' : '0');
}

function appendMetadataColors(formData, values) {
  PRIMARY_COLOR_TYPES.forEach((type) => {
    appendIfPresent(formData, metadataPrimaryColorKey(type), values[`primary_${type}`]);
  });

  Object.entries(values.secondary_colors || {}).forEach(([key, color]) => {
    appendIfPresent(formData, metadataSecondaryColorKey(key), color);
  });
}

function appendSettings(formData, accessControl) {
  const settings = accessControl || {};

  ACCESS_CONTROL_TOGGLES.forEach(({ key }) => {
    appendBooleanSetting(formData, key, Boolean(settings[key]));
  });

  // API expects phone / URL in settings (not 0/1). Toggles are ENABLE_* only.
  if (settings.ENABLE_WHATSAPP_COMM) {
    appendIfPresent(
      formData,
      'settings[WHATSAPP_COMM_NUMBER]',
      settings.whatsapp_comm_number?.trim()
    );
  }

  if (settings.ENABLE_EXTERNAL_MERCHANDISE_MODULE) {
    appendIfPresent(
      formData,
      'settings[EXTERNAL_MERCHANDISE_MODULE_LINK]',
      settings.external_merchandise_module_link?.trim()
    );
  }
}

function buildCreateTenantFormData(values) {
  const formData = new FormData();
  formData.append('name', values.name);
  formData.append('brand_name', values.brand_name);
  formData.append('domain', values.domain);
  if (values.logo instanceof File) {
    formData.append('logo', values.logo);
  }
  return formData;
}

function buildProfileUpdateFormData(tenantId, values) {
  const formData = new FormData();
  formData.append('uuid', tenantId);
  appendIfPresent(formData, 'name', values.name);
  appendIfPresent(formData, 'brand_name', values.brand_name);
  appendIfPresent(formData, 'domain', values.domain);
  if (values.logo instanceof File) {
    formData.append('logo', values.logo);
  }
  return formData;
}

function buildContactUpdateFormData(tenantId, values) {
  const formData = new FormData();
  formData.append('uuid', tenantId);
  appendIfPresent(formData, 'description', values.description);
  appendIfPresent(formData, 'contact_name', values.contact_name);
  appendIfPresent(formData, 'contact_email', values.contact_email);
  appendIfPresent(formData, 'contact_phone', values.contact_phone);
  return formData;
}

function buildBrandColorsUpdateFormData(tenantId, values) {
  const formData = new FormData();
  formData.append('uuid', tenantId);
  appendMetadataColors(formData, values);
  return formData;
}

function buildAccessControlUpdateFormData(tenantId, values) {
  const formData = new FormData();
  formData.append('uuid', tenantId);
  appendSettings(formData, values.access_control);
  return formData;
}

function buildFaviconAssetsFormData(favicons) {
  const formData = new FormData();
  formData.append('type', 'favicons');

  let hasFile = false;
  FAVICON_FIELDS.forEach(({ key }) => {
    const file = favicons?.[key];
    if (file instanceof File) {
      formData.append(`favicons[${key}]`, file);
      hasFile = true;
    }
  });

  return hasFile ? formData : null;
}

function buildAnimationAssetsFormData(animationFile) {
  if (!(animationFile instanceof File)) return null;

  const formData = new FormData();
  formData.append('type', 'animations');
  formData.append('animations[logo]', animationFile);
  return formData;
}

function buildStatusPayload(values) {
  return {
    status: Number(values.status),
    suspended_reason: '',
  };
}

function toAdminUserPayload(admin) {
  return {
    first_name: admin.first_name,
    last_name: admin.last_name,
    email: admin.email,
    name: admin.username,
  };
}

function isHeadAdminFilled(admin) {
  return Boolean(
    admin?.first_name?.trim() ||
      admin?.last_name?.trim() ||
      admin?.email?.trim() ||
      admin?.username?.trim()
  );
}

// --- Map tenant (API → form) ---

function mapProfileFields(tenant, defaults) {
  return {
    name: tenant.name ?? defaults.name,
    brand_name: tenant.brand_name ?? defaults.brand_name,
    domain: tenant.domain ?? defaults.domain,
    logo: defaults.logo,
  };
}

function mapContactFields(tenant, defaults) {
  return {
    description: tenant.description ?? defaults.description,
    contact_name: tenant.contact_name ?? defaults.contact_name,
    contact_email: tenant.contact_email ?? defaults.contact_email,
    contact_phone: tenant.contact_phone ?? defaults.contact_phone,
  };
}

function mapBrandColors(colors, defaults) {
  const primary = {};
  PRIMARY_COLOR_TYPES.forEach((type) => {
    const formKey = `primary_${type}`;
    primary[formKey] =
      readApiColor(colors, `primary-${type}`, formKey) ?? defaults[formKey];
  });

  const secondary_colors = { ...defaults.secondary_colors };
  Object.keys(secondary_colors).forEach((key) => {
    secondary_colors[key] =
      readApiColor(colors, `secondary-${key}`, key) ?? defaults.secondary_colors[key];
  });

  return { ...primary, secondary_colors };
}

function mapFavicons(faviconsFromApi) {
  const result = { ...EMPTY_FAVICONS };
  if (!faviconsFromApi || typeof faviconsFromApi !== 'object') return result;

  FAVICON_FIELDS.forEach(({ key }) => {
    const value = faviconsFromApi[key];
    if (value != null && String(value).trim() !== '') {
      result[key] = String(value);
    }
  });

  return result;
}

function mapAnimation(tenant) {
  const logo = tenant?.animations?.logo ?? tenant?.anims;
  if (logo == null || logo === '') return null;
  if (logo instanceof File) return logo;
  return String(logo);
}

function mapAccessControl(settings, metadata, defaults) {
  const toggles = ACCESS_CONTROL_TOGGLES.reduce((acc, { key }) => {
    acc[key] = toFormBool(settings[key], defaults[key]);
    return acc;
  }, {});

  return {
    ...toggles,
    whatsapp_comm_number: readMetadataText(settings, metadata, 'WHATSAPP_COMM_NUMBER'),
    external_merchandise_module_link: readMetadataText(
      settings,
      metadata,
      'EXTERNAL_MERCHANDISE_MODULE_LINK'
    ),
  };
}

export function mapTenantToFormValues(tenant, initialValues) {
  if (!tenant) return initialValues;

  const colors = tenant.metadata?.colors ?? tenant.metadata ?? {};
  const settings = tenant.settings ?? {};
  const metadata = tenant.metadata ?? {};

  return {
    ...initialValues,
    ...mapProfileFields(tenant, initialValues),
    ...mapContactFields(tenant, initialValues),
    ...mapBrandColors(colors, initialValues),
    favicons: mapFavicons(tenant.favicons),
    anims: mapAnimation(tenant) ?? initialValues.anims,
    access_control: mapAccessControl(settings, metadata, initialValues.access_control),
    status: tenant.status != null ? String(tenant.status) : initialValues.status,
  };
}

// --- Submit step ---

export async function submitCreateTenantStep({
  stepLabel,
  values,
  tenantId,
  createTenant,
  updateTenant,
  updateTenantStatus,
  uploadTenantAssets,
  createMasterAdmin,
  createHeadAdmin,
}) {
  switch (stepLabel) {
    case CREATE_TENANT_STEPS.TENANT_PROFILE: {
      if (tenantId) {
        await updateTenant({
          tenantId,
          formData: buildProfileUpdateFormData(tenantId, values),
        }).unwrap();
        return { tenantId };
      }

      const created = await createTenant(buildCreateTenantFormData(values)).unwrap();
      const newTenantId = created?.uuid;
      if (!newTenantId) {
        throw new Error('Tenant was created but no uuid was returned.');
      }
      return { tenantId: newTenantId };
    }

    case CREATE_TENANT_STEPS.CONTACT_DETAILS: {
      if (!tenantId) throw new Error('Tenant id is required.');
      await updateTenant({
        tenantId,
        formData: buildContactUpdateFormData(tenantId, values),
      }).unwrap();
      return { tenantId };
    }

    case CREATE_TENANT_STEPS.BRAND_CONFIGURATION: {
      if (!tenantId) throw new Error('Tenant id is required.');

      await updateTenant({
        tenantId,
        formData: buildBrandColorsUpdateFormData(tenantId, values),
      }).unwrap();

      const faviconFormData = buildFaviconAssetsFormData(values.favicons);
      if (faviconFormData) {
        await uploadTenantAssets({ tenantId, formData: faviconFormData }).unwrap();
      }

      const animationFormData = buildAnimationAssetsFormData(values.anims);
      if (animationFormData) {
        await uploadTenantAssets({ tenantId, formData: animationFormData }).unwrap();
      }

      return { tenantId };
    }

    case CREATE_TENANT_STEPS.ACCESS_CONTROL: {
      if (!tenantId) throw new Error('Tenant id is required.');
      await updateTenant({
        tenantId,
        formData: buildAccessControlUpdateFormData(tenantId, values),
      }).unwrap();
      return { tenantId };
    }

    case CREATE_TENANT_STEPS.STATUS_MANAGEMENT: {
      if (!tenantId) throw new Error('Tenant id is required.');
      await updateTenantStatus({
        tenantId,
        statusData: buildStatusPayload(values),
      }).unwrap();
      return { tenantId };
    }

    case CREATE_TENANT_STEPS.PLAN_MANAGEMENT:
      return { tenantId };

    case CREATE_TENANT_STEPS.ADMINISTRATOR_ACCOUNT: {
      if (!tenantId) throw new Error('Tenant id is required.');

      await createMasterAdmin({
        tenantId,
        userData: toAdminUserPayload(values.master_admin),
      }).unwrap();

      for (const headAdmin of values.head_admins) {
        if (!isHeadAdminFilled(headAdmin)) continue;
        await createHeadAdmin({
          tenantId,
          userData: toAdminUserPayload(headAdmin),
        }).unwrap();
      }

      return { tenantId };
    }

    default:
      return { tenantId };
  }
}
