import { useMemo, useState } from "react";
import { CheckCircle2, FileUp, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { currency, EVENTS } from "@/lib/events";
import { cn } from "@/lib/utils";

const STEPS = ["Event Details", "Ticket Verification", "Payout & Pricing"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="glow-focus rounded-lg border border-border bg-background px-3 py-2 transition-shadow">
        {children}
      </div>
    </label>
  );
}

const inputClass =
  "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground";

export function SellTicketModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [seat, setSeat] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(900);
  const [resalePrice, setResalePrice] = useState(850);

  const event = EVENTS.find((e) => e.id === picked);
  const matches = useMemo(
    () =>
      search.trim()
        ? EVENTS.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())).slice(0, 4)
        : [],
    [search],
  );

  const cap = Math.round(originalPrice * 1.1);
  const capped = Math.min(resalePrice, cap);
  const commission = Math.round(capped * 0.08);
  const payout = capped - commission;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border-border bg-card p-0 sm:max-w-2xl">
        <div className="rounded-t-lg px-6 py-4" style={{ background: "var(--gradient-velvet)" }}>
          <DialogHeader>
            <DialogTitle className="text-display text-2xl text-velvet-foreground">
              Sell / Exchange Ticket
            </DialogTitle>
          </DialogHeader>
          <div className="mt-3 flex gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1">
                <div
                  className={cn(
                    "h-1 rounded-full",
                    i <= step ? "bg-accent" : "bg-velvet-foreground/25",
                  )}
                />
                <p
                  className={cn(
                    "mt-1.5 text-[11px] font-medium",
                    i === step ? "text-accent" : "text-velvet-foreground/70",
                  )}
                >
                  {i + 1}. {s}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-h-[60vh] space-y-4 overflow-y-auto px-6 py-5">
          {step === 0 && (
            <>
              <Field label="Search event to auto-fill">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Amber Lights Live"
                  className={inputClass}
                />
              </Field>
              {matches.length > 0 && (
                <ul className="space-y-1 rounded-lg border border-border p-1">
                  {matches.map((m) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setPicked(m.id);
                          setSearch(m.title);
                          setOriginalPrice(m.faceValue);
                          setResalePrice(m.faceValue);
                        }}
                        className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-secondary"
                      >
                        <span className="font-medium">{m.title}</span>
                        <span className="block text-xs text-muted-foreground">
                          {m.venue} · {m.date}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Venue">
                  <input readOnly value={event?.venue ?? ""} placeholder="Auto-filled" className={inputClass} />
                </Field>
                <Field label="Date & time">
                  <input
                    readOnly
                    value={event ? `${event.date} · ${event.time}` : ""}
                    placeholder="Auto-filled"
                    className={inputClass}
                  />
                </Field>
                <Field label="Seat number">
                  <input
                    value={seat}
                    onChange={(e) => setSeat(e.target.value)}
                    placeholder="e.g. G-14"
                    className={inputClass}
                  />
                </Field>
                <Field label="Quantity">
                  <input defaultValue={1} type="number" min={1} className={inputClass} />
                </Field>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <button
                type="button"
                onClick={() => setUploaded(true)}
                className="glow-focus flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-background px-6 py-8 text-center transition-colors hover:border-accent"
              >
                <FileUp className="size-6 text-primary" aria-hidden />
                <span className="text-sm font-semibold">Upload digital pass (PDF / image)</span>
                <span className="text-xs text-muted-foreground">
                  Barcode is auto-blurred before anyone sees your listing
                </span>
              </button>

              {uploaded && (
                <div className="stub stub-notch-y rounded-xl border border-border p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <ScanLine className="size-4 text-primary" aria-hidden />
                    OCR preview
                  </p>
                  <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs text-muted-foreground">Event</dt>
                      <dd>{event?.title ?? "Amber Lights Live Tour"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Seat</dt>
                      <dd>{seat || "G-14"}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Gate</dt>
                      <dd>North · 6:45 PM</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Barcode</dt>
                      <dd className="select-none blur-[5px]">8827 4410 9932 1174</dd>
                    </div>
                  </dl>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
                    <ShieldCheck className="size-3.5" aria-hidden /> Golden Stub Verified
                  </p>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Original price">
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value) || 0)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Resale price">
                  <input
                    type="number"
                    value={resalePrice}
                    onChange={(e) => setResalePrice(Number(e.target.value) || 0)}
                    className={inputClass}
                  />
                </Field>
              </div>
              {resalePrice > cap && (
                <p className="text-xs font-medium text-primary">
                  Anti-scalp cap applies — your listing will be capped at {currency(cap)}.
                </p>
              )}
            </>
          )}

          {step === 2 && (
            <div className="stub stub-notch-y rounded-xl border border-border p-5">
              <p className="text-display text-xl">Payout calculator</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt>Buyer price</dt>
                  <dd className="font-semibold">{currency(capped)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Platform commission (8%)</dt>
                  <dd>−{currency(commission)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>FairPass cap</dt>
                  <dd>{currency(cap)} max</dd>
                </div>
                <div className="perforation my-3" />
                <div className="flex justify-between text-base">
                  <dt className="font-semibold">Seller payout</dt>
                  <dd className="text-display text-2xl text-velvet">{currency(payout)}</dd>
                </div>
              </dl>
              <p className="mt-4 flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-xs text-secondary-foreground">
                <Sparkles className="size-4 text-primary" aria-hidden />
                Payout released within 24 hours of a successful gate scan.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <ShieldCheck className="size-4 text-accent" aria-hidden /> PassShield™ Protected listing
          </span>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={() => (step < 2 ? setStep((s) => s + 1) : onOpenChange(false))}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-velvet"
            >
              {step < 2 ? "Continue" : "Publish listing"}
              {step === 2 && <CheckCircle2 className="size-4" aria-hidden />}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
