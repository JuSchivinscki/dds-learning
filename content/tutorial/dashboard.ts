import { TutorialChapter } from "@/types/tutorial";

export const dashboardChapter: TutorialChapter = {
  id: "dashboard",
  title: "Dashboard",
  intro:
    "The Dashboard brings together everything built in Steps 1 and 2 into one summary screen: cards, tabs, a custom list of recent activity, and links back into the other two screens. It also includes three data-visualization charts as an extra section. The tutorial uses short explanations and incremental code blocks, with every code block identifying the file it belongs to and whether it is a complete file or a partial addition.",

  steps: [
    {
      id: "cards",
      title: "1. Cards",
      dependsOn: [],
      blocks: [
        {
          type: "text",
          content:
            "Three DDSCard elements summarize the whole app's financial state: income, expenses, and net balance. The first two follow an identical shape — a label and icon in the header, and a large formatted number in the body.",
        },
        {
          type: "text",
          content:
            "Create components/cards.tsx. The component receives income, expense, and balance as props. The following block shows the structure of the income card and the formatting helper used by the component.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/cards.tsx",
          scope: "partial",
          content: `"use client";

import { DDSCard, DDSCardBody, DDSCardHeader, DDSIcon } from "@dds/react";

const formatCurrency = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD" });

<DDSCard className="dds__p-4" style={{ minHeight: "160px" }}>
  <DDSCardHeader className="dds__mb-2">
    <div className="d-flex justify-content-between align-items-center w-100">
      <span className="dds__text--sm dds__text--secondary dds__font-weight-bold dds__mr-3" style={{ letterSpacing: "0.05em" }}>
        INCOME
      </span>
      <DDSIcon name="arrow-up" style={{ color: "#0063b8" }} />
    </div>
  </DDSCardHeader>
  <DDSCardBody className="dds__pt-3 d-flex flex-column justify-content-between">
    <span className="dds__font-weight-bold dds__text--heading-lg" style={{ fontSize: "2.25rem" }}>
      {formatCurrency(income)}
    </span>
  </DDSCardBody>
</DDSCard>`,
        },
        {
          type: "text",
          content:
            "EXPENSES uses the same structure with a different icon (arrow-down) and color (#b31b1b). The third card, NET BALANCE, is a visual variation: it uses a filled brand-color background and white text instead of the plain card style, making it stand out as the headline number of the three.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/cards.tsx",
          scope: "partial",
          content: `<DDSCard
  className="dds__p-4 dds__text--white"
  style={{ minHeight: "160px", backgroundColor: "#0063b8", border: "none" }}
>
  <DDSCardHeader className="dds__mb-2">
    <div className="d-flex justify-content-between align-items-center w-100">
      <span className="dds__text--sm dds__font-weight-bold dds__mr-3" style={{ letterSpacing: "0.05em", opacity: 0.9, color: "#ffffff" }}>
        NET BALANCE
      </span>
      <DDSIcon name="currency-coins" style={{ color: "#ffffff" }} />
    </div>
  </DDSCardHeader>
  <DDSCardBody className="dds__pt-3 d-flex flex-column justify-content-between">
    <span className="dds__font-weight-bold dds__text--heading-lg" style={{ fontSize: "2.25rem", color: "#ffffff" }}>
      {formatCurrency(balance)}
    </span>
  </DDSCardBody>
</DDSCard>`,
        },
        {
          type: "text",
          content:
            "income, expense, and balance are received as props. This component does not calculate those values itself; it formats and displays numbers provided by the Dashboard page.",
        },
      ],
      expectedResult:
        "Three summary cards at the top of the Dashboard, with the balance card visually emphasized.",
    },

    {
      id: "tabs",
      title: "2. Tabs",
      dependsOn: ["cards"],
      blocks: [
        {
          type: "text",
          content:
            "Two tabs switch between the main dashboard view and a category/payment breakdown. DDSTabs wraps a DDSTabsHeader containing the clickable tab items and a DDSTabsBody containing one DDSTabsPane per tab. Each DDSTabsPane is matched to its DDSTabsItem through itemId.",
        },
        {
          type: "text",
          content:
            "Create components/tabsCharts.tsx. The component receives activeTab and onTabChange from its parent instead of managing the selected tab internally. It also accepts children, which will become the content of the main dashboard tab.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/tabsCharts.tsx",
          scope: "full",
          content: `"use client";

import { DDSTabs, DDSTabsBody, DDSTabsHeader, DDSTabsItem, DDSTabsPane } from "@dds/react";
import PaymentMethodPieChart from "./(charts)/paymentMethodPieChart";
import CategoryDonutChart from "./(charts)/categoryDonutChart";

interface TabsChartsProps {
  activeTab: string | null;
  onTabChange: (id: string | null) => void;
  children?: React.ReactNode;
}

const TabsCharts = ({ activeTab, onTabChange, children }: TabsChartsProps) => {
  return (
    <DDSTabs activeTab={activeTab} onTabChange={onTabChange}>
      <DDSTabsHeader>
        <DDSTabsItem id="tab-dashboard">Montlhy view</DDSTabsItem>
        <DDSTabsItem id="tab-category">Detail Montlhy</DDSTabsItem>
      </DDSTabsHeader>

      <DDSTabsBody>
        <DDSTabsPane itemId="tab-dashboard">{children}</DDSTabsPane>

        <DDSTabsPane itemId="tab-category">
          <div className="dds__d-flex dds__flex-row dds__gap-4 dds__justify-content-center" style={{ gap: "16px" }}>
            <div className="dds__flex-item">
              <PaymentMethodPieChart />
            </div>
            <div className="dds__flex-item">
              <CategoryDonutChart />
            </div>
          </div>
        </DDSTabsPane>
      </DDSTabsBody>
    </DDSTabs>
  );
};

export default TabsCharts;`,
        },
        {
          type: "text",
          content:
            "Both activeTab and onTabChange are controlled from outside — TabsCharts does not manage its own selected-tab state. The Dashboard page owns that state and passes it into TabsCharts. The tab-dashboard pane renders the children received from the page, while the tab-category pane renders the payment-method and category charts directly.",
        },
      ],
      expectedResult:
        'A two-tab switcher — "Montlhy view" showing the main dashboard and "Detail Montlhy" showing payment-method and category breakdowns side by side.',
    },

    {
      id: "list",
      title: "3. List",
      dependsOn: ["cards"],
      blocks: [
        {
          type: "text",
          content:
            'There is no dedicated DDSList component used here. What is called "List" in this project is a custom-built list of recent transactions — plain <div> elements styled to read as a scannable list, not a DDS list primitive. It is still the right pattern because this content is intended to be quickly scanned rather than compared across structured columns like the Transactions table.',
        },
        {
          type: "text",
          content:
            "Create components/latestTransactions.tsx. This component reads transactions from localStorage, keeps the five most recently added entries, and displays them from newest to oldest.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/latestTransactions.tsx",
          scope: "partial",
          content: `"use client";

import { useEffect, useState } from "react";
import { DDSLink } from "@dds/react";

const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

interface Transactions {
  id: string;
  date: string;
  description: string;
  category: string;
  price: number;
  paymentMethod: string;
  transactionType: string;
}

const LatestTransactions = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (!storedTransactions) return;

    const parsedTransactions: Transactions[] = JSON.parse(storedTransactions);
    setTransactions(parsedTransactions.slice(-5).reverse());
  }, []);`,
        },
        {
          type: "text",
          content:
            ".slice(-5).reverse() takes the last five transactions and reverses them, showing the five most recently added transactions with the newest one first. Each item is rendered as a plain flex row rather than a table row.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/latestTransactions.tsx",
          scope: "partial",
          content: `  return (
    <div>
      <h2 className="dds__body-1--lead">Last Transactions</h2>
      <div>
        {transactions.map((transaction) => {
          const isIncome = transaction.transactionType === "income";
          return (
            <div
              key={transaction.id}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #ddd" }}
            >
              <div>
                <strong>{transaction.description}</strong>
                <p style={{ margin: "4px 0" }}>{transaction.category}</p>
                <small>{transaction.date}</small>
              </div>
              <strong>
                {isIncome ? "+" : "-"} {formatCurrency(transaction.price)}
              </strong>
            </div>
          );
        })}
      </div>`,
        },
      ],
      expectedResult:
        "The five most recent transactions, each showing description, category, date, and a signed, formatted amount.",
    },

    {
      id: "link",
      title: "4. Link",
      dependsOn: ["list"],
      blocks: [
        {
          type: "text",
          content:
            "Continue modifying components/latestTransactions.tsx. A DDSLink closes out the list and points back to the full Transactions page.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/latestTransactions.tsx",
          scope: "partial",
          content: `      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
        <DDSLink href="/Transactions">View all transactions</DDSLink>
      </div>
    </div>
  );
};

export default LatestTransactions;`,
        },
        {
          type: "text",
          content:
            'This is different from the DDSLink used in the Monthly Spending progress bar. There, DDSLink used kind="standalone" and an icon as an accessible tooltip trigger. Here it is a regular text link with an href and is used for actual navigation.',
        },
      ],
      expectedResult:
        'A "View all transactions" link at the bottom of the list, navigating to /Transactions.',
    },

    {
      id: "charts",
      title: "Extra — Charts (Bar, Pie, Donut)",
      dependsOn: ["tabs"],
      blocks: [
        {
          type: "text",
          content:
            "Not part of the original component list, but a substantial part of this screen, so it is included as a bonus section. All three charts come from @dds/dv-components, Dell's data-visualization library, which is distinct from @dds/react. The charts share the same general pattern: dynamically import the library, prepare a data array, create a DDV chart targeting a DOM element, and clean up the chart instance when the component changes or unmounts.",
        },
        {
          type: "text",
          content:
            "Create components/(charts)/monthlyExpensesBarChart.tsx. The bar chart reads monthly spending directly from localStorage.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/(charts)/monthlyExpensesBarChart.tsx",
          scope: "partial",
          content: `"use client";

import { useEffect, useRef, useState } from "react";

const MonthlyExpensesBarChart = () => {
  const chartRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>([]);

  useEffect(() => {
    setIsClient(true);
    const storage = localStorage.getItem("monthlyExpenses");
    if (storage) setMonthlyExpenses(JSON.parse(storage));
  }, []);`,
        },
        {
          type: "text",
          content:
            "The isClient flag exists because these charts require browser APIs. localStorage and the DOM element used as the chart target do not exist during server-side rendering, so the component waits until it has mounted in the browser.",
        },
        {
          type: "text",
          content:
            "Once the component is running on the client, a second effect dynamically imports the chart library and creates the bar chart.",
        },
        {
          type: "code",
          language: "tsx",
          file: "components/(charts)/monthlyExpensesBarChart.tsx",
          scope: "partial",
          content: `  useEffect(() => {
    if (!isClient) return;

    async function loadChart() {
      const module = await import("@dds/dv-components");
      const DDV = module.default || (window as any).DDV;
      if (!DDV) return;

      const data = monthlyExpenses.map((item) => ({ month: item.month, total: item.totalSpent }));
      if (!data.length) return;

      if (chartRef.current?.destroy) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      chartRef.current = DDV.Bar({
        target: "#bar_monthly",
        data,
        fieldId: "month",
        valueField: "total",
        alignment: "vertical",
        tooltip: { prefix: "$" },
        xAxes: { title: "Month" },
        yAxes: { title: "Expenses" },
        sanitize: true,
      });
    }

    const timer = setTimeout(loadChart, 200);
    return () => {
      clearTimeout(timer);
      if (chartRef.current?.destroy) chartRef.current.destroy();
    };
  }, [isClient, monthlyExpenses]);`,
        },
        {
          type: "text",
          content:
            "Destroying the previous chart instance before creating a new one, and again during cleanup, prevents duplicate charts from stacking up after re-renders. This cleanup is especially important when using an imperative visualization library inside a React component.",
        },
        {
          type: "text",
          content:
            "Create components/(charts)/paymentMethodPieChart.tsx and components/(charts)/categoryDonutChart.tsx using the same general client-side chart pattern. The original implementation differs from the bar chart in three important ways: both components obtain their data through useAllTransactions() instead of reading localStorage directly; they call DDV.Pie(...) or DDV.Donut(...) instead of DDV.Bar(...); and both include a legend target and percentage-formatted tooltip because the proportion of each category matters more than its raw value.",
        },
        {
          type: "text",
          content:
            "The exact implementation of these two chart files is not reproduced here as a complete file. Treat this explanation as the architectural relationship between the three charts rather than as a complete copy-paste implementation.",
        },
      ],
      expectedResult:
        'A bar chart of monthly spending on the main tab, plus a pie and donut chart on the "Detail" tab breaking down spending by payment method and category.',
    },

    {
      id: "bringing-it-together",
      title: "Bringing it together — the Dashboard page",
      dependsOn: ["cards", "tabs", "list", "link", "charts"],
      blocks: [
        {
          type: "text",
          content:
            "Create or modify app/page.tsx. This page owns the active tab state and gets the financial totals from useAllTransactions(). It passes those values into CardsDashboard and places the main dashboard content inside TabsCharts.",
        },
        {
          type: "code",
          language: "tsx",
          file: "app/page.tsx",
          scope: "full",
          content: `"use client";
import { useState } from "react";
import CardsDashboard from "@/components/cards";
import FinancialDashboard from "@/components/financialDashboard";
import { useAllTransactions } from "@/utils/dashboardCalculations";
import { LatestTransactions, TabsCharts } from "@/components/client-only";

const Dashboard = () => {
  const { calculateIncome, calculateExpense, calculateBalance } = useAllTransactions();
  const [activeTab, setActiveTab] = useState<string | null>("tab-dashboard");

  return (
    <div>
      <h1> Dashboard </h1>

      <TabsCharts activeTab={activeTab} onTabChange={setActiveTab}>
        <CardsDashboard
          income={calculateIncome()}
          expense={calculateExpense()}
          balance={calculateBalance()}
        />
        <FinancialDashboard />
        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "24px" }}>
          <div style={{ width: "90%" }}>
            <LatestTransactions />
          </div>
        </div>
      </TabsCharts>
    </div>
  );
};

export default Dashboard;`,
        },
        {
          type: "text",
          content:
            "useAllTransactions from @/utils/dashboardCalculations is the same hook used by the Pie and Donut charts. It reads the transaction data and exposes calculation functions such as calculateIncome, calculateExpense, calculateBalance, calculateExpensesCategory, and calculatePaymentMethod.",
        },
        {
          type: "text",
          content:
            "FinancialDashboard is a thin wrapper around the monthly expenses bar chart, giving it a consistent container on the Dashboard.",
        },
        {
          type: "text",
          content:
            "LatestTransactions and TabsCharts are imported from components/client-only.tsx. This file was introduced earlier in the tutorial and uses dynamic loading with ssr: false for components that depend on browser-only APIs such as localStorage or the DOM.",
        },
      ],
      expectedResult:
        "The complete Dashboard — cards, tabs, bar/pie/donut charts, and the latest transactions list, all reflecting real data from the other two screens.",
    },
  ],
};
