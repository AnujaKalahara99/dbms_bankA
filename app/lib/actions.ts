"use server";

import { z } from "zod";
import { connectToDatabase } from "./mysql";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

const CustomerSchema = z.object({
  Customer_ID: z.string(),
  Name: z.string(),
  Address_Line_1: z.string(),
  Address_Line_2: z.string().nullable(), // Allowing null values
  City: z.string(),
  Phone_Number: z.string(),
  Email: z.string().email(), // Ensuring valid email format
});
const LoanSchema = z.object({
  Loan_ID: z.string().nonempty("Loan ID is required."),
  Amount: z.number().positive("Amount must be a positive number."),
  Interest_Rate: z.number().nonnegative("Interest Rate cannot be negative."),
  Duration_in_Months: z.number()
    .int()
    .positive("Duration must be a positive integer."),
  Account_ID: z.string().nonempty("Account ID is required."),
  Fixed_Deposit_ID: z.string().optional(), // Optional, if it may not always be present
});

// const UpdateCustomer = CustomerSchema.omit({ Customer_ID: true });

export async function updateCustomer(formData: FormData) {
  try {
    const {
      Customer_ID,
      Name,
      Address_Line_1,
      Address_Line_2,
      City,
      Phone_Number,
      Email,
    } = CustomerSchema.parse({
      Customer_ID: formData.get("customer_id"),
      Name: formData.get("name"),
      Address_Line_1: formData.get("address_line_1"),
      Address_Line_2: formData.get("address_line_2"),
      City: formData.get("city"),
      Phone_Number: formData.get("phone_number"),
      Email: formData.get("email"),
    });

    const mysql = await connectToDatabase();

    const insertQuery = `
    INSERT INTO Customer (Customer_ID, Name, Address_Line_1, Address_Line_2, City, Phone_Number, Email) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    Name = VALUES(Name),
    Address_Line_1 = VALUES(Address_Line_1),
    Address_Line_2 = VALUES(Address_Line_2),
    City = VALUES(City),
    Phone_Number = VALUES(Phone_Number),
    Email = VALUES(Email);
  `;

    await mysql.query(insertQuery, [
      Customer_ID,
      Name,
      Address_Line_1,
      Address_Line_2,
      City,
      Phone_Number,
      Email,
    ]);

    console.log("Customer data inserted successfully!");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to Update Customer data.");
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}


import {LoanResult} from "./definitions";


export async function createLoan(Data: LoanResult) {
  try {
   console.log(Data);
    const mysql = await connectToDatabase();

    // Insert the loan into the 'loan' table
    const loanQuery = `
      INSERT INTO loan (Loan_ID, Amount, Interest_Rate, Issued_Date, Duration_in_Months, Status, Account_ID)
      VALUES (?, ?, ?, NOW(), ?, 'Active', ?)
    `;

    await mysql.query(loanQuery, [
      Data.Loan_ID,
      Data.Amount,
      Data.Interest_Rate,
      Data.Duration_in_Months,
      Data.Account_ID,
    ]);

    // Insert into the 'online_loan' table (mapping with fixed deposit)
    const onlineLoanQuery = `
      INSERT INTO online_loan (Loan_ID, Fixed_Deposit_ID) VALUES (?, ?)
    `;

    await mysql.query(onlineLoanQuery, [Data.Loan_ID, Data.Fixed_Deposit_ID]);

    console.log('Loan created successfully!');
    return { success: true, message: 'Loan created successfully.' };

  } catch (error) {
    console.error('Error creating loan:', error);
    throw new Error('Failed to create loan. Please try again later.');
  }
}
