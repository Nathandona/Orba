import type { Metadata } from "next";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocCallout } from "@/components/docs/doc-callout";
import { Kbd, KbdRow } from "@/components/docs/kbd";

export const metadata: Metadata = {
  title: "Keyboard",
  description: "The keys that work in Orba today.",
};

const KEYS: { keys: string[]; description: string }[] = [
  { keys: ["Enter"], description: "Add the label you typed, in a card's labels field" },
  { keys: ["Enter"], description: "Post the comment you typed" },
  { keys: ["Shift", "Enter"], description: "New line in a comment" },
  { keys: ["Esc"], description: "Close the open dialog" },
];

export default function KeyboardPage() {
  return (
    <DocPage
      eyebrow="Reference"
      title="Keyboard."
      lead="Orba is mouse-first today. These are the keys that work in the app right now."
    >
      <DocSection title="Keys">
        <div className="overflow-hidden rounded-lg border border-hairline">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-hairline">
              {KEYS.map((k) => (
                <tr key={k.description}>
                  <td className="px-4 py-3 text-ink-2">{k.description}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    {k.keys.length === 1 ? <Kbd>{k.keys[0]}</Kbd> : <KbdRow keys={k.keys} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocCallout tone="info" title="Board shortcuts">
        There are no board-level shortcuts yet, such as creating or moving a card from the keyboard. This page will list
        them when they ship.
      </DocCallout>
    </DocPage>
  );
}
