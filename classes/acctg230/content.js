/* ACCTG 230 Intro to Financial Accounting (WSU, Fall 2026, Edmonds/Olds).
   Written from the class slide decks for Chapters 1-14 and the syllabus.
   Content is grouped by chapter: each chapter pushes into the shared lists below.
   See classes/_template/content.js for what every field means.
   EVENTS feeds the Statements Lab tab (extras.js): m = effect on
   Assets, Liabilities, Stockholders' equity, Revenue, Expenses, Net income, Cash
   (I = increase, D = decrease, NA = no effect); act = cash flow section; type =
   AS asset source, AU asset use, AE asset exchange, CE claims exchange ('' = none of these);
   je = journal entry, positive = debit, negative = credit. */
(function () {

const UNITS = {
  1: 'Intro to Accounting', 2: 'Accruals', 3: 'Deferrals', 4: 'Merchandising',
  5: 'Inventories', 6: 'Internal Control & Cash', 7: 'Receivables', 8: 'Long-Term Assets',
  9: 'Current Liabilities & Payroll', 10: 'Long-Term Debt', 11: 'Proprietorships, Partnerships & Corporations',
  12: 'Statement of Cash Flows', 13: 'Double-Entry System', 14: 'Financial Statement Analysis'
};

const CARDS = [], QS = [], TF = [], CLOZE = [], MATCH = [], SORTS = [], LISTS = [], HOOKS = [], EVENTS = [];
const LESSONS = {};

/* ======================================================================
   CHAPTER 1: An Introduction to Accounting
   ====================================================================== */
LESSONS[1] = { intro: 'Accounting is the language businesses use to report what they own, what they owe, and how they did. This chapter builds the one equation every later chapter rests on, the four kinds of transactions, and the four financial statements.', items: [
  { h: 'What accounting is for', t: [
    'Accounting provides information that is useful for **allocating resources**. Example: should you invest in Boeing or Microsoft? Accounting reports help you decide.',
    'In a free market, businesses compete for three kinds of resources:',
    '- **Financial resources** (money) from **equity investors** (owners) and **creditors** (lenders).',
    '- **Physical resources** (natural resources at their most basic). Owners want to sell to profitable businesses that pay well and buy again.',
    '- **Labor resources**, both intellectual and physical. Workers prefer businesses with high earnings potential because they can pay high wages.',
    'The value a business adds is called **profit**, **income**, or **earnings**. They all mean the same thing.',
    '**Financial accounting** serves **external users** (investors, creditors). **Managerial accounting** serves **internal users** (managers). This course is financial accounting.',
    '**Not-for-profit entities** (governments, foundations, the Red Cross) allocate resources for humanitarian reasons rather than profit.'],
    chk: ['Who does financial accounting serve: internal or external users?', 'External users, such as investors and creditors.'] },

  { h: 'Rules, careers, and reporting entities', t: [
    'The **Financial Accounting Standards Board (FASB)** sets the measurement and reporting rules. Those rules are called **Generally Accepted Accounting Principles (GAAP)**.',
    'Careers: **public accounting** (Certified Public Accountant, CPA: audit, tax, consulting) and **private accounting** (Certified Management Accountant, CMA; Certified Internal Auditor, CIA).',
    'A **reporting entity** is the person or organization being reported on. Each is a separate unit. A business, the person who owns it, and the bank that lends to it are **three separate reporting entities**. The owner\'s personal car is not on the business\'s books.'],
    exam: 'The **entity concept** shows up as "whose books does this go on?" questions. Only record what happens to the business itself.',
    chk: ['Who sets GAAP in the U.S.?', 'The Financial Accounting Standards Board (FASB).'] },

  { h: 'The accounting equation', t: [
    '**Assets** are the resources a business uses to make money: cash, accounts receivable, inventory, equipment, buildings, land.',
    'A business can get assets from only **three sources**:',
    '- **Borrow** from creditors: **liabilities**.',
    '- **Raise** from investors: **common stock**.',
    '- **Earn** from operations: **retained earnings**.',
    'So: **Assets = Liabilities + Stockholders\' Equity**, and **Stockholders\' Equity = Common Stock + Retained Earnings**.',
    'The right side is called **claims**: who has a claim on the assets. Creditors\' claims come first, owners get what is left (the **residual**).'],
    tbl: { head: ['Assets', '=', 'Liabilities', '+', 'Stockholders\' Equity'], rows: [['$500', '=', '$200', '+', '$300'], ['$500 - $200', '=', '', '', '$300']] },
    exam: 'The equation must balance after **every** event. If assets go up $1,000, something else moved by $1,000 too: another asset down, or a claim up.',
    chk: ['Assets are $90,000 and liabilities are $35,000. What is stockholders\' equity?', '$55,000. Equity = Assets - Liabilities.'] },

  { h: 'The four types of transactions', t: [
    'Every accounting event fits one of four patterns. Learning to name them makes the effects automatic.',
    '- **Asset source:** assets go up and a claim goes up. (Issue stock for cash, borrow, earn revenue.)',
    '- **Asset exchange:** one asset goes up, another goes down. Total assets do not change. (Buy land with cash.)',
    '- **Asset use:** assets go down and a claim goes down. (Pay expenses, pay dividends, repay a loan.)',
    '- **Claims exchange:** one claim goes up and another goes down. Assets are untouched. (Accrue salary expense, Chapter 2.)',
    'Rustic Camp Sites (RCS), Year 1:'],
    tbl: { head: ['Event', 'Cash', 'Land', 'Notes Pay.', 'Com. Stock', 'Ret. Earn.', 'Type'], rows: [
      ['1. Issued stock for cash', '120,000', '', '', '120,000', '', 'Asset source'],
      ['2. Borrowed cash', '400,000', '', '400,000', '', '', 'Asset source'],
      ['3. Bought land', '(500,000)', '500,000', '', '', '', 'Asset exchange'],
      ['4. Earned cash revenue', '85,000', '', '', '', '85,000', 'Asset source'],
      ['5. Paid cash expenses', '(50,000)', '', '', '', '(50,000)', 'Asset use'],
      ['6. Paid dividends', '(4,000)', '', '', '', '(4,000)', 'Asset use']] },
    ex: 'Event 7: the land (cost $500,000) is appraised at $525,000. **Nothing is recorded.** The **historical cost concept** says report assets at what you paid, and the **reliability concept** says appraisals are opinions that cannot be independently verified.',
    chk: ['Paying a cash dividend is which type of transaction?', 'Asset use: cash goes down and retained earnings goes down. It is not an expense.'] },

  { h: 'The four financial statements', t: [
    'RCS Year 2 events: issued $32,000 stock; earned $116,000 cash revenue; paid $62,000 expenses; paid a $9,000 dividend; sold land that cost $200,000 for $200,000; paid $300,000 on its note.',
    '- **Income statement** (for a period): Revenue - Expenses = Net income. $116,000 - $62,000 = **$54,000**. Matching revenues with the expenses that produced them.',
    '- **Statement of changes in stockholders\' equity** (for a period): explains why equity went from $151,000 to **$228,000**. Beginning common stock $120,000 + $32,000 issued = $152,000. Beginning retained earnings $31,000 + net income $54,000 - dividends $9,000 = $76,000.',
    '- **Balance sheet** (at a point in time): assets listed in order of **liquidity**. Cash $28,000 + Land $300,000 = **$328,000** = Notes payable $100,000 + Common stock $152,000 + Retained earnings $76,000.',
    '- **Statement of cash flows** (for a period): why cash fell from $51,000 to $28,000.'],
    tbl: { head: ['Cash flow section', 'What goes there', 'RCS Year 2'], rows: [
      ['Operating (OA)', 'Cash from customers, cash paid for expenses', '116,000 - 62,000 = 54,000'],
      ['Investing (IA)', 'Buying or selling long-term assets (land)', '+200,000 from selling land'],
      ['Financing (FA)', 'Issuing stock, borrowing, repaying debt, paying dividends', '32,000 - 9,000 - 300,000 = (277,000)'],
      ['Net change', '', '(23,000): 51,000 to 28,000']] },
    exam: 'Dividends are **not** an expense. They never touch the income statement. They reduce retained earnings and are a **financing** outflow.',
    chk: ['Which statement is the only one measured at a point in time?', 'The balance sheet.'] },

  { h: 'Articulation and the annual report', t: [
    '**Articulation** means the statements connect:',
    '- Net income from the income statement goes into the statement of changes in stockholders\' equity.',
    '- Ending retained earnings from that statement goes onto the balance sheet.',
    '- Last year\'s balance sheet cash is this year\'s beginning cash on the statement of cash flows. Ending cash on the cash flow statement equals the balance sheet\'s cash.',
    'A useful pattern for any account: **Beginning balance + Increases - Decreases = Ending balance**.',
    'There is no FASB rule on statement order. Most companies show the income statement first, then the balance sheet. The cash flow statement is third about half the time.',
    'An **annual report** has the financial statements, the **notes**, the **auditor\'s report** (Chapter 6), and **management\'s discussion and analysis (MD&A)**. Many companies now just distribute their **10-K**.',
    'Kinds of reporting organizations: service businesses (doctors, attorneys), merchandising (drug stores), manufacturing (steel mills), not-for-profits (charities, universities), and government entities.'],
    chk: ['Where does net income go after the income statement?', 'Into retained earnings on the statement of changes in stockholders\' equity, and from there to the balance sheet.'] }
]};

CARDS.push(
  [1, 'Financial vs managerial accounting', 'Financial serves external users (investors, creditors). Managerial serves internal users (managers).'],
  [1, 'FASB', 'Financial Accounting Standards Board. Sets GAAP, the measurement and reporting rules.'],
  [1, 'GAAP', 'Generally Accepted Accounting Principles: the rules businesses follow so reports can be compared.'],
  [1, 'Reporting entity', 'The person or organization being reported on. The business, its owner, and its bank are three separate entities.'],
  [1, 'Assets', 'Resources a business uses to make money: cash, receivables, inventory, equipment, buildings, land.'],
  [1, 'Three sources of assets', 'Borrow from creditors (liabilities), raise from investors (common stock), earn from operations (retained earnings).'],
  [1, 'The accounting equation', 'Assets = Liabilities + Stockholders\' Equity (= Common Stock + Retained Earnings).'],
  [1, 'Claims', 'The right side of the equation: creditors\' claims (liabilities) and owners\' claims (equity).'],
  [1, 'Asset source transaction', 'Assets increase and a claim increases. Example: issue stock for cash, borrow cash, earn revenue.'],
  [1, 'Asset exchange transaction', 'One asset increases and another decreases. Total assets unchanged. Example: buy land with cash.'],
  [1, 'Asset use transaction', 'Assets decrease and a claim decreases. Example: pay expenses, pay dividends, repay debt.'],
  [1, 'Claims exchange transaction', 'One claim increases and another decreases. Assets unchanged. Example: accrue salary expense.'],
  [1, 'Historical cost concept', 'Report most assets at what was paid for them, even if market value rises.'],
  [1, 'Reliability concept', 'Information is reliable if it can be independently verified. Appraisals are opinions, so they are not recorded.'],
  [1, 'Income statement', 'Revenue - Expenses = Net income (or loss), for a period of time.'],
  [1, 'Statement of changes in stockholders\' equity', 'Explains the change in common stock and retained earnings (beginning RE + net income - dividends = ending RE).'],
  [1, 'Balance sheet', 'Assets = Liabilities + Equity at one point in time. Assets listed in order of liquidity.'],
  [1, 'Statement of cash flows', 'Explains the change in cash, split into operating, investing, and financing activities.'],
  [1, 'Operating activities', 'Cash from customers and cash paid for expenses (running the business).'],
  [1, 'Investing activities', 'Cash from buying or selling long-term assets like land and equipment.'],
  [1, 'Financing activities', 'Cash from issuing stock or borrowing, and cash paid to repay debt or pay dividends.'],
  [1, 'Articulation', 'How the statements connect: net income flows to equity, ending cash on the cash flow statement equals balance sheet cash.'],
  [1, 'Are dividends an expense?', 'No. They reduce retained earnings and are a financing outflow, but never appear on the income statement.'],
  [1, 'Annual report sections', 'Financial statements, notes, auditor\'s report, and management\'s discussion and analysis (MD&A).']
);

QS.push(
  [1, 'Assets are $250,000 and liabilities are $90,000. Stockholders\' equity is:', ['$160,000', '$340,000', '$90,000', '$250,000'], 'Equity = Assets - Liabilities = $250,000 - $90,000.'],
  [1, 'Which is NOT one of the three sources of assets?', ['Selling land for cash', 'Borrowing from creditors', 'Issuing stock to investors', 'Earning revenue from operations'], 'Selling land swaps one asset for another (asset exchange). It does not bring new assets into the business.'],
  [1, 'A company buys equipment for cash. This is:', ['an asset exchange transaction', 'an asset source transaction', 'an asset use transaction', 'a claims exchange transaction'], 'Equipment up, cash down. Total assets do not change.'],
  [1, 'A company pays a $4,000 cash dividend. The effect is:', ['assets decrease and retained earnings decrease', 'assets decrease and expenses increase', 'liabilities decrease and assets decrease', 'no effect on retained earnings'], 'Dividends are an asset use transaction. They reduce retained earnings but are not an expense.'],
  [1, 'Land bought for $500,000 is appraised at $525,000. The company should:', ['leave it at $500,000', 'increase land to $525,000 and record a gain', 'increase land to $525,000 and increase common stock', 'disclose a $25,000 loss'], 'Historical cost concept and the reliability concept: appraisals are not recorded.'],
  [1, 'Which statement reports information at a single point in time?', ['Balance sheet', 'Income statement', 'Statement of cash flows', 'Statement of changes in stockholders\' equity'], 'The other three cover a period of time.'],
  [1, 'Paying off part of a note payable appears on the statement of cash flows as:', ['a financing outflow', 'an investing outflow', 'an operating outflow', 'it does not appear'], 'Repaying borrowed principal is a financing activity.'],
  [1, 'Selling land for its cost appears on the statement of cash flows as:', ['an investing inflow', 'an operating inflow', 'a financing inflow', 'revenue'], 'Buying and selling long-term assets are investing activities.'],
  [1, 'Beginning retained earnings $31,000, net income $54,000, dividends $9,000. Ending retained earnings:', ['$76,000', '$94,000', '$85,000', '$22,000'], '$31,000 + $54,000 - $9,000 = $76,000.'],
  [1, 'Who sets GAAP in the United States?', ['FASB', 'SEC', 'AICPA', 'IRS'], 'The Financial Accounting Standards Board sets GAAP.'],
  [1, 'The owner of a business buys a personal car with personal money. On the business\'s books:', ['nothing is recorded', 'assets increase', 'expenses increase', 'common stock increases'], 'The owner and the business are separate reporting entities.'],
  [1, 'Which links the income statement to the balance sheet?', ['Net income flows into retained earnings', 'Cash flows into revenue', 'Assets flow into expenses', 'Dividends flow into liabilities'], 'That connection is called articulation.']
);

TF.push(
  [1, `A business, its owner, and the bank that lends to it are one reporting entity.`, false, `They are three separate reporting entities.`],
  [1, `Total assets always equal total liabilities plus stockholders' equity.`, true, `That is the accounting equation. It balances after every event.`],
  [1, `Dividends are reported as an expense on the income statement.`, false, `Dividends reduce retained earnings directly. They are a financing outflow, not an expense.`],
  [1, `Buying land with cash changes total assets.`, false, `It is an asset exchange: land up, cash down, total unchanged.`],
  [1, `The balance sheet lists assets in order of liquidity.`, true, `Cash first, then the assets closest to becoming cash.`],
  [1, `An appraisal above cost is recorded as a gain.`, false, `Historical cost and reliability: appraisals are not recorded.`]
);

CLOZE.push(
  [1, `Assets = Liabilities + ___ equity.`, [`stockholders'`, `stockholders`, `shareholders`, `owners`]],
  [1, `The rules set by the FASB are called generally accepted accounting ___.`, [`principles`]],
  [1, `Buying equipment with cash is an asset ___ transaction.`, [`exchange`]],
  [1, `Assets earned from operations and kept in the business are called ___ earnings.`, [`retained`]],
  [1, `The way the four financial statements connect to each other is called ___.`, [`articulation`]]
);

MATCH.push(
  [1, `Asset source`, `Assets up, claims up`],
  [1, `Asset exchange`, `One asset up, another down`],
  [1, `Asset use`, `Assets down, claims down`],
  [1, `Claims exchange`, `One claim up, another down`],
  [1, `Liabilities`, `Assets borrowed from creditors`],
  [1, `Retained earnings`, `Assets earned and kept`],
  [1, `FASB`, `Sets GAAP`],
  [1, `Articulation`, `How the statements connect`]
);

SORTS.push(
  { u: [1, 2, 3], title: `Which type of transaction?`, b: [`Asset source`, `Asset exchange`, `Asset use`, `Claims exchange`], items: [[`Issued common stock for cash`, 0], [`Borrowed cash from a bank`, 0], [`Bought land with cash`, 1], [`Paid cash for expenses`, 2], [`Paid a cash dividend`, 2], [`Provided services on account`, 0], [`Collected cash from accounts receivable`, 1], [`Accrued salary expense owed to employees`, 3], [`Paid off a note payable`, 2], [`Bought supplies with cash`, 1], [`Recognized revenue earned from an unearned revenue account`, 3], [`Recognized depreciation expense`, 2]] },
  { u: [1, 2, 3, 12], title: `Which section of the statement of cash flows?`, b: [`Operating`, `Investing`, `Financing`], items: [[`Cash received from customers`, 0], [`Cash paid for salaries`, 0], [`Bought land for cash`, 1], [`Sold equipment for cash`, 1], [`Issued common stock`, 2], [`Paid dividends`, 2], [`Borrowed from a bank`, 2], [`Repaid the principal on a loan`, 2], [`Paid interest on a loan`, 0], [`Loaned cash to another company`, 1], [`Bought supplies`, 0], [`Received cash in advance from a customer`, 0]] }
);

LISTS.push(
  { u: [1], title: `The four financial statements`, items: [[`Income statement`, [`income`]], [`Statement of changes in stockholders' equity`, [`equity`, `changes`]], [`Balance sheet`, [`balance`]], [`Statement of cash flows`, [`cash flow`, `cash`]]] },
  { u: [1], title: `The three sources of assets`, items: [[`Borrow from creditors (liabilities)`, [`borrow`, `creditor`, `liabil`]], [`Raise from investors (common stock)`, [`investor`, `stock`, `raise`]], [`Earn from operations (retained earnings)`, [`earn`, `operation`, `retained`]]] },
  { u: [1], title: `The four types of transactions`, items: [[`Asset source`, [`source`]], [`Asset exchange`, [`asset exchange`, `exchange`]], [`Asset use`, [`use`]], [`Claims exchange`, [`claim`]]] },
  { u: [1], title: `Three sections of the statement of cash flows`, items: [[`Operating activities`, [`operat`]], [`Investing activities`, [`invest`]], [`Financing activities`, [`financ`]]] }
);

HOOKS.push(
  { u: 1, t: `Where assets come from`, h: `Borrow it, Raise it, or Earn it.`, w: `**Borrow** = liabilities. **Raise** = common stock. **Earn** = retained earnings. So A = L + CS + RE.` },
  { u: 1, t: `The four transaction types`, h: `Source adds, Use spends, Exchange swaps assets, Claims swap claims.`, w: `If both sides of the equation rise: **source**. Both fall: **use**. Only the asset side moves (one up, one down): **asset exchange**. Only the claims side moves: **claims exchange**.` },
  { u: 1, t: `Dividends`, h: `Dividends are a gift, not a cost.`, w: `They go to owners, so they skip the income statement entirely. They cut retained earnings and are a **financing** outflow.` }
);

EVENTS.push(
  { u: 1, t: `Issued common stock for $120,000 cash.`, m: `I NA I NA NA NA I`, act: `FA`, type: `AS`, je: [[`Cash`, 120000], [`Common Stock`, -120000]], w: `Cash comes in from owners, so common stock rises. Not revenue: owners investing is financing.` },
  { u: 1, t: `Borrowed $400,000 cash by issuing a note payable.`, m: `I I NA NA NA NA I`, act: `FA`, type: `AS`, je: [[`Cash`, 400000], [`Notes Payable`, -400000]], w: `Borrowing brings in an asset and a creditor claim. Financing inflow.` },
  { u: 1, t: `Paid $500,000 cash to buy land.`, m: `NA NA NA NA NA NA D`, act: `IA`, type: `AE`, je: [[`Land`, 500000], [`Cash`, -500000]], w: `Land up, cash down: total assets unchanged. Buying a long-term asset is investing.` },
  { u: 1, t: `Received $85,000 cash for services provided.`, m: `I NA I I NA I I`, act: `OA`, type: `AS`, je: [[`Cash`, 85000], [`Service Revenue`, -85000]], w: `Revenue raises net income and retained earnings. Cash from customers is operating.` },
  { u: 1, t: `Paid $50,000 cash for operating expenses.`, m: `D NA D NA I D D`, act: `OA`, type: `AU`, je: [[`Operating Expenses`, 50000], [`Cash`, -50000]], w: `Expense lowers net income and retained earnings. Operating outflow.` },
  { u: 1, t: `Paid a $4,000 cash dividend.`, m: `D NA D NA NA NA D`, act: `FA`, type: `AU`, je: [[`Dividends`, 4000], [`Cash`, -4000]], w: `Dividends cut retained earnings but are not an expense. Financing outflow.` },
  { u: 1, t: `Land that cost $500,000 was appraised at $525,000.`, m: `NA NA NA NA NA NA NA`, act: `NA`, type: ``, je: [], w: `Historical cost and reliability: nothing is recorded.` },
  { u: 1, t: `Sold land that cost $200,000 for $200,000 cash.`, m: `NA NA NA NA NA NA I`, act: `IA`, type: `AE`, je: [[`Cash`, 200000], [`Land`, -200000]], w: `Sold at cost, so no gain or loss. Cash up, land down. Investing inflow.` },
  { u: 1, t: `Paid $300,000 cash to repay part of a note payable.`, m: `D D NA NA NA NA D`, act: `FA`, type: `AU`, je: [[`Notes Payable`, 300000], [`Cash`, -300000]], w: `Repaying principal reduces cash and the liability. Financing outflow.` }
);

/* ======================================================================
   CHAPTER 2: Accounting for Accruals
   ====================================================================== */
LESSONS[2] = { intro: 'Accrual accounting records revenue when it is earned and expenses when they are incurred, not when cash moves. This is the heart of LG2 (apply accrual accounting) and the reason net income and cash flow differ.', items: [
  { h: 'The horizontal financial statements model', t: [
    'Edmonds/Olds shows every event across one line: **balance sheet** (left), **income statement** (middle), **statement of cash flows** (right).',
    '[[tbl]]',
    'For every event ask three questions:',
    '- How does it change the **accounting equation**? Does the balance sheet still balance?',
    '- Is that change reported on the **income statement** (revenue or expense)?',
    '- Did **cash** move? If so, is it operating (OA), investing (IA), or financing (FA)?',
    'Test questions use **I** (increase), **D** (decrease), and **NA** (not affected). The **Statements Lab** tab in this app drills exactly this.'],
    tbl: { head: ['Assets', '=', 'Liab.', '+', 'Stk. Equity', '|', 'Rev.', '-', 'Exp.', '=', 'Net Inc.', '|', 'Cash Flow'], rows: [['Cash + A/R', '=', 'Sal. Pay.', '+', 'C. Stk. + Ret. Earn.', '|', '', '', '', '', '', '|', 'OA / IA / FA']] },
    exam: 'This model is how your exams ask about almost every transaction in the course. Master it here and later chapters are just new events in the same grid.',
    chk: ['If an event raises revenue, what else must change on the balance sheet?', 'Retained earnings (stockholders\' equity) rises, and either assets rise or liabilities fall by the same amount.'] },

  { h: 'Accruals: recognizing before cash moves', t: [
    '**Recognition** means formally recording an item in the financial statements. An **accrual** is a revenue or expense **recognized before cash is exchanged**.',
    'Cato Consultants, Year 1:'],
    tbl: { head: ['Event', 'Effect', 'Type', 'Cash flow'], rows: [
      ['1. Issued stock for $5,000 cash', 'Cash +, Common stock +', 'Asset source', '+5,000 FA'],
      ['2. Provided $84,000 of services on account', 'Accounts receivable +, Revenue + (Ret. earn. +)', 'Asset source', 'NA'],
      ['3. Collected $60,000 of receivables', 'Cash +, Accounts receivable -', 'Asset exchange', '+60,000 OA'],
      ['4. Paid $10,000 cash salary', 'Cash -, Expense + (Ret. earn. -)', 'Asset use', '(10,000) OA'],
      ['5. Paid $2,000 for advertising', 'Cash -, Expense +', 'Asset use', '(2,000) OA'],
      ['6. Accrued $6,000 salary owed at year end', 'Salaries payable +, Expense + (Ret. earn. -)', 'Claims exchange', 'NA'],
      ['7. Signed $42,000 of contracts for next year', 'Nothing recorded', 'None', 'NA']] },
    ex: 'Event 3 has **no** income statement effect. The revenue was already recognized in Event 2 and cannot be recognized twice.',
    exam: 'Accruals hit the **income statement** but not the **statement of cash flows**. Event 6 is an **adjusting entry**, made at the end of the period to update the accounts.',
    chk: ['Why does signing a $42,000 contract not create revenue?', 'Revenue is recognized when the work is done, not when it is promised.'] },

  { h: 'Net income is not cash flow', t: [
    'Cato\'s Year 1 net income is **$66,000** but its cash flow from operating activities is only **$48,000**. Accrual accounting causes the difference.'],
    tbl: { head: ['', 'Accrual (income statement)', 'Cash flow (OA)'], rows: [['Consulting revenue', '$84,000', '$60,000'], ['Salary expense', '(16,000)', '(10,000)'], ['Advertising expense', '(2,000)', '(2,000)'], ['Net income / Net OA cash', '$66,000', '$48,000']] },
    ex: 'The **matching concept**: cash-basis accounting can distort net income because cash is not always received or paid in the period the revenue is earned or the expense is incurred. Accrual accounting matches expenses with the revenues they helped produce.',
    chk: ['Where does the $6,000 accrued salary appear at year end?', 'As salaries payable (a liability) on the balance sheet and as part of salary expense on the income statement. Not on the cash flow statement.'] },

  { h: 'Year 2: paying accruals, interest, and notes', t: [
    'Cato, Year 2:',
    '- Paid the $6,000 of salaries payable from Year 1: cash down, liability down (**asset use**, OA outflow). **No expense**, it was recognized last year.',
    '- Incurred $4,000 of utility expense **on account**: claims exchange (accounts payable up, retained earnings down).',
    '- Paid $3,500 of accounts payable: asset use.',
    '- Borrowed $5,000 on February 1 at 6%: asset source, FA inflow.',
    '- Collected $95,000 of receivables, more than the $89,000 earned this year, because $24,000 was left over from Year 1.',
    '**Interest formula: Principal x Annual rate x Time = Interest.**',
    'Year-end adjustment: $5,000 x 6% x 11/12 = **$275** of accrued interest expense (claims exchange: interest payable up).',
    'At maturity on January 31, Year 3: accrue $5,000 x 6% x 1/12 = **$25**, then pay **$300** of interest (OA outflow) and **$5,000** of principal (FA outflow).'],
    exam: 'Interest paid is an **operating** activity. Principal repaid is a **financing** activity. Splitting them is a classic test question.',
    chk: ['A $12,000 note at 5% is signed October 1. How much interest accrues by December 31?', '$12,000 x 5% x 3/12 = $150.'] },

  { h: 'Ethics and corporate governance', t: [
    '**Corporate governance** is the set of relationships among the board, management, shareholders, auditors, and other stakeholders that determines how a company is run.',
    'Accounting information is worthless if the accountant is not trustworthy. The **AICPA Code of Professional Conduct** requires CPAs to exercise sensitive professional and moral judgment, serve the public interest, act with integrity, be **objective and independent** (in fact and appearance), and exercise **due care**.',
    'The **Sarbanes-Oxley Act (SOX)** followed the Enron and WorldCom failures:',
    '- Created the **Public Company Accounting Oversight Board (PCAOB)**.',
    '- Requires the CEO and CFO to **certify** the financial statements.',
    '- Harsh penalties: up to $5 million in fines and 20 years in prison for false certification.',
    'The **fraud triangle**: fraud tends to happen when three things are present: **opportunity**, **pressure** (an incentive), and **rationalization**.'],
    chk: ['Name the three sides of the fraud triangle.', 'Opportunity, pressure, and rationalization.'] }
]};

CARDS.push(
  [2, 'Accrual', 'A revenue or expense recognized before cash is exchanged.'],
  [2, 'Recognition', 'Formally recording an item in the financial statements.'],
  [2, 'Accrued revenue', 'Revenue earned but not yet collected. Creates accounts receivable.'],
  [2, 'Accrued expense', 'Expense incurred but not yet paid. Creates a payable (liability).'],
  [2, 'Adjusting entry', 'An end-of-period entry that updates account balances, like accruing salaries owed.'],
  [2, 'Accounts receivable', 'Amounts customers owe for goods or services provided on account.'],
  [2, 'Matching concept', 'Recognize expenses in the same period as the revenues they helped produce.'],
  [2, 'Cash basis vs accrual basis', 'Cash basis records when cash moves. Accrual records when earned or incurred. GAAP requires accrual.'],
  [2, 'Interest formula', 'Principal x Annual interest rate x Time outstanding.'],
  [2, 'Collecting a receivable', 'Asset exchange: cash up, accounts receivable down. No revenue (already recognized).'],
  [2, 'Paying salaries payable from last year', 'Asset use: cash down, liability down. No expense this year.'],
  [2, 'Interest paid vs principal repaid', 'Interest paid = operating activity. Principal repaid = financing activity.'],
  [2, 'Corporate governance', 'Relationships among the board, management, shareholders, auditors and others that determine how a company is run.'],
  [2, 'AICPA Code of Professional Conduct', 'Requires CPAs to serve the public interest, act with integrity, be objective and independent, and exercise due care.'],
  [2, 'Sarbanes-Oxley Act (SOX)', 'Created the PCAOB, requires CEO/CFO certification, and sets harsh penalties for false reports.'],
  [2, 'PCAOB', 'Public Company Accounting Oversight Board. Regulates auditors of public companies.'],
  [2, 'Fraud triangle', 'Opportunity, pressure (incentive), and rationalization.'],
  [2, 'Horizontal statements model', 'Balance sheet, income statement, and statement of cash flows shown side by side for each event.']
);

QS.push(
  [2, 'Provided $5,000 of services on account. Effect on the statements:', ['Assets I, Equity I, Revenue I, Cash flow NA', 'Assets I, Equity I, Revenue I, Cash flow I (OA)', 'Assets NA, Revenue I, Cash flow NA', 'Liabilities I, Revenue I'], 'Accounts receivable and retained earnings rise. No cash yet.'],
  [2, 'Collected $3,000 of accounts receivable. Which is true?', ['Total assets do not change and revenue does not change', 'Revenue increases by $3,000', 'Assets increase by $3,000', 'Liabilities decrease by $3,000'], 'Asset exchange. The revenue was recognized when the service was provided.'],
  [2, 'Accrued $2,000 of salaries owed at year end. This is a:', ['claims exchange transaction', 'asset use transaction', 'asset source transaction', 'asset exchange transaction'], 'Salaries payable up, retained earnings down. Assets untouched.'],
  [2, 'Cato earned $84,000 (collected $60,000), incurred $16,000 salary (paid $10,000), paid $2,000 advertising. Net income is:', ['$66,000', '$48,000', '$84,000', '$58,000'], '$84,000 - $16,000 - $2,000 = $66,000. Cash flow from operations is $48,000.'],
  [2, 'Borrowed $5,000 on February 1 at 6%. Interest expense for the year ending December 31:', ['$275', '$300', '$25', '$250'], '$5,000 x 0.06 x 11/12 = $275.'],
  [2, 'Paying $300 of interest and $5,000 of note principal is reported as:', ['$300 operating outflow and $5,000 financing outflow', '$5,300 financing outflow', '$5,300 operating outflow', '$300 financing outflow and $5,000 investing outflow'], 'Interest is operating, principal is financing.'],
  [2, 'Signing a contract to provide $42,000 of services next year:', ['has no effect on the financial statements', 'increases accounts receivable', 'increases revenue', 'increases unearned revenue'], 'Nothing has been earned, collected, or paid yet.'],
  [2, 'Paid $6,000 cash to settle salaries payable accrued last year. This year\'s salary expense:', ['is not affected', 'increases $6,000', 'decreases $6,000', 'increases $3,000'], 'The expense was recognized last year when it was accrued.'],
  [2, 'Incurred $4,000 of utility expense on account. Total liabilities and total stockholders\' equity:', ['liabilities increase and equity decreases', 'both increase', 'both decrease', 'liabilities decrease and equity increases'], 'Claims exchange: accounts payable up, retained earnings down.'],
  [2, 'Which created the PCAOB?', ['The Sarbanes-Oxley Act', 'The FASB', 'The AICPA', 'The Securities Act of 1933'], 'SOX (2002) created the Public Company Accounting Oversight Board.'],
  [2, 'Which is NOT one of the three elements of the fraud triangle?', ['Materiality', 'Opportunity', 'Pressure', 'Rationalization'], 'Materiality is an auditing concept (Chapter 6).'],
  [2, 'Beginning accounts receivable $24,000, services on account $89,000, collections $95,000. Ending accounts receivable:', ['$18,000', '$24,000', '$6,000', '$30,000'], '$24,000 + $89,000 - $95,000 = $18,000.']
);

TF.push(
  [2, `Accruals affect the income statement but not the statement of cash flows.`, true, `The cash moves in a later period.`],
  [2, `Collecting an account receivable increases revenue.`, false, `It is an asset exchange. Revenue was recognized when the service was provided.`],
  [2, `Recognizing accrued salary expense is an asset use transaction.`, false, `It is a claims exchange: liability up, retained earnings down, assets unchanged.`],
  [2, `Interest paid on a note is a financing activity.`, false, `Interest paid is operating. Principal repaid is financing.`],
  [2, `SOX requires the CEO and CFO to certify the financial statements.`, true, `False certification can bring fines up to $5 million and 20 years in prison.`],
  [2, `Net income and cash flow from operating activities are always equal.`, false, `Accruals and deferrals make them differ (Cato: $66,000 vs $48,000).`]
);

CLOZE.push(
  [2, `A revenue or expense recognized before cash is exchanged is called an ___.`, [`accrual`]],
  [2, `Principal x Annual rate x ___ = Interest.`, [`time`]],
  [2, `An entry made at the end of the period to update accounts is an ___ entry.`, [`adjusting`]],
  [2, `Recognizing expenses in the same period as the revenues they produce is the ___ concept.`, [`matching`]],
  [2, `The fraud triangle: opportunity, pressure, and ___.`, [`rationalization`]]
);

MATCH.push(
  [2, `Accrued revenue`, `Earned, not yet collected`],
  [2, `Accrued expense`, `Incurred, not yet paid`],
  [2, `Adjusting entry`, `Year-end update to accounts`],
  [2, `PCAOB`, `Oversees public-company auditors`],
  [2, `Matching concept`, `Expenses in the period of their revenue`],
  [2, `Recognition`, `Formally recording an item`]
);

LISTS.push(
  { u: [2], title: `The fraud triangle`, items: [[`Opportunity`, [`opportun`]], [`Pressure (incentive)`, [`pressure`, `incentive`]], [`Rationalization`, [`rational`]]] },
  { u: [2], title: `Key provisions of Sarbanes-Oxley`, items: [[`Created the PCAOB`, [`pcaob`, `oversight`]], [`CEO and CFO must certify the statements`, [`certif`]], [`Harsh penalties for violations`, [`penalt`, `fine`, `prison`, `jail`]]] }
);

HOOKS.push(
  { u: 2, t: `Accruals and cash`, h: `Accruals hit income now and cash later.`, w: `Revenue on account and expenses owed change **net income** this period, but the **cash flow statement** waits until money actually moves.` },
  { u: 2, t: `The fraud triangle`, h: `O-P-R: Opportunity, Pressure, Rationalization.`, w: `Remove any one side (strong controls remove **opportunity**) and fraud gets much harder.` },
  { u: 2, t: `Interest vs principal`, h: `Interest operates, principal finances.`, w: `Cash paid for **interest** = operating activity. Cash paid on **principal** = financing activity.` }
);

EVENTS.push(
  { u: 2, t: `Provided $84,000 of consulting services on account.`, m: `I NA I I NA I NA`, act: `NA`, type: `AS`, je: [[`Accounts Receivable`, 84000], [`Consulting Revenue`, -84000]], w: `Revenue is earned when the work is done. No cash yet, so no cash flow.` },
  { u: 2, t: `Collected $60,000 cash from accounts receivable.`, m: `NA NA NA NA NA NA I`, act: `OA`, type: `AE`, je: [[`Cash`, 60000], [`Accounts Receivable`, -60000]], w: `Cash up, receivable down. No revenue: it was already recognized.` },
  { u: 2, t: `At year end, accrued $6,000 of salary expense owed to an instructor.`, m: `NA I D NA I D NA`, act: `NA`, type: `CE`, je: [[`Salaries Expense`, 6000], [`Salaries Payable`, -6000]], w: `A creditor claim rises and the owners' claim falls. No cash.` },
  { u: 2, t: `Paid $6,000 cash to settle salaries payable accrued last year.`, m: `D D NA NA NA NA D`, act: `OA`, type: `AU`, je: [[`Salaries Payable`, 6000], [`Cash`, -6000]], w: `No expense this year: it was recognized when accrued. Cash for salaries is operating.` },
  { u: 2, t: `Signed contracts to provide $42,000 of services next year.`, m: `NA NA NA NA NA NA NA`, act: `NA`, type: ``, je: [], w: `Nothing has been earned, received, or paid. Not an accounting event.` },
  { u: 2, t: `Incurred $4,000 of utility expense on account.`, m: `NA I D NA I D NA`, act: `NA`, type: `CE`, je: [[`Utilities Expense`, 4000], [`Accounts Payable`, -4000]], w: `Claims exchange: accounts payable up, retained earnings down.` },
  { u: 2, t: `Paid $3,500 cash on accounts payable.`, m: `D D NA NA NA NA D`, act: `OA`, type: `AU`, je: [[`Accounts Payable`, 3500], [`Cash`, -3500]], w: `Paying a supplier for an operating expense is an operating outflow.` },
  { u: 2, t: `Recognized $275 of accrued interest expense on a note payable.`, m: `NA I D NA I D NA`, act: `NA`, type: `CE`, je: [[`Interest Expense`, 275], [`Interest Payable`, -275]], w: `$5,000 x 6% x 11/12. Interest payable up, retained earnings down.` },
  { u: 2, t: `Paid $300 of interest payable on a note at maturity.`, m: `D D NA NA NA NA D`, act: `OA`, type: `AU`, je: [[`Interest Payable`, 300], [`Cash`, -300]], w: `Interest paid is an operating activity (the expense was already accrued).` }
);

/* ======================================================================
   CHAPTER 3: Accounting for Deferrals
   ====================================================================== */
LESSONS[3] = { intro: 'A deferral is the opposite of an accrual: cash moves first and the revenue or expense is recognized later. Prepaid items, supplies, unearned revenue, and depreciation all work this way.', items: [
  { h: 'Costs, assets, and expenses', t: [
    'A **cost** can be an **asset** or an **expense**.',
    '- If the resource is already used up, the cost is an **expense** (last month\'s electricity).',
    '- If the resource will be used in the future, the cost is an **asset**. Expense recognition is **deferred** until it is used. These assets are called **prepaid items** or deferred expenses (supplies, prepaid rent, prepaid insurance).',
    'Alvarado Advisory Services paid **$800** cash for supplies: **asset exchange** (supplies up, cash down), operating outflow. No expense yet.',
    'At year end a count shows **$150** of supplies left. So **$650** was used: supplies expense $650 (**asset use**: supplies down, retained earnings down). No cash effect: the cash moved when the supplies were bought.'],
    ex: 'Recording supplies expense every time someone uses a pencil would cost more than it is worth. One year-end adjustment handles the whole year.',
    chk: ['Supplies: beginning $200, bought $900, count shows $300. Supplies expense?', '$200 + $900 - $300 = $800.'] },

  { h: 'Prepaid rent', t: [
    'On March 1, Alvarado paid **$12,000** for a one-year office lease: prepaid rent up, cash down (**asset exchange**, OA outflow).',
    'By December 31, 10 months have been used: $12,000 / 12 = $1,000 per month, so **$10,000** of rent expense (**asset use**). Prepaid rent left: **$2,000**.'],
    tbl: { head: ['', 'Prepaid rent', 'Rent expense', 'Cash flow'], rows: [['Mar 1 payment', '+12,000', '', '(12,000) OA'], ['Dec 31 adjustment', '(10,000)', '+10,000', 'NA'], ['Year-end balance', '2,000', '10,000', '']] },
    chk: ['A 12-month insurance policy costing $2,400 starts August 1. Insurance expense for the year ending December 31?', '$2,400 / 12 x 5 months = $1,000. Prepaid insurance left: $1,400.'] },

  { h: 'Unearned revenue', t: [
    'On June 1, Alvarado received **$18,000** in advance for a year of installation services. It has not done the work, so it owes the customer. **Unearned revenue is a liability.**',
    '- Cash received: cash up, unearned revenue up (**asset source**), **operating inflow**. No revenue yet.',
    '- December 31: 7 months earned (June through December). $18,000 / 12 = $1,500 a month x 7 = **$10,500** revenue (**claims exchange**: liability down, retained earnings up). No cash effect.',
    'Unearned revenue left: $7,500, to be earned in Year 2.'],
    exam: 'Deferrals are the reverse of accruals: **cash first, income statement later**. The cash flow happens in the period the cash moves. The adjustment hits the income statement but not the cash flow statement.',
    chk: ['Is unearned revenue an asset, liability, or revenue?', 'A liability: the company owes the customer the service.'] },

  { h: 'Depreciation', t: [
    'On January 1, Year 2, Alvarado paid **$43,000** for a computer with a 4-year life and a **$3,000 salvage value**. Buying it is an **asset exchange** and an **investing** outflow.',
    'The cost of using a long-term asset is **depreciation expense**. **Straight-line**: (Cost - Salvage) / Useful life = ($43,000 - $3,000) / 4 = **$10,000 per year**. Depreciation is an **asset use** event with **no cash effect**.',
    '**Book value** = Cost - Accumulated depreciation.'],
    tbl: { head: ['', 'Year 2', 'Year 3', 'Year 4', 'Year 5'], rows: [['Depreciation expense', '$10,000', '$10,000', '$10,000', '$10,000'], ['Accumulated depreciation', '(10,000)', '(20,000)', '(30,000)', '(40,000)'], ['Book value', '$33,000', '$23,000', '$13,000', '$3,000']] },
    ex: 'At the end of its life the computer is carried at its $3,000 salvage value. Spreading the cost over the years it helps earn revenue is the matching concept.',
    chk: ['Equipment costs $50,000, salvage $5,000, 5-year life. Book value after 2 years (straight-line)?', '$9,000 depreciation a year; $50,000 - $18,000 = $32,000.'] },

  { h: 'Reconciling net income and cash flow', t: [
    'Accruals and deferrals make net income and operating cash flow differ. Alvarado\'s Year 1:'],
    tbl: { head: ['Reconciliation', 'Amount'], rows: [['Net income', '$54,250'], ['Minus accrued consulting revenue (earned, not collected)', '(5,400)'], ['Plus deferred installation revenue (collected, not earned)', '7,500'], ['Plus accrued salary expense (expensed, not paid)', '4,000'], ['Plus accrued other operating expense', '1,800'], ['Minus deferred supplies (paid, not expensed)', '(150)'], ['Minus deferred rent (paid, not expensed)', '(2,000)'], ['Cash flow from operating activities', '$60,000']] },
    ex: 'This is the logic of the **indirect method** in Chapter 12. Cash collected but not yet earned adds to cash flow; revenue earned but not yet collected subtracts.',
    chk: ['Revenue earned on account but not collected makes cash flow higher or lower than net income?', 'Lower. It is in net income but not in cash.'] },

  { h: 'Three ratios: ROA, debt to assets, ROE', t: [
    'Ratios let you compare companies of different sizes.',
    '- **Return on assets = Net income / Total assets.** Higher means assets are managed better.',
    '- **Debt to assets = Total liabilities / Total assets.** Lower means less debt risk.',
    '- **Return on equity = Net income / Stockholders\' equity.** What owners earn on their investment.',
    '**Financial leverage**: stockholders like debt if the company earns more on borrowed money than it pays in interest (ROE rises). Creditors prefer more equity, a buffer of protection. Leverage is a **double-edged sword**: it can hurt ROE as easily as help it.'],
    chk: ['Net income $30,000, assets $400,000, liabilities $250,000. ROE?', 'Equity = $150,000; $30,000 / $150,000 = 20%.'] }
]};

CARDS.push(
  [3, 'Deferral', 'Cash moves first; the revenue or expense is recognized later.'],
  [3, 'Cost vs expense', 'A cost used up is an expense. A cost that will benefit the future is an asset (expense deferred).'],
  [3, 'Prepaid items', 'Deferred expenses recorded as assets: supplies, prepaid rent, prepaid insurance.'],
  [3, 'Supplies expense formula', 'Beginning supplies + Purchases - Supplies on hand (count) = Supplies used.'],
  [3, 'Buying supplies for cash', 'Asset exchange (supplies up, cash down), operating outflow. No expense yet.'],
  [3, 'Using up prepaid rent', 'Asset use: prepaid rent down, rent expense up. No cash effect.'],
  [3, 'Unearned revenue', 'Cash collected before the work is done. A liability.'],
  [3, 'Receiving cash in advance', 'Asset source: cash up, unearned revenue up. Operating inflow. No revenue yet.'],
  [3, 'Earning unearned revenue', 'Claims exchange: unearned revenue down, revenue (retained earnings) up. No cash effect.'],
  [3, 'Depreciation', 'Allocating the cost of a long-term asset to expense over its useful life.'],
  [3, 'Straight-line depreciation', '(Cost - Salvage value) / Useful life.'],
  [3, 'Salvage value', 'What the asset is expected to be worth at the end of its useful life.'],
  [3, 'Book value', 'Cost - Accumulated depreciation.'],
  [3, 'Buying a computer for cash', 'Asset exchange, investing outflow.'],
  [3, 'Return on assets', 'Net income / Total assets.'],
  [3, 'Debt to assets ratio', 'Total liabilities / Total assets. Lower = less debt risk.'],
  [3, 'Return on equity', 'Net income / Stockholders\' equity.'],
  [3, 'Financial leverage', 'Using debt to raise ROE. Works when the company earns more on borrowed money than the interest rate.']
);

QS.push(
  [3, 'Paid $800 cash for supplies. Which is true?', ['Assets do not change and expenses do not change', 'Expenses increase $800', 'Assets decrease $800', 'Liabilities increase $800'], 'Asset exchange: supplies up, cash down. Expense comes later when they are used.'],
  [3, 'Supplies: bought $800, count at year end shows $150. Supplies expense:', ['$650', '$800', '$150', '$950'], '$800 - $150 = $650 used.'],
  [3, 'Paid $12,000 on March 1 for a 12-month lease. Rent expense for the year ending December 31:', ['$10,000', '$12,000', '$2,000', '$9,000'], '10 months x $1,000.'],
  [3, 'Received $18,000 on June 1 for a year of services. Revenue for the year ending December 31:', ['$10,500', '$18,000', '$7,500', '$9,000'], '7 months x $1,500.'],
  [3, 'Receiving cash in advance from a customer affects the statements how?', ['Assets I, Liabilities I, Revenue NA, Cash flow I (OA)', 'Assets I, Revenue I, Cash flow I (OA)', 'Assets I, Liabilities I, Cash flow I (FA)', 'Liabilities I, Revenue I'], 'Unearned revenue is a liability. Cash from customers is operating.'],
  [3, 'Earning revenue that was previously unearned is a:', ['claims exchange', 'asset source', 'asset use', 'asset exchange'], 'Liability down, retained earnings up.'],
  [3, 'A $43,000 computer, $3,000 salvage, 4-year life. Annual straight-line depreciation:', ['$10,000', '$10,750', '$11,500', '$8,000'], '($43,000 - $3,000) / 4.'],
  [3, 'Recognizing depreciation expense affects cash flow how?', ['No effect', 'Operating outflow', 'Investing outflow', 'Financing outflow'], 'Depreciation uses up the asset. The cash left when the asset was bought.'],
  [3, 'Buying equipment for cash appears in which section of the statement of cash flows?', ['Investing', 'Operating', 'Financing', 'It does not appear'], 'Long-term asset purchases are investing activities.'],
  [3, 'Net income $40,000, total assets $500,000, total liabilities $300,000. Debt to assets:', ['60%', '40%', '8%', '20%'], '$300,000 / $500,000.'],
  [3, 'Which is a liability?', ['Unearned revenue', 'Prepaid rent', 'Supplies', 'Accounts receivable'], 'Unearned revenue is owed to customers. The others are assets.'],
  [3, 'Financial leverage increases ROE when:', ['the company earns more on borrowed funds than it pays in interest', 'the company has no debt', 'interest rates exceed the return on assets', 'the company pays large dividends'], 'Otherwise leverage hurts ROE.']
);

TF.push(
  [3, `Prepaid rent is an asset.`, true, `It is a future benefit: office space the company has paid for but not yet used.`],
  [3, `Unearned revenue is reported on the income statement when the cash is received.`, false, `It is a liability until the work is done.`],
  [3, `Depreciation expense reduces cash.`, false, `Depreciation has no cash effect. Cash left when the asset was bought.`],
  [3, `Book value equals cost minus accumulated depreciation.`, true, `At the end of the asset's life, book value equals salvage value.`],
  [3, `Deferrals affect the cash flow statement in the period the cash moves.`, true, `The later adjustment affects only the balance sheet and income statement.`],
  [3, `Creditors prefer companies with a high debt to assets ratio.`, false, `Creditors prefer more equity, a buffer of protection.`]
);

CLOZE.push(
  [3, `Cash collected from a customer before the work is done is ___ revenue.`, [`unearned`, `deferred`]],
  [3, `(Cost - Salvage value) / Useful life is ___ depreciation.`, [`straight-line`, `straight line`]],
  [3, `Cost minus accumulated depreciation is ___ value.`, [`book`, `carrying`]],
  [3, `Supplies, prepaid rent, and prepaid insurance are called ___ items.`, [`prepaid`]],
  [3, `Net income / Stockholders' equity is return on ___.`, [`equity`]]
);

MATCH.push(
  [3, `Prepaid rent`, `Asset: paid, not yet used`],
  [3, `Unearned revenue`, `Liability: collected, not yet earned`],
  [3, `Depreciation`, `Expensing a long-term asset's cost`],
  [3, `Salvage value`, `Worth at end of useful life`],
  [3, `Book value`, `Cost minus accumulated depreciation`],
  [3, `Debt to assets`, `Liabilities / Assets`]
);

SORTS.push(
  { u: [2, 3], title: `Accrual or deferral?`, b: [`Accrual (income first, cash later)`, `Deferral (cash first, income later)`], items: [[`Services provided on account`, 0], [`Salaries owed at year end`, 0], [`Interest owed on a note at year end`, 0], [`Paid a year of rent in advance`, 1], [`Bought supplies to use over the year`, 1], [`Customer paid in advance for services`, 1], [`Bought a computer used for 4 years`, 1], [`Utility bill received but not yet paid`, 0]] }
);

LISTS.push(
  { u: [3], title: `Three ratios from Chapter 3`, items: [[`Return on assets = Net income / Total assets`, [`assets`, `roa`]], [`Debt to assets = Total liabilities / Total assets`, [`debt`]], [`Return on equity = Net income / Stockholders' equity`, [`equity`, `roe`]]] }
);

HOOKS.push(
  { u: 3, t: `Accruals vs deferrals`, h: `Accrual: Act now, cash later. Deferral: Dollars now, act later.`, w: `**Accrual**: recognize revenue or expense before cash moves. **Deferral**: cash moves first, the revenue or expense is recognized later (prepaids, unearned revenue, depreciation).` },
  { u: 3, t: `Unearned revenue`, h: `Unearned = you owe the work.`, w: `Cash received before the job is done is a **liability**, not revenue. It becomes revenue as you do the work.` }
);

EVENTS.push(
  { u: 3, t: `Paid $800 cash to buy supplies.`, m: `NA NA NA NA NA NA D`, act: `OA`, type: `AE`, je: [[`Supplies`, 800], [`Cash`, -800]], w: `Supplies up, cash down. The expense waits until they are used.` },
  { u: 3, t: `Year-end count shows $150 of the $800 of supplies left. Recognized supplies expense.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Supplies Expense`, 650], [`Supplies`, -650]], w: `$650 used. Asset down, expense up. No cash this time.` },
  { u: 3, t: `Paid $12,000 cash on March 1 for a one-year office lease.`, m: `NA NA NA NA NA NA D`, act: `OA`, type: `AE`, je: [[`Prepaid Rent`, 12000], [`Cash`, -12000]], w: `Prepaid rent is an asset. Rent is an operating cost, so the cash is operating.` },
  { u: 3, t: `Recognized $10,000 of rent expense for the 10 months used.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Rent Expense`, 10000], [`Prepaid Rent`, -10000]], w: `The asset is used up. No cash effect: cash moved on March 1.` },
  { u: 3, t: `Received $18,000 cash in advance for a year of services.`, m: `I I NA NA NA NA I`, act: `OA`, type: `AS`, je: [[`Cash`, 18000], [`Unearned Revenue`, -18000]], w: `A liability until the work is done. Cash from a customer is operating.` },
  { u: 3, t: `Recognized $10,500 of the unearned revenue as earned.`, m: `NA D I I NA I NA`, act: `NA`, type: `CE`, je: [[`Unearned Revenue`, 10500], [`Service Revenue`, -10500]], w: `Liability down, revenue up. Claims exchange with no cash.` },
  { u: 3, t: `Paid $43,000 cash for a computer.`, m: `NA NA NA NA NA NA D`, act: `IA`, type: `AE`, je: [[`Computer`, 43000], [`Cash`, -43000]], w: `Long-term asset purchase: investing outflow.` },
  { u: 3, t: `Recognized $10,000 of depreciation on the computer.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Depreciation Expense`, 10000], [`Accumulated Depreciation`, -10000]], w: `Book value down, expense up. Depreciation never touches cash.` }
);

/* ======================================================================
   CHAPTER 4: Accounting for Merchandising Businesses
   ====================================================================== */
LESSONS[4] = { intro: 'Merchandisers buy goods and resell them. That adds inventory, cost of goods sold, purchase returns, discounts, freight, and shrinkage to the model, plus a multistep income statement.', items: [
  { h: 'Inventory, cost of goods sold, and gross margin', t: [
    'Goods bought to resell are **merchandise inventory** (an asset). When they are sold, their cost moves to **cost of goods sold** (an expense).',
    '**Beginning inventory + Purchases = Cost of goods available for sale.** That amount is split between **ending inventory** (balance sheet) and **cost of goods sold** (income statement).',
    '**Gross margin** (gross profit) = Sales revenue - Cost of goods sold.',
    '**Product costs** are included in inventory (purchase price, freight-in). **Selling and administrative costs** are not, and are expensed in the period: they are also called **period costs**.',
    'Under a **perpetual inventory system**, the inventory account is updated continually: up for each purchase, down for each sale.'],
    chk: ['Beginning inventory $6,000, purchases $10,000, ending inventory $4,000. Cost of goods sold?', '$6,000 + $10,000 - $4,000 = $12,000.'] },

  { h: 'Selling inventory: two events, not one', t: [
    'June\'s Plant Shop (JPS), Year 1: issued $15,000 stock; bought **$14,000** of inventory for cash (asset exchange, OA); sold inventory for **$12,000** cash that cost **$8,000**; paid $1,000 selling and administrative expenses; bought land for $5,500 (IA).',
    'Every sale is recorded as **two events**:',
    '- **3a. Revenue**: cash (or receivable) up, sales revenue up. **Asset source.**',
    '- **3b. Cost**: inventory down, cost of goods sold up. **Asset use.**',
    'Year 1 income statement: Sales $12,000 - COGS $8,000 = **Gross margin $4,000** - Operating expenses $1,000 = **Net income $3,000**. Ending inventory: $14,000 - $8,000 = $6,000.'],
    exam: 'If a question gives you only one effect for a sale, it is asking about one half. The revenue half increases assets and equity. The cost half decreases assets and equity.',
    chk: ['Goods costing $700 sold on account for $1,000. Net effect on total assets?', '+$1,000 receivable - $700 inventory = +$300.'] },

  { h: 'Purchases on account, returns, and cash discounts', t: [
    'JPS, Year 2: bought inventory **on account** with a list price of **$11,000** (asset source: inventory up, accounts payable up). Returned **$1,000** of it (asset use: inventory down, payable down).',
    '**Cash discounts** reward early payment. Terms **2/10, n/30** ("two ten, net thirty") mean: take a **2%** discount if you pay within **10 days**; otherwise the full amount is due in **30 days**.',
    'JPS paid within the discount period: balance $11,000 - $1,000 = $10,000. **Purchase discount** = $10,000 x 2% = **$200**, which **reduces inventory** (and accounts payable). Then JPS paid **$9,800** cash (asset use, OA).',
    '**Cost of financing inventory**: skipping a 2/10, n/30 discount means paying 2% to keep the money 20 more days. Annual rate = 2% x (365 / 20) = **36.5%**. Almost always worth taking the discount, even by borrowing.'],
    chk: ['Bought $5,000 of goods, terms 1/10, n/30, paid on day 8. Cash paid?', '$5,000 - $50 = $4,950.'] },

  { h: 'Freight: who pays?', t: [
    '- **FOB shipping point**: the **buyer** pays freight. That cost is **transportation-in**, a **product cost** added to **inventory**.',
    '- **FOB destination**: the **seller** pays freight. That cost is **transportation-out**, a **selling expense** on the income statement.',
    'JPS paid **$300** to receive goods bought FOB shipping point: inventory up, cash down (asset exchange). JPS later paid **$450** to deliver goods to customers: transportation-out expense (asset use).'],
    tbl: { head: ['', 'Responsible party', 'Recorded as'], rows: [['FOB shipping point', 'Buyer', 'Merchandise inventory (transportation-in)'], ['FOB destination', 'Seller', 'Transportation-out (expense)']] },
    chk: ['A seller ships goods FOB destination and pays $200 freight. How does the seller record it?', 'Transportation-out expense of $200 (asset use).'] },

  { h: 'Shrinkage, gains, and the multistep income statement', t: [
    'JPS sold goods for **$24,750** cash that cost **$11,500**. At year end, a physical count found **$4,100** of inventory, but the books showed:'],
    tbl: { head: ['Inventory account', 'Amount'], rows: [['Beginning balance', '$6,000'], ['Purchases', '11,000'], ['Purchase returns', '(1,000)'], ['Purchase discounts', '(200)'], ['Transportation-in', '300'], ['Goods available for sale', '16,100'], ['Cost of goods sold', '(11,500)'], ['Book balance', '4,600'], ['Physical count', '(4,100)'], ['Inventory shrinkage', '$500']] },
    ex: '**Shrinkage** is inventory lost, damaged, or stolen. The $500 is added to cost of goods sold (asset use). JPS also sold land that cost $5,500 for $6,200: a **$700 gain**. Selling inventory above cost gives **gross margin**; selling other assets above cost gives a **gain**.',
    exam: 'Multistep income statement, JPS Year 2: Sales $24,750 - COGS $12,000 ($11,500 + $500 shrinkage) = **Gross margin $12,750**. Less S&A $5,000 and transportation-out $450 = **Operating income $7,300**. Nonoperating: interest expense ($360), gain on land $700. **Net income $7,640**.',
    chk: ['Where does a gain on the sale of land appear on a multistep income statement?', 'Below operating income, with the nonoperating items.'] },

  { h: 'The seller\'s side: returns and discounts', t: [
    'JPS, Year 3: sold goods on account with a list price of **$8,500**, terms **1/10, n/30**; they cost $4,000 (two events as usual).',
    'A customer **returned** goods with a $1,000 list price that cost $450: revenue down $1,000 and accounts receivable down (**sales return**, asset use); inventory back up $450 and cost of goods sold down (asset source).',
    'Customer paid **within** the discount period: balance $7,500 x 1% = **$75 sales discount**. The discount **reduces revenue** and receivables (asset use); cash collected = **$7,425** (asset exchange).',
    'If paid **after** the discount period, JPS collects the full $7,500.',
    '**Net sales** = Sales - Sales returns and allowances - Sales discounts.'],
    chk: ['Sold $2,000 on account, 2/10, n/30; customer pays in 7 days. Cash collected?', '$2,000 - $40 = $1,960.'] },

  { h: 'Ratios and the periodic system', t: [
    '- **Gross margin percentage = Gross margin / Net sales.** Higher (other things equal) suggests higher pricing.',
    '- **Net income percentage (return on sales) = Net income / Net sales.** Higher suggests better cost control.',
    'A **periodic inventory system** does not update inventory with each sale. Purchases, purchase returns and allowances, purchase discounts, and transportation-in go to separate accounts. Cost of goods sold is figured at year end from a physical count:'],
    tbl: { head: ['Schedule of cost of goods sold', 'Amount'], rows: [['Beginning inventory', '$6,000'], ['Purchases', '11,000'], ['Purchase returns and allowances', '(1,000)'], ['Purchase discounts', '(200)'], ['Transportation-in', '300'], ['Cost of goods available for sale', '16,100'], ['Ending inventory (count)', '(4,100)'], ['Cost of goods sold', '$12,000']] },
    ex: 'Periodic is simpler, faster, and cheaper, but gives **less control** and **hides shrinkage** inside cost of goods sold.',
    chk: ['Gross margin $12,750 on net sales $24,750. Gross margin percentage?', 'About 51.5%.'] }
]};

CARDS.push(
  [4, 'Merchandise inventory', 'Goods bought to resell. An asset until sold.'],
  [4, 'Cost of goods available for sale', 'Beginning inventory + Purchases (net).'],
  [4, 'Cost of goods sold', 'The cost of inventory sold. An expense.'],
  [4, 'Gross margin', 'Sales revenue - Cost of goods sold. Also called gross profit.'],
  [4, 'Perpetual inventory system', 'Inventory updated continually: up for each purchase, down for each sale.'],
  [4, 'Periodic inventory system', 'Cost of goods sold figured at period end from a physical count. Simpler but less control.'],
  [4, 'Two parts of every sale', 'Revenue (asset source) and cost of goods sold (asset use).'],
  [4, '2/10, n/30', '2% discount if paid within 10 days; otherwise full amount due in 30 days.'],
  [4, 'Purchase discount', 'Reduces the cost of inventory (and the payable).'],
  [4, 'Purchase return', 'Asset use: inventory down, accounts payable down.'],
  [4, 'FOB shipping point', 'Buyer pays freight. Transportation-in, added to inventory (product cost).'],
  [4, 'FOB destination', 'Seller pays freight. Transportation-out, a selling expense (period cost).'],
  [4, 'Inventory shrinkage', 'Inventory lost, damaged, or stolen. Book balance - physical count. Added to cost of goods sold.'],
  [4, 'Gain vs gross margin', 'Selling land above cost = gain. Selling inventory above cost = gross margin.'],
  [4, 'Product costs vs period costs', 'Product costs go into inventory. Selling and administrative (period) costs are expensed when incurred.'],
  [4, 'Sales discount', 'Reduces revenue when a customer pays within the discount period.'],
  [4, 'Net sales', 'Sales - Sales returns and allowances - Sales discounts.'],
  [4, 'Gross margin percentage', 'Gross margin / Net sales.'],
  [4, 'Return on sales (net income percentage)', 'Net income / Net sales.'],
  [4, 'Cost of financing inventory (2/10, n/30)', '2% x (365 / 20) = 36.5% annual rate. Take the discount.'],
  [4, 'Multistep income statement', 'Sales - COGS = Gross margin; - operating expenses = Operating income; +/- nonoperating items = Net income.']
);

QS.push(
  [4, 'Beginning inventory $6,000; purchases $11,000; returns $1,000; discounts $200; freight-in $300; ending inventory $4,100. Cost of goods sold:', ['$12,000', '$16,100', '$11,500', '$12,500'], '$16,100 available - $4,100 = $12,000.'],
  [4, 'Sold goods costing $8,000 for $12,000 cash. Gross margin:', ['$4,000', '$12,000', '$8,000', '$20,000'], '$12,000 - $8,000.'],
  [4, 'Recognizing cost of goods sold is a(n):', ['asset use transaction', 'asset source transaction', 'asset exchange transaction', 'claims exchange transaction'], 'Inventory down, retained earnings down.'],
  [4, 'Purchased $10,000 of inventory, terms 2/10, n/30, and paid within 10 days. The discount:', ['reduces inventory by $200', 'is revenue of $200', 'reduces expenses by $200', 'is a gain of $200'], 'Purchase discounts lower the cost of the inventory.'],
  [4, 'Goods bought FOB shipping point. The buyer pays $300 freight. The buyer records:', ['$300 added to inventory', '$300 transportation-out expense', '$300 cost of goods sold immediately', 'nothing; the seller pays'], 'Transportation-in is a product cost.'],
  [4, 'A seller pays $450 to deliver goods FOB destination. This is:', ['transportation-out, a selling expense', 'added to inventory', 'a reduction of revenue', 'a financing outflow'], 'FOB destination: the seller pays, and it is a period cost.'],
  [4, 'Book inventory $4,600; physical count $4,100. Shrinkage:', ['$500, added to cost of goods sold', '$500, recorded as revenue', '$4,100, added to cost of goods sold', '$500, recorded as a liability'], 'Lost or stolen inventory is an expense.'],
  [4, 'Not taking a 2/10, n/30 discount is like borrowing at an annual rate of about:', ['36.5%', '2%', '20%', '24%'], '2% x (365 / 20).'],
  [4, 'Sold land costing $5,500 for $6,200 cash. On a multistep income statement the $700 is:', ['a gain, shown as a nonoperating item', 'gross margin', 'sales revenue', 'an operating expense reduction'], 'Gains on non-inventory assets are nonoperating.'],
  [4, 'Sales on account $8,500, returns $1,000, 1/10 n/30, paid within 10 days. Cash collected:', ['$7,425', '$8,415', '$7,500', '$8,500'], '$7,500 x 99%.'],
  [4, 'The periodic inventory system\'s main disadvantage is that it:', ['does not separate shrinkage from cost of goods sold', 'is more expensive to run', 'requires updating inventory with every sale', 'cannot produce an income statement'], 'Shrinkage hides inside cost of goods sold.'],
  [4, 'Gross margin $12,750; net sales $24,750; net income $7,640. Return on sales:', ['about 30.9%', 'about 51.5%', 'about 60%', 'about 16%'], '$7,640 / $24,750.']
);

TF.push(
  [4, `Under a perpetual system, inventory is updated each time goods are bought or sold.`, true, `That is what makes it perpetual.`],
  [4, `Transportation-in is a selling expense.`, false, `It is a product cost added to inventory. Transportation-out is the selling expense.`],
  [4, `Purchase discounts reduce the cost of inventory.`, true, `They lower the amount owed and the recorded cost.`],
  [4, `Selling land for more than its cost produces gross margin.`, false, `It produces a gain. Gross margin is only for inventory sales.`],
  [4, `A sales return reduces revenue.`, true, `Returns and discounts are subtracted to get net sales.`],
  [4, `Shrinkage is recorded as an increase to cost of goods sold.`, true, `The book balance is reduced to the physical count.`]
);

CLOZE.push(
  [4, `Sales revenue - Cost of goods sold = Gross ___.`, [`margin`, `profit`]],
  [4, `When goods are shipped FOB shipping point, the ___ pays the freight.`, [`buyer`, `purchaser`]],
  [4, `Inventory lost, damaged, or stolen is called inventory ___.`, [`shrinkage`]],
  [4, `Terms 2/10, n/30 give a ___% discount for paying within 10 days.`, [`2`, `two`]],
  [4, `Costs included in inventory are ___ costs.`, [`product`]]
);

MATCH.push(
  [4, `Transportation-in`, `Buyer's freight, added to inventory`],
  [4, `Transportation-out`, `Seller's freight, selling expense`],
  [4, `Shrinkage`, `Book inventory minus count`],
  [4, `Gross margin`, `Sales minus cost of goods sold`],
  [4, `Purchase discount`, `Lowers inventory cost`],
  [4, `Period costs`, `Selling and administrative costs`]
);

SORTS.push(
  { u: [4], title: `Product cost (inventory) or period cost (expense)?`, b: [`Product cost`, `Period cost`], items: [[`Purchase price of goods for resale`, 0], [`Freight-in on goods bought FOB shipping point`, 0], [`Freight-out on goods sold FOB destination`, 1], [`Store manager's salary`, 1], [`Advertising`, 1], [`Purchase discount taken (reduces this)`, 0], [`Office rent`, 1]] }
);

LISTS.push(
  { u: [4], title: `Steps of a multistep income statement`, items: [[`Sales revenue`, [`sales`, `revenue`]], [`Cost of goods sold`, [`cost of goods`, `cogs`]], [`Gross margin`, [`gross`]], [`Operating expenses`, [`operating exp`, `expenses`]], [`Operating income`, [`operating income`]], [`Nonoperating items (interest, gains, losses)`, [`nonoperating`, `non-operating`, `gain`, `interest`]], [`Net income`, [`net income`]]] }
);

HOOKS.push(
  { u: 4, t: `Freight terms`, h: `FOB Shipping point: the Shopper pays. FOB Destination: the Dealer pays.`, w: `Buyer pays under **shipping point** (transportation-in, goes into inventory). Seller pays under **destination** (transportation-out, an expense).` },
  { u: 4, t: `2/10, n/30`, h: `Two percent, ten days, or the full bill in thirty.`, w: `Skipping it costs about **36.5%** a year (2% x 365/20), so take the discount.` },
  { u: 4, t: `Every sale is two entries`, h: `Sell it, then cost it.`, w: `Record the **revenue** (asset source), then move the inventory to **cost of goods sold** (asset use).` }
);

EVENTS.push(
  { u: 4, t: `Purchased $14,000 of merchandise inventory for cash.`, m: `NA NA NA NA NA NA D`, act: `OA`, type: `AE`, je: [[`Merchandise Inventory`, 14000], [`Cash`, -14000]], w: `Inventory is bought to sell, so cash paid for it is operating.` },
  { u: 4, t: `Sold merchandise for $12,000 cash (record only the revenue).`, m: `I NA I I NA I I`, act: `OA`, type: `AS`, je: [[`Cash`, 12000], [`Sales Revenue`, -12000]], w: `First half of the sale: revenue and cash from customers.` },
  { u: 4, t: `Recognized $8,000 of cost of goods sold for that sale.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Cost of Goods Sold`, 8000], [`Merchandise Inventory`, -8000]], w: `Second half: inventory leaves, cost of goods sold (an expense) rises.` },
  { u: 4, t: `Purchased merchandise with a $11,000 list price on account.`, m: `I I NA NA NA NA NA`, act: `NA`, type: `AS`, je: [[`Merchandise Inventory`, 11000], [`Accounts Payable`, -11000]], w: `Inventory and a supplier claim both rise. No cash yet.` },
  { u: 4, t: `Returned $1,000 of the merchandise to the supplier.`, m: `D D NA NA NA NA NA`, act: `NA`, type: `AU`, je: [[`Accounts Payable`, 1000], [`Merchandise Inventory`, -1000]], w: `Inventory and the amount owed both fall.` },
  { u: 4, t: `Took a $200 purchase discount (2/10, n/30) on the account payable.`, m: `D D NA NA NA NA NA`, act: `NA`, type: `AU`, je: [[`Accounts Payable`, 200], [`Merchandise Inventory`, -200]], w: `The discount lowers both what is owed and the cost of the inventory.` },
  { u: 4, t: `Paid $300 freight on goods bought FOB shipping point.`, m: `NA NA NA NA NA NA D`, act: `OA`, type: `AE`, je: [[`Merchandise Inventory`, 300], [`Cash`, -300]], w: `Transportation-in is a product cost: it goes into inventory.` },
  { u: 4, t: `Paid $450 freight to deliver goods to customers (FOB destination).`, m: `D NA D NA I D D`, act: `OA`, type: `AU`, je: [[`Transportation-out`, 450], [`Cash`, -450]], w: `Transportation-out is a selling expense.` },
  { u: 4, t: `Physical count shows $500 of inventory shrinkage.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Cost of Goods Sold`, 500], [`Merchandise Inventory`, -500]], w: `Lost inventory becomes part of cost of goods sold.` },
  { u: 4, t: `Sold land that cost $5,500 for $6,200 cash.`, m: `I NA I I NA I I`, act: `IA`, type: `AS`, je: [[`Cash`, 6200], [`Land`, -5500], [`Gain on Sale of Land`, -700]], w: `Net assets rise $700 (the gain). The full $6,200 is an investing inflow. Gains sit with revenue in the model.` },
  { u: 4, t: `A customer returned goods with a $1,000 list price that had been sold on account (revenue part only).`, m: `D NA D D NA D NA`, act: `NA`, type: `AU`, je: [[`Sales Returns and Allowances`, 1000], [`Accounts Receivable`, -1000]], w: `Sales returns reduce revenue and the receivable.` },
  { u: 4, t: `Customer paid within the discount period; recognized a $75 sales discount.`, m: `D NA D D NA D NA`, act: `NA`, type: `AU`, je: [[`Sales Discounts`, 75], [`Accounts Receivable`, -75]], w: `Sales discounts reduce revenue. The cash collection is a separate asset exchange.` }
);

/* ======================================================================
   CHAPTER 5: Accounting for Inventories
   ====================================================================== */
LESSONS[5] = { intro: 'When identical goods were bought at different prices, which cost goes to cost of goods sold? This chapter covers the four cost flow methods, lower of cost or market, inventory errors, estimating inventory, and inventory turnover.', items: [
  { h: 'The four cost flow methods', t: [
    'TMBC bought two identical items: the first for **$100**, the second for **$110**. It sells one. What is cost of goods sold?',
    '- **Specific identification**: the actual cost of the item sold. Practical for **high-priced, low-turnover** goods (cars, jewelry).',
    '- **FIFO (first-in, first-out)**: the **first** cost in goes out first: **$100**.',
    '- **LIFO (last-in, first-out)**: the **last** cost in goes out first: **$110**.',
    '- **Weighted average**: $210 / 2 = **$105**.',
    'These describe the flow of **costs** through the records, **not** the physical flow of goods. A grocery store can sell its oldest milk first and still use LIFO.'],
    chk: ['Under LIFO, which purchase\'s cost stays in ending inventory?', 'The earliest (oldest) costs.'] },

  { h: 'Comparing FIFO, LIFO, and weighted average', t: [
    'TMBC had 55 bikes available and sold **43 for $350 each** (sales **$15,050**):'],
    tbl: { head: ['Layer', 'Units', 'Cost', 'Total'], rows: [['Jan 1 beginning inventory', '10', '$200', '$2,000'], ['Mar 18 purchase', '20', '$220', '4,400'], ['Aug 21 purchase', '25', '$250', '6,250'], ['Goods available', '55', '', '$12,650']] },
    ex: '**FIFO** COGS: 10 x $200 + 20 x $220 + 13 x $250 = **$9,650**; ending inventory 12 x $250 = **$3,000**. **LIFO** COGS: 25 x $250 + 18 x $220 = **$10,210**; ending inventory **$2,440**. **Weighted average**: $12,650 / 55 = **$230** per unit; COGS 43 x $230 = **$9,890**; ending inventory 12 x $230 = **$2,760**.',
    exam: 'When prices are **rising**: FIFO gives the **lowest** COGS, **highest** gross margin and net income, and **highest** ending inventory. LIFO gives the **highest** COGS and lowest income (so lower taxes). Weighted average lands between. Cash paid for inventory ($10,650 here) is the **same** under all three.',
    chk: ['Gross margin under each method?', 'FIFO $5,400; LIFO $4,840; weighted average $5,160.'] },

  { h: 'FIFO with purchases and sales mixed together', t: [
    'NeverStop buys and sells all year. Under a perpetual system, apply FIFO at **each sale**:'],
    tbl: { head: ['Date', 'Event', 'Cost of goods sold'], rows: [['Jan 1', 'Beginning 100 @ $20.00', ''], ['Feb 14', 'Bought 200 @ $21.50', ''], ['Apr 5', 'Sold 220: 100 @ $20 + 120 @ $21.50', '$4,580'], ['June 21', 'Bought 160 @ $22.50 (80 @ $21.50 still on hand)', ''], ['Aug 18', 'Sold 100: 80 @ $21.50 + 20 @ $22.50', '$2,170'], ['Sept 2', 'Bought 280 @ $23.50 (140 @ $22.50 on hand)', ''], ['Nov 10', 'Sold 330: 140 @ $22.50 + 190 @ $23.50', '$7,615'], ['Year end', 'Ending inventory 90 @ $23.50 = $2,115', 'Total $14,365']] },
    ex: 'Sales were 650 units @ $30 = $19,500. Gross margin = $19,500 - $14,365 = **$5,135**. (Perpetual weighted average and LIFO get complicated and are beyond this text.)',
    chk: ['After the Apr 5 sale, what is left?', '80 units @ $21.50 = $1,720.'] },

  { h: 'Lower of cost or market', t: [
    'Inventory must be reported at the **lower of cost or market (LCM)**. **Market** means current **replacement cost**, not selling price. This follows the **conservatism** principle.',
    'T-shirts cost $14 each. If replacement cost is $18, report $14. If it falls to $11, report **$11**.',
    'LCM can be applied to **each item**, to **major classes**, or to the **whole inventory**.'],
    tbl: { head: ['Item', 'Qty', 'Unit cost', 'Unit market', 'Total cost', 'Total market', 'LCM'], rows: [['A', '320', '$21.50', '$22.00', '$6,880', '$7,040', '$6,880'], ['B', '460', '18.00', '16.00', '8,280', '7,360', '7,360'], ['C', '690', '15.00', '14.00', '10,350', '9,660', '9,660'], ['D', '220', '20.50', '23.00', '4,510', '5,060', '4,510'], ['Total', '', '', '', '$30,020', '$29,120', '$28,410']] },
    ex: 'Item by item, the write-down is $30,020 - $28,410 = **$1,610**: inventory down and an expense up (asset use), with no cash effect.',
    chk: ['Applied to the whole inventory instead, what is the write-down?', '$30,020 - $29,120 = $900.'] },

  { h: 'Inventory errors', t: [
    'Inventory is a favorite place to hide fraud, so auditors examine it closely. Follow an error through:'],
    tbl: { head: ['', 'Accurate', 'Ending inventory overstated $1,000'], rows: [['Goods available for sale', '$10,000', '$10,000'], ['Ending inventory', '(3,000)', '(4,000)'], ['Cost of goods sold', '$7,000', '$6,000 (understated)'], ['Gross margin on $11,000 sales', '$4,000', '$5,000 (overstated)'], ['Total assets', '$9,000', '$10,000 (overstated)'], ['Retained earnings', '$4,000', '$5,000 (overstated)']] },
    exam: 'Overstated **ending** inventory means understated cost of goods sold, so **net income, retained earnings, and assets are all overstated**. Ending inventory and net income move in the **same direction**.',
    chk: ['Ending inventory is understated by $500. What happens to net income?', 'Understated by $500 (cost of goods sold is overstated).'] },

  { h: 'Estimating inventory and inventory turnover', t: [
    'The **gross margin method** estimates ending inventory for interim statements without a count:',
    '- Get the expected gross margin ratio from prior periods.',
    '- Multiply by this period\'s sales to estimate gross margin.',
    '- Sales - estimated gross margin = estimated cost of goods sold.',
    '- Goods available - estimated cost of goods sold = **estimated ending inventory**.',
    'The T-Shirt Company: goods available $5,100 + $18,500 = **$23,600**. Sales $22,000 with a historical gross margin of 25% means gross margin $5,500 and cost of goods sold **$16,500**. Estimated ending inventory = $23,600 - $16,500 = **$7,100**.',
    '**Inventory turnover = Cost of goods sold / Inventory.** **Average days to sell inventory = 365 / Inventory turnover.** Fewer days is better, other things equal. (Chapter 14 uses **average** inventory in the denominator.)'],
    chk: ['COGS $480,000, inventory $40,000. Days to sell?', 'Turnover 12; 365 / 12 = about 30 days.'] }
]};

CARDS.push(
  [5, 'Specific identification', 'Cost of the exact item sold. Practical for high-priced, low-turnover goods.'],
  [5, 'FIFO', 'First-in, first-out: the oldest costs go to cost of goods sold; newest costs stay in inventory.'],
  [5, 'LIFO', 'Last-in, first-out: the newest costs go to cost of goods sold; oldest costs stay in inventory.'],
  [5, 'Weighted average', 'Cost of goods available / Units available = average cost per unit.'],
  [5, 'Physical flow vs cost flow', 'Cost flow methods do not have to match how goods physically move.'],
  [5, 'FIFO when prices rise', 'Lowest cost of goods sold, highest net income, highest ending inventory.'],
  [5, 'LIFO when prices rise', 'Highest cost of goods sold, lowest net income (lower taxes), lowest ending inventory.'],
  [5, 'Effect of cost flow method on cash', 'None before taxes. Cash paid for inventory is the same under every method.'],
  [5, 'Lower of cost or market (LCM)', 'Report inventory at the lower of cost or market (replacement cost). Conservatism.'],
  [5, '"Market" in LCM', 'Current replacement cost, not selling price.'],
  [5, 'Overstated ending inventory', 'Cost of goods sold understated; gross margin, net income, retained earnings, and assets overstated.'],
  [5, 'Gross margin method', 'Estimates ending inventory: goods available - (sales - estimated gross margin).'],
  [5, 'Inventory turnover', 'Cost of goods sold / Inventory (average inventory in Chapter 14).'],
  [5, 'Average days to sell inventory', '365 / Inventory turnover.'],
  [5, 'TMBC weighted average cost', '$12,650 / 55 bikes = $230 per bike.']
);

QS.push(
  [5, 'Two identical items cost $100 and $110. One is sold. Under LIFO, cost of goods sold is:', ['$110', '$100', '$105', '$210'], 'The last cost in goes out first.'],
  [5, 'Beginning 10 @ $200, then 20 @ $220, then 25 @ $250. Sold 43. FIFO cost of goods sold:', ['$9,650', '$10,210', '$9,890', '$12,650'], '$2,000 + $4,400 + 13 x $250.'],
  [5, 'Same data. LIFO ending inventory:', ['$2,440', '$3,000', '$2,760', '$2,200'], '10 @ $200 + 2 @ $220 = $2,440.'],
  [5, 'Same data. Weighted average cost of goods sold:', ['$9,890', '$9,650', '$10,210', '$9,460'], '$12,650 / 55 = $230; 43 x $230.'],
  [5, 'In a period of rising prices, which method reports the highest net income?', ['FIFO', 'LIFO', 'Weighted average', 'All are equal'], 'FIFO matches the oldest, cheapest costs with current sales.'],
  [5, 'In a period of rising prices, LIFO generally:', ['lowers income taxes', 'raises reported net income', 'raises ending inventory', 'increases cash collected from customers'], 'Higher cost of goods sold means lower taxable income.'],
  [5, 'Under lower of cost or market, "market" means:', ['current replacement cost', 'selling price', 'original cost', 'appraised value'], 'Market = replacement cost.'],
  [5, 'Cost $14, replacement cost $11. Report each unit at:', ['$11', '$14', '$12.50', 'selling price'], 'The lower of the two.'],
  [5, 'Ending inventory is overstated by $1,000. Net income is:', ['overstated by $1,000', 'understated by $1,000', 'not affected', 'overstated by $2,000'], 'Cost of goods sold is understated, so income is overstated.'],
  [5, 'Goods available $23,600; sales $22,000; historical gross margin 25%. Estimated ending inventory:', ['$7,100', '$5,500', '$16,500', '$1,600'], 'COGS = $22,000 x 75% = $16,500; $23,600 - $16,500.'],
  [5, 'Cost of goods sold $365,000; inventory $36,500. Average days to sell inventory:', ['36.5 days', '10 days', '100 days', '3.65 days'], 'Turnover 10; 365 / 10.'],
  [5, 'Cost flow methods describe:', ['the flow of costs through the accounting records', 'the physical flow of goods', 'the flow of cash to suppliers', 'which goods are sold first in the store'], 'They need not match physical flow.']
);

TF.push(
  [5, `A company must use the cost flow method that matches the physical flow of its goods.`, false, `Cost flow and physical flow are separate.`],
  [5, `When prices are rising, LIFO produces a higher cost of goods sold than FIFO.`, true, `LIFO expenses the newest, most expensive costs.`],
  [5, `The cost flow method chosen changes the cash paid for inventory.`, false, `Cash paid is the same; only the split between COGS and ending inventory changes.`],
  [5, `Under lower of cost or market, market means the selling price.`, false, `Market means replacement cost.`],
  [5, `Overstating ending inventory overstates net income.`, true, `It understates cost of goods sold.`],
  [5, `A lower number of days to sell inventory is generally better.`, true, `Inventory turns into sales faster.`]
);

CLOZE.push(
  [5, `The method that assigns the oldest costs to cost of goods sold is ___.`, [`fifo`, `first-in, first-out`, `first in first out`]],
  [5, `Under LCM, market means current ___ cost.`, [`replacement`]],
  [5, `365 / Inventory turnover = average days to ___ inventory.`, [`sell`]],
  [5, `Inventory reported below cost when prices fall follows the principle of ___.`, [`conservatism`]]
);

MATCH.push(
  [5, `FIFO`, `Oldest costs to cost of goods sold`],
  [5, `LIFO`, `Newest costs to cost of goods sold`],
  [5, `Weighted average`, `Total cost / total units`],
  [5, `Specific identification`, `Actual cost of the item sold`],
  [5, `LCM market`, `Replacement cost`],
  [5, `Gross margin method`, `Estimates ending inventory`]
);

SORTS.push(
  { u: [5], title: `Prices are rising. Which method gives the HIGHER number?`, b: [`FIFO`, `LIFO`], items: [[`Cost of goods sold`, 1], [`Ending inventory`, 0], [`Gross margin`, 0], [`Net income`, 0], [`Income tax expense`, 0], [`Cash flow after taxes`, 1]] }
);

LISTS.push(
  { u: [5], title: `The four inventory cost flow methods`, items: [[`Specific identification`, [`specific`]], [`FIFO`, [`fifo`, `first-in`, `first in`]], [`LIFO`, [`lifo`, `last-in`, `last in`]], [`Weighted average`, [`average`]]] },
  { u: [5], title: `Three ways to apply lower of cost or market`, items: [[`Each individual item`, [`item`, `individual`]], [`Major classes or categories`, [`class`, `categor`]], [`The whole inventory`, [`whole`, `total`, `entire`]]] }
);

HOOKS.push(
  { u: 5, t: `FIFO vs LIFO with rising prices`, h: `FIFO = Fat Income. LIFO = Lower Income, Lower tax.`, w: `Rising prices: **FIFO** expenses the cheap old costs, so income and ending inventory are highest. **LIFO** expenses the expensive new costs, so income and taxes are lowest.` },
  { u: 5, t: `Inventory errors`, h: `Ending inventory and net income move together.`, w: `Overstate ending inventory, and cost of goods sold falls, so **net income, retained earnings, and assets are overstated** by the same amount.` }
);

EVENTS.push(
  { u: 5, t: `Wrote inventory down $1,610 to lower of cost or market.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Cost of Goods Sold (LCM write-down)`, 1610], [`Merchandise Inventory`, -1610]], w: `Inventory falls to market. The loss is recognized now, with no cash.` }
);

/* ======================================================================
   CHAPTER 6: Internal Control and Accounting for Cash
   ====================================================================== */
LESSONS[6] = { intro: 'Internal controls protect assets and make the numbers trustworthy. Cash is the easiest asset to steal, so it gets special controls, including the bank reconciliation (Project 2). The chapter ends with audits and audit opinions.', items: [
  { h: 'Internal control and COSO', t: [
    '**Internal control** is the process designed to ensure reliable financial reporting, effective and efficient operations, and compliance with laws and regulations. Safeguarding assets is part of it.',
    'The **COSO** framework (Committee of Sponsoring Organizations of the Treadway Commission, 1992) is the standard SOX compliance is judged by. Its five interrelated components:',
    '- **Control environment**: integrity, ethical values, the board\'s involvement. The "tone at the top."',
    '- **Risk assessment**: identifying risks that could misstate the statements and planning responses.',
    '- **Control activities**: what we usually call "the controls": segregation of duties, reconciliations, information processing controls.',
    '- **Information and communication**: internal and external reporting, including the technology environment.',
    '- **Monitoring**: checking the controls over time and fixing them.'],
    chk: ['Which COSO component is the "tone at the top"?', 'The control environment.'] },

  { h: 'Ten features of internal control', t: [
    '- **Segregation of duties**: no single person should be able to order an item, pay for it, and have custody of it. One employee checks another.',
    '- **Quality of employees**: cross-trained employees can cover for each other; job rotation helps.',
    '- **Bonded employees**: anyone handling cash, receivables, or inventory should be covered by a fidelity bond (insurance against theft) after a background check.',
    '- **Required absences**: mandatory vacations let a cross-trained substitute discover problems.',
    '- **Procedures manual**: written policies, checked periodically for compliance.',
    '- **Authority and responsibility**: **general** authority applies to everyone (fly coach, use a specific vendor); **specific** authority applies to a position (checks cosigned by the controller and treasurer).',
    '- **Prenumbered documents**: checks, invoices, and receipts are numbered so missing ones are noticed.',
    '- **Physical control**: lock up cash and inventory, tag valuable equipment.',
    '- **Performance evaluations**: at least yearly; audits give independent checks.',
    '- **Limitations**: **collusion** between two or more employees can get around any system.'],
    exam: 'Expect scenario questions: "A clerk who receives payments also records them. Which control is missing?" Answer: segregation of duties.',
    chk: ['What weakness can defeat even well-designed controls?', 'Collusion among employees.'] },

  { h: 'Controlling cash', t: [
    'Cash is the asset most likely to be stolen. Good practice:',
    '- Record cash receipts immediately and **deposit them intact daily**.',
    '- Use a deposit ticket for every deposit.',
    '- Make payments by **prenumbered check** (two signers is good practice).',
    '- Have an **independent** person prepare a **monthly bank reconciliation**.',
    '- Keep the bank\'s **signature card** up to date.',
    'The bank statement is written from the **bank\'s** point of view, where your account is a **liability**. A bank **debit memo** reduces your balance (service charge, NSF check). A bank **credit memo** increases it (a collection made for you, interest).'],
    chk: ['A bank debit memo for a $15 service charge does what to your cash?', 'Decreases it.'] },

  { h: 'The bank reconciliation', t: [
    'A bank reconciliation explains the difference between the bank statement balance and the company\'s books. Both sides end at the same **true cash balance**.',
    '**Bank side** (things the bank does not know yet): **add deposits in transit**, **subtract outstanding checks**, fix bank errors.',
    '**Book side** (things the company does not know yet): **add** collections the bank made and interest earned, **subtract** service charges and **NSF (non-sufficient funds) checks**, fix the company\'s own errors.',
    'Green Shades Resorts, September 30:'],
    tbl: { head: ['Bank side', '', 'Book side', ''], rows: [['Unadjusted bank balance', '$3,516.45', 'Unadjusted book balance', '$3,361.22'], ['+ Deposit in transit', '724.11', '+ Receivable collected by bank', '940.00'], ['+ Bank error (another company\'s check)', '25.00', '+ Recording error ($63.45 recorded for a $36.45 check)', '27.00'], ['- Outstanding checks (13.75 + 29.00 + 192.50)', '(235.25)', '- Service charge', '(8.40)'], ['', '', '- NSF check', '(289.51)'], ['True cash balance', '$4,030.31', 'True cash balance', '$4,030.31']] },
    exam: 'Only **book-side** items need adjusting entries; the bank side fixes itself when the deposit and checks clear. The bank collection and the NSF check are asset exchanges (cash vs accounts receivable). The service charge is an expense. The recording error correction raises cash and lowers utilities expense.',
    chk: ['A check you wrote has not cleared the bank yet. Which side, add or subtract?', 'Bank side, subtract (outstanding check).'] },

  { h: 'Cash short and over, and petty cash', t: [
    'If a register should hold $487.50 but holds $486.50, the $1.00 shortage goes to **Cash Short and Over**. A shortage is an expense; an overage is revenue.',
    'A **petty cash fund** pays small bills that cannot wait for a check. It runs on an **imprest** basis: a fixed amount, refilled when low, with one **custodian** responsible (usually bonded).',
    '- Establish a $300 fund: petty cash up, cash down (asset exchange). No effect on the income statement or the statement of cash flows.',
    '- Each payment is supported by a **petty cash voucher** with receipts attached.',
    '- Replenish: recognize the expenses ($78.40 FedEx + $43.60 meals + $28 cab fare + $66 postage = **$216**), then write a check to bring the fund back to $300.'],
    chk: ['Petty cash fund $300, vouchers total $216, cash in box $82. Short or over, and by how much?', 'Short $2 ($300 - $216 = $84 should be there).'] },

  { h: 'Audits and audit opinions', t: [
    'An **audit** is a detailed examination of a company\'s statements and records by an independent CPA. Auditors determine whether statements are **materially** correct, not absolutely correct.',
    'An item is **material** if knowing about it would influence the decision of an average prudent investor. A $1 million error is not material for Walmart ($510 billion of sales).',
    'Audit opinions:',
    '- **Unqualified** (most favorable): fairly presented under GAAP.',
    '- **Qualified**: mostly GAAP, with a reservation the report explains.',
    '- **Adverse** (most negative): departures from GAAP so material the statements are not fair.',
    '- **Disclaimer**: the auditor could not get enough evidence to give an opinion. Neither positive nor negative.',
    '**Confidentiality**: auditors cannot voluntarily disclose client information, but can be required to testify in court.',
    'The **SEC** sets and enforces reporting rules for public companies. **SOX** created the **PCAOB** to set auditing standards for audits of SEC companies (5 members, 3 of whom cannot be CPAs).'],
    chk: ['Which audit opinion is the best one a company can get?', 'Unqualified.'] }
]};

CARDS.push(
  [6, 'Internal control', 'Processes that ensure reliable reporting, efficient operations, legal compliance, and safeguarded assets.'],
  [6, 'COSO five components', 'Control environment, risk assessment, control activities, information and communication, monitoring.'],
  [6, 'Segregation of duties', 'Split ordering, paying, recording, and custody so one employee checks another.'],
  [6, 'Bonded employee', 'Covered by a fidelity bond (insurance against theft) after a background check.'],
  [6, 'Required absences', 'Mandatory vacations so a substitute can spot problems.'],
  [6, 'General vs specific authority', 'General applies to all employees; specific applies to one position (e.g., two check signers).'],
  [6, 'Collusion', 'Two or more employees working together. The main limit of internal control.'],
  [6, 'Deposit in transit', 'Recorded by the company, not yet by the bank. Add to the bank balance.'],
  [6, 'Outstanding check', 'Written by the company, not yet cleared. Subtract from the bank balance.'],
  [6, 'NSF check', 'A customer\'s check that bounced. Subtract from the book balance; the customer owes again (A/R up).'],
  [6, 'Bank debit memo', 'Reduces the depositor\'s balance (service charge, NSF check).'],
  [6, 'Bank credit memo', 'Increases the depositor\'s balance (collection, interest).'],
  [6, 'Which reconciliation items need entries?', 'Only book-side items.'],
  [6, 'Cash short and over', 'Account used when the register does not match receipts. Short = expense; over = revenue.'],
  [6, 'Imprest petty cash', 'A fixed fund refilled to its set amount; one custodian is responsible.'],
  [6, 'Materiality', 'An item is material if it would influence an average prudent investor\'s decision.'],
  [6, 'Unqualified opinion', 'Best audit opinion: statements fairly presented under GAAP.'],
  [6, 'Qualified opinion', 'Mostly GAAP, with a stated reservation.'],
  [6, 'Adverse opinion', 'Worst opinion: departures from GAAP so material the statements are not fair.'],
  [6, 'Disclaimer of opinion', 'Auditor could not gather enough evidence to form an opinion.']
);

QS.push(
  [6, 'The same employee opens the mail, deposits checks, and records collections. Which control is weakest?', ['Segregation of duties', 'Required absences', 'Prenumbered documents', 'Physical control'], 'Custody and recording should be separated.'],
  [6, 'Which COSO component includes segregation of duties and reconciliations?', ['Control activities', 'Control environment', 'Risk assessment', 'Monitoring'], 'Those are the classic "controls."'],
  [6, 'The main limitation of a strong internal control system is:', ['collusion', 'segregation of duties', 'bonding', 'too much documentation'], 'Employees working together can defeat controls.'],
  [6, 'On a bank reconciliation, a deposit in transit is:', ['added to the bank balance', 'subtracted from the bank balance', 'added to the book balance', 'subtracted from the book balance'], 'The bank has not recorded it yet.'],
  [6, 'On a bank reconciliation, an NSF check is:', ['subtracted from the book balance', 'added to the bank balance', 'subtracted from the bank balance', 'added to the book balance'], 'The company recorded the deposit, but the cash never arrived.'],
  [6, 'Bank balance $3,516.45; deposit in transit $724.11; bank error in your favor to add $25.00; outstanding checks $235.25. True cash:', ['$4,030.31', '$3,980.31', '$4,500.81', '$3,056.09'], '$3,516.45 + $724.11 + $25.00 - $235.25.'],
  [6, 'Which bank reconciliation item requires an adjusting entry?', ['A bank service charge', 'A deposit in transit', 'An outstanding check', 'A bank error'], 'Only book-side items get entries.'],
  [6, 'Recording an NSF check returned by the bank is a(n):', ['asset exchange transaction', 'asset use transaction', 'asset source transaction', 'claims exchange transaction'], 'Accounts receivable up, cash down.'],
  [6, 'Establishing a $300 petty cash fund:', ['does not change total assets', 'increases expenses', 'is a financing activity', 'increases liabilities'], 'Petty cash up, cash down.'],
  [6, 'An adverse audit opinion means:', ['the statements depart from GAAP so materially they are not fair', 'the auditor could not complete the audit', 'the statements are fair with one exception', 'the statements are fair'], 'The most negative opinion.'],
  [6, 'An item is material if it would:', ['influence the decision of an average prudent investor', 'exceed $1 million', 'appear on the balance sheet', 'be found by the auditor'], 'Materiality is relative and judgment-based.'],
  [6, 'Who sets auditing standards for audits of public (SEC) companies?', ['PCAOB', 'FASB', 'AICPA', 'IRS'], 'Created by Sarbanes-Oxley.']
);

TF.push(
  [6, `Outstanding checks are subtracted from the book balance.`, false, `They are subtracted from the bank balance.`],
  [6, `Cash receipts should be deposited intact daily.`, true, `It keeps cash out of employees' hands.`],
  [6, `A bank credit memo increases the depositor's cash balance.`, true, `Credits increase the bank's liability to you.`],
  [6, `Establishing a petty cash fund increases expenses.`, false, `It is an asset exchange. Expenses are recognized when the fund is replenished.`],
  [6, `Auditors guarantee that financial statements are absolutely correct.`, false, `They give an opinion on whether they are materially correct.`],
  [6, `A disclaimer of opinion means the auditor found major GAAP violations.`, false, `It means the auditor could not gather enough evidence to give an opinion.`]
);

CLOZE.push(
  [6, `Checks written but not yet cleared by the bank are ___ checks.`, [`outstanding`]],
  [6, `A customer's check returned for lack of funds is an ___ check.`, [`nsf`, `non-sufficient funds`, `bounced`]],
  [6, `A petty cash fund kept at a fixed amount is run on an ___ basis.`, [`imprest`]],
  [6, `The most favorable audit opinion is ___.`, [`unqualified`]],
  [6, `Two or more employees working together to get around controls is called ___.`, [`collusion`]]
);

MATCH.push(
  [6, `Deposit in transit`, `Add to bank balance`],
  [6, `Outstanding check`, `Subtract from bank balance`],
  [6, `Service charge`, `Subtract from book balance`],
  [6, `Bank collection`, `Add to book balance`],
  [6, `Adverse opinion`, `Statements not fairly presented`],
  [6, `Bonding`, `Insurance against employee theft`]
);

SORTS.push(
  { u: [6], title: `Bank reconciliation: where does it go?`, b: [`Bank side`, `Book side`], items: [[`Deposit in transit`, 0], [`Outstanding checks`, 0], [`Bank charged us for another company's check`, 0], [`Bank service charge`, 1], [`NSF check from a customer`, 1], [`Note receivable collected by the bank`, 1], [`Interest earned on the account`, 1], [`We recorded a $36.45 check as $63.45`, 1]] },
  { u: [6], title: `Bank reconciliation: add or subtract?`, b: [`Add`, `Subtract`], items: [[`Deposit in transit (bank side)`, 0], [`Outstanding checks (bank side)`, 1], [`Service charge (book side)`, 1], [`NSF check (book side)`, 1], [`Collection by the bank (book side)`, 0], [`Interest earned (book side)`, 0]] }
);

LISTS.push(
  { u: [6], title: `COSO's five components of internal control`, items: [[`Control environment`, [`environment`]], [`Risk assessment`, [`risk`]], [`Control activities`, [`activit`]], [`Information and communication`, [`information`, `communication`]], [`Monitoring`, [`monitor`]]] },
  { u: [6], title: `The four types of audit opinions`, items: [[`Unqualified`, [`unqualified`]], [`Qualified`, [`qualified`]], [`Adverse`, [`adverse`]], [`Disclaimer`, [`disclaim`]]] },
  { u: [6], title: `Ten key features of internal control`, items: [[`Segregation of duties`, [`segregat`, `separat`]], [`Quality of employees`, [`quality`, `cross`]], [`Bonded employees`, [`bond`]], [`Required absences`, [`absence`, `vacation`]], [`Procedures manual`, [`manual`, `procedure`]], [`Authority and responsibility`, [`authorit`, `responsib`]], [`Prenumbered documents`, [`prenumber`, `numbered`]], [`Physical control`, [`physical`]], [`Performance evaluations`, [`evaluat`, `performance`]], [`Limitations (collusion)`, [`limitation`, `collusion`]]] }
);

HOOKS.push(
  { u: 6, t: `COSO components`, h: `"Every Risky Activity Is Monitored."`, w: `Control **E**nvironment, **R**isk assessment, control **A**ctivities, **I**nformation and communication, **M**onitoring.` },
  { u: 6, t: `Bank reconciliation`, h: `Fix the side that hasn't heard the news.`, w: `The **bank** hasn't heard about deposits in transit or outstanding checks. **You** haven't heard about service charges, NSF checks, collections, or interest. Only your side gets journal entries.` },
  { u: 6, t: `Audit opinions, best to worst`, h: `Unqualified, Qualified, Adverse (and Disclaimer = no opinion).`, w: `**Unqualified** = clean. **Qualified** = clean with an exception. **Adverse** = not fair. **Disclaimer** = auditor could not decide.` }
);

EVENTS.push(
  { u: 6, t: `Bank reconciliation: the bank collected a $940 account receivable for the company.`, m: `NA NA NA NA NA NA I`, act: `OA`, type: `AE`, je: [[`Cash`, 940], [`Accounts Receivable`, -940]], w: `Cash up, receivable down. Collecting from a customer is operating.` },
  { u: 6, t: `Bank reconciliation: recorded an $8.40 bank service charge.`, m: `D NA D NA I D D`, act: `OA`, type: `AU`, je: [[`Bank Service Charge Expense`, 8.4], [`Cash`, -8.4]], w: `An expense that reduces cash.` },
  { u: 6, t: `Bank reconciliation: a customer's $289.51 check was returned NSF.`, m: `NA NA NA NA NA NA D`, act: `OA`, type: `AE`, je: [[`Accounts Receivable`, 289.51], [`Cash`, -289.51]], w: `The customer owes again: receivable up, cash down.` },
  { u: 6, t: `Established a $300 petty cash fund.`, m: `NA NA NA NA NA NA NA`, act: `NA`, type: `AE`, je: [[`Petty Cash`, 300], [`Cash`, -300]], w: `Both are cash, so there is no effect on the income statement or the statement of cash flows.` }
);

/* ======================================================================
   CHAPTER 7: Accounting for Receivables
   ====================================================================== */
LESSONS[7] = { intro: 'Some customers never pay. The allowance method estimates that loss in the same period as the sale. This chapter also covers notes receivable, credit card sales, and receivables turnover.', items: [
  { h: 'The allowance method and net realizable value', t: [
    '**Net realizable value** = Accounts receivable - **Allowance for doubtful accounts**. It is the amount the company actually expects to collect. The allowance is a **contra asset**.',
    'Reporting receivables at net realizable value is the **allowance method**. Both numbers are estimates.',
    'Allen\'s Tutoring Services (ATS), Year 1:',
    '- Earned $3,750 on account (asset source).',
    '- Collected $2,750 (asset exchange, OA).',
    '- **Percent of revenue method**: estimated 2% of revenue uncollectible: $3,750 x 2% = **$75** uncollectible accounts expense. Allowance up (net realizable value down), retained earnings down: **asset use**, no cash effect.',
    'Balance sheet: Accounts receivable $1,000 - Allowance $75 = **Net realizable value $925**.'],
    exam: 'Estimating bad debts in the year of the sale **matches** the expense with the revenue it came from, and shows the cash the company really expects.',
    chk: ['Revenue on account $50,000; 3% expected uncollectible (percent of revenue). Expense?', '$1,500.'] },

  { h: 'Write-offs and recoveries', t: [
    'ATS, Year 2: wrote off **$70** owed by a customer who will not pay. Accounts receivable down $70, allowance down $70. **Net realizable value does not change**, total assets do not change, and there is **no** income statement or cash flow effect. It is an **asset exchange**.',
    'Later a customer whose $10 account was written off paid after all:',
    '- **Reinstate** the account: accounts receivable up $10, allowance up $10 (no change in total assets).',
    '- **Collect** it like any receivable: cash up, receivable down (OA inflow).',
    'Year 2 adjustment: 2% x $10,000 of revenue = **$200** expense.'],
    tbl: { head: ['Before and after the write-off', 'Before', 'After'], rows: [['Accounts receivable', '$1,000', '$930'], ['Allowance for doubtful accounts', '(75)', '(5)'], ['Net realizable value', '$925', '$925']] },
    exam: 'Under the allowance method, the **expense** is recognized at the year-end estimate, **not** at the write-off. That is the most-tested idea in this chapter.',
    chk: ['Does writing off an account under the allowance method change net income?', 'No. Only the estimate adjustment does.'] },

  { h: 'Percent of receivables and aging', t: [
    'The **percent of receivables method** sets the **ending allowance balance**, then plugs the expense.',
    'Pyramid Corporation, before adjusting: accounts receivable **$56,000**, allowance **$500**. Estimate 6% uncollectible.'],
    tbl: { head: ['', 'Flat 6%', 'Aging schedule'], rows: [['Required allowance balance', '$3,360 ($56,000 x 6%)', '$3,760'], ['Less unadjusted allowance balance', '(500)', '(500)'], ['Uncollectible accounts expense', '$2,860', '$3,260']] },
    ex: 'An **aging schedule** sorts receivables by how long they have been outstanding and applies higher percentages to older accounts, because older accounts are less likely to be collected.',
    exam: 'Percent of **revenue** = **income statement approach** (estimate the expense directly). Percent of **receivables** = **balance sheet approach** (estimate the ending allowance, the expense is the difference). Watch for an existing allowance balance.',
    chk: ['Required allowance $4,000; allowance already has a $600 credit balance. Expense?', '$3,400.'] },

  { h: 'The direct write-off method', t: [
    'If uncollectible accounts are **not material**, GAAP allows the **direct write-off method**: no estimate, no allowance. Expense is recognized when a specific account is written off.',
    '- Write off $70: accounts receivable down, uncollectible accounts expense up (asset use).',
    '- Recovery of $10: reinstate the account (receivable up, net income up $10), then collect it as usual.',
    'It is simpler but does not match the expense with the revenue that caused it.'],
    chk: ['Under direct write-off, when is uncollectible accounts expense recognized?', 'When a specific account is written off.'] },

  { h: 'Notes receivable and accrued interest', t: [
    'A **promissory note** spells out a credit agreement. Parts: **maker** (borrower), **payee** (lender), **principal**, **interest** (an annual percentage), **maturity date**, and **collateral** (assets pledged as security).',
    'ATS lent **$15,000** to Stanford Cummings on **November 1, Year 3**, at **6%** for one year, holding the car title as collateral.',
    '- Nov 1: cash down, notes receivable up. Asset exchange, **investing** outflow.',
    '- Dec 31: accrue $15,000 x 6% x 2/12 = **$150** interest revenue (asset source, no cash).',
    '- Oct 31, Year 4: accrue $15,000 x 6% x 10/12 = **$750**, then collect **$15,900**: $15,000 principal (**investing** inflow) and $900 interest (**operating** inflow).'],
    chk: ['A $6,000, 8% note dated September 1. Interest revenue accrued at December 31?', '$6,000 x 8% x 4/12 = $160.'] },

  { h: 'Credit card sales and receivables ratios', t: [
    'Accepting credit cards avoids running a credit department. The card company keeps a fee (usually **1% to 5%**) and pays the rest quickly.',
    'ATS provided $1,000 of services paid by credit card with a 5% fee: receivable from the card company **$950**, revenue **$1,000**, credit card expense **$50**, net income up $950. When the $950 is collected, it is an operating inflow.',
    '**Accounts receivable turnover = Sales / Net accounts receivable.** (Chapter 14 uses **average** receivables.)',
    '**Average days to collect receivables = 365 / Accounts receivable turnover.** Shorter is better: slow collection has an opportunity cost.',
    '**Operating cycle** = average days to sell inventory + average days to collect receivables.'],
    chk: ['Sales $730,000; net receivables $73,000. Days to collect?', 'Turnover 10; 365 / 10 = 36.5 days.'] }
]};

CARDS.push(
  [7, 'Net realizable value', 'Accounts receivable - Allowance for doubtful accounts. What the company expects to collect.'],
  [7, 'Allowance for doubtful accounts', 'Contra asset holding the estimate of uncollectible receivables.'],
  [7, 'Allowance method', 'Estimate bad debts in the period of the sale and report receivables at net realizable value.'],
  [7, 'Percent of revenue method', 'Expense = % x revenue. The income statement approach.'],
  [7, 'Percent of receivables method', 'Set the ending allowance = % x receivables; expense = required - existing allowance. The balance sheet approach.'],
  [7, 'Aging schedule', 'Groups receivables by age and applies higher % to older accounts.'],
  [7, 'Write-off under the allowance method', 'A/R down, allowance down. No change to net realizable value, net income, or cash.'],
  [7, 'Recovery of a written-off account', 'Reinstate (A/R up, allowance up), then collect (cash up, A/R down).'],
  [7, 'Direct write-off method', 'Expense when an account is written off. Only allowed if uncollectibles are immaterial.'],
  [7, 'Maker vs payee', 'Maker = borrower who promises to pay. Payee = lender who receives payment.'],
  [7, 'Collateral', 'Assets pledged to secure a loan.'],
  [7, 'Loaning cash on a note', 'Asset exchange; investing outflow.'],
  [7, 'Collecting note principal and interest', 'Principal = investing inflow; interest = operating inflow.'],
  [7, 'Credit card fee', 'Usually 1% to 5% of the sale, recorded as an expense.'],
  [7, 'Accounts receivable turnover', 'Sales / (average) net accounts receivable.'],
  [7, 'Average days to collect receivables', '365 / Accounts receivable turnover.'],
  [7, 'Operating cycle', 'Days to sell inventory + days to collect receivables.']
);

QS.push(
  [7, 'Revenue on account $3,750. Estimated 2% uncollectible (percent of revenue). Uncollectible accounts expense:', ['$75', '$20', '$750', '$1,000'], '$3,750 x 2%.'],
  [7, 'Recognizing estimated uncollectible accounts expense under the allowance method:', ['decreases assets and equity, no cash effect', 'decreases assets only', 'decreases cash', 'has no effect on net income'], 'Net realizable value and retained earnings fall.'],
  [7, 'Under the allowance method, writing off a $70 account:', ['does not change net realizable value', 'decreases net income by $70', 'decreases total assets by $70', 'is an operating outflow'], 'A/R and the allowance fall by the same amount.'],
  [7, 'A/R $56,000; allowance before adjustment $500 (credit); required allowance 6% of receivables. Expense:', ['$2,860', '$3,360', '$3,860', '$500'], '$3,360 - $500.'],
  [7, 'The percent of receivables method is called the:', ['balance sheet approach', 'income statement approach', 'direct approach', 'cash approach'], 'It targets the balance sheet allowance.'],
  [7, 'Under the direct write-off method, writing off a $70 account:', ['increases expenses and decreases assets', 'has no effect on net income', 'decreases the allowance', 'increases cash'], 'There is no allowance; expense is recognized at write-off.'],
  [7, 'A $15,000, 6% note is dated November 1. Interest revenue at December 31:', ['$150', '$900', '$75', '$750'], '$15,000 x 6% x 2/12.'],
  [7, 'Loaning $15,000 cash to a borrower on a note is reported as:', ['an investing outflow', 'an operating outflow', 'a financing outflow', 'an expense'], 'Lending is investing.'],
  [7, 'Collected a note of $15,000 plus $900 interest. Cash flow statement:', ['$15,000 investing inflow and $900 operating inflow', '$15,900 investing inflow', '$15,900 operating inflow', '$15,000 financing inflow and $900 operating inflow'], 'Principal is investing; interest is operating.'],
  [7, 'A $1,000 credit card sale with a 5% fee. Net income increases by:', ['$950', '$1,000', '$50', '$0'], 'Revenue $1,000 minus $50 fee expense.'],
  [7, 'Sales $900,000; average receivables $53,000. Accounts receivable turnover is about:', ['16.98', '5.9', '21.5', '0.06'], '$900,000 / $53,000.'],
  [7, 'Reinstating a previously written-off account under the allowance method:', ['increases A/R and the allowance; total assets unchanged', 'increases revenue', 'increases cash', 'decreases expenses'], 'The collection is a separate event.']
);

TF.push(
  [7, `Allowance for doubtful accounts is a liability.`, false, `It is a contra asset subtracted from accounts receivable.`],
  [7, `Under the allowance method, writing off an account reduces net income.`, false, `The expense was recognized when estimated.`],
  [7, `The percent of revenue method is the income statement approach.`, true, `It estimates the expense directly.`],
  [7, `The direct write-off method is always allowed under GAAP.`, false, `Only when uncollectible accounts are not material.`],
  [7, `Interest collected on a note receivable is an operating inflow.`, true, `Principal collected is investing.`],
  [7, `Credit card fees reduce net income.`, true, `They are an expense of accepting cards.`]
);

CLOZE.push(
  [7, `Accounts receivable minus the allowance equals net ___ value.`, [`realizable`]],
  [7, `The person who borrows on a promissory note is the ___.`, [`maker`]],
  [7, `A schedule that sorts receivables by how long they have been outstanding is an ___ schedule.`, [`aging`]],
  [7, `365 / Accounts receivable turnover = average days to ___ receivables.`, [`collect`]],
  [7, `Assets pledged to secure a loan are called ___.`, [`collateral`]]
);

MATCH.push(
  [7, `Allowance method`, `Estimate bad debts at year end`],
  [7, `Direct write-off`, `Expense when an account is written off`],
  [7, `Maker`, `Borrower on a note`],
  [7, `Payee`, `Lender on a note`],
  [7, `Net realizable value`, `Amount expected to be collected`],
  [7, `Operating cycle`, `Days to sell + days to collect`]
);

LISTS.push(
  { u: [7], title: `Parts of a promissory note`, items: [[`Maker`, [`maker`]], [`Payee`, [`payee`]], [`Principal`, [`principal`]], [`Interest`, [`interest`]], [`Maturity date`, [`maturity`]], [`Collateral`, [`collateral`]]] }
);

HOOKS.push(
  { u: 7, t: `Allowance write-offs`, h: `The write-off is just paperwork: the hit came at the estimate.`, w: `Under the allowance method, the expense is recorded when you **estimate**. The write-off just removes the account from both A/R and the allowance, so net realizable value, income, and cash do not move.` },
  { u: 7, t: `Revenue vs receivables methods`, h: `Revenue: Rate x Revenue. Receivables: Required minus what's there.`, w: `**Percent of revenue**: expense = % x sales. **Percent of receivables**: required allowance - existing allowance = expense.` }
);

EVENTS.push(
  { u: 7, t: `Recognized $75 of estimated uncollectible accounts expense (allowance method).`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Uncollectible Accounts Expense`, 75], [`Allowance for Doubtful Accounts`, -75]], w: `The allowance rises, so net realizable value (assets) falls. No cash.` },
  { u: 7, t: `Wrote off a $70 uncollectible account (allowance method).`, m: `NA NA NA NA NA NA NA`, act: `NA`, type: `AE`, je: [[`Allowance for Doubtful Accounts`, 70], [`Accounts Receivable`, -70]], w: `A/R and the allowance both fall: net realizable value unchanged.` },
  { u: 7, t: `Wrote off a $70 uncollectible account (direct write-off method).`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Uncollectible Accounts Expense`, 70], [`Accounts Receivable`, -70]], w: `No allowance, so the expense is recognized now.` },
  { u: 7, t: `Loaned $15,000 cash to a borrower on a one-year note.`, m: `NA NA NA NA NA NA D`, act: `IA`, type: `AE`, je: [[`Notes Receivable`, 15000], [`Cash`, -15000]], w: `Lending is an investing activity.` },
  { u: 7, t: `Accrued $150 of interest revenue on the note at year end.`, m: `I NA I I NA I NA`, act: `NA`, type: `AS`, je: [[`Interest Receivable`, 150], [`Interest Revenue`, -150]], w: `Earned but not collected.` },
  { u: 7, t: `Provided $1,000 of services paid by credit card; the card company charges 5%.`, m: `I NA I I I I NA`, act: `NA`, type: `AS`, je: [[`Accounts Receivable (card co.)`, 950], [`Credit Card Expense`, 50], [`Service Revenue`, -1000]], w: `Revenue $1,000, expense $50; the $950 receivable is collected later.` }
);

/* ======================================================================
   CHAPTER 8: Accounting for Long-Term Operational Assets
   ====================================================================== */
LESSONS[8] = { intro: 'Long-term assets are used for years, so their cost is spread over their useful lives: depreciation for equipment, depletion for natural resources, amortization for intangibles. This chapter covers figuring cost, three depreciation methods, disposals, revisions, and intangibles like goodwill.', items: [
  { h: 'Kinds of long-term assets', t: [
    '**Tangible** assets can be seen and touched; **intangible** assets are rights or privileges.',
    '- **Property, plant, and equipment** (plant or fixed assets): **depreciated** over their useful life.',
    '- **Land**: part of PP&E but has an infinite life, so it is **never depreciated**.',
    '- **Natural resources** (mineral deposits, oil and gas, timber, coal, stone quarries): **depleted**.',
    '- **Intangibles with an identifiable life** (patents, copyrights): **amortized**.',
    '- **Intangibles with an indefinite life** (renewable franchises, trademarks, goodwill): **not** expensed unless **impaired**.'],
    chk: ['Which long-term asset is never depreciated?', 'Land.'] },

  { h: 'What goes into an asset\'s cost', t: [
    'Cost includes everything needed to get the asset ready for its intended use:',
    '- **Buildings**: purchase price, sales taxes, title search and transfer documents, realtor\'s and attorney\'s fees, remodeling costs.',
    '- **Equipment**: purchase price (less discounts), sales taxes, delivery, installation, costs to adapt it for intended use.',
    '- **Land**: purchase price, sales taxes, title search and transfer documents, realtor\'s and attorney\'s fees, cost of removing old buildings, grading.',
    '**Basket purchase**: Beatty paid $240,000 for land and a building appraised at $90,000 and $270,000 ($360,000 total). Allocate by relative value: land 25% = **$60,000**, building 75% = **$180,000**.',
    'Dryden\'s van: list price $23,500 - 10% cash discount ($2,350) + transportation $250 + customization $2,600 = **$24,000**.'],
    chk: ['Paid $300,000 for land worth $100,000 and a building worth $400,000. Cost assigned to the building?', '80% x $300,000 = $240,000.'] },

  { h: 'Three depreciation methods', t: [
    'Dryden\'s van: cost **$24,000**, salvage **$4,000**, life **4 years** or **100,000 miles**.',
    '- **Straight-line**: same amount each year. ($24,000 - $4,000) / 4 = **$5,000** a year.',
    '- **Double-declining-balance (DDB)**: more expense early. Rate = 2 x straight-line rate = 2 x 1/4 = **50%**, applied to **book value** (ignore salvage in the multiplication, but never go below salvage).',
    '- **Units-of-production**: ($24,000 - $4,000) / 100,000 miles = **$0.20 per mile** x miles driven.'],
    tbl: { head: ['Year', 'Straight-line', 'DDB', 'Units (miles)'], rows: [['1', '$5,000', '$12,000 (50% x 24,000)', '$8,000 (40,000)'], ['2', '5,000', '6,000 (50% x 12,000)', '4,000 (20,000)'], ['3', '5,000', '2,000 (limited: 3,000 would go below salvage)', '6,000 (30,000)'], ['4', '5,000', '0', '2,000 (limited, not 3,000)'], ['Total', '$20,000', '$20,000', '$20,000']] },
    exam: 'All three methods depreciate the same **total** ($20,000 = cost - salvage). Only the timing differs. DDB: multiply **book value** (not cost - salvage) by the rate, and stop at salvage.',
    chk: ['Machine cost $10,000, salvage $1,000, 5-year life. DDB year 1 expense?', '40% x $10,000 = $4,000.'] },

  { h: 'Disposals and taxes', t: [
    'On January 1, Year 5, Dryden sold the van for **$4,500**. Book value = $24,000 - $20,000 = $4,000, so a **$500 gain**.',
    'Effects: cash up $4,500 (**investing** inflow), van book value down $4,000, gain $500 raises net income and retained earnings.',
    'A sale below book value gives a **loss**.',
    'For **income taxes**, the IRS uses **MACRS** (modified accelerated cost recovery system, based on double-declining-balance). Rates depend on the asset\'s **class life**: 3, 5, 7, 10, 15, or 20 years for personal property; 27.5 years (residential) and 39 years (commercial) for real property. Companies can use one method for books and another for taxes.'],
    chk: ['Equipment cost $50,000 with $38,000 accumulated depreciation sold for $9,000. Gain or loss?', 'Book value $12,000, so a $3,000 loss.'] },

  { h: 'Revising estimates and spending after purchase', t: [
    'McGraw bought a $50,000 machine with an 8-year life and $3,000 salvage: $5,875 a year. After 4 years, accumulated depreciation is $23,500 and **book value $26,500**.',
    'Revisions are **prospective**: spread the remaining depreciable book value over the remaining life. Past years are not changed.',
    '- Revise life to 14 years (10 remaining): ($26,500 - $3,000) / 10 = **$2,350** a year.',
    '- Revise salvage to $6,000 (life still 8): ($26,500 - $6,000) / 4 = **$5,125** a year.',
    'A revision made during a year applies from the beginning of that year.',
    'Spending after purchase:',
    '- **Routine maintenance and minor repairs**: expense when incurred ($500, asset use).',
    '- **Improving quality** (more productive capacity): add to the asset\'s cost.',
    '- **Extending life**: reduce **accumulated depreciation**. A $4,000 overhaul extending life 2 years: accumulated depreciation $23,500 - $4,000 = $19,500, book value $30,500. New expense: ($30,500 - $3,000) / 6 remaining years = **$4,583**.'],
    chk: ['Is routine maintenance capitalized or expensed?', 'Expensed when incurred.'] },

  { h: 'Natural resources and intangibles', t: [
    '**Depletion**: (Cost - Salvage) / Total estimated units = charge per unit, times units extracted and sold. Apex paid $4,000,000 for a mine with 16,000,000 tons: **$0.25 a ton**. Mining 360,000 tons = **$90,000** depletion.',
    '**Intangibles**:',
    '- **Copyright**: protects writings, music, art. Lasts the creator\'s life plus 70 years.',
    '- **Franchise**: exclusive right to sell products or services in an area.',
    '- **Patent**: Flowers paid $44,000 for a patent with a 20-year legal life but only 11 useful years: amortize over the **shorter** useful life: **$4,000 a year**.',
    '- **Goodwill**: the excess of cost over the fair value of net assets acquired in a business purchase. A buyer paid $300,000 cash and assumed $50,000 of liabilities for Bendigo\'s assets worth $280,000: goodwill = $350,000 - $280,000 = **$70,000**.',
    'Goodwill and other indefinite-life intangibles are tested for **impairment** each year. A $30,000 impairment: goodwill down, loss (expense) up, no cash.'],
    exam: 'Judgment matters: Alpha (straight-line) and Zeta (DDB) can report different income from the same facts. Analysts look at the methods in the notes before comparing companies.',
    chk: ['Paid $500,000 for a business with net assets (assets - liabilities) worth $420,000. Goodwill?', '$80,000.'] }
]};

CARDS.push(
  [8, 'Tangible vs intangible', 'Tangible can be seen and touched (equipment). Intangible are rights (patents, goodwill).'],
  [8, 'Depreciation / depletion / amortization', 'Expensing PP&E / natural resources / intangibles with identifiable lives.'],
  [8, 'Land', 'Never depreciated: infinite life.'],
  [8, 'What goes into an asset\'s cost', 'Everything needed to get it ready for use: price (less discounts), taxes, delivery, installation, fees.'],
  [8, 'Basket purchase', 'Allocate the total price by each asset\'s share of total appraised value.'],
  [8, 'Straight-line depreciation', '(Cost - Salvage) / Useful life.'],
  [8, 'Double-declining-balance', '2 x (1 / life) x Book value. Never below salvage.'],
  [8, 'Units-of-production', '(Cost - Salvage) / Total units x Units this period.'],
  [8, 'Gain or loss on disposal', 'Cash received - Book value. Positive = gain; negative = loss.'],
  [8, 'MACRS', 'Tax depreciation system based on double-declining-balance and class lives.'],
  [8, 'Revising estimates', 'Prospective: (Book value - Salvage) / Remaining life. Past years not changed.'],
  [8, 'Routine maintenance', 'Expensed as incurred.'],
  [8, 'Improvement that extends life', 'Reduce accumulated depreciation (book value rises).'],
  [8, 'Improvement that increases quality', 'Add to the asset account.'],
  [8, 'Depletion per unit', '(Cost - Salvage) / Total estimated units recoverable.'],
  [8, 'Patent amortization', 'Over the shorter of legal life (20 years) or useful life.'],
  [8, 'Copyright life', 'Life of the creator plus 70 years.'],
  [8, 'Goodwill', 'Price paid for a business - fair value of the net assets acquired.'],
  [8, 'Impairment', 'Indefinite-life intangibles are tested yearly; if fair value < book value, recognize a loss.']
);

QS.push(
  [8, 'Which is NOT depreciated?', ['Land', 'A building', 'A delivery van', 'Office equipment'], 'Land has an infinite life.'],
  [8, 'List $23,500, 10% cash discount, freight $250, customization $2,600. Cost of the van:', ['$24,000', '$26,350', '$23,500', '$21,150'], '$23,500 - $2,350 + $250 + $2,600.'],
  [8, 'Paid $240,000 for land ($90,000 appraised) and a building ($270,000 appraised). Building cost:', ['$180,000', '$270,000', '$120,000', '$60,000'], '75% of $240,000.'],
  [8, 'Cost $24,000, salvage $4,000, 4 years. DDB depreciation in year 2:', ['$6,000', '$5,000', '$12,000', '$4,000'], 'Year 1: 50% x $24,000 = $12,000. Year 2: 50% x $12,000.'],
  [8, 'Cost $24,000, salvage $4,000, 100,000 miles. Year 1: 40,000 miles. Units-of-production expense:', ['$8,000', '$9,600', '$5,000', '$4,000'], '$0.20 x 40,000.'],
  [8, 'Van cost $24,000, accumulated depreciation $20,000, sold for $4,500. Result:', ['$500 gain', '$500 loss', '$4,500 gain', '$20,500 loss'], 'Book value $4,000.'],
  [8, 'Selling equipment for cash appears on the statement of cash flows as:', ['an investing inflow equal to the cash received', 'an operating inflow equal to the gain', 'an investing inflow equal to the gain', 'a financing inflow'], 'The full proceeds are investing.'],
  [8, 'Book value $26,500, salvage $3,000; remaining life revised to 10 years. New annual depreciation:', ['$2,350', '$2,650', '$5,875', '$3,357'], '($26,500 - $3,000) / 10.'],
  [8, 'A $4,000 overhaul that extends an asset\'s life is recorded by:', ['reducing accumulated depreciation', 'recording repair expense', 'increasing land', 'reducing the asset\'s cost'], 'This raises book value.'],
  [8, 'Mine cost $4,000,000 for 16,000,000 tons. Mined and sold 360,000 tons. Depletion:', ['$90,000', '$250,000', '$360,000', '$40,000'], '$0.25 per ton.'],
  [8, 'Patent cost $44,000; legal life 20 years; useful life 11 years. Annual amortization:', ['$4,000', '$2,200', '$44,000', '$3,000'], 'Use the shorter useful life.'],
  [8, 'Paid $300,000 cash and assumed $50,000 of liabilities for assets with a fair value of $280,000. Goodwill:', ['$70,000', '$20,000', '$50,000', '$30,000'], '$350,000 total price - $280,000.']
);

TF.push(
  [8, `Total depreciation over an asset's life is the same under straight-line, DDB, and units-of-production.`, true, `Each depreciates cost minus salvage; only the timing differs.`],
  [8, `Under DDB, the rate is applied to cost minus salvage.`, false, `It is applied to book value; salvage only sets the floor.`],
  [8, `Revising an estimate requires restating prior years.`, false, `Revisions are prospective.`],
  [8, `Routine maintenance is added to the cost of the asset.`, false, `It is expensed when incurred.`],
  [8, `Goodwill is amortized over 20 years.`, false, `Goodwill has an indefinite life and is tested for impairment.`],
  [8, `A copyright lasts for the life of the creator plus 70 years.`, true, `Per the slides.`]
);

CLOZE.push(
  [8, `The cost of natural resources is expensed through ___.`, [`depletion`]],
  [8, `The cost of patents and copyrights is expensed through ___.`, [`amortization`]],
  [8, `Price paid for a business minus the fair value of its net assets is ___.`, [`goodwill`]],
  [8, `The IRS tax depreciation system is called ___.`, [`macrs`]],
  [8, `Cash received minus book value, when positive, is a ___ on disposal.`, [`gain`]]
);

MATCH.push(
  [8, `Straight-line`, `Same expense every year`],
  [8, `Double-declining-balance`, `More expense early`],
  [8, `Units-of-production`, `Expense follows usage`],
  [8, `Depletion`, `Expensing natural resources`],
  [8, `Goodwill`, `Price above fair value of net assets`],
  [8, `Impairment`, `Write-down when value falls below book`]
);

SORTS.push(
  { u: [8], title: `Capitalize (asset) or expense?`, b: [`Capitalize`, `Expense now`], items: [[`Delivery and installation of new equipment`, 0], [`Routine oil change on a delivery van`, 1], [`Title search and attorney's fees on land`, 0], [`Overhaul that extends a machine's life`, 0], [`Minor repair to a broken window`, 1], [`Cost to remove an old building from land`, 0], [`Sales tax on new equipment`, 0]] },
  { u: [8], title: `Depreciate, deplete, amortize, or none?`, b: [`Depreciate`, `Deplete`, `Amortize`, `Impairment test only`], items: [[`Delivery truck`, 0], [`Coal mine`, 1], [`Patent`, 2], [`Goodwill`, 3], [`Building`, 0], [`Timber stand`, 1], [`Copyright`, 2], [`Trademark`, 3]] }
);

LISTS.push(
  { u: [8], title: `Three depreciation methods`, items: [[`Straight-line`, [`straight`]], [`Double-declining-balance`, [`double`, `declining`, `ddb`]], [`Units-of-production`, [`units`, `production`]]] },
  { u: [8], title: `Four phases of an asset's life cycle`, items: [[`Acquire funding`, [`fund`]], [`Buy the asset`, [`buy`, `purchase`]], [`Use the asset`, [`use`]], [`Retire the asset`, [`retire`, `dispos`, `sell`]]] }
);

HOOKS.push(
  { u: 8, t: `Which word goes with which asset`, h: `Depreciate the Dump truck, Deplete the Dirt, Amortize the Abstract.`, w: `**Depreciation** for plant and equipment, **depletion** for natural resources, **amortization** for intangibles with a known life. Land and goodwill: none of these.` },
  { u: 8, t: `DDB`, h: `Double the rate, hit the book value, stop at salvage.`, w: `Rate = 2 / life. Multiply by **book value** each year. Never depreciate below salvage.` },
  { u: 8, t: `After-purchase costs`, h: `Keep it running: expense. Make it better: asset. Make it last longer: cut accumulated depreciation.`, w: `Routine maintenance = expense. Quality improvement = add to the asset. Life extension = reduce accumulated depreciation.` }
);

EVENTS.push(
  { u: 8, t: `Purchased a van for $24,000 cash.`, m: `NA NA NA NA NA NA D`, act: `IA`, type: `AE`, je: [[`Van`, 24000], [`Cash`, -24000]], w: `Buying a long-term asset is investing.` },
  { u: 8, t: `Recognized $5,000 of straight-line depreciation on the van.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Depreciation Expense`, 5000], [`Accumulated Depreciation`, -5000]], w: `Book value down, expense up, no cash.` },
  { u: 8, t: `Sold the van (book value $4,000) for $4,500 cash.`, m: `I NA I I NA I I`, act: `IA`, type: `AS`, je: [[`Cash`, 4500], [`Accumulated Depreciation`, 20000], [`Van`, -24000], [`Gain on Sale`, -500]], w: `Assets net up $500 (the gain). The whole $4,500 is an investing inflow.` },
  { u: 8, t: `Paid $500 cash for routine maintenance on machinery.`, m: `D NA D NA I D D`, act: `OA`, type: `AU`, je: [[`Maintenance Expense`, 500], [`Cash`, -500]], w: `Routine maintenance is expensed. Operating outflow.` },
  { u: 8, t: `Paid $4,000 cash for an overhaul that extends a machine's life by 2 years.`, m: `NA NA NA NA NA NA D`, act: `IA`, type: `AE`, je: [[`Accumulated Depreciation`, 4000], [`Cash`, -4000]], w: `Book value rises $4,000 while cash falls $4,000. A capital expenditure: investing.` },
  { u: 8, t: `Purchased a patent for $44,000 cash.`, m: `NA NA NA NA NA NA D`, act: `IA`, type: `AE`, je: [[`Patent`, 44000], [`Cash`, -44000]], w: `Intangible asset purchase: investing.` },
  { u: 8, t: `Recognized $4,000 of patent amortization.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Amortization Expense`, 4000], [`Patent`, -4000]], w: `Like depreciation, no cash effect.` },
  { u: 8, t: `Recognized a $30,000 impairment of goodwill.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Impairment Loss`, 30000], [`Goodwill`, -30000]], w: `Goodwill falls; the loss lowers net income. No cash.` },
  { u: 8, t: `Recognized $90,000 of depletion on coal mined and sold.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Depletion Expense`, 90000], [`Coal Mine`, -90000]], w: `$0.25 per ton x 360,000 tons.` }
);

/* ======================================================================
   CHAPTER 9: Accounting for Current Liabilities and Payroll
   ====================================================================== */
LESSONS[9] = { intro: 'Current liabilities are debts due within a year: notes, sales tax, warranties, and payroll. You will also see contingent liabilities, discount notes, and the current ratio.', items: [
  { h: 'Short-term notes payable', t: [
    'Herrera Supply Company (HSC) borrowed **$90,000** on **September 1, Year 1**, for one year at **9%**.',
    '- Sept 1: cash up, notes payable up (**asset source**, FA inflow).',
    '- Dec 31: accrue 4 months of interest: $90,000 x 9% x 4/12 = **$2,700** (claims exchange).',
    '- Aug 31, Year 2: accrue 8 more months: $90,000 x 9% x 8/12 = **$5,400**.',
    '- Pay all the interest: **$8,100** ($2,700 + $5,400). Asset use, **operating** outflow, no income statement effect.',
    '- Repay the **$90,000** principal. Asset use, **financing** outflow.'],
    chk: ['A $40,000, 6% note dated November 1. Interest accrued at December 31?', '$40,000 x 6% x 2/12 = $400.'] },

  { h: 'Sales tax and contingent liabilities', t: [
    'Retailers collect sales tax for the state and send it in later. HSC sold goods for **$2,000** cash in a state with a **6%** tax: cash up **$2,120**, sales revenue **$2,000**, sales tax payable **$120**. Sales tax is **not revenue**: it is owed to the state.',
    'Remitting the $120 is an asset use (cash down, payable down).',
    'A **contingent liability** is a potential obligation from a past event whose amount or existence depends on a future event (a pending lawsuit). Reporting depends on likelihood:'],
    tbl: { head: ['Likelihood', 'Reporting'], rows: [['Probable and reasonably estimable', 'Recognize in the financial statements'], ['Reasonably possible (or probable but not estimable)', 'Disclose in the notes'], ['Remote', 'Neither recognize nor disclose']] },
    chk: ['A lawsuit loss is reasonably possible. How is it reported?', 'Disclosed in the notes, not recorded.'] },

  { h: 'Warranty obligations', t: [
    'Warranties are recognized when the goods are sold because the obligation is probable and estimable.',
    'HSC, Year 2: sold for **$7,000** cash goods that cost **$4,000** (two events). Estimated warranty cost: **$100**.',
    '- Recognize warranty expense $100: warranties payable up, retained earnings down (**claims exchange**). No cash.',
    '- Paid **$40** to repair a returned item: cash down, warranties payable down (**asset use**, OA outflow). No expense: it was recognized at the sale.',
    'Year 2 results: gross margin $3,000 - warranty expense $100 = **net income $2,900**. Warranties payable at year end: **$60**.'],
    exam: 'Just like bad debts in Chapter 7, the expense is matched to the period of the sale, not the period of the repair.',
    chk: ['Estimated warranty $500; repairs paid this year $320. Warranty expense this year?', '$500.'] },

  { h: 'Payroll: what comes out of a paycheck', t: [
    'Payroll taxes apply to **employees**, not **independent contractors**. If the business supervises, directs, and controls the work, the person is an employee.',
    '**Wages** are paid by the hour; **salaries** are a set amount per period. **Gross earnings** = regular pay + bonuses + overtime.',
    'Employers **withhold** amounts from gross earnings and owe them to others (liabilities):',
    '- **Federal income tax** (based on the employee\'s **Form W-4**). Example: $300 withheld from $2,000, employee gets $1,700, employer owes the government $300.',
    '- **FICA**: Social Security and Medicare. The book uses **6% Social Security on the first $130,000** and **1.5% Medicare on all earnings** (actual rates: 6.2% and 1.45%). On $100,000: $6,000 + $1,500 = **$7,500**.',
    '- **Voluntary** deductions: insurance premiums, charities.',
    'Year-end earnings and withholdings are reported to employees on **Form W-2**.'],
    tbl: { head: ['Net pay computation', 'Amount'], rows: [['Gross monthly salary', '$6,000'], ['Federal income tax', '(450)'], ['Social Security ($6,000 x 6%)', '(360)'], ['Medicare ($6,000 x 1.5%)', '(90)'], ['Medical insurance', '(320)'], ['American Cancer Society', '(25)'], ['Net pay', '$4,755']] },
    ex: 'Effect of paying this salary: cash down $4,755 (OA), various payables up $1,245, salary expense $6,000 (retained earnings down $6,000).',
    chk: ['Gross pay $3,000; withholdings total $650. Net pay?', '$2,350.'] },

  { h: 'Employer payroll taxes and fringe benefits', t: [
    'The employer also pays its own taxes on top of gross pay:',
    '- **Matching FICA**: another 6% Social Security and 1.5% Medicare.',
    '- **Federal unemployment tax (FUTA)** and **state unemployment tax (SUTA)** on a limited amount of wages.'],
    tbl: { head: ['Employer payroll tax expense', 'Amount'], rows: [['FICA Social Security ($6,000 x 6%)', '$360'], ['FICA Medicare ($6,000 x 1.5%)', '90'], ['Federal unemployment ($1,000 x 0.6%)', '6'], ['State unemployment ($1,000 x 5.4%)', '54'], ['Total payroll tax expense', '$510']] },
    ex: 'Recording employer payroll taxes and **fringe benefits** (vacation pay $200, medical insurance $250, pension $150 = $600) are **claims exchanges**: payables up, expenses up, no cash until paid.',
    chk: ['Does the employer\'s matching FICA come out of the employee\'s paycheck?', 'No. It is an extra expense for the employer.'] },

  { h: 'Current vs noncurrent, liquidity vs solvency', t: [
    '**Current assets** will become cash or be used up within **one year or the operating cycle, whichever is longer**: cash, marketable securities, accounts receivable, short-term notes and interest receivable, inventory, supplies, prepaid items.',
    '**Current liabilities** are due within the same period: accounts payable, short-term notes, wages, taxes, and interest payable.',
    'A **classified balance sheet** groups them this way.',
    '**Liquidity** = ability to pay short-term obligations as they come due. Measured by the **current ratio = Current assets / Current liabilities** (Limbaugh: $288,600 / $193,800 = **1.49 : 1**).',
    '**Solvency** = ability to repay liabilities in the long run. Measured by **debt to assets = Total liabilities / Total assets**.',
    'Industries differ a lot: electric utilities run current ratios around 0.5 with debt to assets above 0.7; clothing stores run current ratios near 2.'],
    chk: ['Current assets $150,000; current liabilities $60,000. Current ratio?', '2.5 : 1.'] },

  { h: 'Discount notes', t: [
    'Most notes are **add-on** notes: you repay face value plus interest. A **discount note** deducts the interest up front; you repay only the **face value** at maturity.',
    'Beacon Management Services issued a **$10,000** face, one-year discount note at **9%** on **March 1, Year 1**. Discount = $10,000 x 9% = **$900**. Cash received: **$9,100**.',
    'The $900 is recorded in **Discount on Notes Payable**, a **contra liability**. Carrying value = $10,000 - $900 = $9,100 (asset source, FA inflow).',
    '- Dec 31, Year 1: $900 / 12 = $75 a month x 10 months = **$750** interest expense. The discount shrinks, so the carrying value rises to $9,850 (claims exchange).',
    '- Feb 28, Year 2: the last **$150** of interest.',
    '- Pay the $10,000 face value at maturity.'],
    chk: ['$20,000 discount note at 6% for one year. Cash received?', '$18,800.'] }
]};

CARDS.push(
  [9, 'Accrued interest on a note payable', 'Principal x Rate x Time. Claims exchange (interest payable up).'],
  [9, 'Sales tax payable', 'Tax collected for the state. A liability, not revenue.'],
  [9, 'Contingent liability', 'Potential obligation from a past event that depends on a future event (e.g., a lawsuit).'],
  [9, 'Probable and estimable contingency', 'Recognize it in the financial statements.'],
  [9, 'Reasonably possible contingency', 'Disclose it in the notes.'],
  [9, 'Remote contingency', 'No recognition or disclosure.'],
  [9, 'Warranty expense', 'Estimated and recognized in the period of the sale (claims exchange).'],
  [9, 'Paying a warranty claim', 'Asset use: cash down, warranties payable down. No expense.'],
  [9, 'Employee vs independent contractor', 'Employee: the business directs and controls the work. Payroll taxes apply only to employees.'],
  [9, 'Gross earnings', 'Total wages or salary before deductions, including bonuses and overtime.'],
  [9, 'Net pay', 'Gross earnings - all withholdings. Take-home pay.'],
  [9, 'FICA (book rates)', 'Social Security 6% on the first $130,000; Medicare 1.5% on all earnings.'],
  [9, 'Form W-4 vs W-2', 'W-4: employee\'s withholding allowance certificate. W-2: year-end wage and tax statement.'],
  [9, 'Employer payroll taxes', 'Matching FICA, plus federal and state unemployment taxes. Extra expense to the employer.'],
  [9, 'Current asset / current liability', 'Converted, used, or due within one year or the operating cycle, whichever is longer.'],
  [9, 'Liquidity vs solvency', 'Liquidity: paying short-term bills (current ratio). Solvency: paying debts long term (debt to assets).'],
  [9, 'Current ratio', 'Current assets / Current liabilities.'],
  [9, 'Discount note', 'Interest is deducted up front; repay only the face value at maturity.'],
  [9, 'Discount on notes payable', 'Contra liability. Face - discount = carrying value; the discount becomes interest expense over time.']
);

QS.push(
  [9, '$90,000 note at 9% signed September 1. Interest expense at December 31:', ['$2,700', '$8,100', '$5,400', '$675'], '$90,000 x 9% x 4/12.'],
  [9, 'Paying $8,100 of interest that was accrued over two years affects:', ['cash and interest payable only', 'interest expense this year', 'net income', 'financing activities'], 'The expense was already recognized; cash paid for interest is operating.'],
  [9, 'Sold goods for $2,000 cash plus 6% sales tax. Revenue recognized:', ['$2,000', '$2,120', '$120', '$1,880'], 'The $120 is a liability to the state.'],
  [9, 'A lawsuit loss is probable and the amount can be reasonably estimated. The company should:', ['recognize a liability and a loss', 'disclose it in the notes only', 'ignore it', 'wait until the case is decided'], 'Probable and estimable means recognize.'],
  [9, 'A contingent loss is remote. The company should:', ['neither recognize nor disclose it', 'disclose it in the notes', 'recognize it', 'record half of it'], 'Remote items are ignored.'],
  [9, 'Recognizing estimated warranty expense is a:', ['claims exchange transaction', 'asset use transaction', 'asset source transaction', 'asset exchange transaction'], 'Warranties payable up, retained earnings down.'],
  [9, 'Gross salary $6,000; withholdings $1,245. Salary expense recognized:', ['$6,000', '$4,755', '$1,245', '$7,245'], 'Expense is gross pay.'],
  [9, 'Using the book\'s rates, FICA withheld from an employee earning $100,000:', ['$7,500', '$6,000', '$7,650', '$1,500'], '$6,000 Social Security + $1,500 Medicare.'],
  [9, 'Which is an employer payroll tax, NOT withheld from the employee?', ['State unemployment tax', 'Federal income tax', 'Employee\'s share of Social Security', 'Medical insurance premiums'], 'Unemployment taxes are paid by the employer.'],
  [9, 'Current assets $288,600; current liabilities $193,800. Current ratio:', ['1.49 : 1', '0.67 : 1', '2.49 : 1', '1.94 : 1'], '$288,600 / $193,800.'],
  [9, 'A $10,000 one-year discount note at 9%. Cash received:', ['$9,100', '$10,000', '$10,900', '$900'], 'Interest of $900 is deducted up front.'],
  [9, 'Solvency is usually measured by the:', ['debt to assets ratio', 'current ratio', 'gross margin percentage', 'inventory turnover'], 'Solvency is long-run debt-paying ability.']
);

TF.push(
  [9, `Sales tax collected from customers is revenue.`, false, `It is a liability owed to the state.`],
  [9, `A reasonably possible contingent loss is disclosed in the notes.`, true, `Only probable and estimable losses are recorded.`],
  [9, `Warranty expense is recognized when the repair is made.`, false, `It is estimated and recognized in the period of the sale.`],
  [9, `Payroll taxes apply to independent contractors.`, false, `Only to employees.`],
  [9, `Employer matching FICA is deducted from the employee's paycheck.`, false, `It is an additional expense for the employer.`],
  [9, `Discount on notes payable is a contra liability.`, true, `It is subtracted from the face value to get the carrying value.`]
);

CLOZE.push(
  [9, `A potential obligation that depends on a future event is a ___ liability.`, [`contingent`]],
  [9, `Gross earnings minus withholdings equals ___ pay.`, [`net`, `take-home`]],
  [9, `The employee's withholding allowance certificate is Form ___.`, [`w-4`, `w4`]],
  [9, `Current assets / Current liabilities is the ___ ratio.`, [`current`]],
  [9, `A note with interest deducted up front is a ___ note.`, [`discount`]]
);

MATCH.push(
  [9, `Probable and estimable`, `Recognize the liability`],
  [9, `Reasonably possible`, `Disclose in the notes`],
  [9, `Remote`, `Ignore`],
  [9, `Form W-2`, `Year-end wage and tax statement`],
  [9, `FUTA and SUTA`, `Employer unemployment taxes`],
  [9, `Liquidity`, `Paying short-term bills`]
);

SORTS.push(
  { u: [9], title: `Contingent liability: what do you do?`, b: [`Recognize`, `Disclose only`, `Nothing`], items: [[`Probable lawsuit loss, estimated at $2 million`, 0], [`Reasonably possible lawsuit loss`, 1], [`Remote chance of a claim`, 2], [`Probable loss that cannot be estimated`, 1], [`Estimated warranty repairs on goods sold`, 0]] },
  { u: [9], title: `Withheld from the employee or paid by the employer?`, b: [`Withheld from employee`, `Employer pays`], items: [[`Federal income tax`, 0], [`Employee share of Social Security`, 0], [`Employee share of Medicare`, 0], [`Matching Social Security`, 1], [`Federal unemployment tax`, 1], [`State unemployment tax`, 1], [`Medical insurance premium the employee chose`, 0]] },
  { u: [9], title: `Current or noncurrent?`, b: [`Current`, `Noncurrent`], items: [[`Accounts payable`, 0], [`Supplies`, 0], [`Prepaid insurance`, 0], [`20-year bonds payable`, 1], [`Land`, 1], [`Wages payable`, 0], [`Inventory`, 0], [`Patent`, 1]] }
);

LISTS.push(
  { u: [9], title: `Reporting contingent liabilities (three categories)`, items: [[`Probable and estimable: recognize`, [`probable`, `recogni`]], [`Reasonably possible: disclose in notes`, [`possible`, `disclos`]], [`Remote: neither`, [`remote`, `ignore`, `nothing`]]] },
  { u: [9], title: `Employer payroll taxes`, items: [[`Social Security (matching)`, [`social`]], [`Medicare (matching)`, [`medicare`]], [`Federal unemployment tax (FUTA)`, [`federal unemployment`, `futa`]], [`State unemployment tax (SUTA)`, [`state unemployment`, `suta`]]] }
);

HOOKS.push(
  { u: 9, t: `Contingent liabilities`, h: `Probable: Post it. Possible: Print it in the notes. Remote: Pass.`, w: `Probable and estimable = record it. Reasonably possible = disclose it. Remote = do nothing.` },
  { u: 9, t: `Payroll`, h: `Withholdings are the employee's money; payroll taxes are the employer's.`, w: `Withholdings come out of gross pay and are owed to others. Employer payroll taxes (matching FICA, FUTA, SUTA) are an extra expense on top of gross pay.` }
);

EVENTS.push(
  { u: 9, t: `Borrowed $90,000 cash by issuing a one-year, 9% note.`, m: `I I NA NA NA NA I`, act: `FA`, type: `AS`, je: [[`Cash`, 90000], [`Notes Payable`, -90000]], w: `Financing inflow.` },
  { u: 9, t: `Accrued $2,700 of interest on the note at year end.`, m: `NA I D NA I D NA`, act: `NA`, type: `CE`, je: [[`Interest Expense`, 2700], [`Interest Payable`, -2700]], w: `Claims exchange: no cash yet.` },
  { u: 9, t: `Sold merchandise for $2,000 cash plus 6% sales tax (revenue part only).`, m: `I I I I NA I I`, act: `OA`, type: `AS`, je: [[`Cash`, 2120], [`Sales Revenue`, -2000], [`Sales Tax Payable`, -120]], w: `Cash $2,120: revenue $2,000 and a $120 liability to the state.` },
  { u: 9, t: `Remitted $120 of sales tax to the state.`, m: `D D NA NA NA NA D`, act: `OA`, type: `AU`, je: [[`Sales Tax Payable`, 120], [`Cash`, -120]], w: `Paying off the liability.` },
  { u: 9, t: `Recognized $100 of estimated warranty expense on goods sold this year.`, m: `NA I D NA I D NA`, act: `NA`, type: `CE`, je: [[`Warranty Expense`, 100], [`Warranties Payable`, -100]], w: `Matched to the period of the sale.` },
  { u: 9, t: `Paid $40 cash to repair goods under warranty.`, m: `D D NA NA NA NA D`, act: `OA`, type: `AU`, je: [[`Warranties Payable`, 40], [`Cash`, -40]], w: `No expense: it was recognized at the sale.` },
  { u: 9, t: `Paid a $6,000 salary: withheld $1,245 and paid the employee $4,755.`, m: `D I D NA I D D`, act: `OA`, type: ``, je: [[`Salaries Expense`, 6000], [`Various Payables`, -1245], [`Cash`, -4755]], w: `Expense is the full $6,000. Cash falls $4,755; liabilities rise $1,245. This mixes asset use and claims exchange.` },
  { u: 9, t: `Recognized $510 of employer payroll tax expense (not yet paid).`, m: `NA I D NA I D NA`, act: `NA`, type: `CE`, je: [[`Payroll Tax Expense`, 510], [`Payroll Taxes Payable`, -510]], w: `Matching FICA plus unemployment taxes owed.` },
  { u: 9, t: `Issued a $10,000 face, one-year discount note at 9%, receiving $9,100.`, m: `I I NA NA NA NA I`, act: `FA`, type: `AS`, je: [[`Cash`, 9100], [`Discount on Notes Payable`, 900], [`Notes Payable`, -10000]], w: `Carrying value of the liability is $9,100.` },
  { u: 9, t: `Accrued $750 of interest on the discount note (amortized the discount).`, m: `NA I D NA I D NA`, act: `NA`, type: `CE`, je: [[`Interest Expense`, 750], [`Discount on Notes Payable`, -750]], w: `The discount shrinks, so the liability's carrying value rises.` }
);

/* ======================================================================
   CHAPTER 10: Accounting for Long-Term Debt
   ====================================================================== */
LESSONS[10] = { intro: 'Long-term debt means installment notes, lines of credit, and bonds. The big skill is bonds issued at a discount or premium: what the carrying value is, what interest expense is, and how it differs from cash paid.', items: [
  { h: 'Installment notes', t: [
    'Long-term notes usually run **2 to 5 years**. Each payment covers that period\'s **interest** plus part of the **principal**. As the principal shrinks, the interest part gets smaller and the principal part gets larger, while the payment stays the same.',
    'Steps for each payment: **interest = unpaid principal x rate**; **principal repaid = payment - interest**; **new principal = old principal - principal repaid**.',
    'Blair Company borrowed **$100,000** at **9%** for 5 years with annual payments of **$25,709**:'],
    tbl: { head: ['Year', 'Principal Jan 1', 'Payment', 'Interest', 'Principal repaid', 'Principal Dec 31'], rows: [['1', '$100,000', '$25,709', '$9,000', '$16,709', '$83,291'], ['2', '83,291', '25,709', '7,496', '18,213', '65,078'], ['3', '65,078', '25,709', '5,857', '19,852', '45,226'], ['4', '45,226', '25,709', '4,070', '21,639', '23,587'], ['5', '23,587', '25,710', '2,123', '23,587', '0']] },
    ex: 'The Year 1 payment: cash down $25,709 (interest **$9,000 OA** and principal **$16,709 FA**), notes payable down $16,709, retained earnings down $9,000 (interest expense).',
    chk: ['In Year 2, what share of the $25,709 payment is interest?', '$83,291 x 9% = $7,496.'] },

  { h: 'Lines of credit and bond basics', t: [
    'A **line of credit** lets a company borrow and repay as needed up to a set **maximum**. It is usually used for short-term, **seasonal** needs, and is very common.',
    '**Bonds** are long-term borrowing of a large **principal** (face value) from many investors:',
    '- Principal is repaid as a **lump sum at maturity**.',
    '- Individual bonds are usually **$1,000** each.',
    '- Interest is paid periodically (often **semiannually**) at the **stated rate**: Interest = Face x Stated rate x Time.',
    '- Prices are quoted as a **percentage** of face: a $1,000 bond at **104** sells for **$1,040**.',
    '**Advantages**: longer terms than bank loans (often **20 years** vs 2 to 5) and usually **lower interest rates**.',
    'Types: **term** (one maturity date) vs **serial** (mature on several dates); **secured** (specific assets pledged) vs **unsecured** (backed by general credit); **convertible** (can be exchanged for common stock); **callable** (issuer can retire them early at a stated price).'],
    chk: ['A $1,000 bond is quoted at 97. Price?', '$970.'] },

  { h: 'Bonds issued at face value', t: [
    'Mason Company issued **$100,000** of 5-year, **9%** bonds at face on January 1, Year 1, interest paid each December 31.',
    '- Issue: cash up, bonds payable up (**asset source**, FA inflow).',
    '- Each December 31: interest = $100,000 x 9% = **$9,000** (asset use: cash down, retained earnings down, **OA** outflow).',
    '- December 31, Year 5: repay the **$100,000** (asset use, **FA** outflow).',
    'With **semiannual** payments, Mason pays **$4,500** on June 30 and December 31.'],
    chk: ['Total interest expense over the 5 years at face?', '5 x $9,000 = $45,000.'] },

  { h: 'Why bonds sell at a discount or premium', t: [
    'The bond\'s **stated rate** is fixed when it is printed. Investors compare it to the **market rate** on similar bonds.'],
    tbl: { head: ['Rates', 'Price', 'Difference'], rows: [['Stated rate = market rate', 'Price = face value', 'Nothing to account for'], ['Stated rate < market rate', 'Price < face value', 'Bond discount'], ['Stated rate > market rate', 'Price > face value', 'Bond premium']] },
    exam: 'If other bonds pay more than 9%, nobody pays full price for Mason\'s 9% bonds: the price drops (discount). If others pay less, investors bid Mason\'s up (premium).',
    chk: ['Stated rate 7%, market rate 8%. Discount or premium?', 'Discount.'] } ,

  { h: 'Bonds issued at a discount', t: [
    'Same Mason bonds, but issued for **$95,000**: discount = $100,000 - $95,000 = **$5,000**.',
    '**Carrying value** = Bonds payable (face) - Discount on bonds payable (a contra liability) = **$95,000** at issue.',
    '**Straight-line amortization**: $5,000 / 5 years = **$1,000** a year. Each year:',
    '- Cash paid for interest: **$9,000** (OA).',
    '- **Interest expense: $10,000** ($9,000 + $1,000 of discount).',
    '- The discount shrinks by $1,000, so the carrying value **rises** $1,000 ($96,000 at the end of Year 1). It reaches exactly $100,000 at maturity.'],
    tbl: { head: ['Partial balance sheet', 'Jan 1, Year 1', 'Dec 31, Year 1'], rows: [['Bonds payable', '$100,000', '$100,000'], ['Less: Discount on bonds payable', '(5,000)', '(4,000)'], ['Carrying value', '$95,000', '$96,000']] },
    ex: 'Over 5 years: interest expense $50,000 = cash interest $45,000 + discount $5,000. The extra $5,000 of "interest" is paid in Year 5 as part of the $100,000 repayment (cash in $95,000, cash out $145,000). Total net income and total cash flow match over the life; only the timing differs.',
    chk: ['Effect of each Year 1 interest payment on total liabilities?', 'Increases $1,000 (the discount is amortized).'] },

  { h: 'Bonds issued at a premium', t: [
    'Now Mason issues the bonds for **$105,000**: premium = **$5,000**.',
    'Carrying value = Bonds payable **plus** Premium on bonds payable = **$105,000** at issue.',
    'Straight-line: $5,000 / 5 = **$1,000** a year. Cash interest $9,000; **interest expense $8,000** ($9,000 - $1,000). The premium shrinks, so the carrying value **falls** $1,000 a year ($104,000 at the end of Year 1) down to $100,000 at maturity.'],
    tbl: { head: ['', 'Discount ($95,000)', 'Premium ($105,000)'], rows: [['Cash paid for interest each year', '$9,000', '$9,000'], ['Annual amortization', '$1,000', '$1,000'], ['Interest expense each year', '$10,000', '$8,000'], ['Carrying value moves', 'Up toward $100,000', 'Down toward $100,000']] },
    exam: 'Discount: expense = cash + amortization. Premium: expense = cash - amortization. Either way, carrying value moves toward face value.',
    chk: ['Premium bonds: does interest expense exceed the cash paid?', 'No. Expense is less than cash paid.'] },

  { h: 'Redemptions and the effective interest method', t: [
    '**Callable** bonds can be redeemed before maturity. On January 1, Year 4, Mason called its discount bonds at **103** ($1,030 per $1,000) = **$103,000**. Carrying value was **$98,000**, so a **$5,000 loss** (reported as other expense). Cash down $103,000 (**FA**), liability down $98,000.',
    'The **effective interest method** is more accurate because it reflects the changing carrying value:',
    '- Cash interest = Face x **Stated** rate = $100,000 x 9% = $9,000.',
    '- Interest expense = **Carrying value** x **Effective (market)** rate = $95,000 x 10.33% = **$9,814**.',
    '- Amortization = $9,814 - $9,000 = **$814**. New carrying value $95,814.'],
    tbl: { head: ['Year', 'Cash', 'Interest expense', 'Discount amortized', 'Carrying value'], rows: [['Start', '', '', '', '$95,000'], ['1', '$9,000', '$9,814', '$814', '95,814'], ['2', '9,000', '9,898', '898', '96,712'], ['3', '9,000', '9,990', '990', '97,702'], ['4', '9,000', '10,093', '1,093', '98,795'], ['5', '9,000', '10,205', '1,205', '100,000'], ['Total', '$45,000', '$50,000', '$5,000', '']] },
    exam: 'Effective interest: a discount makes interest expense **increase** each year; a premium makes it **decrease** each year.',
    chk: ['Carrying value $104,000; effective rate 8%; stated interest $9,000. Premium amortization?', 'Expense $8,320; amortization $680.'] },

  { h: 'Financial leverage, taxes, and times interest earned', t: [
    '**Financial leverage**: debt increases return on equity when the company earns more on borrowed money than it pays in interest.',
    'Debt also has a **tax advantage**: interest is deductible, dividends are not. Raise $100,000 by stock (paying $8,000 of dividends) or by 8% debt ($8,000 of interest), with $20,000 of earnings before interest and taxes and a 30% tax rate:'],
    tbl: { head: ['', 'Equity financing', 'Debt financing'], rows: [['Earnings before interest and taxes', '$20,000', '$20,000'], ['Interest', '0', '(8,000)'], ['Pretax income', '20,000', '12,000'], ['Income tax (30%)', '(6,000)', '(3,600)'], ['Net income', '14,000', '8,400'], ['Dividends', '(8,000)', '0'], ['Added to retained earnings', '$6,000', '$8,400']] },
    ex: '**Times interest earned = (Net income + Interest expense + Income tax expense) / Interest expense = EBIT / Interest.** Higher means more cushion for creditors and lower risk.',
    chk: ['Net income $25,000, interest $8,000, taxes $17,000. Times interest earned?', '$50,000 / $8,000 = 6.25 times.'] }
]};

CARDS.push(
  [10, 'Installment note payment', 'Interest = unpaid principal x rate; principal repaid = payment - interest.'],
  [10, 'Installment payments over time', 'Same payment; interest part falls and principal part rises.'],
  [10, 'Line of credit', 'Borrow and repay as needed up to a maximum. Usually for seasonal needs.'],
  [10, 'Bond face value', 'The principal repaid at maturity, usually in $1,000 units.'],
  [10, 'Stated rate', 'The bond\'s printed rate. Cash interest = Face x Stated rate x Time.'],
  [10, 'Market (effective) rate', 'The rate investors can earn on similar bonds. Sets the bond\'s price.'],
  [10, 'Bond price quoted at 104', '104% of face: a $1,000 bond sells for $1,040.'],
  [10, 'Advantages of bonds', 'Longer terms (often 20 years) and usually lower rates than bank loans.'],
  [10, 'Term vs serial bonds', 'Term mature on one date; serial mature on several dates.'],
  [10, 'Secured vs unsecured bonds', 'Secured have specific assets pledged; unsecured rely on general credit.'],
  [10, 'Convertible bonds', 'Can be exchanged for a fixed number of common shares.'],
  [10, 'Callable bonds', 'Issuer can retire them early at a stated call price.'],
  [10, 'Stated < market rate', 'Bonds sell at a discount.'],
  [10, 'Stated > market rate', 'Bonds sell at a premium.'],
  [10, 'Carrying value (discount)', 'Face - Unamortized discount. Rises to face over the life.'],
  [10, 'Carrying value (premium)', 'Face + Unamortized premium. Falls to face over the life.'],
  [10, 'Interest expense with a discount', 'Cash interest + discount amortization.'],
  [10, 'Interest expense with a premium', 'Cash interest - premium amortization.'],
  [10, 'Loss on bond redemption', 'Call price paid - carrying value (when positive). Reported as other expense.'],
  [10, 'Effective interest method', 'Expense = Carrying value x Effective rate; amortization = expense - cash paid.'],
  [10, 'Tax advantage of debt', 'Interest is tax deductible; dividends are not.'],
  [10, 'Times interest earned', '(Net income + Interest + Taxes) / Interest expense = EBIT / Interest.']
);

QS.push(
  [10, '$100,000 installment note at 9%, annual payment $25,709. Principal repaid in Year 1:', ['$16,709', '$9,000', '$25,709', '$83,291'], '$25,709 - $9,000 interest.'],
  [10, 'Over the life of an installment note, the interest portion of each payment:', ['decreases', 'increases', 'stays the same', 'is always half'], 'Interest is figured on a shrinking principal.'],
  [10, 'A $1,000 bond quoted at 104 sells for:', ['$1,040', '$1,004', '$104', '$1,400'], 'Bond prices are a percentage of face.'],
  [10, 'When the stated rate is less than the market rate, bonds sell:', ['at a discount', 'at a premium', 'at face value', 'only to banks'], 'Investors will not pay full price for a below-market rate.'],
  [10, '$100,000 of 9% bonds issued for $95,000; 5 years; straight-line. Annual interest expense:', ['$10,000', '$9,000', '$8,000', '$9,500'], '$9,000 cash + $1,000 discount amortization.'],
  [10, 'Same bonds. Carrying value at the end of Year 1:', ['$96,000', '$95,000', '$94,000', '$100,000'], 'Discount drops from $5,000 to $4,000.'],
  [10, '$100,000 of 9% bonds issued for $105,000; 5 years; straight-line. Annual interest expense:', ['$8,000', '$9,000', '$10,000', '$10,500'], '$9,000 cash - $1,000 premium amortization.'],
  [10, 'Same premium bonds. Carrying value at the end of Year 1:', ['$104,000', '$105,000', '$106,000', '$100,000'], 'Premium drops from $5,000 to $4,000.'],
  [10, 'Bonds with a carrying value of $98,000 are called at 103 ($100,000 face). Result:', ['$5,000 loss', '$3,000 loss', '$5,000 gain', '$2,000 gain'], 'Paid $103,000 for a $98,000 liability.'],
  [10, 'Effective interest method: carrying value $95,000, effective rate 10.33%, cash interest $9,000. Discount amortization:', ['$814', '$1,000', '$9,814', '$186'], 'Expense $9,814 - $9,000.'],
  [10, 'Under the effective interest method, interest expense on bonds issued at a discount:', ['increases each year', 'decreases each year', 'stays constant', 'equals the cash paid'], 'The carrying value grows, and so does expense.'],
  [10, 'Net income $25,000, interest expense $8,000, income tax $17,000. Times interest earned:', ['6.25 times', '3.1 times', '5.25 times', '2.1 times'], '$50,000 / $8,000.'],
  [10, 'Paying annual interest on bonds is reported on the statement of cash flows as:', ['an operating outflow', 'a financing outflow', 'an investing outflow', 'not reported'], 'Interest paid is operating; principal is financing.'],
  [10, 'Debt financing has a tax advantage over equity financing because:', ['interest is tax deductible but dividends are not', 'debt has no interest cost', 'dividends are tax deductible', 'bonds never need to be repaid'], 'Lower taxes leave more for retained earnings.']
);

TF.push(
  [10, `Bonds sell at a premium when the stated rate is higher than the market rate.`, true, `Investors pay extra for the above-market interest.`],
  [10, `Discount on bonds payable is added to bonds payable on the balance sheet.`, false, `It is subtracted. Premiums are added.`],
  [10, `Amortizing a bond discount makes interest expense larger than the cash paid.`, true, `Expense = cash + amortization.`],
  [10, `The carrying value of a premium bond rises over time.`, false, `It falls toward face value.`],
  [10, `A loss on early bond redemption is reported as other expense.`, true, `Gains and losses on redemption go to other income or expense.`],
  [10, `A higher times-interest-earned ratio suggests more risk.`, false, `A higher ratio means more cushion and less risk.`]
);

CLOZE.push(
  [10, `Bonds that the issuer can retire early at a stated price are ___ bonds.`, [`callable`]],
  [10, `Bonds that can be exchanged for common stock are ___ bonds.`, [`convertible`]],
  [10, `When the stated rate is below the market rate, bonds sell at a ___.`, [`discount`]],
  [10, `Face value minus unamortized discount equals the ___ value.`, [`carrying`, `book`]],
  [10, `EBIT / Interest expense = times ___ earned.`, [`interest`]]
);

MATCH.push(
  [10, `Term bonds`, `Mature on one date`],
  [10, `Serial bonds`, `Mature on several dates`],
  [10, `Secured bonds`, `Specific assets pledged`],
  [10, `Callable bonds`, `Issuer can retire early`],
  [10, `Bond discount`, `Stated rate below market`],
  [10, `Bond premium`, `Stated rate above market`]
);

SORTS.push(
  { u: [10], title: `Discount or premium?`, b: [`Discount`, `Premium`], items: [[`Stated rate 9%, market rate 10%`, 0], [`Stated rate 9%, market rate 8%`, 1], [`Issued at 97`, 0], [`Issued at 104`, 1], [`Interest expense > cash interest`, 0], [`Carrying value falls over time`, 1], [`Contra liability on the balance sheet`, 0], [`Effective-interest expense decreases each year`, 1]] }
);

LISTS.push(
  { u: [10], title: `Characteristics of bonds (pairs)`, items: [[`Term and serial`, [`term`, `serial`]], [`Secured and unsecured`, [`secured`]], [`Convertible and callable`, [`convertible`, `callable`]]] },
  { u: [10], title: `Effective interest method steps`, items: [[`Cash payment = face x stated rate`, [`cash`, `stated`]], [`Interest expense = carrying value x effective rate`, [`expense`, `effective`]], [`Amortization = expense - cash payment`, [`amortiz`]], [`Update the carrying value`, [`carrying`, `update`]]] }
);

HOOKS.push(
  { u: 10, t: `Bond pricing`, h: `Stated Below market: Bargain (discount). Stated Above market: Admission fee (premium).`, w: `A below-market rate sells at a **discount**; an above-market rate sells at a **premium**. Carrying value always moves toward face.` },
  { u: 10, t: `Interest expense on bonds`, h: `Discount: Do more expense. Premium: Pay less expense.`, w: `Discount: expense = cash + amortization. Premium: expense = cash - amortization.` }
);

EVENTS.push(
  { u: 10, t: `Issued $100,000 of bonds at face value.`, m: `I I NA NA NA NA I`, act: `FA`, type: `AS`, je: [[`Cash`, 100000], [`Bonds Payable`, -100000]], w: `Financing inflow.` },
  { u: 10, t: `Paid $9,000 of annual interest on bonds issued at face.`, m: `D NA D NA I D D`, act: `OA`, type: `AU`, je: [[`Interest Expense`, 9000], [`Cash`, -9000]], w: `Interest paid is operating.` },
  { u: 10, t: `Issued $100,000 face bonds for $95,000 cash.`, m: `I I NA NA NA NA I`, act: `FA`, type: `AS`, je: [[`Cash`, 95000], [`Discount on Bonds Payable`, 5000], [`Bonds Payable`, -100000]], w: `The liability's carrying value is $95,000.` },
  { u: 10, t: `Paid $9,000 interest on the discount bonds and amortized $1,000 of discount.`, m: `D I D NA I D D`, act: `OA`, type: ``, je: [[`Interest Expense`, 10000], [`Discount on Bonds Payable`, -1000], [`Cash`, -9000]], w: `Expense $10,000; cash $9,000; carrying value up $1,000.` },
  { u: 10, t: `Paid $9,000 interest on premium bonds and amortized $1,000 of premium.`, m: `D D D NA I D D`, act: `OA`, type: ``, je: [[`Interest Expense`, 8000], [`Premium on Bonds Payable`, 1000], [`Cash`, -9000]], w: `Expense $8,000; cash $9,000; carrying value down $1,000.` },
  { u: 10, t: `Repaid the $100,000 bond principal at maturity.`, m: `D D NA NA NA NA D`, act: `FA`, type: `AU`, je: [[`Bonds Payable`, 100000], [`Cash`, -100000]], w: `Repaying principal is financing.` },
  { u: 10, t: `Called bonds with a $98,000 carrying value for $103,000.`, m: `D D D NA I D D`, act: `FA`, type: `AU`, je: [[`Bonds Payable`, 100000], [`Loss on Redemption`, 5000], [`Discount on Bonds Payable`, -2000], [`Cash`, -103000]], w: `A $5,000 loss. The $103,000 is a financing outflow.` }
);

/* ======================================================================
   CHAPTER 11: Proprietorships, Partnerships, and Corporations
   ====================================================================== */
LESSONS[11] = { intro: 'This chapter is all about the equity side: forms of business, kinds of stock, issuing and buying back stock, dividends, splits, and what stockholders get.', items: [
  { h: 'Forms of business organization', t: [
    '- **Sole proprietorship**: one owner.',
    '- **Partnership**: two or more owners. Needs clear agreements on authority, risk, and sharing profits and losses.',
    '- **Corporation**: a **separate legal entity** created under state law (each state has its own rules).',
    'Equity is always owner contributions plus earnings kept in the business, but it is presented differently:'],
    tbl: { head: ['', 'Sole proprietorship', 'Partnership', 'Corporation'], rows: [['Ownership interest', 'One capital account', 'A capital account for each partner', 'Capital stock (common and preferred) plus a separate retained earnings account'], ['Distributions', 'Withdrawals', 'Withdrawals', 'Dividends']] },
    ex: 'Worthington\'s proprietorship: owner contribution $5,000 + net income $1,500 - withdrawal $1,000 = **capital $5,500**.',
    chk: ['What are distributions to a partner called?', 'Withdrawals.'] },

  { h: 'Corporations: pros, cons, and structure', t: [
    '**Advantages**: separate legal entity, **limited liability** for stockholders, continuous life, easy transfer of ownership, greater ability to raise capital.',
    '**Disadvantages**: more government **regulation** and **double taxation** (the corporation pays tax on income, then stockholders pay tax on dividends).',
    'Large public corporations are heavily regulated: SEC Acts of **1933 and 1934**, the **Sarbanes-Oxley Act of 2002**, and stock exchange listing rules. Few laws govern proprietorships and partnerships.',
    'Structure: **stockholders** elect the **board of directors**; the board appoints the officers (the **president**); officers hire employees.'],
    chk: ['Who appoints a corporation\'s president?', 'The board of directors.'] },

  { h: 'Stock terms', t: [
    '**Par value**: an arbitrary nominal amount per share (often under $1), set in the charter. It is the **legal capital** that must stay invested. **No-par** stock has none; **stated value** works like par.',
    'Par is unrelated to **market price** (what a share sells for). **Book value per share** = Stockholders\' equity / Shares outstanding.',
    '- **Authorized**: the maximum shares the charter allows.',
    '- **Issued**: shares sold. **Unissued** = authorized - issued.',
    '- **Outstanding**: issued shares owned by stockholders.',
    '- **Treasury**: issued shares the company bought back. **Issued = Outstanding + Treasury.**'],
    chk: ['Issued 1,000 shares, 150 held in treasury. Outstanding?', '850.'] },

  { h: 'Common and preferred stock', t: [
    '**Common stockholders** can buy and sell stock, share in profits (dividends) and in assets if liquidated, vote on major issues and elect directors, and usually have a **preemptive right** to buy new shares to keep their percentage.',
    '**Preferred stock** has **priority** over common in **dividends** and in **liquidation**, usually a stated dividend rate (percent of par), and **no voting rights**. About 20% of Dow 30 companies have it.',
    '- **Cumulative** (most preferred): unpaid dividends (**dividends in arrears**) must be paid before common gets anything. Arrears are disclosed, not recorded as a liability.',
    '- **Noncumulative**: missed dividends are lost.',
    'Dillion: 10,000 shares of **4%, $10 par** preferred (annual dividend $4,000); no dividends for two years; now declares **$22,000**.'],
    tbl: { head: ['', 'Cumulative', 'Noncumulative'], rows: [['Arrears (2 years)', '$8,000', '$0'], ['Current year', '4,000', '4,000'], ['Preferred total', '$12,000', '$4,000'], ['Common gets the rest', '$10,000', '$18,000']] },
    chk: ['5% $100 par cumulative preferred, 1,000 shares, one year in arrears, $20,000 declared. Preferred gets?', '$10,000 ($5,000 x 2).'] },

  { h: 'Issuing stock', t: [
    'Nelson Inc.:',
    '- 100 shares of **$10 par** common at **$22**: Cash $2,200; Common Stock $1,000 (par); **Paid-in Capital in Excess of Par** $1,200.',
    '- 150 shares of **$20 par Class B** common at $25: Cash $3,750; Common Stock, Class B $3,000; Paid-in Capital in Excess of Par, Class B $750.',
    '- 100 shares of 7% cumulative preferred, **$10 stated value**, at $22: Preferred Stock $1,000; Paid-in Capital in Excess of Stated Value $1,200.',
    '- 100 shares of **no-par** common at $22: Common Stock, No Par **$2,200** (all of it).',
    'Every issue: assets up, equity up (**asset source**), **financing** inflow. The excess over par is not a gain: companies never earn income by selling their own stock.'],
    chk: ['500 shares of $1 par stock issued at $15. Paid-in capital in excess of par?', '500 x $14 = $7,000.'] },

  { h: 'Treasury stock', t: [
    '**Treasury stock** is issued stock the company bought back. It is recorded **at cost** in a **contra equity** account and has **no voting or dividend rights**. About 70% of Dow 30 companies have it.',
    'Why buy back shares? Employee stock option plans, preparing for a merger, raising **earnings per share**, supporting the stock price, and avoiding a hostile takeover.',
    '- Nelson bought back 50 shares at **$20**: treasury stock $1,000 (equity down), cash down (**asset use**, FA outflow).',
    '- Resold 30 of them at **$25**: cash $750; treasury stock down $600 (30 x $20 cost); **Paid-in Capital in Excess of Cost of Treasury Stock $150**.',
    '**No gain or loss is ever recognized** on treasury stock.'],
    chk: ['Treasury shares bought at $40 are resold at $35. Is there a loss on the income statement?', 'No. Treasury stock transactions never create gains or losses; the $5 reduces paid-in capital.'] },

  { h: 'Cash dividends, stock dividends, splits, appropriations', t: [
    'Corporations do not have to pay dividends, but once **declared** a dividend is a **legal liability**. Paying one needs enough **retained earnings** and enough **cash**.',
    'Three dates (Nelson: $70 on 100 shares of 7%, $10 par preferred):'],
    tbl: { head: ['Date', 'Entry', 'Effect'], rows: [['Declaration (Oct 15)', 'Dividends $70 / Dividends Payable $70', 'Claims exchange: liability up, retained earnings down'], ['Record (Nov 15)', 'None', 'Determines who gets paid'], ['Payment (Dec 15)', 'Dividends Payable $70 / Cash $70', 'Asset use, financing outflow']] },
    ex: '**Stock dividend**: Nelson issued a 10% stock dividend on 150 Class B shares ($20 par, $30 market): 15 shares. Retained earnings down **$450** (15 x $30); Common Stock up $300 (15 x $20); Paid-in Capital up $150. **Total equity does not change**, and every stockholder keeps the same percentage. **Stock split**: 2-for-1 on 165 shares of $20 par makes 330 shares of **$10 par**; total par $3,300 unchanged; **no entry**. **Appropriation**: the board restricts $1,000 of retained earnings for expansion (retained earnings to appropriated retained earnings); total equity unchanged.',
    exam: 'Nelson ending retained earnings: $5,000 - $70 cash dividend - $450 stock dividend + $6,000 net income = **$10,480** ($1,000 appropriated + $9,480 unappropriated).',
    chk: ['Which reduces total stockholders\' equity: a cash dividend, a stock dividend, or a stock split?', 'Only the cash dividend.'] },

  { h: 'The financial analyst: P/E and liquidation', t: [
    'Stockholders earn a return in two ways: **dividends** and an **increase in the market price** of their shares. Earnings growth drives both.',
    '**Price-earnings (P/E) ratio = Market price per share / Earnings per share.** The most common measure of value. Caution: a high P/E can come from very low earnings, not optimism. Use the most recent **actual** EPS in this course (the press often uses projected EPS).',
    '**Liquidation priority** when a business shuts down: (1) **secured** debts against their secured assets, (2) **unsecured** debts as a class, (3) **preferred** stock, (4) **common** stock.'],
    chk: ['Stock price $48, EPS $3. P/E?', '16.'] }
]};

CARDS.push(
  [11, 'Sole proprietorship / partnership / corporation', 'One owner / two or more owners / separate legal entity under state law.'],
  [11, 'Withdrawals vs dividends', 'Withdrawals: distributions in proprietorships and partnerships. Dividends: in corporations.'],
  [11, 'Corporate advantages', 'Separate legal entity, limited liability, continuous life, easy transfer of ownership, ability to raise capital.'],
  [11, 'Corporate disadvantages', 'More regulation and double taxation.'],
  [11, 'Double taxation', 'Corporate income is taxed, then dividends are taxed again to stockholders.'],
  [11, 'Par value', 'Arbitrary per-share amount in the charter; the legal capital. Unrelated to market price.'],
  [11, 'Legal capital', 'Amount required by the state to remain invested in the business (par value).'],
  [11, 'Authorized / issued / outstanding', 'Maximum allowed / sold / issued and still held by stockholders.'],
  [11, 'Treasury stock', 'Issued shares bought back. Recorded at cost; contra equity; no votes or dividends.'],
  [11, 'Common stockholder rights', 'Buy and sell, share profits and liquidation assets, vote and elect directors, preemptive right.'],
  [11, 'Preferred stock', 'Priority over common for dividends and liquidation; stated dividend rate; usually no vote.'],
  [11, 'Cumulative preferred', 'Unpaid dividends (in arrears) must be paid before any common dividend.'],
  [11, 'Dividends in arrears', 'Unpaid cumulative preferred dividends. Disclosed, not recorded as a liability.'],
  [11, 'Paid-in capital in excess of par', 'Price received above par value when issuing stock.'],
  [11, 'No-par stock issue', 'The entire amount received goes to Common Stock.'],
  [11, 'Gain or loss on treasury stock', 'Never. Differences go to paid-in capital.'],
  [11, 'Three dividend dates', 'Declaration (record liability), record (no entry), payment (pay cash).'],
  [11, 'Stock dividend', 'Moves retained earnings to paid-in capital. Total equity unchanged.'],
  [11, 'Stock split', 'More shares, proportionally lower par. No entry; total equity unchanged.'],
  [11, 'Appropriation of retained earnings', 'Board restricts retained earnings for a purpose. Total equity unchanged.'],
  [11, 'Price-earnings ratio', 'Market price per share / Earnings per share.'],
  [11, 'Liquidation priority', 'Secured debts, unsecured debts, preferred stock, common stock.']
);

QS.push(
  [11, 'Which is an advantage of the corporate form?', ['Limited liability for owners', 'Double taxation', 'Less regulation', 'Owners manage directly'], 'Stockholders can lose only what they invested.'],
  [11, '100 shares of $10 par common issued at $22 per share. Paid-in capital in excess of par:', ['$1,200', '$2,200', '$1,000', '$22'], '100 x ($22 - $10).'],
  [11, '100 shares of no-par common issued at $22. Common Stock is credited for:', ['$2,200', '$1,000', '$0', '$1,200'], 'No-par: all proceeds go to Common Stock.'],
  [11, 'Issuing common stock for cash is reported as:', ['a financing inflow', 'an investing inflow', 'an operating inflow', 'revenue'], 'Raising capital from owners is financing.'],
  [11, 'Issued shares 5,000; treasury shares 400. Outstanding shares:', ['4,600', '5,400', '5,000', '400'], 'Outstanding = issued - treasury.'],
  [11, 'Preferred: 4%, $10 par, 10,000 shares, cumulative, 2 years in arrears. $22,000 declared. Common receives:', ['$10,000', '$18,000', '$12,000', '$22,000'], 'Preferred gets $12,000 (3 years x $4,000).'],
  [11, 'Same facts but noncumulative. Common receives:', ['$18,000', '$10,000', '$12,000', '$22,000'], 'Preferred gets only this year\'s $4,000.'],
  [11, 'Bought 50 shares of treasury stock at $20. Effect:', ['assets and equity each decrease $1,000', 'assets decrease and expenses increase', 'investing outflow', 'no effect on equity'], 'Treasury stock is contra equity; it is a financing outflow.'],
  [11, 'Resold 30 treasury shares (cost $20) at $25. Effect on net income:', ['none', '$150 gain', '$750 revenue', '$150 loss'], 'No gains or losses on treasury stock: $150 goes to paid-in capital.'],
  [11, 'On the date of record for a cash dividend, the company:', ['makes no entry', 'records a liability', 'pays cash', 'reduces retained earnings'], 'It just identifies who gets paid.'],
  [11, 'Declaring a cash dividend is a:', ['claims exchange transaction', 'asset use transaction', 'asset source transaction', 'asset exchange transaction'], 'Dividends payable up, retained earnings down.'],
  [11, 'A 10% stock dividend on 150 shares ($20 par, $30 market). Retained earnings decreases by:', ['$450', '$300', '$150', '$0'], '15 shares x $30 market.'],
  [11, 'A 2-for-1 stock split on 165 shares of $20 par stock results in:', ['330 shares at $10 par, no entry', '330 shares at $20 par', '165 shares at $10 par', 'a decrease in retained earnings'], 'Total par is unchanged.'],
  [11, 'In liquidation, which group is paid last?', ['Common stockholders', 'Preferred stockholders', 'Unsecured creditors', 'Secured creditors'], 'Common stock is the residual claim.']
);

TF.push(
  [11, `Par value equals the stock's market value.`, false, `Par is an arbitrary amount set in the charter.`],
  [11, `Treasury stock is reported as an asset.`, false, `It is a contra equity account.`],
  [11, `Dividends in arrears are recorded as a liability.`, false, `They are disclosed. A dividend is a liability only once declared.`],
  [11, `A stock dividend reduces total stockholders' equity.`, false, `It moves amounts within equity; total is unchanged.`],
  [11, `A stock split requires no journal entry.`, true, `Shares and par change, total par does not.`],
  [11, `Preferred stockholders usually have voting rights.`, false, `Preferred usually does not vote.`],
  [11, `Corporations face double taxation.`, true, `Corporate income is taxed, then dividends are taxed to stockholders.`]
);

CLOZE.push(
  [11, `Shares a company has bought back are ___ stock.`, [`treasury`]],
  [11, `Distributions to owners of a partnership are called ___.`, [`withdrawals`]],
  [11, `Preferred stock whose missed dividends must be paid first is ___ preferred.`, [`cumulative`]],
  [11, `The amount required by the state to remain invested in the business is ___ capital.`, [`legal`]],
  [11, `Market price per share / Earnings per share = the ___ ratio.`, [`price-earnings`, `p/e`, `pe`, `price earnings`]]
);

MATCH.push(
  [11, `Authorized shares`, `Maximum the charter allows`],
  [11, `Outstanding shares`, `Owned by stockholders`],
  [11, `Treasury stock`, `Bought back by the company`],
  [11, `Declaration date`, `Dividend liability recorded`],
  [11, `Stock split`, `More shares, lower par, no entry`],
  [11, `Preemptive right`, `Buy new shares to keep your percentage`]
);

SORTS.push(
  { u: [11], title: `Effect on TOTAL stockholders' equity`, b: [`Increases`, `Decreases`, `No change`], items: [[`Issued common stock for cash`, 0], [`Declared a cash dividend`, 1], [`Paid a previously declared cash dividend`, 2], [`Distributed a 10% stock dividend`, 2], [`2-for-1 stock split`, 2], [`Bought treasury stock`, 1], [`Resold treasury stock`, 0], [`Appropriated retained earnings`, 2], [`Earned net income`, 0]] },
  { u: [11], title: `Corporate advantage or disadvantage?`, b: [`Advantage`, `Disadvantage`], items: [[`Limited liability`, 0], [`Double taxation`, 1], [`Continuous life`, 0], [`Government regulation`, 1], [`Easy transfer of ownership`, 0], [`Ability to raise capital`, 0], [`Separate legal entity`, 0]] }
);

LISTS.push(
  { u: [11], title: `Reasons companies buy treasury stock`, items: [[`Employee stock option plans`, [`employee`, `option`, `esop`]], [`Preparation for a merger`, [`merger`, `acqui`]], [`Increase earnings per share`, [`earnings per share`, `eps`]], [`Support the stock price`, [`price`]], [`Avoid a hostile takeover`, [`takeover`, `hostile`]]] },
  { u: [11], title: `Liquidation payment priority`, items: [[`Secured debts`, [`secured`]], [`Unsecured debts`, [`unsecured`]], [`Preferred stock`, [`preferred`]], [`Common stock`, [`common`]]] },
  { u: [11], title: `Three dividend dates`, items: [[`Declaration date`, [`declar`]], [`Date of record`, [`record`]], [`Payment date`, [`payment`, `pay`]]] }
);

HOOKS.push(
  { u: 11, t: `Dividend dates`, h: `Declare = Debt. Record = Rest. Pay = Pay.`, w: `Declaration creates the liability, the record date needs no entry, and the payment date sends the cash.` },
  { u: 11, t: `Liquidation order`, h: `"Some Unlucky People Collect last" (Secured, Unsecured, Preferred, Common).`, w: `Creditors before owners; secured before unsecured; preferred before common.` },
  { u: 11, t: `Treasury stock`, h: `You can't profit from trading yourself.`, w: `No gains or losses on treasury stock. Differences go to paid-in capital.` }
);

EVENTS.push(
  { u: 11, t: `Issued 100 shares of $10 par common stock for $22 per share.`, m: `I NA I NA NA NA I`, act: `FA`, type: `AS`, je: [[`Cash`, 2200], [`Common Stock`, -1000], [`Paid-in Capital in Excess of Par`, -1200]], w: `Par to Common Stock, the rest to paid-in capital. Financing inflow.` },
  { u: 11, t: `Bought back 50 shares of its own stock for $20 each.`, m: `D NA D NA NA NA D`, act: `FA`, type: `AU`, je: [[`Treasury Stock`, 1000], [`Cash`, -1000]], w: `Treasury stock is contra equity. Financing outflow.` },
  { u: 11, t: `Resold 30 treasury shares (cost $20) for $25 each.`, m: `I NA I NA NA NA I`, act: `FA`, type: `AS`, je: [[`Cash`, 750], [`Treasury Stock`, -600], [`Paid-in Capital in Excess of Cost of Treasury Stock`, -150]], w: `No gain: the $150 goes to paid-in capital.` },
  { u: 11, t: `Declared a $70 cash dividend on preferred stock.`, m: `NA I D NA NA NA NA`, act: `NA`, type: `CE`, je: [[`Dividends`, 70], [`Dividends Payable`, -70]], w: `Once declared, a dividend is a liability. Not an expense.` },
  { u: 11, t: `Paid the $70 cash dividend previously declared.`, m: `D D NA NA NA NA D`, act: `FA`, type: `AU`, je: [[`Dividends Payable`, 70], [`Cash`, -70]], w: `Dividends paid are a financing outflow.` },
  { u: 11, t: `Distributed a 10% stock dividend (15 shares, $20 par, $30 market).`, m: `NA NA NA NA NA NA NA`, act: `NA`, type: ``, je: [[`Retained Earnings`, 450], [`Common Stock`, -300], [`Paid-in Capital in Excess of Par`, -150]], w: `Amounts move within equity; total equity unchanged.` },
  { u: 11, t: `Declared a 2-for-1 stock split.`, m: `NA NA NA NA NA NA NA`, act: `NA`, type: ``, je: [], w: `More shares at a lower par. No entry.` },
  { u: 11, t: `Appropriated $1,000 of retained earnings for future expansion.`, m: `NA NA NA NA NA NA NA`, act: `NA`, type: ``, je: [[`Retained Earnings`, 1000], [`Appropriated Retained Earnings`, -1000]], w: `A restriction within retained earnings; total equity unchanged.` }
);

/* ======================================================================
   CHAPTER 12: Statement of Cash Flows
   ====================================================================== */
LESSONS[12] = { intro: 'The statement of cash flows explains why cash changed. You will build one from comparative balance sheets and an income statement (New South Company), using both the indirect and the direct method.', items: [
  { h: 'The three sections and what goes where', t: [
    'Every statement of cash flows has **operating**, **investing**, and **financing** sections.'],
    tbl: { head: ['Section', 'Inflows', 'Outflows'], rows: [['Operating', 'Receipts from sales; commissions and fees; **interest and dividends received**', 'Payments for inventory, salaries and wages, operating expenses, **interest on liabilities**, taxes'], ['Investing', 'Selling property, plant, and equipment; selling investment securities; collecting loans', 'Buying property, plant, and equipment; buying investment securities; lending to others'], ['Financing', 'Borrowing; issuing stock', 'Repaying debt (excluding interest); buying treasury stock; **paying dividends**']] },
    ex: '**Noncash investing and financing activities** (like buying land with a mortgage note) involve no cash, so they are left out of the main statement. Because FASB requires all material investing and financing activities to be disclosed, they go in a **separate schedule**.',
    exam: 'The classic traps: **interest paid and received** and **dividends received** are **operating**. **Dividends paid** are **financing**.',
    chk: ['Where does cash received as dividends on an investment go?', 'Operating activities.'] },

  { h: 'The New South Company data', t: [
    'New South\'s Year 2 income statement: sales $20,600 - cost of goods sold $10,500 = gross margin $10,100; operating expenses $6,400 (depreciation $1,000, salaries $2,700, insurance $1,300, other $1,400); rent revenue $2,400; interest revenue $700; interest expense ($400); **gain on sale of store fixtures $600**. **Net income $7,000.**',
    'Changes in noncash current assets and current liabilities (Year 1 to Year 2):'],
    tbl: { head: ['Account', 'Year 2', 'Year 1', 'Change'], rows: [['Accounts receivable', '$1,000', '$1,200', '(200)'], ['Interest receivable', '400', '300', '100'], ['Inventory', '8,900', '8,200', '700'], ['Prepaid insurance', '1,100', '1,400', '(300)'], ['Accounts payable (inventory)', '800', '1,100', '(300)'], ['Salaries payable', '1,000', '900', '100'], ['Other operating expenses payable', '1,500', '1,300', '200'], ['Interest payable', '300', '500', '(200)'], ['Unearned rent revenue', '600', '1,600', '(1,000)']] },
    chk: ['Cash fell from $400 to $300. Net change?', 'A $100 decrease.'] },

  { h: 'The indirect method: four rules', t: [
    'Start with **net income** and adjust it to cash:',
    '- **Rule 1**: **add decreases** and **subtract increases** in noncash **current assets**.',
    '- **Rule 2**: **add increases** and **subtract decreases** in **current liabilities**.',
    '- **Rule 3**: **add noncash expenses** (depreciation, amortization).',
    '- **Rule 4**: **add losses** and **subtract gains** (the cash from selling assets belongs in investing).'],
    tbl: { head: ['New South: operating activities (indirect)', 'Rule', 'Amount'], rows: [['Net income', '', '$7,000'], ['Decrease in accounts receivable', '1', '200'], ['Increase in interest receivable', '1', '(100)'], ['Increase in inventory', '1', '(700)'], ['Decrease in accounts payable', '2', '(300)'], ['Decrease in prepaid insurance', '1', '300'], ['Increase in salaries payable', '2', '100'], ['Increase in other operating expenses payable', '2', '200'], ['Decrease in interest payable', '2', '(200)'], ['Decrease in unearned rent revenue', '2', '(1,000)'], ['Depreciation expense', '3', '1,000'], ['Gain on sale of store fixtures', '4', '(600)'], ['Net cash flow from operating activities', '', '$5,900']] },
    exam: 'Why subtract an increase in a current asset? If receivables grew, some revenue in net income was never collected. Why add an increase in a liability? If salaries payable grew, some expense in net income was never paid.',
    chk: ['Net income $50,000; accounts receivable up $4,000; depreciation $6,000; accounts payable up $2,000. Operating cash flow?', '$50,000 - $4,000 + $6,000 + $2,000 = $54,000.'] },

  { h: 'The direct method', t: [
    'The direct method lists actual cash receipts and payments. New South:'],
    tbl: { head: ['Operating activities (direct)', 'Amount'], rows: [['Inflow from customers ($20,600 + $200 decrease in A/R)', '$20,800'], ['Inflow from interest revenue ($700 - $100 increase in receivable)', '600'], ['Outflow for inventory purchases', '(11,500)'], ['Outflow to purchase insurance', '(1,000)'], ['Outflow to pay salary expense', '(2,600)'], ['Outflow for other operating expenses', '(1,200)'], ['Outflow to pay interest expense', '(600)'], ['Inflow from rent revenue ($2,400 - $1,000 decrease in unearned)', '1,400'], ['Net cash inflow from operating activities', '$5,900']] },
    ex: 'Both methods give the same **$5,900**. The **FASB recommends the direct method** because it is easy to understand, but **most companies use the indirect method** because it is easier and cheaper to prepare from accrual records.',
    chk: ['Sales $100,000; accounts receivable rose $8,000. Cash collected from customers?', '$92,000.'] },

  { h: 'Investing and financing activities', t: [
    'For each long-term account, reconcile the beginning and ending balances: what purchases and sales explain the change? Check the notes.',
    '**Investing (New South):**',
    '- Investment securities rose $1,600 with no sales: **bought $1,600** (outflow).',
    '- Store fixtures that cost $1,700 with a $400 book value were sold at a **$600 gain**: cash inflow = book value + gain = **$1,000**. Fixtures went from $4,800 to $5,400 even after removing $1,700, so New South **bought $2,300** (outflow).',
    '- Land bought with a **$2,200 mortgage**: no cash, so it goes in the **noncash schedule**.',
    'Net investing: ($1,600) + $1,000 - $2,300 = **($2,900)**.',
    '**Financing (New South):** look at debt, capital stock and treasury stock, and retained earnings.',
    '- Bonds payable fell $3,000 with none issued: **paid $3,000** (outflow).',
    '- Common stock rose $2,000: **issued $2,000** (inflow).',
    '- Retained earnings: $7,200 + $7,000 net income - ending $12,700 = **$1,500 of dividends paid** (outflow).',
    '- Treasury stock rose $600 with none reissued: **bought $600** (outflow).',
    'Net financing: **($3,100)**. Total: $5,900 - $2,900 - $3,100 = **($100)**, and cash went from $400 to $300.'],
    chk: ['Equipment with book value $12,000 sold at a $3,000 loss. Cash received?', '$9,000.'] },

  { h: 'Net income vs cash flow in the real world', t: [
    'Net income and operating cash flow can be far apart for years. In the slides: **Netflix** reported positive net income from 2015 to 2018 but **negative** operating cash flow every year (it pays for content up front). **Chevron** and **Caterpillar** reported much more operating cash than net income, partly from large depreciation.',
    'About half of large companies present the statement of cash flows third and half present it fourth.'],
    chk: ['Big depreciation expense makes operating cash flow higher or lower than net income?', 'Higher (depreciation is added back).'] }
]};

CARDS.push(
  [12, 'Interest and dividends received', 'Operating inflows.'],
  [12, 'Interest paid', 'Operating outflow.'],
  [12, 'Dividends paid', 'Financing outflow.'],
  [12, 'Buying treasury stock', 'Financing outflow.'],
  [12, 'Lending to others / collecting loans', 'Investing outflow / investing inflow.'],
  [12, 'Noncash investing and financing activities', 'Like buying land with a mortgage. Shown in a separate schedule, not in the main statement.'],
  [12, 'Indirect method Rule 1', 'Add decreases and subtract increases in noncash current assets.'],
  [12, 'Indirect method Rule 2', 'Add increases and subtract decreases in current liabilities.'],
  [12, 'Indirect method Rule 3', 'Add noncash expenses such as depreciation and amortization.'],
  [12, 'Indirect method Rule 4', 'Add losses and subtract gains.'],
  [12, 'Direct vs indirect method', 'Same operating total. FASB recommends direct; most companies use indirect.'],
  [12, 'Cash from selling a long-term asset', 'Book value + gain (or - loss). Investing inflow.'],
  [12, 'Dividends paid from retained earnings', 'Beginning RE + Net income - Ending RE.'],
  [12, 'Cash collected from customers (direct)', 'Sales - increase in A/R (or + decrease in A/R).']
);

QS.push(
  [12, 'Which is an operating activity?', ['Receiving interest on an investment', 'Paying dividends', 'Buying equipment', 'Issuing bonds'], 'Interest and dividends received are operating.'],
  [12, 'Which is a financing activity?', ['Buying treasury stock', 'Paying interest', 'Buying investment securities', 'Collecting a loan'], 'Transactions with owners and repaying borrowed principal are financing.'],
  [12, 'Under the indirect method, an increase in accounts receivable is:', ['subtracted from net income', 'added to net income', 'shown as investing', 'ignored'], 'Rule 1: subtract increases in current assets.'],
  [12, 'Under the indirect method, a decrease in unearned revenue is:', ['subtracted from net income', 'added to net income', 'shown as financing', 'ignored'], 'Rule 2: subtract decreases in current liabilities.'],
  [12, 'Under the indirect method, a gain on the sale of equipment is:', ['subtracted from net income', 'added to net income', 'shown as operating cash inflow', 'ignored'], 'Rule 4: the cash belongs in investing.'],
  [12, 'Net income $7,000; current-asset/liability changes net to ($1,500); depreciation $1,000; gain $600. Operating cash flow:', ['$5,900', '$7,000', '$8,100', '$6,500'], '$7,000 - $1,500 + $1,000 - $600.'],
  [12, 'Fixtures that cost $1,700 with book value $400 sold for a $600 gain. Investing inflow:', ['$1,000', '$600', '$1,700', '$400'], 'Book value + gain.'],
  [12, 'Beginning retained earnings $7,200; net income $7,000; ending $12,700. Dividends paid:', ['$1,500', '$5,500', '$7,000', '$12,700'], '$7,200 + $7,000 - $12,700.'],
  [12, 'Land bought by issuing a $2,200 mortgage note is reported:', ['in a separate schedule of noncash activities', 'as an investing outflow', 'as a financing inflow', 'not at all'], 'No cash moved, but it must be disclosed.'],
  [12, 'Sales $20,600; accounts receivable decreased $200. Cash from customers (direct method):', ['$20,800', '$20,400', '$20,600', '$200'], 'Collected more than this year\'s sales.'],
  [12, 'Which method does the FASB recommend?', ['Direct', 'Indirect', 'Either; it has no preference', 'Neither'], 'But most companies use the indirect method.'],
  [12, 'Depreciation is added back under the indirect method because it:', ['reduced net income but did not use cash', 'is a cash inflow', 'is a financing item', 'increases assets'], 'Rule 3.']
);

TF.push(
  [12, `Dividends paid are an operating activity.`, false, `They are a financing activity. Dividends received are operating.`],
  [12, `The direct and indirect methods report different totals for operating cash flow.`, false, `Only the presentation differs.`],
  [12, `An increase in salaries payable is added to net income under the indirect method.`, true, `The expense was not paid in cash.`],
  [12, `Buying land with a mortgage is shown as an investing outflow.`, false, `No cash moved; it goes in the noncash schedule.`],
  [12, `Most companies use the indirect method.`, true, `It is easier and cheaper to prepare.`]
);

CLOZE.push(
  [12, `Under the indirect method, ___ (such as depreciation) are added back to net income.`, [`noncash expenses`, `noncash expense`, `depreciation`]],
  [12, `Cash paid for dividends is a ___ activity.`, [`financing`]],
  [12, `The method that lists actual cash receipts and payments is the ___ method.`, [`direct`]],
  [12, `Under the indirect method, gains are ___ from net income.`, [`subtracted`, `deducted`]]
);

MATCH.push(
  [12, `Rule 1`, `Current assets: add decreases, subtract increases`],
  [12, `Rule 2`, `Current liabilities: add increases, subtract decreases`],
  [12, `Rule 3`, `Add noncash expenses`],
  [12, `Rule 4`, `Add losses, subtract gains`],
  [12, `Direct method`, `Lists actual receipts and payments`],
  [12, `Noncash schedule`, `Land bought with a mortgage`]
);

SORTS.push(
  { u: [12], title: `Indirect method: add to or subtract from net income?`, b: [`Add`, `Subtract`], items: [[`Decrease in accounts receivable`, 0], [`Increase in inventory`, 1], [`Increase in accounts payable`, 0], [`Decrease in salaries payable`, 1], [`Depreciation expense`, 0], [`Gain on sale of equipment`, 1], [`Loss on sale of land`, 0], [`Increase in prepaid insurance`, 1], [`Decrease in unearned revenue`, 1], [`Increase in interest payable`, 0]] }
);

LISTS.push(
  { u: [12], title: `Four rules of the indirect method`, items: [[`Current assets: add decreases, subtract increases`, [`current asset`]], [`Current liabilities: add increases, subtract decreases`, [`liabilit`]], [`Add noncash expenses (depreciation)`, [`noncash`, `depreciation`]], [`Add losses, subtract gains`, [`loss`, `gain`]]] },
  { u: [12], title: `Financing outflows`, items: [[`Repaying debt (not interest)`, [`repay`, `debt`, `bond`, `loan`]], [`Buying treasury stock`, [`treasury`]], [`Paying dividends`, [`dividend`]]] }
);

HOOKS.push(
  { u: 12, t: `Indirect method, current items`, h: `Assets: opposite. Liabilities: same.`, w: `A current **asset** change moves cash the **opposite** way (A/R up, subtract). A current **liability** change moves cash the **same** way (payable up, add).` },
  { u: 12, t: `Interest and dividends`, h: `Interest in or out, and dividends in: Operating. Dividends out: Financing.`, w: `The only one of the four that is not operating is **dividends paid**.` }
);

/* ======================================================================
   CHAPTER 13: The Double-Entry Accounting System
   ====================================================================== */
LESSONS[13] = { intro: 'Everything so far used the statements model. Real accounting systems record the same events with debits and credits in a journal, then post them to a ledger. This is LG4 (double-entry entries and posting).', items: [
  { h: 'Debits and credits', t: [
    '**Debit** means the left side of an account; **credit** means the right side. They are not "good" or "bad."',
    'In every transaction, **total debits = total credits**.',
    '- **Assets**: debit increases, credit decreases.',
    '- **Liabilities and stockholders\' equity**: credit increases, debit decreases.',
    'Equity has sub-accounts that follow from that:',
    '- **Revenue** increases equity, so it increases with a **credit**.',
    '- **Expenses** and **dividends** decrease equity, so they increase with a **debit**.'],
    tbl: { head: ['Account type', 'Increase', 'Decrease', 'Normal balance'], rows: [['Assets', 'Debit', 'Credit', 'Debit'], ['Liabilities', 'Credit', 'Debit', 'Credit'], ['Common stock, retained earnings', 'Credit', 'Debit', 'Credit'], ['Revenue', 'Credit', 'Debit', 'Credit'], ['Expenses', 'Debit', 'Credit', 'Debit'], ['Dividends', 'Debit', 'Credit', 'Debit'], ['Contra accounts (Accumulated depreciation, Allowance, Treasury stock)', 'Opposite of the account they offset', '', 'Opposite']] },
    chk: ['What is the normal balance of Accounts Payable?', 'Credit.'] },

  { h: 'Journal entries: Collins Brokerage Services', t: [
    'Accountants first record source documents in a **journal** (general or special). A general journal entry lists the debit first, then the indented credit. Collins\'s events:'],
    tbl: { head: ['Event', 'Debit', 'Credit', 'Amount'], rows: [['1. Issued stock for cash', 'Cash', 'Common Stock', '$25,000'], ['2. Bought supplies on account', 'Supplies', 'Accounts Payable', '850'], ['3. Collected advance for a year of services (from Mar 1)', 'Cash', 'Unearned Service Revenue', '1,800'], ['4. Provided services on account', 'Accounts Receivable', 'Service Revenue', '15,760'], ['5. Bought land for cash', 'Land', 'Cash', '26,000'], ['6. Paid for a one-year insurance policy (from Aug 1)', 'Prepaid Insurance', 'Cash', '1,200'], ['7. Collected receivables', 'Cash', 'Accounts Receivable', '13,400'], ['8. Paid salaries', 'Salaries Expense', 'Cash', '9,500'], ['9. Paid a cash dividend', 'Dividends', 'Cash', '800'], ['10. Paid accounts payable', 'Accounts Payable', 'Cash', '850'], ['11. Other operating expenses on account', 'Other Operating Expenses', 'Accounts Payable', '1,900']] },
    chk: ['Event 4 in the statements model is an asset source. Which accounts are debited and credited?', 'Debit Accounts Receivable (asset up), credit Service Revenue (equity up).'] },

  { h: 'Adjusting entries in debit/credit form', t: [
    'The same year-end adjustments from Chapters 2 and 3:'],
    tbl: { head: ['Adjustment', 'Debit', 'Credit', 'Amount'], rows: [['1. Earned part of the unearned revenue', 'Unearned Service Revenue', 'Service Revenue', '$1,500'], ['2. Accrued salaries', 'Salaries Expense', 'Salaries Payable', '800'], ['3. Used part of the prepaid insurance', 'Insurance Expense', 'Prepaid Insurance', '500'], ['4. Supplies used ($850 - $125 on hand)', 'Supplies Expense', 'Supplies', '725']] },
    exam: 'Every adjusting entry has one balance sheet account and one income statement account, and (almost) never Cash.',
    chk: ['Supplies on hand $125 after buying $850. Adjusting entry?', 'Debit Supplies Expense $725, credit Supplies $725.'] },

  { h: 'Posting to the general ledger', t: [
    'Entries are **posted** from the journal to the **general ledger**, a collection of **T-accounts**: debits on the left, credits on the right. Each account\'s balance = total debits - total credits (or the reverse for credit-balance accounts).',
    'Collins\'s Cash T-account: beginning $5,000 + debits (25,000 + 1,800 + 13,400) - credits (26,000 + 1,200 + 9,500 + 800 + 850) = **$6,850**.',
    'Accounts Receivable: $15,760 debit - $13,400 credit = **$2,360**. Prepaid insurance: $1,200 - $500 = **$700**. Supplies: $850 - $725 = **$125**. Unearned service revenue: $1,800 - $1,500 = **$300**.',
    'Because each entry\'s debits equal its credits, the ledger as a whole stays in balance: the accounting equation holds.'],
    chk: ['Accounts Payable had credits of $850 and $1,900 and a debit of $850. Balance?', '$1,900 credit.'] }
]};

CARDS.push(
  [13, 'Debit / credit', 'Left side / right side of an account.'],
  [13, 'Debits = credits', 'True for every transaction, which keeps the equation in balance.'],
  [13, 'Assets increase with a...', 'Debit.'],
  [13, 'Liabilities and equity increase with a...', 'Credit.'],
  [13, 'Revenue increases with a...', 'Credit (it increases equity).'],
  [13, 'Expenses increase with a...', 'Debit (they decrease equity).'],
  [13, 'Dividends increase with a...', 'Debit (they decrease equity).'],
  [13, 'Normal balance', 'The side that increases the account: assets, expenses, dividends = debit; liabilities, equity, revenue = credit.'],
  [13, 'Journal', 'Where transactions are first recorded, from source documents.'],
  [13, 'General ledger', 'All the accounts (T-accounts) with their balances.'],
  [13, 'Posting', 'Copying journal entries into the ledger accounts.'],
  [13, 'Entry: provide services on account', 'Debit Accounts Receivable, credit Service Revenue.'],
  [13, 'Entry: collect cash in advance', 'Debit Cash, credit Unearned Revenue.'],
  [13, 'Entry: accrue salaries', 'Debit Salaries Expense, credit Salaries Payable.'],
  [13, 'Entry: pay a dividend', 'Debit Dividends, credit Cash.']
);

QS.push(
  [13, 'Which account is increased by a debit?', ['Supplies', 'Accounts Payable', 'Common Stock', 'Service Revenue'], 'Assets increase with debits.'],
  [13, 'Which account normally has a credit balance?', ['Unearned Revenue', 'Prepaid Insurance', 'Dividends', 'Salaries Expense'], 'It is a liability.'],
  [13, 'Provided $15,760 of services on account. The entry is:', ['Debit Accounts Receivable, credit Service Revenue', 'Debit Service Revenue, credit Accounts Receivable', 'Debit Cash, credit Service Revenue', 'Debit Accounts Receivable, credit Unearned Revenue'], 'Asset up (debit), revenue up (credit).'],
  [13, 'Paid $9,500 of salaries. The entry is:', ['Debit Salaries Expense, credit Cash', 'Debit Cash, credit Salaries Expense', 'Debit Salaries Payable, credit Cash', 'Debit Salaries Expense, credit Salaries Payable'], 'Expense up (debit), cash down (credit).'],
  [13, 'Collected $1,800 in advance for future services. The entry is:', ['Debit Cash, credit Unearned Service Revenue', 'Debit Cash, credit Service Revenue', 'Debit Unearned Service Revenue, credit Cash', 'Debit Accounts Receivable, credit Unearned Service Revenue'], 'No revenue yet: a liability.'],
  [13, 'Adjusting entry for $500 of prepaid insurance used:', ['Debit Insurance Expense, credit Prepaid Insurance', 'Debit Prepaid Insurance, credit Insurance Expense', 'Debit Insurance Expense, credit Cash', 'Debit Cash, credit Prepaid Insurance'], 'Expense up, asset down.'],
  [13, 'Paying a cash dividend is recorded as:', ['Debit Dividends, credit Cash', 'Debit Cash, credit Dividends', 'Debit Dividend Expense, credit Cash', 'Debit Retained Earnings, credit Dividends Payable'], 'Dividends increase with a debit.'],
  [13, 'Cash: beginning $5,000; debits $40,200; credits $38,350. Ending balance:', ['$6,850', '$3,150', '$83,550', '$1,850'], '$5,000 + $40,200 - $38,350.'],
  [13, 'Copying journal entries to the ledger accounts is called:', ['posting', 'journalizing', 'closing', 'adjusting'], 'The journal comes first, then posting.'],
  [13, 'A credit to Accumulated Depreciation:', ['increases it (and lowers book value)', 'decreases it', 'increases the asset\'s cost', 'increases cash'], 'Contra assets increase with credits.']
);

TF.push(
  [13, `Debit means increase.`, false, `Debit means left side. It increases assets, expenses, and dividends but decreases liabilities, equity, and revenue.`],
  [13, `In every journal entry, total debits equal total credits.`, true, `That is double-entry accounting.`],
  [13, `Revenue accounts normally have debit balances.`, false, `Revenue increases equity, so it has a credit balance.`],
  [13, `Dividends increase with a debit.`, true, `They reduce equity.`],
  [13, `Transactions are posted to the ledger before they are journalized.`, false, `Journal first, then post to the ledger.`]
);

CLOZE.push(
  [13, `Assets, expenses, and dividends are increased by a ___.`, [`debit`]],
  [13, `Liabilities, equity, and revenue are increased by a ___.`, [`credit`]],
  [13, `Transferring journal entries into ledger accounts is called ___.`, [`posting`]],
  [13, `The side of an account that increases it is its ___ balance.`, [`normal`]]
);

MATCH.push(
  [13, `Debit`, `Left side`],
  [13, `Credit`, `Right side`],
  [13, `Journal`, `First record of a transaction`],
  [13, `Ledger`, `Collection of all accounts`],
  [13, `Posting`, `Journal to ledger`],
  [13, `Normal balance`, `The side that increases the account`]
);

SORTS.push(
  { u: [13], title: `Increased by a debit or a credit?`, b: [`Debit`, `Credit`], items: [[`Cash`, 0], [`Accounts Payable`, 1], [`Common Stock`, 1], [`Service Revenue`, 1], [`Salaries Expense`, 0], [`Dividends`, 0], [`Unearned Revenue`, 1], [`Prepaid Insurance`, 0], [`Accumulated Depreciation`, 1], [`Land`, 0], [`Retained Earnings`, 1], [`Treasury Stock`, 0]] }
);

LISTS.push(
  { u: [13], title: `Accounts with a normal DEBIT balance`, items: [[`Assets`, [`asset`]], [`Expenses`, [`expense`]], [`Dividends`, [`dividend`]]] },
  { u: [13], title: `Accounts with a normal CREDIT balance`, items: [[`Liabilities`, [`liabil`]], [`Stockholders' equity (common stock, retained earnings)`, [`equity`, `stock`, `retained`]], [`Revenue`, [`revenue`]]] }
);

HOOKS.push(
  { u: 13, t: `Debits and credits`, h: `DEAD CLIC`, w: `**D**ebits increase **E**xpenses, **A**ssets, **D**ividends. **C**redits increase **L**iabilities, **I**ncome (revenue), **C**apital (equity).` }
);

EVENTS.push(
  { u: 13, t: `Purchased $850 of supplies on account.`, m: `I I NA NA NA NA NA`, act: `NA`, type: `AS`, je: [[`Supplies`, 850], [`Accounts Payable`, -850]], w: `Asset and liability both rise. No cash.` },
  { u: 13, t: `Paid $1,200 cash for a one-year insurance policy.`, m: `NA NA NA NA NA NA D`, act: `OA`, type: `AE`, je: [[`Prepaid Insurance`, 1200], [`Cash`, -1200]], w: `One asset for another. Insurance is an operating cost.` },
  { u: 13, t: `Recognized $500 of insurance expense for coverage used.`, m: `D NA D NA I D NA`, act: `NA`, type: `AU`, je: [[`Insurance Expense`, 500], [`Prepaid Insurance`, -500]], w: `The prepaid asset is used up.` },
  { u: 13, t: `Recognized $1,900 of other operating expenses on account.`, m: `NA I D NA I D NA`, act: `NA`, type: `CE`, je: [[`Other Operating Expenses`, 1900], [`Accounts Payable`, -1900]], w: `Claims exchange.` }
);

/* ======================================================================
   CHAPTER 14: Financial Statement Analysis
   ====================================================================== */
const MILAVEC_IS = { head: ['Milavec income statement', 'Year 4', 'Year 3'], rows: [['Sales', '$900,000', '$800,000'], ['Cost of goods sold (beg. inv. 43,000/40,000 + purchases - end. inv. 70,000/43,000)', '(610,000)', '(480,000)'], ['Gross margin', '290,000', '320,000'], ['Operating expenses', '(248,000)', '(280,000)'], ['Income before taxes', '42,000', '40,000'], ['Income taxes', '(17,000)', '(18,000)'], ['Net income', '$25,000', '$22,000'], ['Dividends', '0', '15,000'], ['Retained earnings, ending', '$162,000', '$137,000']] };
const MILAVEC_BS = { head: ['Milavec balance sheet', 'Year 4', 'Year 3'], rows: [['Cash', '$20,000', '$17,000'], ['Marketable securities', '20,000', '22,000'], ['Notes receivable', '4,000', '3,000'], ['Accounts receivable', '50,000', '56,000'], ['Merchandise inventory', '70,000', '43,000'], ['Prepaid expenses', '4,000', '4,000'], ['Property, plant, and equipment (net)', '340,000', '310,000'], ['Total assets', '$508,000', '$455,000'], ['Accounts payable', '40,000', '38,000'], ['Salaries payable', '2,000', '3,000'], ['Taxes payable', '4,000', '2,000'], ['Bonds payable, 8%', '100,000', '100,000'], ['Preferred stock, 6%, $100 par, cumulative', '50,000', '50,000'], ['Common stock, $10 par', '150,000', '125,000'], ['Retained earnings', '162,000', '137,000'], ['Total liabilities and equity', '$508,000', '$455,000']] };

LESSONS[14] = { intro: 'Financial statement analysis turns the statements into decisions. Three tools: horizontal analysis, vertical analysis, and ratios. Every ratio here is worked on Milavec Company. This chapter is the toolkit for Project 3 (ratio analysis of Meta, Alphabet, or Apple).', items: [
  { h: 'Purpose and the Milavec statements', t: [
    'The primary objective of accounting is information useful for decisions. Analysts consider the **users**, the **types of decisions**, and the **information analysis** needed.',
    'Three methods: **horizontal analysis**, **vertical analysis**, and **ratio analysis**.',
    '[[tbl]]'],
    tbl: MILAVEC_IS,
    ex: 'Keep these numbers handy: every ratio below uses them. Year 3 beginning balances (from Year 2): receivables $55,000, inventory $40,000, total assets $420,000, stockholders\' equity $268,000.',
    chk: ['Milavec\'s net income grew from $22,000 to $25,000. Percent change?', '$3,000 / $22,000 = 13.6%.'] },

  { h: 'The Milavec balance sheet', t: [
    'Current assets (Year 4): cash, marketable securities, notes and accounts receivable, inventory, and prepaid expenses = **$168,000**. Current liabilities: accounts, salaries, and taxes payable = **$46,000**. The bonds are the only long-term liability.',
    '[[tbl]]'],
    tbl: MILAVEC_BS,
    chk: ['Milavec\'s total liabilities in Year 4?', '$40,000 + $2,000 + $4,000 + $100,000 = $146,000.'] },

  { h: 'Horizontal and vertical analysis', t: [
    '**Horizontal (trend) analysis** compares each item across periods, in dollars and percent. Percent change = (Current - Prior) / Prior.',
    '- Sales: ($900,000 - $800,000) / $800,000 = **+12.5%**.',
    '- Cost of goods sold: +27.1%. Gross margin: **-9.4%**. Operating expenses: -11.4%. Net income: **+13.6%**.',
    'So sales grew, but cost of goods sold grew much faster; cutting operating expenses is what raised net income.',
    '**Vertical analysis** (common-size statements) shows each item as a percent of a base: **net sales** on the income statement, **total assets** on the balance sheet.'],
    tbl: { head: ['Vertical analysis (% of sales)', 'Year 4', 'Year 3'], rows: [['Sales', '100%', '100%'], ['Cost of goods sold', '67.8%', '60.0%'], ['Gross margin', '32.2%', '40.0%'], ['Operating expenses', '27.6%', '35.0%'], ['Net income', '2.8%', '2.75%']] },
    ex: 'Balance sheet, Year 4, as % of total assets: inventory 13.8%, property, plant, and equipment 66.9%, total liabilities 28.7%, stockholders\' equity 71.3%.',
    chk: ['Item rose from $40,000 to $50,000. Horizontal percent change?', '+25%.'] },

  { h: 'Liquidity ratios', t: [
    'Liquidity ratios measure the ability to pay **short-term** debts. Milavec Year 4 (Year 3):',
    '[[tbl]]',
    'A declining current ratio can signal trouble, or it can come from eliminating obsolete inventory. Compare: Laroque has the same $122,000 of working capital as Milavec, but a current ratio of only 1.32 : 1, so Milavec is much more liquid.'],
    tbl: { head: ['Ratio', 'Formula', 'Year 4', 'Year 3'], rows: [['Working capital', 'Current assets - Current liabilities', '$168,000 - $46,000 = $122,000', '$102,000'], ['Current ratio', 'Current assets / Current liabilities', '3.65 : 1', '3.37 : 1'], ['Quick (acid-test) ratio', '(Cash + Marketable securities + Receivables) / Current liabilities', '$94,000 / $46,000 = 2.04 : 1', '2.28 : 1'], ['Accounts receivable turnover', 'Net credit sales / Average receivables', '$900,000 / $53,000 = 16.98', '14.41'], ['Average days to collect', '365 / A/R turnover', '21 days', '25 days'], ['Inventory turnover', 'Cost of goods sold / Average inventory', '$610,000 / $56,500 = 10.80', '11.57'], ['Average days to sell inventory', '365 / Inventory turnover', '34 days', '32 days']] },
    exam: '**Average** balance = (Beginning + Ending) / 2. Quick assets leave out **inventory** and **prepaid expenses**.',
    chk: ['Why does the quick ratio leave out inventory?', 'It measures paying debts without having to sell inventory.'] },

  { h: 'Solvency ratios', t: [
    'Solvency ratios measure the ability to repay **long-term** debt.'],
    tbl: { head: ['Ratio', 'Formula', 'Year 4', 'Year 3'], rows: [['Debt to assets', 'Total liabilities / Total assets', '$146,000 / $508,000 = 29%', '31%'], ['Debt to equity', 'Total liabilities / Total stockholders\' equity', '$146,000 / $362,000 = 0.40 : 1', '0.46 : 1'], ['Times interest earned', 'Earnings before interest and taxes / Interest expense', '$50,000 / $8,000 = 6.25 times', '6 times'], ['Plant assets to long-term liabilities', 'Net plant assets / Long-term liabilities', '$340,000 / $100,000 = 3.4 : 1', '3.1 : 1']] },
    ex: 'Stockholders like debt when the company can use **positive financial leverage**. Creditors prefer less debt and more equity, a buffer of protection. Interest expense here is $100,000 of bonds x 8% = $8,000.',
    chk: ['Total liabilities $200,000; equity $400,000. Debt to equity?', '0.5 : 1.'] },

  { h: 'Profitability ratios', t: [
    '[[tbl]]',
    'Return on investment uses **net income / average total assets**, so it is the same idea as Chapter 3\'s return on assets, but with averages.'],
    tbl: { head: ['Ratio', 'Formula', 'Year 4', 'Year 3'], rows: [['Net margin', 'Net income / Net sales', '$25,000 / $900,000 = 2.78%', '2.75%'], ['Asset turnover', 'Net sales / Average total assets', '$900,000 / $481,500 = 1.87', '1.83'], ['Return on investment (ROI)', 'Net income / Average total assets', '$25,000 / $481,500 = 5.19%', '5.03%'], ['Return on equity (ROE)', 'Net income / Average stockholders\' equity', '$25,000 / $337,000 = 7.4%', '7.6%']] },
    chk: ['Net income $30,000; average total assets $600,000. ROI?', '5%.'] },

  { h: 'Stock market ratios', t: [
    '- **Earnings per share = (Net income - Preferred dividends) / Average outstanding common shares.** Milavec: ($25,000 - $3,000) / ((15,000 + 12,500) / 2) = **$1.60**. (Preferred dividend = 6% x $50,000.)',
    '- **Book value per share = (Stockholders\' equity - Preferred rights) / Outstanding common shares.** ($362,000 - $50,000) / 15,000 = **$20.80**.',
    '- **Price-earnings ratio = Market price per share / Earnings per share.** If Milavec sold at $20 (an example; the slides give no price), P/E = $20 / $1.60 = 12.5.',
    '- **Dividend yield = Annual dividends per share / Market price per share.** The cash return on today\'s price.'],
    chk: ['Net income $50,000; preferred dividends $5,000; average common shares 9,000. EPS?', '$5.00.'] },

  { h: 'Limitations and Project 3', t: [
    'The slide deck names the topic without a list. Common limitations taught with it:',
    '- Companies use **different accounting methods** (FIFO vs LIFO, straight-line vs DDB), which makes comparisons harder.',
    '- Many numbers are **estimates** (bad debts, useful lives, warranties).',
    '- Statements use **historical cost**, so inflation can distort comparisons over time.',
    '- **Industries differ**: a "good" current ratio for a utility would be alarming for a clothing store.',
    '- Ratios ignore **nonfinancial** information (management quality, product pipeline, economy).',
    '**Project 3** (Ratio Analysis, Technology Edition): your group analyzes **Meta, Alphabet, or Apple**, with Microsoft as the in-class example. Use the formulas exactly as they are here, compute at least two years so you can talk about trends, and explain what each ratio says rather than just reporting it. The **Ratio Lab** tab lets you practice.'],
    chk: ['Two companies have the same ROI, but one uses LIFO and the other FIFO during rising prices. Why be careful?', 'Their cost of goods sold, net income, and inventory differ because of the methods, not the performance.'] }
]};

CARDS.push(
  [14, 'Three methods of analysis', 'Horizontal, vertical, and ratio analysis.'],
  [14, 'Horizontal analysis', 'Compares an item across periods: (Current - Prior) / Prior.'],
  [14, 'Vertical analysis', 'Each item as a % of a base: net sales (income statement) or total assets (balance sheet).'],
  [14, 'Working capital', 'Current assets - Current liabilities.'],
  [14, 'Current ratio', 'Current assets / Current liabilities.'],
  [14, 'Quick (acid-test) ratio', '(Cash + Marketable securities + Receivables) / Current liabilities.'],
  [14, 'Accounts receivable turnover', 'Net credit sales / Average accounts receivable.'],
  [14, 'Average days to collect', '365 / A/R turnover.'],
  [14, 'Inventory turnover', 'Cost of goods sold / Average inventory.'],
  [14, 'Average days to sell inventory', '365 / Inventory turnover.'],
  [14, 'Debt to assets', 'Total liabilities / Total assets.'],
  [14, 'Debt to equity', 'Total liabilities / Total stockholders\' equity.'],
  [14, 'Times interest earned', 'Earnings before interest and taxes / Interest expense.'],
  [14, 'Plant assets to long-term liabilities', 'Net plant assets / Long-term liabilities.'],
  [14, 'Net margin', 'Net income / Net sales.'],
  [14, 'Asset turnover', 'Net sales / Average total assets.'],
  [14, 'Return on investment', 'Net income / Average total assets.'],
  [14, 'Return on equity', 'Net income / Average stockholders\' equity.'],
  [14, 'Earnings per share', '(Net income - Preferred dividends) / Average outstanding common shares.'],
  [14, 'Book value per share', '(Stockholders\' equity - Preferred rights) / Outstanding common shares.'],
  [14, 'Price-earnings ratio', 'Market price per share / Earnings per share.'],
  [14, 'Dividend yield', 'Annual dividends per share / Market price per share.'],
  [14, 'Average balance', '(Beginning balance + Ending balance) / 2.']
);

QS.push(
  [14, 'Sales grew from $800,000 to $900,000. Horizontal analysis shows:', ['+12.5%', '+11.1%', '+100%', '+88.9%'], '$100,000 / $800,000.'],
  [14, 'In vertical analysis of an income statement, each item is shown as a percent of:', ['net sales', 'net income', 'total assets', 'the prior year'], 'Total assets is the base for the balance sheet.'],
  [14, 'Current assets $168,000; current liabilities $46,000. Current ratio:', ['3.65 : 1', '0.27 : 1', '2.04 : 1', '$122,000'], '$168,000 / $46,000. Working capital is $122,000.'],
  [14, 'Cash $20,000, marketable securities $20,000, notes receivable $4,000, accounts receivable $50,000, inventory $70,000; current liabilities $46,000. Quick ratio:', ['2.04 : 1', '3.65 : 1', '1.09 : 1', '3.57 : 1'], 'Quick assets $94,000 / $46,000.'],
  [14, 'Sales $900,000; receivables beginning $56,000, ending $50,000. Accounts receivable turnover:', ['16.98', '18.00', '16.07', '9.43'], 'Average $53,000.'],
  [14, 'COGS $610,000; inventory beginning $43,000, ending $70,000. Average days to sell inventory:', ['about 34 days', 'about 26 days', 'about 42 days', 'about 11 days'], 'Turnover 10.80; 365 / 10.80.'],
  [14, 'Total liabilities $146,000; total equity $362,000. Debt to equity:', ['0.40 : 1', '0.29 : 1', '2.48 : 1', '0.71 : 1'], '$146,000 / $362,000.'],
  [14, 'Income before taxes $42,000; interest expense $8,000. Times interest earned:', ['6.25 times', '5.25 times', '4.25 times', '3.1 times'], '($42,000 + $8,000) / $8,000.'],
  [14, 'Net income $25,000; average total assets $481,500. Return on investment:', ['5.19%', '2.78%', '7.4%', '1.87%'], '$25,000 / $481,500.'],
  [14, 'Net income $25,000; preferred dividends $3,000; average common shares 13,750. EPS:', ['$1.60', '$1.82', '$1.47', '$2.00'], '$22,000 / 13,750.'],
  [14, 'Equity $362,000; preferred stock $50,000; 15,000 common shares. Book value per share:', ['$20.80', '$24.13', '$3.33', '$10.00'], '$312,000 / 15,000.'],
  [14, 'Which is a solvency ratio?', ['Debt to assets', 'Current ratio', 'Inventory turnover', 'Net margin'], 'Solvency is about long-term debt.'],
  [14, 'Which is a profitability ratio?', ['Return on equity', 'Quick ratio', 'Times interest earned', 'Days to collect'], 'ROE measures return to owners.'],
  [14, 'Stock price $36; EPS $1.80. Price-earnings ratio:', ['20', '64.8', '0.05', '18'], '$36 / $1.80.']
);

TF.push(
  [14, `Vertical analysis of a balance sheet uses total assets as the base.`, true, `Each item is a percent of total assets.`],
  [14, `The quick ratio includes inventory.`, false, `Quick assets are cash, marketable securities, and receivables.`],
  [14, `A higher accounts receivable turnover means faster collection.`, true, `Fewer days to collect.`],
  [14, `EPS subtracts preferred dividends from net income.`, true, `EPS belongs to common stockholders.`],
  [14, `Creditors generally prefer a higher debt to equity ratio.`, false, `Creditors prefer more equity as a buffer.`],
  [14, `Different accounting methods can make companies harder to compare.`, true, `FIFO vs LIFO, straight-line vs DDB, and so on.`]
);

CLOZE.push(
  [14, `Analysis that compares items across several years is ___ analysis.`, [`horizontal`, `trend`]],
  [14, `Current assets minus current liabilities is working ___.`, [`capital`]],
  [14, `The acid-test ratio is also called the ___ ratio.`, [`quick`]],
  [14, `Net income / Net sales is net ___.`, [`margin`]],
  [14, `Annual dividends per share / Market price per share is dividend ___.`, [`yield`]]
);

MATCH.push(
  [14, `Working capital`, `Current assets minus current liabilities`],
  [14, `Quick ratio`, `Liquid assets / current liabilities`],
  [14, `Debt to equity`, `Liabilities / equity`],
  [14, `Asset turnover`, `Sales / average total assets`],
  [14, `Book value per share`, `Common equity / common shares`],
  [14, `Dividend yield`, `Dividends per share / price`]
);

SORTS.push(
  { u: [14], title: `What kind of ratio?`, b: [`Liquidity`, `Solvency`, `Profitability`, `Stock market`], items: [[`Current ratio`, 0], [`Quick ratio`, 0], [`Inventory turnover`, 0], [`Accounts receivable turnover`, 0], [`Debt to assets`, 1], [`Times interest earned`, 1], [`Plant assets to long-term liabilities`, 1], [`Net margin`, 2], [`Return on investment`, 2], [`Asset turnover`, 2], [`Earnings per share`, 3], [`Price-earnings ratio`, 3], [`Dividend yield`, 3], [`Book value per share`, 3]] }
);

LISTS.push(
  { u: [14], title: `Three methods of financial statement analysis`, items: [[`Horizontal analysis`, [`horizontal`, `trend`]], [`Vertical analysis`, [`vertical`, `common`]], [`Ratio analysis`, [`ratio`]]] },
  { u: [14], title: `Liquidity ratios`, items: [[`Working capital`, [`working`]], [`Current ratio`, [`current`]], [`Quick ratio`, [`quick`, `acid`]], [`Accounts receivable ratios`, [`receivable`]], [`Inventory ratios`, [`inventory`]]] },
  { u: [14], title: `Stock market ratios`, items: [[`Earnings per share`, [`earnings per share`, `eps`]], [`Book value per share`, [`book value`]], [`Price-earnings ratio`, [`price`, `p/e`]], [`Dividend yield`, [`yield`, `dividend`]]] }
);

HOOKS.push(
  { u: 14, t: `Four ratio families`, h: `Can it pay bills? Can it survive? Is it making money? What's the stock worth?`, w: `**Liquidity** (short-term bills), **solvency** (long-term debt), **profitability** (earning money), **stock market** (value per share).` },
  { u: 14, t: `Turnover ratios`, h: `Turnover = flow / average stock; days = 365 / turnover.`, w: `A/R turnover = sales / average receivables. Inventory turnover = COGS / average inventory. Divide 365 by either to get days.` }
);

/* ======================================================================
   Course settings
   ====================================================================== */
window.COURSE = {
  id: 'acctg230',
  title: 'Intro to Financial Accounting',
  unitLabel: 'Chapter',
  units: UNITS,
  cards: CARDS,
  questions: QS,
  lessons: LESSONS,
  tf: TF,
  cloze: CLOZE,
  match: MATCH,
  sorts: SORTS,
  lists: LISTS,
  hooks: HOOKS,
  events: EVENTS,

  groups: [
    { label: 'Exam 1 · Ch 1–4', units: [1, 2, 3, 4] },
    { label: 'Exam 2 · Ch 5–8', units: [5, 6, 7, 8] },
    { label: 'Exam 3 · Ch 9–14', units: [9, 10, 11, 12, 13, 14] }
  ],

  countdown: { dates: [
    { date: '2026-10-23', label: 'Exam 2 opens' },
    { date: '2026-11-01', label: 'Exam 2 closes' },
    { date: '2026-12-14', label: 'Exam 3 opens' },
    { date: '2026-12-18', label: 'Exam 3 closes' }
  ] },

  planTitle: 'Your exam roadmap',
  plan: [
    [-1, 'Exam 1 · Ch 1–4 (closed Oct 4)', 'The foundation for everything after it. If any Statements Lab event from Ch 1–4 trips you up, redo those first.'],
    [-1, 'Exam 2 · Ch 5–8 · Oct 23 – Nov 1', 'Inventory methods, bank reconciliation, receivables, depreciation. Do the Statements Lab for Ch 5–8, then a mixed quiz with the Exam 2 pick.'],
    [-1, 'Exam 3 · Ch 9–14 · Dec 14 – 18', 'Payroll, bonds, equity, cash flows, debits and credits, ratios. Use the Ratio Lab for Project 3 (due Dec 11).']
  ],

  tips: [
    '<b>Live in the Statements Lab.</b> Your exams ask how events affect assets, liabilities, equity, revenue, expenses, net income, and cash flow. Get every Statements Lab event right twice in a row before moving on.',
    '<b>Say the transaction type first.</b> Asset source, asset use, asset exchange, or claims exchange. The type tells you which columns move.',
    '<b>Do the math by hand.</b> Exams allow only a four-function calculator. Practice interest (P x R x T), depreciation, and ratios that way.',
    '<b>Mix chapters.</b> Use the Exam pick buttons in Quiz and Practice. The real exam does not tell you which chapter a question is from.',
    '<b>Use the exam\'s retries.</b> You can take each exam section more than once and your best score counts. Review what you missed between attempts.',
    '<b>Check the syllabus.</b> It says Exam 3 covers Ch 9–12 and that Ch 13–14 support Project 3. Both are here either way.'
  ]
};
})();
