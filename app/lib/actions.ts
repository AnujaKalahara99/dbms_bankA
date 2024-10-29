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

const AccountSchema = z.object({
  Customer_ID: z.string(),
  Balance: z.number(),
  Account_Type: z.string(),
  Branch: z.string(),
  Plan_Type: z.string().nullable(),
})

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
    INSERT INTO Customer (Customer_ID, Name, Address_Line_1, Address_Line_2, City, Phone_Number, Email, Password) 
    VALUES (?, ?, ?, ?, ?, ?, ?, "0000")
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

// export async function updateCustomerPassword(customerId: string, newPassword: string) {
//   try {
//     // Hash the new password
//     const hashedPassword = await hashPassword(newPassword);

//     const mysql = await connectToDatabase();

//     const updateQuery = `
//       UPDATE Customer
//       SET Password = ?
//       WHERE Customer_ID = ?;
//     `;

//     await mysql.query(updateQuery, [hashedPassword, customerId]);

//     console.log("Customer password updated successfully!");
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to Update Customer password.");
//   }
// }

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

export async function createAccount(formData: FormData) {
  try {
    const {
      Customer_ID,
      Balance,
      Account_Type,
      Branch,
      Plan_Type,
       
    } = AccountSchema.parse({
      Customer_ID: formData.get("customer_id"),
      Balance: Number(formData.get("balance")),
      Account_Type: formData.get("account_type"),
      Branch: formData.get("branch"),
      Plan_Type: formData.get("plan_type"),
    });

    console.log(Plan_Type);

    
      const mysql = await connectToDatabase();

      await mysql.query('CALL CreateAccount (?, ?, ?, ?, ?)', [
        Customer_ID,
        Balance,
        Account_Type,
        Branch,
        Plan_Type
      ]);

      console.log("Account created successfully!");
      return { success: true };

    }catch (error: unknown) {
      // Check if error is an object and has a message property
      if (typeof error === "object" && error !== null && "message" in error) {
        const err = error as { message: string };
        return { success: false, message: err.message || "Failed to Create Account." };
      } else {
        return { success: false, message: "An unknown error occurred." };
      }
    }
    

}

