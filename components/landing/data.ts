/* Demo content for the landing page. Everything here is illustrative: the
   people are illustrations, the board is a sample project. Card fields mirror
   the real Orba card (label, title, due date, comment count, priority,
   assignee), so the demo never shows a feature the product does not have. */

export type PersonId = "elena" | "mika" | "jo" | "sam" | "ana" | "ines";

export const people: Record<PersonId, { name: string; email: string; avatar: string }> = {
  elena: { name: "Elena L.", email: "elena@studio.co", avatar: "/landing/avatar-5.webp" },
  mika: { name: "Mika K.", email: "mika@studio.co", avatar: "/landing/avatar-2.webp" },
  jo: { name: "Jo L.", email: "jo@studio.co", avatar: "/landing/avatar-1.webp" },
  sam: { name: "Sam R.", email: "sam@studio.co", avatar: "/landing/avatar-4.webp" },
  ana: { name: "Ana P.", email: "ana@studio.co", avatar: "/landing/avatar-3.webp" },
  ines: { name: "Ines D.", email: "ines@studio.co", avatar: "/landing/avatar-8.webp" },
};

export type Label = "Feature" | "Design" | "Copy" | "Bug" | "Platform";
export type Priority = "High" | "Medium" | "Low";

export type DemoCard = {
  id: string;
  title: string;
  label: Label;
  priority: Priority;
  assignee: PersonId;
  due?: string;
  comments?: number;
};

export const cards: Record<string, DemoCard> = {
  faq: { id: "faq", title: "Write the pricing FAQ", label: "Copy", priority: "Low", assignee: "elena", due: "Dec 8" },
  empty: { id: "empty", title: "Empty state for archived boards", label: "Design", priority: "Medium", assignee: "mika", comments: 2 },
  csv: { id: "csv", title: "Import cards from CSV", label: "Platform", priority: "Low", assignee: "sam" },
  keys: { id: "keys", title: "Keyboard shortcuts for card moves", label: "Feature", priority: "High", assignee: "jo", due: "Dec 4" },
  remind: { id: "remind", title: "Due date reminders by email", label: "Feature", priority: "Medium", assignee: "sam", comments: 1 },
  ghost: { id: "ghost", title: "Fix drag ghost on Safari", label: "Bug", priority: "High", assignee: "mika" },
  rename: { id: "rename", title: "Rename columns inline", label: "Feature", priority: "Medium", assignee: "elena", due: "Dec 2" },
  dark: { id: "dark", title: "Dark theme for the dashboard", label: "Design", priority: "Low", assignee: "jo", comments: 3 },
  invite: { id: "invite", title: "Invite people by email", label: "Feature", priority: "Medium", assignee: "sam" },
  archive: { id: "archive", title: "Archive a project", label: "Feature", priority: "Medium", assignee: "jo", comments: 5 },
};

export const columns = ["To Do", "In Progress", "Review", "Done"] as const;
export type Column = (typeof columns)[number];

export type Day = {
  id: string;
  name: string;
  /** Short caption shown under the board. `lead` is bold. */
  lead: string;
  body: string;
  board: Record<Column, string[]>;
};

export const week: Day[] = [
  {
    id: "monday",
    name: "Monday",
    lead: "Monday. Set up the board before standup.",
    body: "Start from a template or name your own columns, give the project a colour and a due date, and invite the team by email.",
    board: {
      "To Do": ["keys", "ghost", "rename", "invite", "archive", "remind", "empty", "dark", "faq", "csv"],
      "In Progress": [],
      Review: [],
      Done: [],
    },
  },
  {
    id: "tuesday",
    name: "Tuesday",
    lead: "Tuesday. Work starts moving.",
    body: "Drag a card to In Progress and it is saved where you drop it. Everyone sees who owns what without a status meeting.",
    board: {
      "To Do": ["remind", "empty", "dark", "faq", "csv"],
      "In Progress": ["keys", "ghost", "rename"],
      Review: ["invite"],
      Done: ["archive"],
    },
  },
  {
    id: "wednesday",
    name: "Wednesday",
    lead: "Wednesday. Everything about a task lives on its card.",
    body: "Priority, due date, labels and an owner on the front. The description, comments and files sit one click behind it.",
    board: {
      "To Do": ["faq", "empty", "csv"],
      "In Progress": ["keys", "remind", "ghost"],
      Review: ["rename", "dark"],
      Done: ["invite", "archive"],
    },
  },
  {
    id: "thursday",
    name: "Thursday",
    lead: "Thursday. Review catches what is almost done.",
    body: "Columns are yours to name, so Review can be QA, a copy check, or whatever your team calls the last step.",
    board: {
      "To Do": ["faq", "csv"],
      "In Progress": ["remind", "empty"],
      Review: ["keys", "dark"],
      Done: ["ghost", "rename", "invite", "archive"],
    },
  },
  {
    id: "friday",
    name: "Friday",
    lead: "Friday. Drag it to Done, and the dashboard keeps count.",
    body: "Each project shows how much is done and how much is still open, so nobody has to ask where things stand.",
    board: {
      "To Do": ["csv"],
      "In Progress": [],
      Review: ["faq"],
      Done: ["keys", "ghost", "rename", "invite", "archive", "remind", "empty", "dark"],
    },
  },
];
