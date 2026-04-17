import { a as useBackend, e as useNavigate, f as useQueryClient, r as reactExports, C as Category, j as jsxRuntimeExports, g as ue, I as ItemType } from "./index-B3kRMkUk.js";
import { P as PageHeader } from "./PageHeader-FJvrZreR.js";
import { B as Button } from "./button-C_Sdx-K0.js";
import { I as Input } from "./input-Clk_USEF.js";
import { L as Label } from "./label-bfvK2Ags.js";
import { T as Textarea } from "./textarea-CFO4NyYA.js";
import { C as CATEGORY_ICONS, a as CATEGORY_LABELS } from "./index-Y1WSDvOi.js";
import { u as useMutation, X } from "./x-CCX_kk-4.js";
import { I as Image, C as Camera } from "./image-BI6yZfpO.js";
import "./index-BEnBZagZ.js";
const categories = Object.values(Category);
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function ReportFoundPage() {
  const { actor } = useBackend();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = reactExports.useRef(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    description: "",
    category: Category.other,
    location: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  const [imagePreview, setImagePreview] = reactExports.useState(null);
  const [imageDataUrl, setImageDataUrl] = reactExports.useState(null);
  const [errors, setErrors] = reactExports.useState({});
  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const item = await actor.createItem({
        name: form.name,
        description: form.description,
        category: form.category,
        location: form.location,
        date: BigInt(new Date(form.date).getTime()) * 1000000n,
        itemType: ItemType.found,
        imageUrl: imageDataUrl ?? void 0
      });
      await actor.getMatchSuggestions(item.id);
      return item;
    },
    onSuccess: (item) => {
      queryClient.invalidateQueries({ queryKey: ["recentItems"] });
      ue.success("Found item reported! Checking for matches...");
      navigate({ to: "/item/$id", params: { id: item.id.toString() } });
    },
    onError: () => {
      ue.error("Failed to report item. Please try again.");
    }
  });
  async function handleFileChange(ev) {
    var _a;
    const file = (_a = ev.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    const dataUrl = await readFileAsDataURL(file);
    setImageDataUrl(dataUrl);
  }
  function removeImage() {
    setImagePreview(null);
    setImageDataUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Item name is required";
    if (!form.description.trim()) {
      e.description = "Description is required";
    } else if (form.description.trim().length < 20) {
      e.description = "Description must be at least 20 characters";
    }
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    if (validate()) mutation.mutate();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Report Found Item", showBack: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "px-4 py-5 space-y-5 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "name",
            className: "text-sm font-semibold text-foreground",
            children: [
              "Item Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "name",
            placeholder: "e.g. Set of keys, Blue jacket, Laptop",
            value: form.name,
            onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
            className: "h-11",
            "data-ocid": "report_found.name_input"
          }
        ),
        errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "report_found.name_input.field_error",
            children: errors.name
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold text-foreground", children: [
          "Category ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setForm((f) => ({ ...f, category: cat })),
            "data-ocid": `report_found.category_${cat}`,
            className: `flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-smooth text-xs font-medium ${form.category === cat ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary/5"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: CATEGORY_ICONS[cat] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate w-full text-center text-[10px]", children: CATEGORY_LABELS[cat] })
            ]
          },
          cat
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "description",
              className: "text-sm font-semibold text-foreground",
              children: [
                "Description ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `text-xs ${form.description.length >= 20 ? "text-primary" : "text-muted-foreground"}`,
              children: [
                form.description.length,
                "/20 min"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "description",
            placeholder: "Describe where and when you found it, any distinctive features, current condition...",
            value: form.description,
            onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
            rows: 3,
            "data-ocid": "report_found.description_input"
          }
        ),
        errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "report_found.description_input.field_error",
            children: errors.description
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "date",
            className: "text-sm font-semibold text-foreground",
            children: [
              "Date Found ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "date",
            type: "date",
            value: form.date,
            max: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
            className: "h-11",
            "data-ocid": "report_found.date_input"
          }
        ),
        errors.date && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "report_found.date_input.field_error",
            children: errors.date
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Label,
          {
            htmlFor: "location",
            className: "text-sm font-semibold text-foreground",
            children: [
              "Location Found ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "location",
              placeholder: "e.g. Library 2nd Floor",
              value: form.location,
              onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })),
              className: "h-11 pl-9",
              "data-ocid": "report_found.location_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "📍" })
        ] }),
        errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "report_found.location_input.field_error",
            children: errors.location
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3 rounded-xl bg-secondary/15 border border-secondary/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg mt-0.5", children: "✨" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Smart Matching" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Once submitted, our system will automatically search for matching lost item reports and notify potential owners." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold text-foreground", children: [
          "Photo",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal ml-1", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: handleFileChange,
            "data-ocid": "report_found.image_upload_input"
          }
        ),
        imagePreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden border border-border bg-muted/30 aspect-video", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imagePreview,
              alt: "Preview",
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: removeImage,
              className: "absolute top-2 right-2 bg-foreground/70 text-card rounded-full p-1 hover:bg-foreground transition-smooth",
              "aria-label": "Remove image",
              "data-ocid": "report_found.image_remove_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2 bg-foreground/60 text-card text-xs px-2 py-1 rounded-full flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3 h-3" }),
            "Photo added"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            className: "w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-smooth",
            "data-ocid": "report_found.upload_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Tap to add photo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "PNG, JPG, HEIC up to 10MB" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Adding a photo significantly improves matching accuracy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full h-12 text-base font-semibold",
          disabled: mutation.isPending,
          "data-ocid": "report_found.submit_button",
          children: mutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
            "Reporting..."
          ] }) : "Report Found Item"
        }
      ) }),
      mutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-muted-foreground text-center",
          "data-ocid": "report_found.loading_state",
          children: "Submitting your report and checking for matches..."
        }
      ),
      mutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive text-center",
          "data-ocid": "report_found.error_state",
          children: "Something went wrong. Please try again."
        }
      )
    ] })
  ] });
}
export {
  ReportFoundPage as default
};
