import { ExoHeader } from "@/components/exo-header";
import { QuienesSomos } from "@/components/QuienesSomos";
import "@/styles/performance.css";

export default function QuienesSomosPage() {
  return (
    <>
      <ExoHeader />
      <div className="performance-optimized smooth-scroll performance-mobile">
        <QuienesSomos />
      </div>
    </>
  );
}