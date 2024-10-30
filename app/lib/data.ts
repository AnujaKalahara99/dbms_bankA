"use server";

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
  Transaction_Report,
  LateLoan,
  Account_Branch,
  RecentTransaction,
  LocalTransaction,
  EmployeeTransaction,
  Loan_view,
  FD_view,
} from "./definitions";
// import { formatCurrency } from './utils';
import { connectToDatabase } from "./mysql";
import { RowDataPacket } from "mysql2";

// Use the renamed import in the code where necessary
// Example: const account: ImportedAccount = ...
import bcrypt from "bcrypt";

export async function fetchCustomerName(customer_id: string): Promise<string> {
  try {
    const mysql = await connectToDatabase();

    const [rows]: [any[], any] = await mysql.query(
      `SELECT Name
      FROM customer 
      WHERE Customer_ID = ? 
      LIMIT 1`,
      [customer_id]
    );

    const customerName: string = rows[0].Name as string;

    return customerName;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Customer data.");
  }
}

export async function fetchEmployeeName(employee_id: string): Promise<string> {
  try {
    const mysql = await connectToDatabase();

    const [rows]: [any[], any] = await mysql.query(
      `SELECT Name
      FROM employee 
      WHERE Employee_ID = ? 
      LIMIT 1`,
      [employee_id]
    );

    const employeeName: string = rows[0].Name as string;

    return employeeName;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Customer data.");
  }
}

export async function fetchCustomerFull(customer_id: string) {
  try {
    const mysql = await connectToDatabase();
    // console.log("customerRow");

    const [rows]: [any[], any] = await mysql.query(
      `SELECT c.Customer_ID, c.Name, c.Address_Line_1, c.Address_Line_2, c.City, c.Phone_Number, 
            c.Email, a.Account_ID, a.Balance, a.Branch_ID, b.Name as Branch_Name
      FROM customer c 
      JOIN Account a ON a.Customer_ID = c.Customer_ID 
      JOIN Branch b ON a.Branch_ID = b.Branch_ID 
      WHERE c.Customer_ID = ?;`,
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

export async function fetchAllAccounts(
  customer_id: string
): Promise<Account_Branch[]> {
  try {
    const mysql = await connectToDatabase();

    const [rows]: [any[], any] = await mysql.query(
      `SELECT c.Customer_ID, c.Name as Customer_Name, a.Account_ID, a.Balance, a.Branch_ID, b.Name AS Branch_Name
      FROM Account a
      JOIN Customer c ON a.Customer_ID = c.Customer_ID
      JOIN Branch b ON a.Branch_ID = b.Branch_ID
      WHERE a.Customer_ID = ?;`,
      [customer_id]
    );

    // Structure data into a list of accounts
    const accounts = rows as Account_Branch[];

    return accounts;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch accounts data.");
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

export async function fetchCustomersAccountsCount(
  customer_id: string
): Promise<string> {
  try {
    const mysql = await connectToDatabase();
    const [rows]: [any[], any] = await mysql.query(
      "SELECT COUNT(*) as count FROM Account JOIN Customer ON Account.Customer_ID = Customer.Customer_ID WHERE Customer.Customer_ID = ?;",
      [customer_id]
    );

    return rows[0].count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Customer Accounts count.");
  }
}

export async function fetchBankBranch(employee_id: string): Promise<string> {
  try {
    const mysql = await connectToDatabase();
    const [rows]: [any[], any] = await mysql.query(
      "SELECT b.Name AS Branch_Name FROM Branch b JOIN Employee e ON e.Branch_ID = b.Branch_ID WHERE Employee_ID = ?;",
      [employee_id]
    );

    return rows[0].Branch_Name;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Bank Accounts count.");
  }
}

export async function fetchBankAccountsCount(
  employee_id: string
): Promise<string> {
  try {
    const mysql = await connectToDatabase();
    const [rows]: [any[], any] = await mysql.query(
      "SELECT Branch_ID FROM Employee WHERE Employee_ID = ?;",
      [employee_id]
    );

    const [rows2]: [any[], any] = await mysql.query(
      "SELECT COUNT(*) as count FROM Account WHERE Branch_ID = ?;",
      [rows[0].Branch_ID]
    );

    return rows2[0].count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Bank Accounts count.");
  }
}

export async function fetchBankLoansCount(
  employee_id: string
): Promise<string> {
  try {
    const mysql = await connectToDatabase();
    const [rows]: [any[], any] = await mysql.query(
      "SELECT Branch_ID FROM Employee WHERE Employee_ID = ?;",
      [employee_id]
    );

    const [rows2]: [any[], any] = await mysql.query(
      "SELECT COUNT(*) as count FROM Loan l JOIN Account a ON a.Account_ID = l.Account_ID WHERE a.Branch_ID = ?;",
      [rows[0].Branch_ID]
    );

    return rows2[0].count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Bank Loans count.");
  }
}

export async function fetchCustomersFDCount(
  customer_id: string
): Promise<string> {
  try {
    const mysql = await connectToDatabase();
    const [rows]: [any[], any] = await mysql.query(
      "SELECT COUNT(*) as count FROM Account JOIN Customer ON Account.Customer_ID = Customer.Customer_ID WHERE Customer.Customer_ID = ?;",
      [customer_id]
    );
    console.log(rows);

    return rows[0].count;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Customer count.");
  }
}

export async function fetchCustomerTotalBalance(
  customer_id: string
): Promise<string> {
  try {
    const mysql = await connectToDatabase();
    const sqlQuery = `
SELECT SUM(Balance) AS Total_Balance
FROM Account
WHERE Customer_ID = ?;
`;
    const [rows]: [any[], any] = await mysql.query(sqlQuery, [customer_id]);
    console.log(rows);

    return rows[0].Total_Balance;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Total_Balance.");
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
    console.log("account", rows);
    const accounts = rows as Account[];
    return accounts;
  } catch (error) {
    console.error("Error fetching user accounts:", error);
    throw new Error("Failed to fetch user accounts");
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
    console.error("Error fetching FD plans:", error);
    throw new Error("Failed to fetch FD plans");
  }
}

// export interface Employee {
//   Employee_ID: string;
//   Name: string;
//   Address_Line_1: string;
//   Address_Line_2: string | null;
//   City: string;
//   Phone_Number: string;
//   Email: string;
//   NIC: string;
//   Branch_ID: number;
// }

// Function to fetch employee details for a specific manager's branch
export async function getEmployees(managerId: string): Promise<Employee[]> {
  try {
    const mysql = await connectToDatabase();

    // Fetch the branch ID associated with the manager
    const [managerRows]: [any[], any] = await mysql.query(
      `SELECT Branch_ID FROM Branch WHERE Manager_ID = ?`,
      [managerId]
    );

    if (managerRows.length === 0) {
      throw new Error("Manager not found");
    }

    const branchId = managerRows[0].Branch_ID;

    // Fetch employees for the specific branch
    const [employeeRows] = await mysql.query(
      `SELECT Employee_ID, Name, Address_Line_1, Address_Line_2, City, Phone_Number, Email, NIC, Branch_ID 
       FROM Employee 
       WHERE Branch_ID = ?`,
      [branchId]
    );

    return employeeRows as Employee[];
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw new Error("Failed to fetch employee details");
  }
}

// export type { Employee };
export async function fetchRecentTransactionsByCustomer(
  customer_id: string
): Promise<RecentTransaction[]> {
  try {
    const mysql = await connectToDatabase();

    // Step 1: Get all accounts for the specified customer
    const [rows]: [any[], any] = await mysql.query(
      `SELECT Account_ID FROM Account WHERE Customer_ID = ?`,
      [customer_id]
    );

    const accountRows = rows as Account[];
    const accountIds = accountRows.map((row) => row.Account_ID);

    if (accountIds.length === 0) {
      return []; // No accounts for this customer
    }

    // Step 2: Fetch the five most recent transactions for the customer’s accounts
    const [transactionRows]: [any[], any] = await mysql.query(
      `SELECT t.Transaction_ID, t.Source_Account_ID, t.Destination_Account_ID, 
              t.Date_and_Time, t.Amount, t.Type, t.Branch_ID
       FROM Transaction t
       WHERE t.Source_Account_ID IN (?) OR t.Destination_Account_ID IN (?)
       ORDER BY t.Date_and_Time DESC
       LIMIT 5`,
      [accountIds, accountIds]
    );

    // Step 3: Map each row to a CustomerTransaction object with belongsToCustomer
    const transactions: RecentTransaction[] = transactionRows.map((row) => {
      const dateTime = new Date(row.Date_and_Time);
      const belongsToCustomer =
        accountIds.includes(row.Source_Account_ID) &&
        accountIds.includes(row.Destination_Account_ID)
          ? "both"
          : accountIds.includes(row.Source_Account_ID)
          ? "source"
          : "destination";

      return {
        Transaction_ID: row.Transaction_ID,
        Source_Account_ID: row.Source_Account_ID,
        Destination_Account_ID: row.Destination_Account_ID,
        Date: dateTime,
        Time: dateTime.toLocaleTimeString(), // assuming Date_and_Time is "YYYY-MM-DD HH:MM:SS"
        Amount: row.Amount,
        Type: row.Type,
        Branch_ID: row.Branch_ID,
        belongsToCustomer: belongsToCustomer,
      };
    });

    return transactions;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch recent transactions for the customer.");
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
export async function fetchSAccountPlanTypes() {
  try {
    const mysql = await connectToDatabase();
    //console.log("customerRow");

    const [rows]: [any, any] = await mysql.query(
      `SELECT Plan_id, Plan_name, interest_rate from Plan_Type`
    );

    // Structure the data into the FullCustomerDetails interface
    const PlanTypes: PlanType[] = rows.map((row: any) => ({
      Plan_ID: row.Plan_id,
      Plan_Name: row.Plan_name,
      Interest_Rate: row.interest_rate,
    }));

    // const PlanTypes = rows as PlanType[];

    return PlanTypes;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Customer data.");
  }
}

export async function fetchBranch() {
  try {
    const mysql = await connectToDatabase();
    //console.log("customerRow");

    const [rows]: [any, any] = await mysql.query(
      `SELECT Name, Location, Branch_ID from Branch`
    );

    //console.log(customerRow);

    // Structure the data into the FullCustomerDetails interface
    const Branches: Branch[] = rows.map((row: any) => ({
      Name: row.Name,
      Location: row.Location,
      Branch_ID: row.Branch_ID,
    }));

    return Branches;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Customer data.");
  }
}

// Function to fetch transactions for a specific customer
export async function getTransactionsByCustomerId(
  customerId: string
): Promise<LocalTransaction[]> {
  try {
    const mysql = await connectToDatabase();

    const [rows]: [any[], any] = await mysql.query(
      `SELECT t.Transaction_ID, t.Source_Account_ID, t.Destination_Account_ID, t.Date_and_Time, Amount, t.Type, t.Description
     FROM Transaction t
     JOIN Account a ON t.Source_Account_ID = a.Account_ID OR t.Destination_Account_ID = a.Account_ID 
     WHERE a.Customer_ID = ?
     ORDER BY Date_and_Time DESC`,
      [customerId]
    );

    return rows as LocalTransaction[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Customer data.");
  }
}

// Function to fetch transactions for a specific customer
// export async function getTransactionsByEmployeeId(
//   Employee_ID: string
// ): Promise<EmployeeTransaction[]> {
//   try {
//     const mysql = await connectToDatabase();

//     const [rows]: [any[], any] = await mysql.query(
//       `SELECT t.Transaction_ID, t.Source_Account_ID, t.Destination_Account_ID, t.Date_and_Time, Amount, t.Type, t.Description , t.Branch_ID
//      FROM Transaction t
//      ORDER BY Date_and_Time DESC`
//     );

//     return rows as EmployeeTransaction[];
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch Customer data.");
//   }
// }

// data.ts

// Function to fetch transactions for a specific employee’s branch
export async function getTransactionsByEmployeeId(
  employeeId: string
): Promise<EmployeeTransaction[]> {
  try {
    const mysql = await connectToDatabase();

    // Retrieve the branch ID for the given employee
    const [employeeRow]: any[] = await mysql.query(
      `SELECT Branch_ID FROM Employee WHERE Employee_ID = ?`,
      [employeeId]
    );

    const employeeBranchId = employeeRow[0]?.Branch_ID;

    if (!employeeBranchId) {
      throw new Error("Employee branch ID not found.");
    }

    // Fetch transactions only if the source or destination account belongs to the employee's branch
    const [rows]: [any[], any] = await mysql.query(
      `SELECT t.Transaction_ID, t.Source_Account_ID, t.Destination_Account_ID, t.Date_and_Time, t.Amount, t.Type, t.Description, t.Branch_ID
       FROM Transaction t
       WHERE 
         (t.Source_Account_ID IN (SELECT Account_ID FROM Account WHERE Branch_ID = ?) 
          OR 
         t.Destination_Account_ID IN (SELECT Account_ID FROM Account WHERE Branch_ID = ?))
       ORDER BY t.Date_and_Time DESC`,
      [employeeBranchId, employeeBranchId]
    );

    return rows as EmployeeTransaction[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch transactions for employee's branch.");
  }
}

//Fuction for get all branches ID and names from Branch table in MYSQL database
export async function fetchAllBranches() {
  try {
    const mysql = await connectToDatabase();
    console.log("customerRow");

    const [branches]: [any[], any] = await mysql.query(
      `SELECT Location , Branch_ID , Name
      FROM branch;`
    );

    return branches;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Branches data.");
  }
}

//To fetch Details of Acounts - Select transcaction account
export async function fetchAcountDetails(customer_id: string) {
  try {
    const mysql = await connectToDatabase();

    const [accounts]: [any[], any] = await mysql.query(
      `SELECT Account_ID FROM account
      WHERE CUSTOMER_ID = ?;`,
      [customer_id]
    );
    return accounts;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Branches data.");
  }
}

export async function fetchAllLoanInstallments(loanId: string) {
  try {
    const mysql = await connectToDatabase();

    const [installments]: [any[], any] = await mysql.query(
      `SELECT Instalment_ID, Due_Date, Amount, Status, Loan_ID
       FROM loan_installments
       WHERE Loan_ID = ?;`,
      [loanId]
    );

    return installments;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch loan installments.");
  }
}

export async function fetchAllCustomers() {
  try {
    const mysql = await connectToDatabase();

    const [customers]: [any[], any] = await mysql.query(
      `SELECT Customer_ID , Email , Name  FROM customer;`
    );
    return customers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Branches data.");
  }
}

export async function fetchCustomerAccounts(customer_id: string) {
  try {
    const mysql = await connectToDatabase();

    const [accounts]: [any[], any] = await mysql.query(
      `SELECT Account_ID 
        FROM saving_account
        WHERE customer_ID = ?;`,
      [customer_id]
    );
    //console.log(accounts);
    return accounts;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Branches data.");
  }
}

export async function fetchPendingLoans() {
  try {
    const mysql = await connectToDatabase();

    const [PendingLoans]: [any[], any] = await mysql.query(
      `SELECT manual_loan.Loan_ID AS Loan_ID , Employee_ID , Amount , Interest_Rate ,  Duration_in_Months , Account_ID
      FROM manual_loan INNER JOIN loan 
      ON manual_loan.Loan_ID = loan.Loan_ID 
      WHERE manual_loan.Status = 'Pending';`
    );
    //console.log(accounts);
    return PendingLoans;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Pending Loans data.");
  }
}

export async function fetchLoans(customer_id: string): Promise<Loan_view[]> {
  try {
    const mysql = await connectToDatabase();

    const [rows] = await mysql.query(
      `
      
       select 
       loan.Loan_ID, 
       loan.Amount, 
       Interest_Rate, 
       Issued_Date, 
       Duration_in_Months, 
       loan.Account_ID,
       Fixed_Deposit_ID
       FROM loan
       LEFT JOIN account ON loan.Account_ID = account.Account_ID
       LEFT JOIN online_loan ON loan.Loan_ID = online_loan.Loan_ID
       
       WHERE account.customer_id = ?;`,

      [customer_id]
    );

    return rows as Loan_view[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch loans.");
  }
}

export async function getFD(customer_id: string): Promise<FD_view[]> {
  try {
    const mysql = await connectToDatabase(); // Establish DB connection

    const [rows] = await mysql.query(
      `
      SELECT 
        FD_ID,
        f.Account_ID,
        Amount
      FROM fd f
      LEFT JOIN Account a ON f.Account_ID = a.Account_ID 
      WHERE a.Customer_ID = ?`,

      [customer_id]
    );

    return rows as FD_view[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch fd.");
  }
}

export async function CheckCustomer(customer_id: string) {
  try {
    const mysql = await connectToDatabase();

    const [customer]: [any[], any] = await mysql.query(
      `use BANKA;
        SELECT COUNT(Account_ID) as countAID
        FROM account
        WHERE Account_ID = ?;`,
      [customer_id]
    );
    //console.log(accounts);
    return JSON.stringify(customer);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Branches data.");
  }
}

export default async function fetchAccountBalance(customer_ID: string) {
  try {
    const mysql = await connectToDatabase();

    const [accounts]: [any[], any] = await mysql.query(
      `SELECT account.Account_ID AS account_ID , Balance , Account_Type , Remaining_Withdrawals
      FROM account
      LEFT JOIN saving_account
      ON account.Account_ID = saving_account.Account_ID
      WHERE Customer_ID = ?;`,
      [customer_ID]
    );
    //console.log(accounts);
    return accounts;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Branches data.");
  }
}
