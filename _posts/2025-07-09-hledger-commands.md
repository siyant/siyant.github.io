---
layout: post
title: "Guide: Essential hledger commands to make sense of your finances"
---

A beginner's guide to four essential `hledger` commands (`print`, `balance`, `balancesheet` and `incomestatement`) for analysing your accounting or personal finance data.

Since last year, I have been using [hledger](https://hledger.org/) for tracking my personal finances (having been ~~forced~~ persuaded by my husband to give it a try). I diligently recorded all my transactions, knowing that all my financial data was captured perfectly in plain text. But I didn't know how to query that data to answer basic questions about my finances. How much have I been spending every month? What's my net worth now? The data was all there, but I didn't know how to extract it.

That changed when I recently spent some time building [a desktop app](https://github.com/vivekkalyan/hledger-app) for hledger. I dived deep into the reports and options, and found four commands that answer 90% of my financial questions. This guide will show you how to use them to make sense of your finances.

**Prerequisites**: This guide assumes you already have hledger installed and some transactions recorded in your journal file. We'll focus purely on querying and analyzing your data.

## print

First up is the `print` command, a search engine for your transactions. It finds and displays transactions based on your criteria, which can include account names, descriptions, dates and more. Use this to answer transaction-specific questions like "How much was my shopping at H&M and Uniqlo last month?" or "What gifts have I purchased for people this year?"

**Queries**

Most of the time, you will want to run `print` with a query, like `hledger print <query>`.

By default, the query matches account names. Let's find all my food expenses:
```
$ hledger print expenses:food
2025-01-03 Supermarket - Cold Storage
    liabilities:creditcard:dbs         $-95.40
    expenses:food:groceries             $95.40

2025-01-06 Lunch - Ya Kun Kaya Toast
    liabilities:creditcard:dbs          $-8.90
    expenses:food:eatingout              $8.90
```

You can also search transactions by their description. Just add `desc:` at the start of the query:
```
$ hledger print desc:'cold storage'
2025-01-03 Supermarket - Cold Storage
    liabilities:creditcard:dbs         $-95.40
    expenses:food:groceries             $95.40

2025-02-04 CNY Groceries - Cold Storage
    liabilities:creditcard:dbs        $-120.50
    expenses:food:groceries            $120.50
```

Other than accounts and descriptions, you can also filter by:
- Date - `date:20250101` for a specific date, `date:202502`  for a month. You can do periods using a hyphen like `date:20250401-20250601`, specify a start date only `date:20250401-` or end date only `date:-20250401`
- Amount - `amt:100` for a specific amount, `amt:'>100'`, `amt:'<=10'` for greater or less than filters
- Currency - `cur:USD`, `cur:\\$`

You can also combine multiple queries for powerful, focused searches. Try `hledger print desc:'h&m' desc:uniqlo date:202505` to find all H&M or Uniqlo purchases in May 2025. Or `hledger print expenses:gift amt:'>=100' date:2025` to find expensive gifts you purchased this year.

**A note about dates**

hledger is pretty smart about dates, but one thing that may be confusing is that **end dates are exclusive**.
- `date:20250401-20250501` means "on or after 1 Apr, and **before** 1 May"
- `date:20250401-20250430` means "on or after 1 Apr, and **before** 30 Apr"

The first one gives transactions for the whole month of Apr 2025, while the second one only includes transactions until 29 Apr.

When only a month is provided, eg. `date:202504`, hledger smartly interprets it as a period (the whole month of Apr 2025). But in `date:202504-202505`, the dates are interpreted as the 1st of each month, resulting in a query "on or after 1 Apr, and before 1 May". This will give you only Apr transactions.

So `print` lets you search and filter through your transactions. But what about the big picture?

## balance

`balance` is your financial calculator, summing up account totals. This is a very flexible command, useful for answering "how much?" questions, such as "How much did I spend in total last month?" or "How much is my current net worth?"

💡 **Key Insight**: Use `print` when you want to see individual transactions, `balance` when you want totals.

Run `balance` (`bal` for short) without any options, and you'll see a full list of all your account totals since day one of your journal. This can be a pretty long list!
```
$ hledger bal
          $41,319.40  assets:checking:dbs
         $102,600.00  assets:investments:stocks
          $82,800.00  assets:savings:dbs
        $-145,000.00  equity:openingbalances
             $113.80  expenses:education:books
           $2,531.90  expenses:entertainment:activities
             $216.83  expenses:entertainment:streaming
          $12,023.05  expenses:food:eatingout
           $4,652.33  expenses:food:groceries
             $300.00  expenses:health:dental
                 ...  (skipping many more sub-accounts under expenses)
         $-12,500.00  income:bonus
          $-2,006.20  income:dividends
        $-146,600.00  income:salary
          $-6,729.46  liabilities:creditcard:citibank
          $-8,630.74  liabilities:creditcard:dbs
--------------------
                   0
```

Let's see how we can narrow it down. First, we can use the same queries that we did with `print` (account, description, date etc) for filtering. For example, `hledger bal income` will show my income accounts only. To view my total expenses for last month, we would run `hledger bal expenses date:202505`.

**Depth**

Instead of seeing every single sub-account and getting information overload, maybe we just want to see our main expenses categories. Use `--depth 2` to limit the depth to 2 (`expenses` and one sub-account):
```
$ hledger bal expenses date:202505 --depth 2
             $189.00  expenses:education
             $125.00  expenses:entertainment
           $1,684.90  expenses:food
               $3.90  expenses:house
           $2,318.50  expenses:housing
             $280.00  expenses:personal
             $190.08  expenses:shopping
              $35.40  expenses:tech
              $35.88  expenses:transport
             $320.07  expenses:travel
--------------------
           $5,182.73
```

That food expense looks high. Do I usually spend that much on food, or is this an outlier? Let's dig deeper.

**Intervals and multi-period reports**

Let's investigate my monthly food expenses. I'll narrow down the account query to `expenses:food`, remove the `--depth 2`, and expand the date range. To compare each month's data, we can add `--monthly`:
```
$ hledger bal expenses:food date:2025-202506 --monthly
Balance changes in 2025-01-01..2025-05-31:

                         ||     Jan        Feb      Mar      Apr        May
=========================++=================================================
 expenses:food:eatingout || $461.10  $1,257.40  $468.80  $618.85  $1,418.10
 expenses:food:groceries || $239.40    $359.10  $283.00  $158.44    $266.80
-------------------------++-------------------------------------------------
                         || $700.50  $1,616.50  $751.80  $777.29  $1,684.90
```

This changes the balance report format to become a **multi-period report**- a table with accounts as rows and time periods as columns. Pretty cool stuff, useful for seeing trends over time. Here I see that my eating out expenses fluctuates a lot between months.

Other than `--monthly`, you can also call the balance command with `--daily`, `--weekly`, `--quarterly`, or `--yearly` to show data for different intervals. Personally, I usually stick to monthly and yearly views. For example, I'll use `hledger bal income --yearly` to see my total income for each year.

**Tip: use short-form options to save typing**

Note: hledger has short forms for many options to make cli commands concise and faster to type. Instead of `--depth 2`, you can just write `-2`. Instead of `--monthly` or the other interval options, you can  write `-D` (daily), `-W` (weekly), `-M` (monthly), `-Q` (quarterly), or `-Y` (yearly). I'll use these short forms from here on.

**Accumulation modes**

Ok, now we know how to query our expenses and income. What about assets and liabilities?

Here's what confused me at first, running `balance` with a monthly period on my assets:
```
$ hledger bal assets date:2025-202506 -M -1
Balance changes in 2025-01-01..2025-05-31:

        ||       Jan        Feb        Mar        Apr        May
========++=======================================================
 assets || $4,698.30  $3,102.90  $4,623.60  $5,020.10  $4,843.90
--------++-------------------------------------------------------
        || $4,698.30  $3,102.90  $4,623.60  $5,020.10  $4,843.90
```

Hmm... that doesn't seem right. My total assets should be much more than $4k! What is happening?

The header line in this command reveals the issue- this data is showing "Balance changes". This shows what **moved** in each month, not what I **have**.

This brings us to the concept of **accumulation modes**. When viewing data over multiple periods, hledger can show either:
- `--change` (default): sum up all the amounts for transactions **within each period**
	- Good for: Incomes and expenses ("How much did I spend within each month?")
- `--historical`: sum up amounts as running totals **from the start of your journal**
	- Good for: Assets and liabilities ("What was my total wealth each month?")

💡 **Key Insight**: incomes and expenses happen *within* a month (use `--change`), but assets and liabilities exist *at the end* of a month (use `--historical`).

Here's the same query with both accumulation modes to see the difference:
```
$ hledger bal assets:checking date:2025-202504 -M --change
Balance changes in 2025Q1:

                     ||       Jan         Feb      Mar
=====================++================================
 assets:checking:dbs || $2,398.30  $-1,497.10  $523.60
---------------------++--------------------------------
                     || $2,398.30  $-1,497.10  $523.60
```

```
$ hledger bal assets:checking date:2025-202504 -M --historical
Ending balances (historical) in 2025Q1:

                     || 2025-01-31  2025-02-28  2025-03-31
=====================++====================================
 assets:checking:dbs || $38,928.90  $37,431.80  $37,955.40
---------------------++------------------------------------
                     || $38,928.90  $37,431.80  $37,955.40
```

Notice how `--change` shows what moved in/out of the account each month, while `--historical` shows my final account balance at the end of each month.

So to view my total assets every month, I simply need to add the `--historical` option so that hledger sums up all my assets from the start of my journal data:
```
$ hledger bal assets date:2025-202506 -M -1 --historical
Ending balances (historical) in 2025-01-01..2025-05-31:

        ||  2025-01-31   2025-02-28   2025-03-31   2025-04-30   2025-05-31
========++=================================================================
 assets || $209,128.90  $212,231.80  $216,855.40  $221,875.50  $226,719.40
--------++-----------------------------------------------------------------
        || $209,128.90  $212,231.80  $216,855.40  $221,875.50  $226,719.40
```

While `--historical` is usually what you want for assets and liabilities, there are times when `--change` makes sense too, like when you want to see how much your net worth or account balance **changed** each month rather than the absolute totals.

Whew, that's a lot to remember. The last two commands I'm going to introduce are much easier, as they are specialized versions of `balance`.

## balancesheet

The first is `balancesheet`, your net worth calculator. This shows your asset and liability account totals:
```
$ hledger balancesheet
Balance Sheet 2025-05-31

                                 ||  2025-05-31
=================================++=============
 Assets                          ||
---------------------------------++-------------
 assets:checking:dbs             ||  $41,319.40
 assets:investments:stocks       || $102,600.00
 assets:savings:dbs              ||  $82,800.00
---------------------------------++-------------
                                 || $226,719.40
=================================++=============
 Liabilities                     ||
---------------------------------++-------------
 liabilities:creditcard:citibank ||   $6,729.46
 liabilities:creditcard:dbs      ||   $8,630.74
---------------------------------++-------------
                                 ||  $15,360.20
=================================++=============
 Net:                            || $211,359.20
```

Looks familiar? This report shows the same data as `hledger bal assets liabilities --historical`, but formatted in a nice structured way. The signs for liabilities (usually negative) are flipped to positive to be easier to read.

Since this command is a variation of `balance`, we can use the same options such as account query, date ranges, depth, and intervals for multi-period reports. For example, here I am looking at my monthly DBS bank accounts and credit card balances (useful for checking against my DBS statement totals):
```
$ hledger balancesheet date:2025-202504 -M dbs
Monthly Balance Sheet 2025-01-31..2025-03-31

                            ||  2025-01-31   2025-02-28   2025-03-31
============================++=======================================
 Assets                     ||
----------------------------++---------------------------------------
 assets:checking:dbs        ||  $38,928.90   $37,431.80   $37,955.40
 assets:savings:dbs         ||  $73,400.00   $75,800.00   $78,100.00
----------------------------++---------------------------------------
                            || $112,328.90  $113,231.80  $116,055.40
============================++=======================================
 Liabilities                ||
----------------------------++---------------------------------------
 liabilities:creditcard:dbs ||   $6,405.85    $7,161.15    $8,387.24
----------------------------++---------------------------------------
                            ||   $6,405.85    $7,161.15    $8,387.24
============================++=======================================
 Net:                       || $105,923.05  $106,070.65  $107,668.16
```

Conveniently, the `balancesheet` report uses `--historical` by default, as that's usually how we want to see our assets and liabilities. But since we know about accumulation modes, we can also use `--change` if we want to see the changes in the accounts.

## incomestatement

As for incomes and expenses, we can use `incomestatement`, another variation of `balance`.

Running `incomestatement` shows all your income/revenue and expense accounts:
```
$ hledger incomestatement
Income Statement 2024-01-01..2025-05-31

                                   || 2024-01-01..2025-05-31
===================================++========================
 Revenues                          ||
-----------------------------------++------------------------
 income:bonus                      ||             $12,500.00
 income:dividends                  ||              $2,006.20
 income:salary                     ||            $146,600.00
-----------------------------------++------------------------
                                   ||            $161,106.20
===================================++========================
 Expenses                          ||
-----------------------------------++------------------------
 expenses:education:books          ||                $113.80
 expenses:education:courses        ||              $2,733.90
 expenses:entertainment:activities ||              $2,531.90
 expenses:entertainment:movies     ||                $432.00
 expenses:entertainment:music      ||                 $12.98
 expenses:entertainment:streaming  ||                $216.83
 expenses:food:eatingout           ||             $12,023.05
 ... (skipping many more expenses sub-accounts)
 expenses:travel:transport         ||                 $33.40
-----------------------------------++------------------------
                                   ||             $94,747.00
===================================++========================
 Net:                              ||             $66,359.20
```

This shows the same data as `hledger bal revenues income expenses`, but with nicer formatting and revenue/income signs flipped to positive.

This defaults to using `--change` mode, because for incomes and expenses, we usually want to see changes within a period. Hence, we can easily see a breakdown of our monthly incomes and expenses:
```
$ hledger incomestatement date:2025-202504 -M -2
Monthly Income Statement 2025Q1

                        ||       Jan        Feb        Mar
========================++=================================
 Revenues               ||
------------------------++---------------------------------
 income:dividends       ||   $156.90     $98.70    $112.50
 income:salary          || $8,800.00  $8,800.00  $8,800.00
------------------------++---------------------------------
                        || $8,956.90  $8,898.70  $8,912.50
========================++=================================
 Expenses               ||
------------------------++---------------------------------
 expenses:education     ||   $228.99    $119.99    $268.99
 expenses:entertainment ||   $167.00    $309.88    $167.00
 expenses:food          ||   $700.50  $1,616.50    $751.80
 expenses:health        ||   $723.50    $388.50    $553.50
 expenses:housing       || $2,308.60  $2,295.80  $2,298.90
 expenses:personal      ||   $189.00    $480.00    $350.00
 expenses:shopping      ||   $659.50  $1,145.60    $870.60
 expenses:tech          ||   $399.00    $189.00    $599.00
 expenses:transport     ||    $42.60    $114.50     $48.90
------------------------++---------------------------------
                        || $5,418.69  $6,659.77  $5,908.69
========================++=================================
 Net:                   || $3,538.21  $2,238.93  $3,003.81
```

## What's next?

These four commands (`print`, `balance`, `balancesheet`, and `incomestatement`) are what I use for 90% of my financial analysis needs. Start analysing your own data to find out:

  - What's the breakdown of my expenses for last month? (`hledger bal expenses date:202505 -2`)
  - What large purchases did I make on Amazon this year? (`hledger print desc:amazon amt:'>100' date:2025`)
  - How has my net worth changed over the years? (`hledger balancesheet -Y`)

hledger has many more commands, and the options that we've learnt are just scratching the surface.  For more advanced features, explore the [hledger manual](https://hledger.org/hledger.html).

Remember, you can always run `hledger <command> --help` to view the options for that command. Or run `hledger` alone to get a summary of all the available commands and reports. Happy exploring!

![hledger commands summary](/assets/img/2025-07-09-hledger-commands/hledger-all-commands.png){: .fullwidth }
