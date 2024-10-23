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

// Define the FD Schema using zod for validation
const FDSchema = z.object({
  accountId: z.string().max(16), // Matches Account_ID VARCHAR(16)
  amount: z.number().min(0),     // Ensures a positive deposit amount
  fdPlan: z.string(),            // Can be validated for specific plan types if necessary
  startDate: z.string(),         // Start Date as a string (YYYY-MM-DD format)
});

export async function createFD(formData: FormData) {
  try {
    
    // Parse the incoming form data using the FDSchema for validation
    const { accountId, amount, fdPlan, startDate } = FDSchema.parse({
      accountId: formData.get("accountId"),
      amount: parseFloat(formData.get("amount") as string),
      fdPlan: formData.get("fdPlan"),
      startDate: formData.get("startDate"),
    });
    
    // Connect to the MySQL database
    const mysql = await connectToDatabase();

    // Define the SQL insert query for the Fixed Deposit table
    const insertQuery = `
      INSERT INTO FD (Account_ID, Amount, Start_Date, FD_Plan_ID)
      VALUES (?, ?, ?, ?)
    `;

    // Execute the query with the parsed form data
    await mysql.query(insertQuery, [accountId, amount, startDate, fdPlan]);

    console.log("FD created successfully!");

    return { success: true, message: "FD created successfully." };
  } catch (error) {
    console.error("Error creating FD:", error);
    throw new Error("Failed to create FD.");
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
