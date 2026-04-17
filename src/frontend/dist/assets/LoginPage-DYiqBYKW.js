import { c as createLucideIcon, u as useAuth, a as useBackend, r as reactExports, j as jsxRuntimeExports, L as LoadingSpinner, N as Navigate, S as Search } from "./index-B3kRMkUk.js";
import { B as Button } from "./button-C_Sdx-K0.js";
import { I as Input } from "./input-Clk_USEF.js";
import { L as Label } from "./label-bfvK2Ags.js";
import { M as MapPin } from "./map-pin-D5rAQqNa.js";
import { S as ShieldCheck } from "./shield-check-CWzcZirK.js";
import "./index-BEnBZagZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
function LoginPage() {
  const { isAuthenticated, isInitializing, loginStatus, login } = useAuth();
  const { actor } = useBackend();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [isRegistering, setIsRegistering] = reactExports.useState(false);
  const isRegisteringRef = reactExports.useRef(false);
  const isLoggingIn = loginStatus === "logging-in";
  const isBusy = isLoggingIn || isRegistering;
  reactExports.useEffect(() => {
    if (isAuthenticated && actor && !isRegisteringRef.current) {
      const storedName = sessionStorage.getItem("_clf_pending_name") ?? "";
      const storedEmail = sessionStorage.getItem("_clf_pending_email") ?? "";
      if (storedName) {
        isRegisteringRef.current = true;
        setIsRegistering(true);
        actor.registerUser(storedName, storedEmail).then(() => {
          sessionStorage.removeItem("_clf_pending_name");
          sessionStorage.removeItem("_clf_pending_email");
        }).catch(() => {
        }).finally(() => {
          isRegisteringRef.current = false;
          setIsRegistering(false);
        });
      }
    }
  }, [isAuthenticated, actor]);
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading Campus Lost & Found..." }) });
  }
  if (isAuthenticated && !isRegistering) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  }
  const handleLogin = () => {
    setError(null);
    if (!name.trim()) {
      setError("Please enter your name before signing in.");
      return;
    }
    sessionStorage.setItem("_clf_pending_name", name.trim());
    sessionStorage.setItem("_clf_pending_email", email.trim());
    try {
      login();
    } catch {
      setError("Login failed. Please try again.");
      sessionStorage.removeItem("_clf_pending_name");
      sessionStorage.removeItem("_clf_pending_email");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none fixed inset-0 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 flex flex-col items-center justify-center px-5 py-12 max-w-sm mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/campus-lostfound-logo.dim_200x200.png",
              alt: "Campus Lost & Found logo",
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary border-2 border-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              className: "w-2.5 h-2.5 text-secondary-foreground",
              "aria-hidden": "true"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground leading-tight tracking-tight mb-1", children: "Campus Lost & Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body max-w-[240px]", children: "Reconnect students with their lost belongings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap justify-center mb-8", children: [
        { icon: MapPin, label: "Campus-wide" },
        { icon: Search, label: "Smart Matching" },
        { icon: ShieldCheck, label: "Secure" }
      ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-body border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3", "aria-hidden": "true" }),
            label
          ]
        },
        label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full card-base border border-border rounded-2xl p-6 shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-semibold text-foreground mb-4", children: "Sign in to get started" }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "login.error_state",
            className: "flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-4",
            role: "alert",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleAlert,
                {
                  className: "w-4 h-4 mt-0.5 flex-shrink-0",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body", children: error })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "clf-name",
                className: "text-sm font-body text-foreground",
                children: [
                  "Your Name ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "clf-name",
                "data-ocid": "login.name_input",
                type: "text",
                placeholder: "e.g. Alex Johnson",
                value: name,
                onChange: (e) => setName(e.target.value),
                disabled: isBusy,
                className: "h-11 font-body text-sm",
                autoComplete: "name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "clf-email",
                className: "text-sm font-body text-foreground",
                children: [
                  "Email / Student ID",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "clf-email",
                "data-ocid": "login.email_input",
                type: "email",
                placeholder: "e.g. alex@university.edu",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                disabled: isBusy,
                className: "h-11 font-body text-sm",
                autoComplete: "email"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "login.submit_button",
              className: "w-full h-12 font-body font-semibold text-sm transition-smooth rounded-xl mt-1",
              onClick: handleLogin,
              disabled: isBusy,
              children: isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                isRegistering ? "Setting up your profile…" : "Opening Internet Identity…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4", "aria-hidden": "true" }),
                "Sign in with Internet Identity"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body", children: "secure & private" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground font-body leading-relaxed", children: [
          "All students and staff can use their",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Internet Identity" }),
          " ",
          "to sign in. No password required."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-xs text-muted-foreground font-body text-center px-4", children: "By signing in you agree to our community guidelines for respectful item reporting." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative py-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
          className: "text-primary hover:underline",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "caffeine.ai"
        }
      )
    ] }) })
  ] });
}
export {
  LoginPage as default
};
