import { Fragment } from "react";

export function PageHeader({ title, subtitle, action, breadcrumbs }) {
  return (
    <div className="space-y-4 mb-8">
      {breadcrumbs && (
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
          {breadcrumbs.map((crumb, idx) => (
            <Fragment key={idx}>
              <span className={idx === breadcrumbs.length - 1 ? "text-slate-600" : ""}>{crumb}</span>
              {idx < breadcrumbs.length - 1 && <span className="opacity-40">/</span>}
            </Fragment>
          ))}
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold text-slate-800 tracking-tight">{title}</h3>
          {subtitle && <p className="text-slate-400 text-sm leading-relaxed">{subtitle}</p>}
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
