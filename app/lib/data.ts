import {
  Branch,
  ManualLoan,
  Customer,
  Account as ImportedAccount,
  Loan,
  LoanInstallment,
  Transaction as ImportedTransaction,
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
} from "./definitions";
// import { formatCurrency } from './utils';
import { connectToDatabase } from "./mysql";
import { RowDataPacket } from "mysql2";

// Use the renamed import in the code where necessary
// Example: const account: ImportedAccount = ...

export async function fetchCustomerFull(customer_id: string) {
  try {
    const mysql = await connectToDatabase();
    console.log("customerRow");

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

    console.log(customerRow);

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


export async function fetchFDList(account_id: string) {
  try {
       
    const mysql = await connectToDatabase();

    const [rows]: [any[], any] = await mysql.query(
      `SELECT FD_ID, Account_ID, Amount, Start_Date, FD_Plan_ID
       FROM FD
       WHERE Account_ID = ?`,
      [account_id]
    );

    


    const fdList: FD[] = rows.map((row) => ({
      FD_ID: row.FD_ID,
      Account_ID: row.Account_ID,
      Amount: row.Amount,
      Start_Date: row.Start_Date,
      FD_Plan_ID: row.FD_Plan_ID,
    }));

    return fdList;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Fixed Deposits.");
  }
}



// Define interfaces
export interface Account {
  Account_ID: string;
  Balance: number;
}

export interface FDPlan {
  FD_Plan_ID: string;
  Period_in_Months: string;
}

// Function to fetch user account details
export async function getUserAccounts(userId: string): Promise<Account[]> {
  try {
    const mysql = await connectToDatabase();
    const [rows] = await mysql.query(
      `SELECT Account_ID, Balance FROM Account WHERE Customer_ID = ?`,
      [userId]
    );
    console.log('account', rows);
    const accounts = rows as Account[];
    return accounts;
  } catch (error) {
    console.error('Error fetching user accounts:', error);
    throw new Error('Failed to fetch user accounts');
  }
}


// Function to fetch FD plans
export async function getFDPlans(): Promise<FDPlan[]> {
  try {
    const mysql = await connectToDatabase();

    const [rows]: [any[], any] = await mysql.query(
      `SELECT FD_Plan_ID , Period_in_Months FROM FD_Plan`
    );

    const plans: FDPlan[] = rows.map((row) => ({
      FD_Plan_ID: row.FD_Plan_ID,
      Period_in_Months: row.Period_in_Months,
    }));

    return plans;
  } catch (error) {
    console.error('Error fetching FD plans:', error);
    throw new Error('Failed to fetch FD plans');
  }
}

// data.ts


export interface LocalTransaction {
  Transaction_ID: string;
  Source_Account_ID: string | null;
  Destination_Account_ID: string | null;
  Date_and_Time: string;
  Amount: number;
  Type: "Deposit" | "Withdrawal" | "Loan-Payment" | "Interest-Rate" | "Transfer" | "FD" | "Loan";
  Description: string | null;
}

// Function to fetch transactions for a specific customer
export async function getTransactionsByCustomerId(customerId: string): Promise<LocalTransaction[]> {
  const mysql = await connectToDatabase();

  const [rows] = await mysql.query<RowDataPacket[]>(
    `SELECT Transaction_ID, Source_Account_ID, Destination_Account_ID, Date_and_Time, Amount, Type, Description
     FROM Transaction
     WHERE Source_Account_ID = ? OR Destination_Account_ID = ? 
     ORDER BY Date_and_Time DESC`,
    [customerId, customerId]
  );

  return rows as LocalTransaction[];
}
