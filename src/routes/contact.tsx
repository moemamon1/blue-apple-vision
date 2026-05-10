import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Blue Apple" },
      { name: "description", content: "Get in touch with the Blue Apple team." },
      { property: "og:title", content: "Contact Blue Apple" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-16">
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">Contact</p>
          <h1 className="mt-4 text-5xl lg:text-6xl font-semibold tracking-tight">
            Let's <span className="gradient-text">talk.</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            Have a question, feedback, or just want to say hi? We're here.
          </p>
          <div className="mt-10 space-y-5">
            {[
              { Icon: Mail, label: "hello@blueapple.com" },
              { Icon: Phone, label: "+1 (800) 555-0199" },
              { Icon: MapPin, label: "1 Infinite Loop, Cupertino, CA" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="size-11 grid place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <p className="font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-3xl border border-border bg-card p-8 shadow-soft space-y-4"
        >
          {[
            { label: "Name", type: "text" },
            { label: "Email", type: "email" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-sm font-medium">{f.label}</label>
              <input
                type={f.type}
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              rows={5}
              className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>
          <button className="btn-primary w-full py-3.5 rounded-full font-medium">Send message</button>
        </form>
      </section>
    </PageShell>
  );
}
