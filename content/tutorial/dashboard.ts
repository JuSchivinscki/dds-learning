import { TutorialChapter } from "@/types/tutorial";

export const dashboardChapter: TutorialChapter = {
  id: "dashboard",
  title: "Step 3 — Dashboard",
  intro:
    "The Dashboard brings together everything built in Steps 1 and 2 into one summary screen: cards, tabs, a custom list of recent activity, and links back into the other two screens. Same approach as before — short intro per component, small code blocks, full files kept as checkpoints.",
  steps: [
    {
      id: "cards",
      title: "1. Cards",
      blocks: [
        {
          type: "text",
          content:
            "Three DDSCard elements summarize the whole app's financial state: income, expenses, and net balance. The first two follow an identical shape — a label + icon in the header, a large formatted number in the body:",
        },
        {
          type: "code",
          language: "tsx",
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
            'EXPENSES is the same structure with a different icon (arrow-down) and color (#b31b1b). The third card, NET BALANCE, is a real visual variation worth seeing — it uses a filled brand-color background and white text instead of the plain card style, making it stand out as the "headline" number of the three:',
        },
        {
          type: "code",
          language: "tsx",
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
            "income, expense, and balance come in as props — this component itself has no calculation logic, it just formats and displays numbers it's given.",
        },
      ],
      expectedResult:
        "three summary cards at the top of the Dashboard, the balance one visually emphasized.",
      checkpointFile: "components/cards.tsx",
    },
    {
      id: "tabs",
      title: "2. Tabs",
      blocks: [
        {
          type: "text",
          content:
            "Two tabs switch between the main dashboard view and a category/payment breakdown. DDSTabs wraps a DDSTabsHeader (the clickable tab items) and a DDSTabsBody (one DDSTabsPane per tab, matched by itemId):",
        },
        {
          type: "code",
          language: "tsx",
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
            "Both activeTab and onTabChange are controlled from outside — TabsCharts doesn't manage its own selected-tab state, the Dashboard page does. Both panes follow the same pattern now: whatever's passed as content for a tab lives inside its own DDSTabsPane, so the tab that's not active simply isn't rendered. For tab-dashboard, that content is passed in as children from the page; for tab-category, it's defined directly here since it's specific to this component (the Pie and Donut charts, covered in the extra Charts section below).",
        },
      ],
      expectedResult:
        'a two-tab switcher — "Montlhy view" showing the main dashboard, "Detail Montlhy" showing a payment method and category breakdown side by side.',
      checkpointFile: "checkpoints/dashboard/tabsCharts.tsx",
    },
    {
      id: "list",
      title: "3. List",
      blocks: [
        {
          type: "text",
          content:
            "Worth being upfront about this one: there's no dedicated DDSList component used here. What's called \"List\" in this project is a custom-built list of recent transactions — plain <div>s styled to read as a scannable list, not a DDS list primitive. It's still the right pattern even without the specific component — a scannable group of related items, which is exactly the List use case from Step 1's Table-vs-List comparison.",
        },
        {
          type: "code",
          language: "tsx",
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
            ".slice(-5).reverse() takes the last 5 transactions and reverses them — showing the 5 most recently added, newest first. Each row is a plain flex row, not a table row:",
        },
        {
          type: "code",
          language: "tsx",
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
        "the 5 most recent transactions, each showing description, category, date, and a signed, formatted amount.",
      checkpointFile: "checkpoints/dashboard/latestTransactions.tsx",
    },
    {
      id: "link",
      title: "4. Link",
      blocks: [
        {
          type: "text",
          content:
            "Still inside LatestTransactions — a DDSLink closes out the list, pointing back to the full Transactions page:",
        },
        {
          type: "code",
          language: "tsx",
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
            'Worth contrasting with the Link you already saw in Step 2: there, DDSLink was kind="standalone", icon-only, used purely to trigger a tooltip. Here it\'s a plain text link with an href, used for actual navigation — the two are the same component covering very different jobs.',
        },
      ],
      expectedResult:
        'a "View all transactions" link at the bottom of the list, navigating to /Transactions.',
    },
    {
      id: "charts",
      title: "Extra — Charts (Bar, Pie, Donut)",
      blocks: [
        {
          type: "text",
          content:
            "Not part of the original component list, but a real, substantial part of this screen, so it's included as a bonus chapter. All three charts come from a separate package, @dds/dv-components (Dell's data-visualization library, distinct from @dds/react), and share the same structural pattern — dynamically import the library, build a data array from your app's data, and hand it to a DDV.* constructor targeting a DOM element by id.",
        },
        {
          type: "text",
          content:
            "The bar chart (components/(charts)/monthlyExpensesBarChart.tsx) reads directly from localStorage:",
        },
        {
          type: "code",
          language: "tsx",
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
            "The isClient flag exists because these charts can only run in the browser — localStorage and the DOM element the chart mounts into don't exist during server-side rendering, so the component renders null until after mount. Once client-side, a second effect dynamically imports the chart library and builds the chart:",
        },
        {
          type: "code",
          language: "tsx",
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
            "Destroying the previous chart instance before creating a new one (and again on cleanup) prevents duplicate charts from stacking up on re-renders — data viz libraries like this one typically don't clean up after themselves automatically the way React components do.",
        },
        {
          type: "text",
          content:
            "The Pie chart (paymentMethodPieChart.tsx) and Donut chart (categoryDonutChart.tsx) follow this exact same shape, with three differences: they pull data from useAllTransactions() (calculatePaymentMethod() and calculateExpensesCategory(), respectively) instead of localStorage directly, they call DDV.Pie(...) / DDV.Donut(...) instead of DDV.Bar(...), and both add a legend target and a percentage-formatted tooltip, since a pie/donut slice's share of the whole matters more than its raw value.",
        },
      ],
      expectedResult:
        'a bar chart of monthly spending on the main tab, plus a pie and donut chart on the "Detail" tab breaking down spending by payment method and category.',
      checkpointFile:
        "checkpoints/dashboard/monthlyExpensesBarChart.tsx, paymentMethodPieChart.tsx, categoryDonutChart.tsx",
    },
    {
      id: "bringing-it-together",
      title: "Bringing it together — the Dashboard page",
      blocks: [
        {
          type: "text",
          content: "app/page.tsx ties everything above into one screen:",
        },
        {
          type: "code",
          language: "tsx",
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
            "useAllTransactions (from @/utils/dashboardCalculations) is the same hook that powers the Pie and Donut charts — it reads all transactions from localStorage once, then exposes calculateIncome, calculateExpense, calculateBalance, calculateExpensesCategory, and calculatePaymentMethod as functions computed from that data. FinancialDashboard is a thin wrapper around the bar chart, giving it a consistent container.",
        },
        {
          type: "text",
          content:
            "LatestTransactions and TabsCharts both come from components/client-only.tsx — the same next/dynamic + ssr: false wrapper introduced in Step 1, needed here for the same reason: both depend on localStorage/the DOM, which don't exist during server-side rendering.",
        },
      ],
      expectedResult:
        "the complete Dashboard — cards, tabs, bar/pie/donut charts, and the latest transactions list, all reflecting real data from the other two screens.",
      checkpointFile: "checkpoints/dashboard/page.tsx",
    },
  ],
};
