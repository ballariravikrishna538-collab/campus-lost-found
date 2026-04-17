import { j as jsxRuntimeExports, i as cn } from "./index-B3kRMkUk.js";
import { B as Button } from "./button-C_Sdx-K0.js";
function EmptyState({
  icon = "🔍",
  title,
  description,
  actionLabel,
  onAction,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "empty_state",
      className: cn(
        "flex flex-col items-center justify-center text-center px-6 py-12 gap-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", role: "img", "aria-hidden": true, children: icon }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-base text-foreground", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xs", children: description })
        ] }),
        actionLabel && onAction && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: onAction,
            "data-ocid": "empty_state.primary_button",
            className: "mt-2",
            children: actionLabel
          }
        )
      ]
    }
  );
}
export {
  EmptyState as E
};
