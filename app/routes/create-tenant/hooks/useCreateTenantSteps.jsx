import { useEffect } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router";
import {
  TenantProfile,
  ContactDetails,
  BrandConfiguration,
  AccessControl,
  StatusManagement,
  PlanManagement,
  AdministratorAccount,
} from "../components";
import { CREATE_TENANT_STEPS } from "../constants";
import { CREATE_TENANT_STEP_SCHEMAS } from "../schema";
import {
  buildCreateTenantSearch,
  getStepById,
  isStepFormEditable,
  STEP_QUERY_PARAM,
  TENANT_QUERY_PARAM,
} from "../utils";

export function useCreateTenantSteps() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    activeSecondary,
    setActiveSecondary,
    updateTenantStep,
    tenantSteps,
  } = useOutletContext();

  const tenantId = searchParams.get(TENANT_QUERY_PARAM);
  const stepIdFromUrl = searchParams.get(STEP_QUERY_PARAM);

  const currentStepIndex = tenantSteps.findIndex((s) => s.label === activeSecondary);
  const stepValidationSchema = CREATE_TENANT_STEP_SCHEMAS[activeSecondary] ?? undefined;

  const hasTenant = Boolean(tenantId);
  const isProfileLocked =
    activeSecondary === CREATE_TENANT_STEPS.TENANT_PROFILE && hasTenant;
  const isFormEditable = isStepFormEditable(currentStepIndex, tenantSteps, hasTenant);
  const showSaveAndContinue = isFormEditable && !hasTenant;
  const isLastStep = currentStepIndex === tenantSteps.length - 1;
  const progressPercent = ((currentStepIndex + 1) / tenantSteps.length) * 100;

  useEffect(() => {
    if (!stepIdFromUrl) return;
    const step = getStepById(stepIdFromUrl);
    if (step && step.label !== activeSecondary) {
      setActiveSecondary(step.label);
    }
  }, [stepIdFromUrl, activeSecondary, setActiveSecondary]);

  const navigateToStep = (nextTenantId, nextStepId) => {
    navigate(buildCreateTenantSearch({ tenantId: nextTenantId, stepId: nextStepId }), {
      replace: true,
    });
    const step = getStepById(nextStepId);
    if (step) setActiveSecondary(step.label);
  };

  const goToPreviousStep = () => {
    if (currentStepIndex <= 0) return;
    const prev = tenantSteps[currentStepIndex - 1];
    if (tenantId) {
      navigateToStep(tenantId, prev.id);
    } else {
      setActiveSecondary(prev.label);
    }
  };

  const goToNextStep = (resolvedTenantId) => {
    if (currentStepIndex >= tenantSteps.length - 1) {
      navigate("/tenants", { replace: true });
      return;
    }
    const nextStep = tenantSteps[currentStepIndex + 1];
    navigateToStep(resolvedTenantId ?? tenantId, nextStep.id);
  };

  const goToNextStepWithoutSave = () => {
    goToNextStep(tenantId);
  };

  const handleCancel = () => {
    navigate(tenantId ? "/tenants" : "/dashboard");
  };

  const renderStepContent = (formik, showErrors) => {
    const stepProps = { showErrors, ...formik };
    switch (activeSecondary) {
      case CREATE_TENANT_STEPS.TENANT_PROFILE:
        return <TenantProfile {...stepProps} profileLocked={hasTenant} />;
      case CREATE_TENANT_STEPS.CONTACT_DETAILS:
        return <ContactDetails {...stepProps} />;
      case CREATE_TENANT_STEPS.BRAND_CONFIGURATION:
        return <BrandConfiguration {...stepProps} />;
      case CREATE_TENANT_STEPS.ACCESS_CONTROL:
        return <AccessControl {...stepProps} />;
      case CREATE_TENANT_STEPS.STATUS_MANAGEMENT:
        return <StatusManagement {...stepProps} />;
      case CREATE_TENANT_STEPS.PLAN_MANAGEMENT:
        return <PlanManagement {...stepProps} />;
      case CREATE_TENANT_STEPS.ADMINISTRATOR_ACCOUNT:
        return <AdministratorAccount {...stepProps} />;
      default:
        return null;
    }
  };

  return {
    tenantId,
    stepIdFromUrl,
    activeSecondary,
    tenantSteps,
    currentStepIndex,
    stepValidationSchema,
    hasTenant,
    isProfileLocked,
    isFormEditable,
    showSaveAndContinue,
    isLastStep,
    progressPercent,
    goToPreviousStep,
    goToNextStep,
    goToNextStepWithoutSave,
    handleCancel,
    renderStepContent,
    updateTenantStep,
  };
}
