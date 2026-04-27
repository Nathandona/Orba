import type { Metadata } from "next";
import { DocPage } from "@/components/docs/doc-page";
import { DocSection } from "@/components/docs/doc-section";
import { DocCallout } from "@/components/docs/doc-callout";
import { Kbd, KbdRow } from "@/components/docs/kbd";
import { DocFooter } from "@/components/docs/doc-footer";

export const metadata: Metadata = {
  title: "Keyboard shortcuts",
  description: "Move through Orba without leaving the keyboard.",
};

interface Shortcut {
  keys: string[];
  description: string;
}

interface Group {
  title: string;
  shortcuts: Shortcut[];
}

const groups: Group[] = [
  {
    title: "Global",
    shortcuts: [
      { keys: ["Cmd", "K"], description: "Open command palette / search" },
      { keys: ["Cmd", "/"], description: "Toggle this shortcut sheet" },
      { keys: ["G", "D"], description: "Go to dashboard" },
      { keys: ["G", "P"], description: "Go to projects" },
      { keys: ["?"], description: "Show shortcut help" },
    ],
  },
  {
    title: "Board",
    shortcuts: [
      { keys: ["N"], description: "New card in focused column" },
      { keys: ["E"], description: "Edit focused card" },
      { keys: ["Del"], description: "Delete focused card" },
      { keys: ["←", "→", "↑", "↓"], description: "Move focus between cards" },
      { keys: ["Shift", "←/→"], description: "Move card between columns" },
    ],
  },
  {
    title: "Card detail",
    shortcuts: [
      { keys: ["Esc"], description: "Close detail panel" },
      { keys: ["Cmd", "Enter"], description: "Save and close" },
      { keys: ["@"], description: "Mention a teammate in a comment" },
    ],
  },
];

export default function ShortcutsPage() {
  return (
    <DocPage
      eyebrow="Reference"
      title="Keyboard shortcuts."
      lead="Skip the mouse. Most of Orba is one or two keys away."
    >
      {groups.map((group) => (
        <DocSection key={group.title} title={group.title}>
          <div className="overflow-hidden rounded-xl border border-hairline">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-hairline">
                {group.shortcuts.map((s) => (
                  <tr key={s.description} className="hover:bg-surface-2">
                    <td className="px-5 py-3 text-ink-2">{s.description}</td>
                    <td className="px-5 py-3 text-right">
                      {s.keys.length === 1 ? (
                        <Kbd>{s.keys[0]}</Kbd>
                      ) : s.keys.every((k) => k.length === 1) && s.keys.length === 2 ? (
                        <span className="inline-flex items-center gap-1">
                          {s.keys.map((k, i) => (
                            <span key={i} className="contents">
                              <Kbd>{k}</Kbd>
                              {i < s.keys.length - 1 && <span className="text-ink-3">then</span>}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <KbdRow keys={s.keys} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>
      ))}

      <DocCallout tone="info" title="Mac vs. Windows">
        Cmd on Mac, Ctrl on Windows and Linux. Orba detects your OS and the in-app shortcut sheet shows the right one.
      </DocCallout>

      <DocFooter
        prev={{ href: "/docs/tips", label: "Tips & tricks" }}
        next={{ href: "/docs/faq", label: "FAQ" }}
      />
    </DocPage>
  );
}
