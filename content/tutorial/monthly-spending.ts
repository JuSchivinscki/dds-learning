import { TutorialChapter } from "@/types/tutorial";

export const monthlySpendingChapter: TutorialChapter = {
  id: "monthly-spending",
  title: "Step 2 — Monthly Spendings",
  intro:
    "Same approach as Step 1: short intro per component, small incremental code blocks, full files kept as checkpoints instead of pasted here in full. This screen tracks total spending per month: a form to log a month's total, four summary cards, a progress indicator comparing the current month to your average, and a table listing every month logged so far.",
  steps: [
    {
      id: "table",
      title: "1. Table",
      blocks: [
        {
          type: "text",
          content:
            "We already covered Table's anatomy and when to use it over a List in Step 1 — same reasoning applies here: comparing spending across months is a reference/comparison use case, not a scannable list.",
        },
        {
          type: "text",
          content:
            "Create components/tableMonthlySpending.tsx. It's simpler than the Transactions table — just three data columns and a delete action, no search, no bulk selection:",
        },
        {
          type: "code",
          language: "tsx",
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
          content: "The price column reuses the same manual .toFixed(2) formatting style as the Transactions table:",
        },
        {
          type: "code",
          language: "tsx",
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
          type: "code",
          language: "tsx",
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
            "getMonthName comes from @/utils/getMonthName — a small shared helper (it just looks up a month number in a months array and returns its label). It's used here and again in the Cards section below; centralizing it means both places stay in sync if the month list ever changes.",
        },
      ],
      expectedResult: "a simple table listing every logged month, with a trash icon to remove entries.",
      checkpointFile: "checkpoints/monthly-spending/tableMonthlySpending.tsx",
    },
    {
      id: "cards",
      title: "2. Cards",
      blocks: [
        {
          type: "text",
          content:
            "Four DDSCard elements summarize the data at a glance: total spent this year, monthly average, highest month, and lowest month. All four follow the exact same shape — a muted uppercase label and a bold value underneath — so here's one in full:",
        },
        {
          type: "code",
          language: "tsx",
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
            "The other three (Monthly average, Highest month, Lowest month) are copies of this same structure — only the label and the value change, and the last two add a small secondary <span> showing which month it refers to, via getMonthName:",
        },
        {
          type: "code",
          language: "tsx",
          content: `<span className="dds__text-muted dds__font-size-xs dds__ml-2">
  {getMonthName(highestMonth?.month)}
</span>`,
        },
        {
          type: "text",
          content:
            "The four values themselves come from plain array math over expensesList — reduce for the total, total ÷ count for the average, and reduce comparisons for highest/lowest. None of that is DDS-specific, so it's not the focus here; you'll see it in full in the checkpoint file.",
        },
      ],
      expectedResult: "four cards summarizing the year's spending.",
      checkpointFile: "checkpoints/monthly-spending/monthlySpending.tsx",
    },
    {
      id: "input",
      title: "3. Input (and Select)",
      blocks: [
        {
          type: "text",
          content:
            "The form at the top of the page — technically two different DDS components (DDSSelect for the month, DDSInput for the amount), grouped into one step here only because they're the two fields of the same small form, not because they're the same component.",
        },
        {
          type: "code",
          language: "tsx",
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
            "handleSave builds a new MonthlyExpenses entry from month and totalSpent, appends it to the list, and resets both fields — the same pattern the Transactions Modal used for its own form state in Step 1.",
        },
      ],
      expectedResult: "a small form that logs one month's total spending at a time.",
    },
    {
      id: "progress-bar",
      title: "4. Progress bar (with Tooltip and Link)",
      blocks: [
        {
          type: "text",
          content:
            "This is really three DDS components living in one file: DDSProgressBar is the main piece, but it's paired with a DDSTooltip (for context on what the bar means) triggered by a DDSLink (styled as a standalone icon, not a text link).",
        },
        {
          type: "text",
          content: "Create components/progressBar.tsx:",
        },
        {
          type: "code",
          language: "tsx",
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
            "useMonthlySpendingStats (a small hook, not a DDS component) does the actual math — how far the current month is from the historical average, as a percentage. progressValue clamps that percentage to 100 so the bar never overflows past full.",
        },
        {
          type: "text",
          content: "The Tooltip wraps a Link styled as a standalone icon-only trigger:",
        },
        {
          type: "code",
          language: "tsx",
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
            "Note kind=\"standalone\" on the DDSLink here — different from the text links you've seen elsewhere (like \"View all transactions\" on the Dashboard). This is a Link used purely as an icon-triggered affordance, with no visible label of its own; aria-label is what makes it accessible.",
        },
      ],
      expectedResult:
        "a small info icon that shows an explanatory tooltip on hover, next to a progress bar comparing the current month's spending to the historical average.",
      checkpointFile: "checkpoints/monthly-spending/progressBar.tsx",
    },
    {
      id: "bringing-it-together",
      title: "Bringing it together — the Monthly Spending page",
      blocks: [
        {
          type: "text",
          content:
            "app/MonthlySpending/page.tsx is intentionally thin here — it just renders <MonthlySpending /> (which owns all the state: form, cards, table, and progress bar internally) and <Pagination /> below it.",
        },
        {
          type: "code",
          language: "tsx",
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
        "the complete Monthly Spending screen — form, four summary cards, progress bar with tooltip, and the table of logged months.",
      checkpointFile: "checkpoints/monthly-spending/page.tsx",
    },
  ],
};
