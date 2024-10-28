"use server";

import {
  Branch,
  ManualLoan,
  Customer,
  Account,
  Loan,
  LoanInstallment,
  Transaction,
  PlanType,
  SavingAccount,
  FDPeriod,
  FD,
  OnlineLoan,
  Employee,
  CurrentAccount,
  Personal,
  Organization,
  Configurations,
  CountResult,
  FilteredCustomer,
  FullCustomerDetails,
  Transaction_Report,
  LateLoan,
} from "./definitions";
// import { formatCurrency } from './utils';
import { connectToDatabase } from "./mysql";

export async function fetchCustomerFull(customer_id: string) {
  try {
    const mysql = await connectToDatabase();

    const [rows]: [any[], any] = await mysql.query(
      `SELECT c.Customer_ID, c.Name, c.Address_Line_1, c.Address_Line_2, c.City, c.Phone_Number, 
            c.Email, a.Account_ID, a.Balance, a.Branch_ID, b.Name as Branch_Name
      FROM customer c 
      JOIN Account a ON a.Customer_ID = c.Customer_ID 
      JOIN Branch b ON a.Branch_ID = b.Branch_ID 
      WHERE c.Customer_ID = ? 
      LIMIT 1`,
      [customer_id]
    );

    const customerRow: any = rows[0];

    // Structure the data into the FullCustomerDetails interface
    const fullCustomerDetails: FullCustomerDetails = {
      Customer_ID: customerRow.Customer_ID,
      Name: customerRow.Name,
      Address_Line_1: customerRow.Address_Line_1,
      Address_Line_2: customerRow.Address_Line_2,
      City: customerRow.City,
      Phone_Number: customerRow.Phone_Number,
      Email: customerRow.Email,
      Total_Balance: rows.reduce((sum, account) => sum + account.Balance, 0), // Sum all balances
      Accounts: rows.map((row) => ({
        Account_ID: row.Account_ID,
        Balance: row.Balance,
        Branch_ID: row.Branch_ID,
        Branch_Name: row.Branch_Name,
      })),
    };

    return fullCustomerDetails;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Customer data.");
  }
}

export async function fetchCustomersCount() {
  try {
    const mysql = await connectToDatabase();
    const [rows] = await mysql.query("SELECT COUNT(*) as count FROM Customer");
    const countList: CountResult[] = rows as CountResult[];

    return countList[0].count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Customer count.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchCustomersFiltered(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const mysql = await connectToDatabase();

    const sqlQuery = `
      SELECT
    GROUP_CONCAT(a.Account_ID) AS Account_IDs,
    c.Customer_ID,
    c.Name,
    SUM(a.Balance) AS Total_Balance,
    c.Email,
    c.City,
    c.Phone_Number
FROM 
    Account a
JOIN 
    Customer c ON a.Customer_ID = c.Customer_ID
WHERE
    (? = '' OR LOWER(a.Account_ID) LIKE LOWER(?)) OR
    (? = '' OR LOWER(c.Customer_ID) LIKE LOWER(?)) OR
    (? = '' OR LOWER(c.Name) LIKE LOWER(?)) OR
    (? = '' OR LOWER(c.Email) LIKE LOWER(?)) OR
    (? = '' OR LOWER(c.Address_Line_1) LIKE LOWER(?)) OR
    (? = '' OR LOWER(c.Address_Line_2) LIKE LOWER(?)) OR
    (? = '' OR LOWER(c.City) LIKE LOWER(?)) OR
    (? = '' OR LOWER(c.Phone_Number) LIKE LOWER(?))
GROUP BY 
    c.Customer_ID, c.Name, c.Email, c.City, c.Phone_Number
ORDER BY 
    c.Customer_ID DESC
LIMIT ? OFFSET ?
    `;

    const searchParam = `%${query}%`;

    const params = [
      query,
      searchParam, // For Account_ID
      query,
      searchParam, // For Customer_ID
      query,
      searchParam, // For Name
      query,
      searchParam, // For Email
      query,
      searchParam, // For Address_Line_1
      query,
      searchParam, // For Address_Line_2
      query,
      searchParam, // For City
      query,
      searchParam, // For Phone_Number
      ITEMS_PER_PAGE.toString(),
      offset.toString(), // For pagination
    ];

    // Execute the query
    const [rows] = await mysql.execute(sqlQuery, params);

    const customerList: FilteredCustomer[] = rows as FilteredCustomer[];
    return customerList;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch filtered Customers.");
  }
}

export async function fetchTransactionsByBranch(
  branch_id: string
): Promise<Transaction_Report[]> {
  try {
    const mysql = await connectToDatabase();

    const [rows]: [any[], any] = await mysql.query(
      `SELECT t.Transaction_ID, t.Source_Account_ID, t.Destination_Account_ID, 
              t.Date_and_Time, t.Amount, t.Type, t.Branch_ID AS Transaction_Branch_ID,
              sa.Branch_ID AS Source_Branch_ID, da.Branch_ID AS Destination_Branch_ID
       FROM Transaction t 
       JOIN Account sa ON t.Source_Account_ID = sa.Account_ID
       JOIN Account da ON t.Destination_Account_ID = da.Account_ID
       WHERE sa.Branch_ID = ? OR da.Branch_ID = ?`,
      [branch_id, branch_id]
    );

    const transactionReports: Transaction_Report[] = rows.map((row) => {
      const dateTime = new Date(row.Date_and_Time);

      // Determine if the transaction is a credit or debit for the given branch
      let credit = 0;
      let debit = 0;

      // If the destination branch is the current branch, it's a credit (money coming in)
      if (row.Destination_Branch_ID === branch_id) {
        credit = row.Amount;
      }

      // If the source branch is the current branch, it's a debit (money going out)
      if (row.Source_Branch_ID === branch_id) {
        debit = row.Amount;
      }

      return {
        Date: dateTime, // Store as a Date object
        Transaction_ID: row.Transaction_ID,
        Source_Account_ID: row.Source_Account_ID,
        Destination_Account_ID: row.Destination_Account_ID,
        Type: row.Type, // Store the transaction type (e.g., transfer, withdrawal)
        Credit: credit, // Credit will be 0 if the branch is the source branch
        Debit: debit, // Debit will be 0 if the branch is the destination branch
      };
    });

    return transactionReports;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions for the branch.");
  }
}

export async function fetchBranchIDfromEmployeeID(
  employee_id: string
): Promise<string> {
  try {
    const mysql = await connectToDatabase();
    const [rows]: [any[], any[]] = await mysql.query(
      "SELECT Branch_ID FROM Employee WHERE Employee_ID = ?",
      [employee_id]
    );
    return rows[0].Branch_ID;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Branch ID.");
  }
}

export async function fetchLateLoansFromBranch(
  branchId: string
): Promise<LateLoan[]> {
  try {
    const mysql = await connectToDatabase();

    // Execute stored procedure with Branch_ID as a parameter
    const [rows]: [any[], any] = await mysql.query(
      `CALL GetLateLoansFromBranch(?)`,
      [branchId]
    );

    // Map rows to LateLoan objects
    const lateLoans: LateLoan[] = rows[0].map((row: any) => ({
      Loan_ID: row.Loan_ID,
      Account_ID: row.Account_ID,
      Customer_Name: row.Customer_Name,
      Amount_Due: Number(row.Amount_Due),
      Due_Date: new Date(row.Due_Date),
      Days_Overdue: row.Days_Overdue,
    }));

    return lateLoans;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch late loans from branch.");
  }
}
