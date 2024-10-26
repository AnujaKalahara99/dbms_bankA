// Branch
export interface Branch {
  Name: string;
  Location: string;
  Branch_ID: string;
}

// Manual Loan
export interface ManualLoan {
  Loan_ID: string;
  Status: string;
  Branch_ID: string;
  Employee_ID: string;
}

// Customer
export interface Customer {
  Customer_ID: string;
  Name: string;
  Address_Line_1: string;
  Address_Line_2: string;
  City: string;
  Phone_Number: string;
  Email: string;
  Password: string;
}

export interface FilteredCustomer {
  Customer_ID: string;
  Account_IDs: string;
  Total_Balance: number;
  Name: string;
  City: string;
  Phone_Number: string;
  Email: string;
}

export interface FullCustomerDetails {
  Customer_ID: string;
  Name: string;
  Address_Line_1: string;
  Address_Line_2: string;
  City: string;
  Phone_Number: string;
  Email: string;
  Total_Balance: number;
  Accounts: {
    Account_ID: string;
    Balance: number;
    Branch_ID: string;
    Branch_Name: string;
  }[];
}

// Account
export interface Account {
  Account_ID: string;
  Balance: number;
  Branch_ID: string;
  Customer_ID: string;
}

// Loan
export interface Loan {
  Loan_ID: string;
  Amount: number;
  Interest_Rate: number;
  Issued_Date: Date;
  Duration_From_Months: number;
  Customer_ID: string;
  Acount_ID: string;
}

// Loan Installment
export interface LoanInstallment {
  Instalment_ID: string;
  Due_Date: Date;
  Amount: number;
  Status: string;
  Loan_ID: string;
}

export interface LateLoan {
  Loan_ID: string;
  Account_ID: string;
  Customer_Name: string;
  Amount_Due: number;
  Due_Date: Date;
  Days_Overdue: number;
}

// Transaction
export interface Transaction {
  Transaction_ID: string;
  Source_Account_ID: string;
  Destination_Account_ID: string;
  Date: Date;
  Time: string;
  Amount: number;
  Type: string;
  Branch_ID: string;
}

export interface Transaction_Report {
  Date: Date;
  Transaction_ID: string;
  Source_Account_ID: string;
  Destination_Account_ID: string;
  Type: string;
  Credit: number;
  Debit: number;
}

// Plan Type
export interface PlanType {
  Plan_ID: string;
  Plan_Name: string;
  Interest_Rate: number;
}

// Saving Account
export interface SavingAccount {
  Acount_ID: string;
  Remaining_Withdrawals: number;
  Plan_ID: string;
}

// FD Period
export interface FDPeriod {
  Period: string;
  Interest_Rate: number;
}

// FD
export interface FD {
  FD_ID: string;
  Account_ID: string;
  Amount: number;
  Start_Date: Date;
  Period: string;
}

// Online Loan
export interface OnlineLoan {
  Loan_ID: string;
  Fixed_Deposite_ID: string;
}

// Employee
export interface Employee {
  Name: string;
  Employee_ID: string; // Fixed typo from Employee _ID
  Address_Line_1: string;
  Address_Line_2: string;
  City: string;
  Phone_Number: string;
  Email: string;
  NIC: string;
  Branch_ID: string;
  Is_Manager: boolean;
  Password: string;
}

// Current Account
export interface CurrentAccount {
  Acount_ID: string;
}

// Personal
export interface Personal {
  Customer_ID: string;
  NIC: string;
  Date_of_Birth: Date;
}

// Organization
export interface Organization {
  Customer_ID: string;
  Registration_Number: number;
  Registration_Date: Date;
}

// Configurations (Singleton table, can define as constants or separate interface)
export interface Configurations {
  Online_Loan_Upper_Bound: number;
  Online_Loan_Max_Percentage: number;
  Savings_Account_Max_Withdrawal_Count: number;
}

export interface CountResult {
  count: number;
}
