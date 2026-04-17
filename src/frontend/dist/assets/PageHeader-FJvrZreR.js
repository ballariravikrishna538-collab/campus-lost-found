import { s as useRouter, j as jsxRuntimeExports, i as cn } from "./index-B3kRMkUk.js";
import { B as Button } from "./button-C_Sdx-K0.js";
import { A as ArrowLeft } from "./x-CCX_kk-4.js";
function PageHeader({
  title,
  showBack = false,
  onBack,
  rightAction,
  className
}) {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.history.back();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: cn(
        "sticky top-0 z-40 bg-card border-b border-border",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center h-14 px-4 gap-3", children: [
        showBack && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: handleBack,
            className: "h-8 w-8 -ml-1 text-foreground",
            "aria-label": "Go back",
            "data-ocid": "page.back_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground flex-1 truncate", children: title }),
        rightAction && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: rightAction })
      ] })
    }
  );
}
export {
  PageHeader as P
};
