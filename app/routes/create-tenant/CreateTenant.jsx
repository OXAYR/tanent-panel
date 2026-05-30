import { useState, useEffect, useMemo, useRef } from "react";
import { Formik, Form } from "formik";
import { Card, Button, PageHeader, StepIndicator } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import {
  CREATE_TENANT_STEPS,
  INITIAL_FORM_DATA,
  TIP_THEMES,
  CREATE_TENANT_TIPS,
} from "./constants";
import { useCreateTenantSteps } from "./hooks/useCreateTenantSteps";
import { touchAllFields, flattenErrorMessages } from "@/lib/formik-nested";
import { getApiErrorMessage } from "@/shared";
import { toast } from "sonner";
import {
  useCreateTenantMutation,
  useGetTenantQuery,
  useUpdateTenantMutation,
  useUpdateTenantStatusMutation,
} from "@/store/api/tenantApi";
import { useUploadTenantAssetsMutation } from "@/store/api/assetsApi";
import {
  useCreateHeadAdminMutation,
  useCreateMasterAdminMutation,
} from "@/store/api/userApi";
import {
  getPrimaryButtonLabel,
  getStepSuccessMessage,
  mapTenantToFormValues,
  submitCreateTenantStep,
} from "./utils";

export function CreateTenant() {
  const [apiError, setApiError] = useState(null);
  const [validationMessages, setValidationMessages] = useState([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const hasMarkedProfileComplete = useRef(false);

  const [createTenant] = useCreateTenantMutation();
  const [updateTenant] = useUpdateTenantMutation();
  const [updateTenantStatus] = useUpdateTenantStatusMutation();
  const [uploadTenantAssets] = useUploadTenantAssetsMutation();
  const [createMasterAdmin] = useCreateMasterAdminMutation();
  const [createHeadAdmin] = useCreateHeadAdminMutation();

  const {
    tenantId,
    activeSecondary,
    tenantSteps,
    currentStepIndex,
    stepValidationSchema,
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
  } = useCreateTenantSteps();

  const { data: tenantData, isFetching: isTenantLoading } = useGetTenantQuery(tenantId, {
    skip: !tenantId,
  });

  const formInitialValues = useMemo(
    () => mapTenantToFormValues(tenantData, INITIAL_FORM_DATA),
    [tenantData]
  );

  useEffect(() => {
    if (tenantId && tenantData && !hasMarkedProfileComplete.current) {
      updateTenantStep(CREATE_TENANT_STEPS.TENANT_PROFILE, true);
      hasMarkedProfileComplete.current = true;
    }
    if (!tenantId) {
      hasMarkedProfileComplete.current = false;
    }
  }, [tenantId, tenantData, updateTenantStep]);

  useEffect(() => {
    setValidationMessages([]);
    setShowValidationErrors(false);
    setApiError(null);
  }, [activeSecondary]);

  return (
    <Formik
      initialValues={formInitialValues}
      enableReinitialize
      validationSchema={stepValidationSchema}
      validateOnChange={false}
      validateOnBlur
      onSubmit={() => {}}
    >
      {(formik) => {
        const handlePrimaryAction = async () => {
          if (!isFormEditable) {
            setShowValidationErrors(false);
            setValidationMessages([]);
            goToNextStepWithoutSave();
            return;
          }

          setShowValidationErrors(true);
          const formErrors = await formik.validateForm();

          if (Object.keys(formErrors).length > 0) {
            const messages = [...new Set(flattenErrorMessages(formErrors))];
            setValidationMessages(messages);
            formik.setTouched(touchAllFields(formErrors), false);
            toast.error(messages[0] ?? "Please fix the errors before continuing.");
            return;
          }

          setValidationMessages([]);
          setShowValidationErrors(false);

          if (activeSecondary !== CREATE_TENANT_STEPS.TENANT_PROFILE && !tenantId) {
            const message = `Complete ${CREATE_TENANT_STEPS.TENANT_PROFILE} before continuing.`;
            setApiError(message);
            toast.error(message);
            return;
          }

          setApiError(null);
          setIsSaving(true);

          try {
            const isNewTenant =
              activeSecondary === CREATE_TENANT_STEPS.TENANT_PROFILE && !tenantId;
            const result = await submitCreateTenantStep({
              stepLabel: activeSecondary,
              values: formik.values,
              tenantId,
              createTenant,
              updateTenant,
              updateTenantStatus,
              uploadTenantAssets,
              createMasterAdmin,
              createHeadAdmin,
            });

            const resolvedTenantId = result.tenantId ?? tenantId;
            updateTenantStep(activeSecondary, true);
            toast.success(getStepSuccessMessage(activeSecondary, isNewTenant));
            goToNextStep(resolvedTenantId);
          } catch (err) {
            const message =
              getApiErrorMessage(err, {
                fallbackMessage: "Something went wrong while saving. Please try again.",
              }) ?? "Something went wrong while saving. Please try again.";
            setApiError(message);
            toast.error(message);
          } finally {
            setIsSaving(false);
          }
        };

        const primaryButtonLabel = getPrimaryButtonLabel({
          isSaving,
          isLastStep,
          showSaveAndContinue,
        });

        return (
          <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeader
              title="Create Tenant"
              subtitle="Configure your new tenant by completing the steps below."
              breadcrumbs={["Tenants", "Create New Tenant"]}
            />

            {isTenantLoading && tenantId && (
              <p className="text-sm text-slate-400 mb-4">Loading tenant details…</p>
            )}

            {apiError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
                {apiError}
              </p>
            )}

            <Card className="p-8 border-slate-100 shadow-sm rounded-2xl bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-slate-50 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <PageHeader
                title={activeSecondary}
                subtitle="Please provide the required information for this section."
                action={
                  <StepIndicator
                    current={currentStepIndex + 1}
                    total={tenantSteps.length}
                  />
                }
              />
              <div className="h-px w-full bg-slate-50 mb-10" />

              <CreateTenantStepNotice
                isProfileLocked={isProfileLocked}
                isFormEditable={isFormEditable}
              />

              {showValidationErrors && validationMessages.length > 0 && (
                <div
                  className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3"
                  role="alert"
                >
                  <p className="text-sm font-medium text-red-800">
                    Please fix the following before continuing:
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700">
                    {validationMessages.map((message) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Form
                className="min-h-[400px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePrimaryAction();
                }}
              >
                <div
                  className={cn(
                    "min-h-[400px]",
                    !isFormEditable && "pointer-events-none opacity-60"
                  )}
                >
                  <fieldset
                    disabled={!isFormEditable}
                    className="min-h-[400px] border-0 p-0 m-0"
                  >
                    {renderStepContent(formik, showValidationErrors)}
                  </fieldset>
                </div>

                <div
                  className={cn(
                    "mt-12 pt-8 border-t border-slate-50 flex flex-col-reverse sm:flex-row items-center gap-4",
                    currentStepIndex === 0 ? "sm:justify-end" : "sm:justify-between"
                  )}
                >
                  {currentStepIndex > 0 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full sm:w-auto"
                      disabled={isSaving}
                      onClick={goToPreviousStep}
                    >
                      Previous
                    </Button>
                  ) : null}

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto sm:ml-auto">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-slate-400 w-full sm:w-auto"
                      disabled={isSaving}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSaving || (isTenantLoading && isFormEditable)}
                      className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 flex items-center gap-2 w-full sm:w-auto py-6 sm:py-2"
                    >
                      <ChevronRight size={16} />
                      {primaryButtonLabel}
                    </Button>
                  </div>
                </div>
              </Form>
            </Card>

            <CreateTenantTips />
          </div>
        );
      }}
    </Formik>
  );
}

const STEP_NOTICE_CLASS =
  "mb-6 text-sm text-slate-500 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2";

function CreateTenantStepNotice({ isProfileLocked, isFormEditable }) {
  if (isProfileLocked) {
    return (
      <p className={STEP_NOTICE_CLASS}>
        Profile name, brand, and domain can’t be changed after the tenant is created. Select Next
        to continue.
      </p>
    );
  }

  if (!isFormEditable) {
    return (
      <p className={STEP_NOTICE_CLASS}>
        Finish the earlier sections first to make changes here.
      </p>
    );
  }

  return null;
}

function CreateTenantTipCard({ theme, icon: Icon, title, text, className }) {
  const styles = TIP_THEMES[theme];

  return (
    <div
      className={cn(
        "p-4 rounded-xl border flex items-start gap-3",
        styles.card,
        className
      )}
    >
      <div className={cn("p-2 rounded-lg text-white flex-shrink-0", styles.icon)}>
        <Icon size={16} />
      </div>
      <div>
        <div className={cn("text-xs font-bold", styles.title)}>{title}</div>
        <div className={cn("text-[11px] mt-1 leading-relaxed", styles.text)}>{text}</div>
      </div>
    </div>
  );
}

function CreateTenantTips() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {CREATE_TENANT_TIPS.map((tip) => (
        <CreateTenantTipCard key={tip.title} {...tip} />
      ))}
    </div>
  );
}
