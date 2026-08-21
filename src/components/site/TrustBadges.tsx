import { Scale, ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function PassShieldBadge({ className }: { className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent-foreground",
            className,
          )}
        >
          <ShieldCheck className="size-3.5" aria-hidden />
          100% PassShield™ Verified
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-[240px]">
        Scanned for authenticity. 100% refund if your pass fails at the gate.
      </TooltipContent>
    </Tooltip>
  );
}

export function FairPassBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary",
        className,
      )}
    >
      <Scale className="size-3.5" aria-hidden />
      FairPass Certified · Anti-Scalp Capped
    </span>
  );
}

export function TrustBadgeRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <PassShieldBadge />
      <FairPassBadge />
    </div>
  );
}

export const GUARANTEES = [
  { icon: "🛡️", title: "100% Legit Pass", copy: "Scan-tested or your money back." },
  { icon: "🎟️", title: "PassShield™ Protected", copy: "100% refund guarantee if entry fails." },
  { icon: "🔒", title: "Zero-Risk Entry", copy: "Verified authentic, always." },
  { icon: "🍿", title: "Front-Row Guarantee", copy: "Verified seats, guaranteed entry." },
  { icon: "🎬", title: "No Plot Twists", copy: "Valid pass guaranteed, or full refund on the spot." },
  { icon: "🚫", title: "No Scalper Zone", copy: "Fair prices for true fans." },
];
