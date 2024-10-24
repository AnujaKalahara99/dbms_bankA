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
} from "./definitions";
// import { formatCurrency } from './utils';
import { connectToDatabase } from "./mysql";
import bcrypt from "bcrypt";

export async function  fetchCustomerFull(customer_id: string) {
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

//Fuction for get all branches ID and names from Branch table in MYSQL database
export async function fetchAllBranches() {
  try {
    const mysql = await connectToDatabase();
    console.log("customerRow");

    const [branches]: [any[], any] = await mysql.query(
      `SELECT Location , Branch_ID , Name
      FROM branch;`,
    );

    return branches;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Branches data.");
  }
}

//To fetch Details of Acounts - Select transcaction account
export async function fetchAcountDetails(customer_id: string){ 
  try{
    const mysql = await connectToDatabase();

    const [accounts] : [any[],any] = await mysql.query(
      `SELECT Account_ID FROM account
      WHERE CUSTOMER_ID = ?;`,
      [customer_id]
    );
    return accounts ;
  }catch(error) { 
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Branches data.");
  }
}

export async function checkPassword(customer_id:string , password:string){
  // const mysql = await connectToDatabase();
  // const [rows] : [any[],any] = await mysql.query(`SELECT password FROM CUSTOMER WHERE Customer_ID = ?;;` , [customer_id]);
  // console.log(rows[0]);
  
  // const passwordsMatch = await bcrypt.compare(password, rows[0].password);

  return false;
}