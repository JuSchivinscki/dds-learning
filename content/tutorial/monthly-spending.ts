import { TutorialChapter } from "@/types/tutorial";

export const monthlySpendingChapter: TutorialChapter = {
  id: "monthly-spending",
  title: "Monthly Spendings",
  intro:
    "This tutorial follows the same approach as Step 1: short explanations per component and incremental code blocks. The goal is to teach the Dell Design System while building a real Monthly Spending screen. This screen tracks total spending per month: a form to log a month's total, four summary cards, a progress indicator comparing the current month to your average, and a table listing every month logged so far.",

  steps: [
    {
      id: "table",
      title: "1. Table",
      dependsOn: [],
      blocks: [
        {
          type: "text",
          content:
            "We already covered Table's anatomy and when to use it over a List in Step 1 — same reasoning applies here: comparing spending across months is a reference/comparison use case, not a scannable list.",
        },
        {
          type: "text",
          content:
            "Create components/tableMonthlySpending.tsx. It's simpler than the Transactions table — just three data columns and a delete action, no search, no bulk selection.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/tableMonthlySpending.tsx",
          scope: "partial",
          content: `"use client";

import { MonthlyExpenses, months } from "@/components/monthlySpending";
import { DDSButton, DDSIcon, DDSTable } from "@dds/react";
import { getMonthName } from "@/utils/getMonthName";

interface TableMonthlySpendingProps {
  expenses: MonthlyExpenses[];
  onDelete: (id: string) => void;
}`,
        },
        {
          type: "text",
          content:
            "The component receives the monthly spending entries through expenses and receives an onDelete callback from its parent. The following render functions are added to this same components/tableMonthlySpending.tsx file.",
        },
        {
          type: "text",
          content:
            "The price column reuses the same manual .toFixed(2) formatting style as the Transactions table. ColumnRenderParams is the render-parameter type used by DDSTable column render functions.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/tableMonthlySpending.tsx",
          scope: "partial",
          content: `const priceCellRendering = ({ cell }: ColumnRenderParams) => {
  const { value } = cell;
  return <span style={{ fontWeight: 500 }}>$ {Number(value).toFixed(2)}</span>;
};

const actionsCellRendering = ({ row }: ColumnRenderParams) => {
  return (
    <DDSButton kind="tertiary" size="sm" onClick={() => onDelete(row.id!)}>
      <DDSIcon name="trash" />
    </DDSButton>
  );
};`,
        },
        {
          type: "text",
          content:
            "The price value uses a small inline style to give the amount slightly more visual emphasis. This is a component-specific adjustment, so no custom stylesheet is introduced for it.",
        },
        {
          type: "text",
          content:
            "Create the table column definitions and transform each MonthlyExpenses entry into the row shape expected by DDSTable. The Actions column uses the actionsCellRendering function defined above.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/tableMonthlySpending.tsx",
          scope: "partial",
          content: `const TABLE_COLUMNS = [
  { value: "Month" },
  { value: "Year" },
  { value: "Total Spent", render: priceCellRendering },
  { value: "Actions", render: actionsCellRendering },
];

const tableData = expenses.map((expense) => ({
  id: expense.id,
  columns: [
    { value: getMonthName(expense.month) },
    { value: expense.year },
    { value: expense.totalSpent },
    { value: "Actions" },
  ],
}));

return <DDSTable columns={TABLE_COLUMNS} data={tableData} />;`,
        },
        {
          type: "text",
          content:
            "getMonthName comes from @/utils/getMonthName — a small shared helper that looks up a month number in the months data and returns its label. It's used here and again in the Cards section below; centralizing it means both places stay in sync if the month list ever changes.",
        },
      ],
      expectedResult:
        "A simple table listing every logged month, with a trash icon to remove entries.",
    },

    {
      id: "cards",
      title: "2. Cards",
      dependsOn: ["table"],
      blocks: [
        {
          type: "text",
          content:
            "Four DDSCard elements summarize the data at a glance: total spent this year, monthly average, highest month, and lowest month. All four follow the exact same shape — a muted uppercase label and a bold value underneath — so here's one in full:",
        },
        {
          type: "text",
          content:
            "Modify the MonthlySpending component that owns the four summary cards. The following code is the complete JSX structure for one of the four cards; the other three reuse the same structure with different values.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/monthlySpending.tsx",
          scope: "partial",
          content: `<DDSCard className="dds__rounded">
  <div className="dds__card-body dds__p-3">
    <div className="dds__text-muted dds__font-weight-bold dds__text-uppercase dds__font-size-xs dds__mb-2">
      TOTAL SPENT THIS YEAR
    </div>
    <div className="dds__d-flex dds__align-items-baseline">
      <span className="dds__h4 dds__font-weight-semibold dds__mb-0">
        \${totalMonthlySpent.toFixed(2)}
      </span>
    </div>
  </div>
</DDSCard>`,
        },
        {
          type: "text",
          content:
            "This card uses DDS utility classes for its visual hierarchy and spacing instead of custom CSS. `dds__rounded` rounds the card, `dds__card-body` applies the card body structure, and `dds__p-3` adds internal padding. The label uses DDS typography utilities for muted, bold, uppercase, small text and `dds__mb-2` adds spacing below it. `dds__d-flex` creates the flex layout and `dds__align-items-baseline` aligns the value with the baseline of any accompanying content. The value uses DDS heading and font-weight utilities, while `dds__mb-0` removes the default bottom margin.",
        },
        {
          type: "text",
          content:
            "The other three cards (Monthly average, Highest month, Lowest month) are copies of this same structure — only the label and value change. The Highest month and Lowest month cards also show a small secondary span identifying the corresponding month via getMonthName.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/monthlySpending.tsx",
          scope: "partial",
          content: `<span className="dds__text-muted dds__font-size-xs dds__ml-2">
  {getMonthName(highestMonth?.month)}
</span>`,
        },
        {
          type: "text",
          content:
            "The secondary month label also uses DDS typography and spacing utilities: `dds__text-muted` reduces its visual emphasis, `dds__font-size-xs` keeps it smaller than the main value, and `dds__ml-2` adds horizontal spacing between the amount and the month label.",
        },
        {
          type: "text",
          content:
            "The four values come from plain array math over expensesList — reduce for the total, total divided by count for the average, and reduce comparisons for highest and lowest. None of that is DDS-specific, so it is not the focus of this step.",
        },
      ],
      expectedResult: "Four cards summarizing the year's spending.",
    },

    {
      id: "input",
      title: "3. Input (and Select)",
      dependsOn: ["table", "cards"],
      blocks: [
        {
          type: "text",
          content:
            "The form at the top of the page — technically two different DDS components (DDSSelect for the month, DDSInput for the amount), grouped into one step here only because they're the two fields of the same small form, not because they're the same component.",
        },
        {
          type: "text",
          content:
            "Modify the MonthlySpending component. The month and totalSpent values are local state owned by this component, and months is the list of available month options.",
        },
        {
          type: "text",
          content:
            "Each field is wrapped in a small container with an inline width of 250px. This keeps the two inputs compact without introducing a custom CSS class or stylesheet. The `dds__label` class is a DDS utility that applies the Design System label styling.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/monthlySpending.tsx",
          scope: "partial",
          content: `<div style={{ width: "250px" }}>
  <label className="dds__label">Month Selection</label>
  <DDSSelect
    value={month}
    placeholder="Select a month"
    onChange={(e) => setMonth(Number(e.target.value))}
  >
    {months.map((item) => (
      <DDSSelectOption key={item.value} value={item.value.toString()}>
        {item.label}
      </DDSSelectOption>
    ))}
  </DDSSelect>
</div>

<div style={{ width: "250px" }}>
  <label className="dds__label">Total Spent</label>
  <DDSInput
    value={totalSpent || ""}
    onChange={(e) => setTotalSpent(Number(e.target.value))}
    placeholder="$ 0.00"
  />
</div>

<DDSButton onClick={handleSave}>Save</DDSButton>`,
        },
        {
          type: "text",
          content:
            "The width is kept as an inline style because it is a small, local layout constraint for these two fields. If a reusable layout pattern were needed elsewhere, that would be a better reason to introduce a shared class or layout component instead.",
        },
        {
          type: "text",
          content:
            "handleSave builds a new MonthlyExpenses entry from month and totalSpent, appends it to the list, and resets both fields — the same pattern the Transactions Modal used for its own form state in Step 1.",
        },
      ],
      expectedResult:
        "A small form that logs one month's total spending at a time.",
    },

    {
      id: "progress-bar",
      title: "4. Progress bar (with Tooltip and Link)",
      dependsOn: ["cards", "input"],
      blocks: [
        {
          type: "text",
          content:
            "This is really three DDS components living in one file: DDSProgressBar is the main piece, but it's paired with a DDSTooltip (for context on what the bar means) triggered by a DDSLink (styled as a standalone icon, not a text link).",
        },
        {
          type: "text",
          content:
            "Create components/progressBar.tsx. This component receives the monthly expenses through the expenses prop and gets the comparison data from the useMonthlySpendingStats hook.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/progressBar.tsx",
          scope: "partial",
          content: `import { DDSLink, DDSProgressBar, DDSTooltip } from "@dds/react";
import { MonthlyExpenses } from "./monthlySpending";
import { useMonthlySpendingStats } from "@/utils/useMonthlySpedingsStats";

interface ProgressBarSpentAvarageProps {
  expenses: MonthlyExpenses[];
}

const ProgressBarSpentAvarage = ({ expenses }: ProgressBarSpentAvarageProps) => {
  const { diffPercentage, isAbove } = useMonthlySpendingStats(expenses);

  const progressValue = Math.min(Math.abs(diffPercentage), 100);
  const helperText = \`\${Math.abs(diffPercentage).toFixed(0)}% \${
    isAbove ? "above" : "below"
  } average\`;`,
        },
        {
          type: "text",
          content:
            "useMonthlySpendingStats is a custom React hook, not a DDS component. It performs the calculation that determines how far the current month is from the historical average, expressed as a percentage. progressValue clamps that percentage to 100 so the progress bar never exceeds its maximum value.",
        },
        {
          type: "text",
          content:
            "Complete the component by adding the Tooltip and ProgressBar. The Tooltip wraps a DDSLink styled as a standalone icon-only trigger:",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/progressBar.tsx",
          scope: "partial",
          content: `  return (
    <>
      <DDSTooltip
        title="Monthly comparison"
        trigger={
          <DDSLink
            href="#"
            icon="alert-info-cir"
            kind="standalone"
            aria-label="More information"
          />
        }
      >
        Use this indicator to see whether you're spending above or below your
        usual monthly average.
      </DDSTooltip>

      <DDSProgressBar
        label="Compared to average"
        value={Number(progressValue.toFixed(0))}
        helperText={helperText}
      />
    </>
  );
};

export default ProgressBarSpentAvarage;`,
        },
        {
          type: "text",
          content:
            'The DDSLink does not require custom CSS here. `kind="standalone"` applies the DDS styling for an icon-only link, while `aria-label` provides an accessible name because there is no visible text label.',
        },
        {
          type: "text",
          content:
            'Note kind="standalone" on the DDSLink here — different from the text links you\'ve seen elsewhere (like "View all transactions" on the Dashboard). This is a Link used purely as an icon-triggered affordance, with no visible label of its own; aria-label is what makes it accessible.',
        },
      ],
      expectedResult:
        "A small info icon that shows an explanatory tooltip on hover, next to a progress bar comparing the current month's spending to the historical average.",
    },

    {
      id: "bringing-it-together",
      title: "Bringing it together — the Monthly Spending page",
      dependsOn: ["table", "cards", "input", "progress-bar"],
      blocks: [
        {
          type: "text",
          content:
            "app/MonthlySpending/page.tsx is intentionally thin here — it just renders the MonthlySpending component and Pagination below it. MonthlySpending owns the form, cards, table, and progress bar internally.",
        },
        {
          type: "text",
          content:
            "Create or modify app/MonthlySpending/page.tsx with the following page component. The page heading uses the DDS `dds__heading--2` utility class rather than custom CSS, so the heading follows the Design System typography scale.",
        },
        {
          type: "code",
          language: "tsx",
          file: "app/MonthlySpending/page.tsx",
          scope: "full",
          content: `"use client";

import { Pagination } from "@/components/client-only";
import { MonthlySpending } from "@/components/monthlySpending";

const MonthlySpendingPage = () => {
  return (
    <div>
      <h1 className="dds__heading--2">Monthly spending </h1>
      <MonthlySpending />
      <Pagination />
    </div>
  );
};

export default MonthlySpendingPage;`,
        },
        {
          type: "text",
          content:
            "Pagination doesn't receive a totalItems prop here — unlike the Transactions page, this screen doesn't lift its expense count up to the page level, so Pagination falls back to its default of 0.",
        },
      ],
      expectedResult:
        "The complete Monthly Spending screen — form, four summary cards, progress bar with tooltip, and the table of logged months.",
    },
  ],
};
