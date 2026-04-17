import { j as jsxRuntimeExports, l as ItemStatus } from "./index-B3kRMkUk.js";
const STATUS_CONFIG = {
  [ItemStatus.open]: {
    label: "Open",
    className: "bg-blue-50 text-blue-600 border border-blue-200",
    dot: "bg-blue-500"
  },
  [ItemStatus.matched]: {
    label: "Matched",
    className: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    dot: "bg-yellow-500"
  },
  [ItemStatus.resolved]: {
    label: "Resolved",
    className: "bg-green-50 text-green-700 border border-green-200",
    dot: "bg-green-500"
  }
};
function StatusBadge({ status, className = "" }) {
  const config = STATUS_CONFIG[status] ?? {
    label: String(status),
    className: "bg-muted text-muted-foreground border border-border",
    dot: "bg-muted-foreground"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${config.className} ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${config.dot}` }),
        config.label
      ]
    }
  );
}
export {
  StatusBadge as S
};
