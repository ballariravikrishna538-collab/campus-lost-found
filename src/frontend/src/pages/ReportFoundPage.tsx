import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useBackend } from "@/hooks/useBackend";
import { Category, ItemType } from "@/types";
import { CATEGORY_ICONS, CATEGORY_LABELS } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Camera, ImageIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const categories = Object.values(Category);

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ReportFoundPage() {
  const { actor } = useBackend();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: Category.other as Category,
    location: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const item = await actor.createItem({
        name: form.name,
        description: form.description,
        category: form.category,
        location: form.location,
        date: BigInt(new Date(form.date).getTime()) * 1_000_000n,
        itemType: ItemType.found,
        imageUrl: imageDataUrl ?? undefined,
      });
      // Trigger match suggestions check for the newly created found item
      await actor.getMatchSuggestions(item.id);
      return item;
    },
    onSuccess: (item) => {
      queryClient.invalidateQueries({ queryKey: ["recentItems"] });
      toast.success("Found item reported! Checking for matches...");
      navigate({ to: "/item/$id", params: { id: item.id.toString() } });
    },
    onError: () => {
      toast.error("Failed to report item. Please try again.");
    },
  });

  async function handleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
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
    const e: Partial<Record<string, string>> = {};
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

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) mutation.mutate();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PageHeader title="Report Found Item" showBack />

      <form onSubmit={handleSubmit} className="px-4 py-5 space-y-5 pb-10">
        {/* Item Name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="name"
            className="text-sm font-semibold text-foreground"
          >
            Item Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            placeholder="e.g. Set of keys, Blue jacket, Laptop"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="h-11"
            data-ocid="report_found.name_input"
          />
          {errors.name && (
            <p
              className="text-xs text-destructive"
              data-ocid="report_found.name_input.field_error"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">
            Category <span className="text-destructive">*</span>
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setForm((f) => ({ ...f, category: cat }))}
                data-ocid={`report_found.category_${cat}`}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-smooth text-xs font-medium ${
                  form.category === cat
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <span className="text-xl">{CATEGORY_ICONS[cat]}</span>
                <span className="truncate w-full text-center text-[10px]">
                  {CATEGORY_LABELS[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-foreground"
            >
              Description <span className="text-destructive">*</span>
            </Label>
            <span
              className={`text-xs ${
                form.description.length >= 20
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {form.description.length}/20 min
            </span>
          </div>
          <Textarea
            id="description"
            placeholder="Describe where and when you found it, any distinctive features, current condition..."
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            rows={3}
            data-ocid="report_found.description_input"
          />
          {errors.description && (
            <p
              className="text-xs text-destructive"
              data-ocid="report_found.description_input.field_error"
            >
              {errors.description}
            </p>
          )}
        </div>

        {/* Date Found */}
        <div className="space-y-1.5">
          <Label
            htmlFor="date"
            className="text-sm font-semibold text-foreground"
          >
            Date Found <span className="text-destructive">*</span>
          </Label>
          <Input
            id="date"
            type="date"
            value={form.date}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="h-11"
            data-ocid="report_found.date_input"
          />
          {errors.date && (
            <p
              className="text-xs text-destructive"
              data-ocid="report_found.date_input.field_error"
            >
              {errors.date}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <Label
            htmlFor="location"
            className="text-sm font-semibold text-foreground"
          >
            Location Found <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id="location"
              placeholder="e.g. Library 2nd Floor"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              className="h-11 pl-9"
              data-ocid="report_found.location_input"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              📍
            </span>
          </div>
          {errors.location && (
            <p
              className="text-xs text-destructive"
              data-ocid="report_found.location_input.field_error"
            >
              {errors.location}
            </p>
          )}
        </div>

        {/* Match Info Banner */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/15 border border-secondary/30">
          <span className="text-lg mt-0.5">✨</span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Smart Matching
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Once submitted, our system will automatically search for matching
              lost item reports and notify potential owners.
            </p>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-foreground">
            Photo
            <span className="text-muted-foreground font-normal ml-1">
              (optional)
            </span>
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            data-ocid="report_found.image_upload_input"
          />
          {imagePreview ? (
            <div className="relative rounded-xl overflow-hidden border border-border bg-muted/30 aspect-video">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-foreground/70 text-card rounded-full p-1 hover:bg-foreground transition-smooth"
                aria-label="Remove image"
                data-ocid="report_found.image_remove_button"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-foreground/60 text-card text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                Photo added
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-smooth"
              data-ocid="report_found.upload_button"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Tap to add photo
              </span>
              <span className="text-xs">PNG, JPG, HEIC up to 10MB</span>
            </button>
          )}
          <p className="text-xs text-muted-foreground">
            Adding a photo significantly improves matching accuracy
          </p>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={mutation.isPending}
            data-ocid="report_found.submit_button"
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Reporting...
              </span>
            ) : (
              "Report Found Item"
            )}
          </Button>
        </div>

        {mutation.isPending && (
          <p
            className="text-xs text-muted-foreground text-center"
            data-ocid="report_found.loading_state"
          >
            Submitting your report and checking for matches...
          </p>
        )}

        {mutation.isError && (
          <p
            className="text-xs text-destructive text-center"
            data-ocid="report_found.error_state"
          >
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
