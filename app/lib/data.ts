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
} from "./definitions";
// import { formatCurrency } from './utils';
import { connectToDatabase } from "./mysql";

export async function fetchCustomers() {
  try {
    const mysql = await connectToDatabase();
    const [rows] = await mysql.query("SELECT * FROM Customer");
    const customers: Customer[] = rows as Customer[];

    return customers;
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
