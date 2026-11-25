import Image from "next/image";

import { cn } from "@/lib/utils";
import { Avatar, LabelPill } from "@/components/landing/demo-card";
import { people, type PersonId } from "@/components/landing/data";

const panel =
  "rounded-panel bg-card text-left text-card-foreground shadow-[0_2px_4px_rgb(17_17_20/0.04),0_30px_60px_rgb(17_17_20/0.14)]";

/* What an open card looks like. Illustration of the product, so it is hidden
   from assistive tech; the section copy carries the meaning. */
function CardDetail() {
  return (
    <div aria-hidden className={cn(panel, "flex w-full max-w-[600px] flex-col gap-5 p-7")}>
      <div className="flex items-center gap-2">
        <LabelPill label="Feature" className="px-2.5 py-1 text-[13px]" />
        <span className="rounded-full bg-label-design px-2.5 py-1 text-[13px] font-semibold text-label-design-foreground">High</span>
        <span className="flex-1" />
        <span className="text-[13px] font-semibold text-muted-foreground">In Progress</span>
      </div>
      <p className="text-[26px] leading-[30px] font-extrabold tracking-[-0.02em]">Keyboard shortcuts for card moves</p>
      <p className="text-[15px] leading-[23px] text-foreground-secondary">
        Move a card to the next column without reaching for the mouse. Needs to feel the same on Mac and Windows.
      </p>
      <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-foreground-secondary">
        <span className="inline-flex items-center gap-2">
          <Avatar person="jo" size={24} />
          {people.jo.name}
        </span>
        <span>Due Dec 4</span>
        <span>2 files</span>
      </div>
      <hr className="border-border" />
      <Comment person="mika" when="2h ago" text="Tested on Safari, works. Can we show the shortcuts in a little help panel?" />
      <Comment person="jo" when="just now" text="On it. Attached the draft below." />
      <div className="flex items-center gap-3 rounded-xl bg-column px-3.5 py-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-highlight text-[11px] font-extrabold text-highlight-foreground">
          PNG
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold">shortcuts-panel.png</span>
          <span className="text-[13px] text-muted-foreground">1.2 MB</span>
        </span>
      </div>
    </div>
  );
}

function Comment({ person, when, text }: { person: PersonId; when: string; text: string }) {
  return (
    <div className="flex gap-3">
      <Avatar person={person} size={32} />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold">
          {people[person].name} <span className="font-medium text-muted-foreground">{when}</span>
        </p>
        <p className="text-[15px] leading-[22px] text-foreground-secondary">{text}</p>
      </div>
    </div>
  );
}

const members: { person: PersonId; role: "Owner" | "Admin" | "Member" }[] = [
  { person: "elena", role: "Owner" },
  { person: "mika", role: "Admin" },
  { person: "jo", role: "Member" },
];

const roleTone = {
  Owner: "bg-highlight text-highlight-foreground",
  Admin: "bg-label-feature text-label-feature-foreground",
  Member: "bg-column text-foreground-secondary",
} as const;

function InvitePanel() {
  return (
    <div aria-hidden className={cn(panel, "flex w-full max-w-[460px] flex-col gap-[18px] p-7")}>
      <p className="text-[22px] font-extrabold tracking-[-0.02em]">Invite to Website relaunch</p>
      <div className="flex gap-2.5">
        <span className="flex-1 rounded-card border-[1.5px] border-brand px-3.5 py-3 text-[15px]">{people.ana.email}</span>
        <span className="rounded-card bg-primary px-4 py-3 text-[15px] font-semibold text-primary-foreground">Invite</span>
      </div>
      {members.map(({ person, role }) => (
        <div key={person} className="flex items-center gap-3">
          <Avatar person={person} size={36} />
          <span className="flex flex-1 flex-col">
            <span className="text-[15px] font-bold">{people[person].name}</span>
            <span className="text-[13px] text-muted-foreground">{people[person].email}</span>
          </span>
          <span className={cn("w-[84px] rounded-full py-1 text-center text-[13px] font-semibold", roleTone[role])}>{role}</span>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <span className="size-9 shrink-0 rounded-full border-[1.5px] border-dashed border-muted-foreground" />
        <span className="flex flex-1 flex-col">
          <span className="text-[15px] font-bold text-muted-foreground">{people.ana.email}</span>
          <span className="text-[13px] text-muted-foreground">Sign-up link sent</span>
        </span>
        <span className={cn("w-[84px] rounded-full py-1 text-center text-[13px] font-semibold", roleTone.Member)}>Member</span>
      </div>
    </div>
  );
}

/* Two paper blocks: the card (wide) and the team (narrow). The UI panels are
   cropped by the bottom edge, like a sheet slid under the paper. */
export function FeaturesBento() {
  return (
    <section aria-label="Cards and teams" className="px-4 pt-28 sm:px-8 lg:pt-44">
      <div className="mx-auto grid max-w-[1328px] gap-4 lg:grid-cols-[3fr_2fr]">
        <article className="relative isolate flex flex-col gap-9 overflow-hidden rounded-section bg-highlight-subtle px-7 pt-10 sm:px-12 sm:pt-12 lg:h-[680px]">
          <Image src="/landing/paper-card.webp" alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="-z-10 object-cover" />
          <div className="flex max-w-[520px] flex-col gap-4">
            <h2 className="text-h3 font-extrabold text-balance text-foreground">Every card carries its own story.</h2>
            <p className="text-lg leading-7 text-foreground-secondary">
              Comments, files up to 10 MB, an owner and a due date, one click behind the card.
            </p>
          </div>
          <div className="-mb-10 flex justify-center lg:-mb-16">
            <CardDetail />
          </div>
        </article>

        <article className="relative isolate flex flex-col gap-7 overflow-hidden rounded-section bg-signal px-7 pt-10 sm:px-12 sm:pt-12 lg:h-[680px]">
          <Image src="/landing/paper-team.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="-z-10 object-cover object-bottom" />
          <div className="flex flex-col gap-4">
            <h2 className="text-h3 font-extrabold text-balance text-signal-foreground">Invite people by email and give them a role.</h2>
            <p className="text-lg leading-7 text-signal-foreground/80">
              Owners, admins and members each see what they need. No account yet? They get a one-click sign-up link.
            </p>
          </div>
          <div className="-mb-6 flex justify-center pb-10 lg:pb-0">
            <InvitePanel />
          </div>
        </article>
      </div>
    </section>
  );
}
