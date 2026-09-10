import { TutorialChapter } from "@/types/tutorial";

export const transactionsChapter: TutorialChapter = {
  id: "transactions",
  title: "Transactions",
  intro:
    "This tutorial assumes you already know React and Next.js. It's not here to teach you how to build an app — it's here to teach you how to use the Dell Design System, through building one real screen at a time. By the end, you'll also have a finished project for your portfolio.",

  steps: [
    {
      id: "table",
      title: "1. Table",
      dependsOn: [],
      blocks: [
        {
          type: "text",
          content:
            "We'll start with the piece that holds everything else in this chapter: the transactions table itself. Tables and lists aren't used for the same purpose — identifying the right one matters most for users with cognitive and learning disabilities, or those using screen readers:",
        },
        {
          type: "table",
          headers: ["Component", "Use case"],
          rows: [
            [
              "Table",
              "Displays complex groups of information for the purpose of reference, comparison, or choice.",
            ],
            [
              "List",
              "Presents a group of related information in a scannable format.",
            ],
          ],
        },
        {
          type: "text",
          content:
            "Our transaction data needs to be compared and cross-referenced (by date, category, amount) — a Table, not a List. Its anatomy: a body cell (holds body text, alphanumeric or links) and its body text; a header cell (the first row, across all columns) and its header text; an optional sort function (ascending/descending arrow); and an action menu trigger, signaling that a header cell can open a menu with features like sort.",
        },
        {
          type: "text",
          content:
            "Create components/table.tsx. Start with the adapter that converts our domain data into the shape DDSTable expects, and a minimal set of columns:",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "full",
          content: `import { TableData } from "@/app/Transactions/types";
import { DDSTable } from "@dds/react";

export interface Transactions {
  id: string;
  columns: {
    value: string | number;
  }[];
}

export const toTableRow = (
  transaction: TableData & { id: string },
): Transactions => {
  return {
    id: transaction.id,
    columns: [
      { value: transaction.date },
      { value: transaction.description },
      { value: transaction.category },
      { value: transaction.price },
      { value: transaction.paymentMethod },
      { value: transaction.transactionType },
    ],
  };
};

const TransactionsTable = ({
  transactions,
}: {
  transactions: Transactions[];
}) => {
  const table_columns = [
    { value: "Date" },
    { value: "Description" },
    { value: "Category" },
    { value: "Price" },
    { value: "Payment method" },
  ];

  return <DDSTable columns={table_columns} data={transactions} />;
};

export default TransactionsTable;`,
        },
        {
          type: "text",
          content:
            "Every cell just prints its raw value for now. The next few steps modify this same components/table.tsx file and layer DDS components onto individual columns.",
        },
      ],
      expectedResult:
        "A plain table with 5 columns and unstyled text in every cell.",
      finalCode: {
        file: "components/table.tsx",
        content: `import { TableData } from "@/app/Transactions/types";
import { DDSTable } from "@dds/react";

export interface Transactions {
  id: string;
  columns: {
    value: string | number;
  }[];
}

export const toTableRow = (
  transaction: TableData & { id: string },
): Transactions => {
  return {
    id: transaction.id,
    columns: [
      { value: transaction.date },
      { value: transaction.description },
      { value: transaction.category },
      { value: transaction.price },
      { value: transaction.paymentMethod },
      { value: transaction.transactionType },
    ],
  };
};

const TransactionsTable = ({
  transactions,
}: {
  transactions: Transactions[];
}) => {
  const table_columns = [
    { value: "Date" },
    { value: "Description" },
    { value: "Category" },
    { value: "Price" },
    { value: "Payment method" },
  ];

  return <DDSTable columns={table_columns} data={transactions} />;
};

export default TransactionsTable;`,
      },
    },

    {
      id: "badge",
      title: "2. Badge",
      dependsOn: ["table"],
      blocks: [
        {
          type: "text",
          content:
            "Next, let's give the Payment method column a visual status indicator. Badges and tags look similar, but tags are interactive and badges are not:",
        },
        {
          type: "table",
          headers: ["Component", "Use case"],
          rows: [
            [
              "Badge",
              "Indicates a status or count. Read-only, not interactive.",
            ],
            [
              "Tag",
              "Lets users group, sort, or filter information; supports content classification and navigation.",
            ],
          ],
        },
        {
          type: "text",
          content:
            "Payment method has 3 fixed, non-interactive states (Cash, Credit card, Debit card) — a status, not something to filter by clicking here. That's a Badge. Its anatomy allows up to three elements — a color-coded container, an optional icon, and a label — though we're only using container + label in this project.",
        },
        {
          type: "text",
          content:
            "Modify components/table.tsx. The cellRendering function will be used by DDSTable to replace the raw Payment method value with a DDSBadge.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `import { DDSBadge, DDSTable } from "@dds/react";

interface ColumnRenderParams {
  cell: { value: string | number | null };
  row: {
    id?: string;
    columns: { value: string | number | null }[];
  };
}

const cellRendering = ({ cell }: ColumnRenderParams) => {
  const { value } = cell;

  const badgeColor =
    value === "Credit card"
      ? "success"
      : value === "Debit card"
        ? "warning"
        : value === "Cash"
          ? "error"
          : "gray";

  return (
    <DDSBadge color={badgeColor} emphasis="medium" size="md">
      {value}
    </DDSBadge>
  );
};`,
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `const table_columns = [
  { value: "Date" },
  { value: "Description" },
  { value: "Category" },
  { value: "Price" },
  { value: "Payment method", render: cellRendering },
];`,
        },
      ],
      expectedResult:
        "The Payment method column shows colored pills instead of plain text.",
    },

    {
      id: "tag",
      title: "3. Tag",
      dependsOn: ["table", "badge"],
      blocks: [
        {
          type: "text",
          content:
            "Now the Category column — this time we want something classification-based rather than status-based. Tags and badges look similar, but only tags are interactive:",
        },
        {
          type: "table",
          headers: ["Component", "Use case"],
          rows: [
            [
              "Tag",
              "Lets users group, sort, or filter information. Frequently contains keywords or metadata; supports classification and navigation.",
            ],
            ["Badge", "A read-only status indicator or label."],
          ],
        },
        {
          type: "text",
          content:
            "Category has 11 possible values — a classification with many options, exactly what Tag is meant for. A tag's anatomy has a container and label as required elements, plus an optional leading icon and an optional dismiss icon to close the tag — we're only using container + label here too.",
        },
        {
          type: "text",
          content:
            "Modify components/table.tsx. This renderer follows the same pattern as the Badge renderer from the previous step, but maps categories to DDS Tag colors and emphasis levels.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `import { DDSTag } from "@dds/react";

const categoryCellRendering = ({ cell }: ColumnRenderParams) => {
  const { value } = cell;
  const categoryStr = String(value);

  const colorMap = {
    Housing: { color: "brand", emphasis: "high" },
    Utilities: { color: "brand", emphasis: "medium" },
    Groceries: { color: "success", emphasis: "high" },
    "Dining Out": { color: "success", emphasis: "medium" },
    "Public Transit": { color: "info", emphasis: "high" },
    "Car Expenses": { color: "info", emphasis: "medium" },
    Entertainment: { color: "warning", emphasis: "high" },
    Healthcare: { color: "warning", emphasis: "medium" },
    "Personal Care": { color: "error", emphasis: "high" },
    "Investments & Savings": { color: "error", emphasis: "medium" },
    Others: { color: "gray", emphasis: "medium" },
  } as const;

  const config =
    colorMap[categoryStr as keyof typeof colorMap] || colorMap["Others"];

  return (
    <DDSTag
      color={config.color as any}
      emphasis={config.emphasis as any}
      size="md"
    >
      {categoryStr}
    </DDSTag>
  );
};`,
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `const table_columns = [
  { value: "Date" },
  { value: "Description" },
  { value: "Category", render: categoryCellRendering },
  { value: "Price" },
  { value: "Payment method", render: cellRendering },
];`,
        },
      ],
      expectedResult:
        "The Category column shows colored tags, one per category.",
    },

    {
      id: "checkbox",
      title: "4. Checkbox — and why this project uses Bulk actions instead",
      dependsOn: ["table", "badge", "tag"],
      blocks: [
        {
          type: "text",
          content:
            "We won't use a standalone DDSCheckbox in this project, but it's worth knowing when you would. Checkboxes and radio buttons aren't used for the same purpose:",
        },
        {
          type: "table",
          headers: ["Component", "Use case"],
          rows: [
            [
              "Checkbox",
              "If a user can select multiple options, use checkboxes — checking one doesn't uncheck others. Also usable to confirm acceptance, since it can be selected and deselected before submission.",
            ],
            [
              "Radio button",
              "For a binary choice, or selecting only one option from five or fewer, use radio buttons instead.",
            ],
          ],
        },
        {
          type: "text",
          content:
            "What we actually need is row selection inside a table, which is a related, table-specific pattern: Bulk actions. The bulk actions feature is useful when the user needs to perform the same action on multiple items — available actions are placed on the ribbon, inline with the search bar. To use it, the table needs a bulkActions prop, defined as a ReactNode that renders your bulk actions menu; it can be combined with onBulkActionsWidthChange to manage which options display based on available ribbon space. Bulk actions works best paired with selectable rows, though that's not a strict requirement.",
        },
        {
          type: "text",
          content:
            "Modify components/table.tsx. TransactionsTable already receives a transactions prop. Add selectedRows as local React state inside TransactionsTable and pass that state to DDSTable through selectableRows, selectedRows, and onSelectedRowsChange.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `import { useState } from "react";

const TransactionsTable = ({
  transactions,
}: {
  transactions: Transactions[];
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // ...table_columns stays the same

  return (
    <DDSTable
      columns={table_columns}
      data={transactions}
      selectableRows
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
    />
  );
};`,
        },
        {
          type: "text",
          content:
            "The selectedRows state belongs to TransactionsTable and contains the IDs of the currently selected table rows. The next step will use this state for the bulk delete action.",
        },
        {
          type: "text",
          content:
            "We're not using onBulkActionsWidthChange here — our bulk action is a single button, so responsive collapsing isn't a concern, but it's worth knowing if your menu grows later.",
        },
      ],
      expectedResult:
        "Every row gets a checkbox. Nothing acts on the selection yet — that's the next step.",
    },

    {
      id: "action-menu",
      title: "5. Action Menu",
      dependsOn: ["table", "badge", "tag", "checkbox"],
      blocks: [
        {
          type: "text",
          content:
            'Each row needs "edit" and "delete" tucked away until needed. The action menu and dropdown look similar but solve different problems:',
        },
        {
          type: "table",
          headers: ["Component", "Use case"],
          rows: [
            [
              "Action menu",
              "Use when space is limited and you need overflow actions in a list. A selection triggers the action immediately; supports single-select and multi-select.",
            ],
            [
              "Dropdown",
              "Use to filter, sort, or change page content; accommodates multiple concurrent selections and grouping for long lists.",
            ],
          ],
        },
        {
          type: "text",
          content:
            "An action menu is a container for a menu tied to the task at hand, triggered by a single element (the trigger itself isn't part of the component's architecture). Items are grouped by type and separated with dividers or group titles; destructive actions always sit visually separated at the bottom. A basic menu has three elements — a label, a divider, and a destructive item; a grouped menu adds a group label and a check icon for activated multi-select options. Ours is a basic menu — just edit and delete, no groups.",
        },
        {
          type: "text",
          content:
            "The following props are supplied by the Transactions page: onEdit handles editing a transaction, onDelete deletes one transaction, and onDeleteSelected deletes all selected transactions. selectedRows comes from the useState introduced in step 4. The Transactions interface and ColumnRenderParams interface come from the same components/table.tsx file.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `import { DDSActionMenu, DDSButton, DDSIcon } from "@dds/react";

interface Props {
  transactions: Transactions[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteSelected: (ids: string[]) => void;
}`,
        },
        {
          type: "text",
          content:
            "The action buttons are wrapped in DDS utility classes rather than custom CSS. `dds__d-flex` creates a flex container, while `dds__align-items-center` vertically centers the content inside it.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `const actionsCellRendering = ({ row }: ColumnRenderParams) => {
  return (
    <div className="dds__d-flex dds__align-items-center">
      <DDSActionMenu
        trigger={<DDSIcon name="gear" />}
        defaultSelectedOptions={["view-rows"]}
      >
        <DDSButton
          kind="tertiary"
          size="sm"
          onClick={() => onEdit(row.id!)}
        >
          <DDSIcon name="pencil" />
        </DDSButton>

        <DDSButton
          kind="tertiary"
          size="sm"
          onClick={() => onDelete(row.id!)}
        >
          <DDSIcon name="trash" />
        </DDSButton>
      </DDSActionMenu>
    </div>
  );
};`,
        },
        {
          type: "text",
          content: "And the bulk action from step 4, now doing something real:",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `const bulkActions = (
  <DDSButton onClick={() => onDeleteSelected(selectedRows)}>
    Delete
  </DDSButton>
);`,
        },
        {
          type: "text",
          content:
            "Wire the new Actions column in, and turn on the built-in search box while we're at it:",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `const table_columns = [
  { value: "Date" },
  { value: "Description" },
  { value: "Category", render: categoryCellRendering },
  { value: "Price" },
  { value: "Payment method", render: cellRendering },
  { value: "Actions", render: actionsCellRendering },
];

return (
  <DDSTable
    search
    columns={table_columns}
    data={transactions}
    selectableRows
    selectedRows={selectedRows}
    onSelectedRowsChange={setSelectedRows}
    bulkActions={bulkActions}
  />
);`,
        },
      ],
      expectedResult:
        'Every row has a gear icon opening edit/delete; selecting rows and clicking "Delete" on the ribbon removes several at once.',
    },

    {
      id: "switch",
      title: "6. Switch",
      dependsOn: ["action-menu"],
      blocks: [
        {
          type: "text",
          content:
            "Outside the table, on the page itself, a toggle to hide income and show only expenses.",
        },
        {
          type: "text",
          content:
            "Modify app/Transactions/page.tsx. The setOnlyExpenses function belongs to the page component and updates its local filtering state.",
        },
        {
          type: "code",
          language: "tsx",
          file: "app/Transactions/page.tsx",
          scope: "partial",
          content: `<DDSSwitch
  horizontalAlignment="start"
  label="Show only expenses"
  localization={{}}
  onChange={(e) => setOnlyExpenses(e.target.checked)}
/>`,
        },
        {
          type: "text",
          content:
            "The Switch only reports its checked state; the actual filtering happens on the Transactions page.",
        },
      ],
    },

    {
      id: "button",
      title: "7. Button",
      dependsOn: ["switch"],
      blocks: [
        {
          type: "text",
          content:
            'No dedicated Button component here — DDSButton directly, in a few recurring roles you\'ve already seen: kind="tertiary" + size="sm" for compact row actions, the default kind for primary actions (like the page\'s "Add Transaction"), and kind="secondary" for a de-emphasized action next to a primary one (you\'ll see this in the Modal\'s "Cancel" button next).',
        },
        {
          type: "text",
          content:
            "Modify app/Transactions/page.tsx. This button calls the existing handleAdd function, which opens the transaction Modal. The icon and label are separated with the DDS `dds__ml-1` spacing utility, which adds a small left margin to the label. This avoids introducing custom CSS for simple spacing.",
        },
        {
          type: "code",
          language: "tsx",
          file: "app/Transactions/page.tsx",
          scope: "partial",
          content: `<DDSButton onClick={handleAdd}>
  <DDSIcon name="plus-add" />
  <span className="dds__ml-1">Add Transaction</span>
</DDSButton>`,
        },
      ],
    },

    {
      id: "modal",
      title: "8. Modal + Divider",
      dependsOn: ["button"],
      blocks: [
        {
          type: "text",
          content:
            "Create components/modal.tsx. The form handles both adding and editing a transaction. It is reused for both cases, switching its confirm label based on whether a transaction was passed in.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/modal.tsx",
          scope: "full",
          content: `"use client";

import {
  DDSButton,
  DDSDatePicker,
  DDSDivider,
  DDSInput,
  DDSModal,
  DDSRadioButton,
  DDSSelect,
  DDSSelectOption,
  DDSTextArea,
} from "@dds/react";
import { useEffect, useState } from "react";

import type { TableData } from "@/app/Transactions/types";
import type { Transactions } from "./table";

export const category = [
  "Housing",
  "Utilities",
  "Groceries",
  "Dining Out",
  "Public Transit",
  "Car Expenses",
  "Entertainment",
  "Healthcare",
  "Personal Care",
  "Investments & Savings",
  "Others",
];

export const paymentMethod = ["Cash", "Credit card", "Debit card"];

export const transactionType = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];`,
        },
        {
          type: "text",
          content:
            "The previous block creates the file and defines its imports and shared option data. The following blocks are incremental additions to the same components/modal.tsx file. Together they complete the component.",
        },
        {
          type: "text",
          content:
            "Form state, populated from the transaction being edited (or reset for a new one):",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/modal.tsx",
          scope: "partial",
          content: `const [isDate, setIsDate] = useState("");
const [isDescription, setIsDescription] = useState("");
const [isCategory, setIsCategory] = useState("");
const [isPrice, setIsPrice] = useState("");
const [isPaymentMethod, setIsPaymentMethod] = useState("");
const [isTransactionType, setIsTransactionType] = useState("");

useEffect(() => {
  if (transaction) {
    setIsDate(transaction.columns[0].value as string);
    setIsDescription(transaction.columns[1].value as string);
    setIsCategory(transaction.columns[2].value as string);
    setIsPrice(String(transaction.columns[3].value));
    setIsPaymentMethod(transaction.columns[4].value as string);
  } else {
    setIsDate("");
    setIsDescription("");
    setIsCategory("");
    setIsPrice("");
    setIsPaymentMethod("");
    setIsTransactionType("expense");
  }
}, [transaction, open]);`,
        },
        {
          type: "text",
          content:
            "The fields — DDSDatePicker, DDSTextArea, two DDSSelect driven by the constants above, DDSInput for price:",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/modal.tsx",
          scope: "partial",
          content: `<DDSModal open={open} onClose={onClose}>
  <DDSDatePicker
    label={{ children: "Date" }}
    value={isDate ? new Date(isDate) : undefined}
    onDateChange={(date) =>
      setIsDate(date ? date.toISOString().split("T")[0] : "")
    }
  />

  <DDSTextArea
    label={{ children: "Description" }}
    value={isDescription}
    onChange={(e) => setIsDescription(e.target.value)}
  />

  <DDSSelect
    label={{ children: "Category" }}
    placeholder="Select a category"
    value={isCategory}
    onChange={(e) => setIsCategory(e.target.value)}
  >
    {category.map((item) => (
      <DDSSelectOption key={item} value={item}>
        {item}
      </DDSSelectOption>
    ))}
  </DDSSelect>

  <DDSSelect
    label={{ children: "Payment method" }}
    placeholder="Select a payment method"
    value={isPaymentMethod}
    onChange={(e) => setIsPaymentMethod(e.target.value)}
  >
    {paymentMethod.map((item) => (
      <DDSSelectOption key={item} value={item}>
        {item}
      </DDSSelectOption>
    ))}
  </DDSSelect>

  <DDSInput
    label={{ children: "Price" }}
    value={isPrice}
    onChange={(e) => setIsPrice(e.target.value)}
  />`,
        },
        {
          type: "text",
          content:
            "DDSDivider separates the data fields above from the income/expense choice below. The radio-button group uses the DDS `dds__mb-4` spacing utility to add space below the group before the modal footer.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/modal.tsx",
          scope: "partial",
          content: `  <DDSDivider />

  <div className="dds__mb-4">
    {transactionType.map((item) => (
      <DDSRadioButton
        key={item.value}
        name="transaction-type"
        label={item.label}
        value={item.value}
        checked={isTransactionType === item.value}
        onChange={(e) => setIsTransactionType(e.target.value)}
      />
    ))}
  </div>`,
        },
        {
          type: "text",
          content:
            'And the footer — the kind="secondary" pattern from the Button step. The footer uses DDS flex utilities instead of custom CSS. `dds__d-flex` creates the flex layout and `dds__justify-content-end` aligns the actions to the right. The second button uses `dds__ml-2` to create spacing between the two actions.',
        },
        {
          type: "code",
          language: "tsx",
          file: "components/modal.tsx",
          scope: "partial",
          content: `  <div className="dds__d-flex dds__justify-content-end">
    <DDSButton kind="secondary" onClick={onClose}>
      Cancel
    </DDSButton>

    <DDSButton className="dds__ml-2" onClick={handleSave}>
      {transaction ? "Save changes" : "Add transaction"}
    </DDSButton>
  </div>
</DDSModal>`,
        },
      ],
      expectedResult:
        "One modal, two purposes — the confirm label changes depending on whether transaction was passed in.",
    },

    {
      id: "view-more-less",
      title: "9. View more/less",
      dependsOn: ["table", "modal"],
      blocks: [
        {
          type: "text",
          content:
            "Our long descriptions in the table need to save space while still being fully readable on demand. View more/less and accordion share similar features — the difference is how content is revealed:",
        },
        {
          type: "table",
          headers: ["Component", "Use case"],
          rows: [
            [
              "View more/less",
              'Reveals or hides contextual content. Content may stop mid-sentence or -paragraph to save space; continuation is often indicated by an ellipsis (…) with "Read more" / "Show less."',
            ],
            [
              "Accordion",
              "Expands or collapses content contained in collapsible panels.",
            ],
          ],
        },
        {
          type: "text",
          content:
            "That's exactly our case: save space, indicate there's more, let the user reveal it — not a full panel expand/collapse. The basic type is used for related but unlike information: content is wrapped in a block element, the button has an arrow, and the control stays above the revealed content since the content is unlike what's already visible. Use a custom label describing the hidden content; the label stays the same whether shown or hidden — the arrow indicates the ability to hide it. The shown/hidden state should be controlled with React's useState hook.",
        },
        {
          type: "text",
          content: "Create components/viewMoreLess.tsx:",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/viewMoreLess.tsx",
          scope: "full",
          content: `"use client";

import { useState } from "react";
import { DDSViewMoreLess, useViewMoreLess } from "@dds/react";

interface DescriptionCellProps {
  text: string;
  maxLength?: number;
}

const ViewMoreLess = ({
  text,
  maxLength = 40,
}: DescriptionCellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { focusProps } = useViewMoreLess({ open: isOpen });

  const isLongText = text.length > maxLength;

  if (!isLongText) {
    return <span>{text}</span>;
  }

  return (
    <div>
      {!isOpen ? (
        <span>{text.slice(0, maxLength)}...</span>
      ) : (
        <span {...focusProps}>{text}</span>
      )}

      <DDSViewMoreLess
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Less" : "More"}
      </DDSViewMoreLess>
    </div>
  );
};

export default ViewMoreLess;`,
        },
        {
          type: "text",
          content:
            "Modify components/table.tsx. Import the new ViewMoreLess component and use it as the renderer for the Description column.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `import ViewMoreLess from "./viewMoreLess";

const descriptionCellRendering = ({
  cell,
}: ColumnRenderParams) => {
  return <ViewMoreLess text={String(cell.value)} />;
};`,
        },
        {
          type: "code",
          language: "tsx",
          file: "components/table.tsx",
          scope: "partial",
          content: `const table_columns = [
  { value: "Date" },
  { value: "Description", render: descriptionCellRendering },
  { value: "Category", render: categoryCellRendering },
  { value: "Price" },
  { value: "Payment method", render: cellRendering },
  { value: "Actions", render: actionsCellRendering },
];`,
        },
      ],
      expectedResult:
        'Short descriptions display fully; long ones truncate at 40 characters with a "More" link that expands into "Less". This completes the table functionality for this chapter.',
    },

    {
      id: "drawer",
      title: "10. Drawer",
      dependsOn: ["modal", "view-more-less"],
      blocks: [
        {
          type: "text",
          content:
            'Create components/drawerFilter.tsx. This side panel holds the Category and Payment method filters, with a "temporary" state that only applies to the table once the user confirms.',
        },
        {
          type: "code",
          language: "tsx",
          file: "components/drawerFilter.tsx",
          scope: "full",
          content: `"use client";

import { useCallback, useState } from "react";
import { DDSButton, DDSDrawer } from "@dds/react";

import DropdownFilter from "./dropdown";

interface DrawerFilterProps {
  selectedCategory: string;
  selectedPaymentMethod: string;
  onCategoryChange: (value: string) => void;
  onPaymentMethodChange: (value: string) => void;
}

const DrawerFilter = ({
  selectedCategory,
  selectedPaymentMethod,
  onCategoryChange,
  onPaymentMethodChange,
}: DrawerFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempCategory, setTempCategory] =
    useState(selectedCategory);
  const [tempPaymentMethod, setTempPaymentMethod] =
    useState(selectedPaymentMethod);

  const openDrawer = useCallback(() => {
    setTempCategory(selectedCategory);
    setTempPaymentMethod(selectedPaymentMethod);
    setIsOpen(true);
  }, [selectedCategory, selectedPaymentMethod]);

  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const applyFilters = () => {
    onCategoryChange(tempCategory);
    onPaymentMethodChange(tempPaymentMethod);
    closeDrawer();
  };

  return (
    <>
      <DDSButton onClick={openDrawer}>Filters</DDSButton>

      <DDSDrawer
        open={isOpen}
        onClose={closeDrawer}
        size="sm"
      >
        <div className="dds__p-4">
          <DropdownFilter
            selectedCategory={tempCategory}
            selectedPaymentMethod={tempPaymentMethod}
            onCategoryChange={setTempCategory}
            onPaymentMethodChange={setTempPaymentMethod}
          />

          <div className="dds__mt-4">
            <DDSButton onClick={applyFilters}>
              Apply Filter
            </DDSButton>
          </div>
        </div>
      </DDSDrawer>
    </>
  );
};

export default DrawerFilter;`,
        },
        {
          type: "text",
          content:
            "The drawer content uses DDS spacing utilities instead of custom CSS. `dds__p-4` adds padding around the filter content, while `dds__mt-4` adds space above the Apply Filter button.",
        },
        {
          type: "text",
          content:
            "openDrawer resets the temporary values to whatever is currently confirmed, so reopening never shows a stale, unapplied selection. applyFilters only propagates the temporary values outward once confirmed.",
        },
        {
          type: "text",
          content:
            "DropdownFilter (components/dropdown.tsx) supplies the two DDSSelect fields inside, reusing the category/paymentMethod constants from the Modal step. The DropdownFilter component is assumed to be created as part of this tutorial and must exist at components/dropdown.tsx before DrawerFilter is used.",
        },
      ],
      expectedResult:
        'A "Filters" button opens a side panel with two dropdowns and an "Apply Filter" button.',
    },

    {
      id: "bringing-it-together",
      title: "Bringing it together — the Transactions page",
      dependsOn: [
        "table",
        "badge",
        "tag",
        "checkbox",
        "action-menu",
        "switch",
        "button",
        "modal",
        "view-more-less",
        "drawer",
      ],
      blocks: [
        {
          type: "text",
          content:
            "Everything above is a building block. app/Transactions/page.tsx connects them to real data — this part is React/Next.js plumbing more than DDS, so we'll move through it quickly.",
        },
        {
          type: "text",
          content:
            "It loads transactions from localStorage on mount, filters them by the Switch and Drawer selections, and provides the handlers each component calls via props: saveStorage (the single place that writes to storage), handleAdd/handleClose/editTransaction (for the Modal), deleteTransaction/deleteSelectedTransactions (for the Table's row actions and bulk delete, each showing a dismissible notification via useNotification), and handleSaveTransaction (decides create vs. edit based on whether an id was passed in).",
        },
        {
          type: "text",
          content:
            "useNotification only works because the whole app is wrapped in a DDSNotificationProvider, set up once in the root app/layout.tsx:",
        },
        {
          type: "code",
          language: "tsx",
          file: "app/layout.tsx",
          scope: "full",
          content: `"use client";

import { SideNav } from "@/components/client-only";
import "./globals.scss";
import "./layout.scss";
import { DDSNotificationProvider } from "@dds/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="dds-sidenav-layout">
          <SideNav />

          <div className="personal-finance-content">
            <DDSNotificationProvider>
              {children}
            </DDSNotificationProvider>
          </div>
        </div>
      </body>
    </html>
  );
}`,
        },
        {
          type: "text",
          content:
            "If you're following along in your own project and useNotification throws or does nothing, check this first — it's a provider requirement, not something scoped to the Transactions page.",
        },
        {
          type: "text",
          content:
            'The layout assembles everything from this step in order: heading, Switch + Drawer + "Add Transaction" button, the Modal, the Table, and Pagination (from components/client-only.tsx, wrapped in next/dynamic with ssr: false since it depends on localStorage).',
        },
      ],
      expectedResult:
        "The complete Transactions screen, every component from this step working together against real, persisted data.",
    },
  ],
};
