"use server";

import { z } from "zod";
import { connectToDatabase } from "./mysql";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { on } from "events";
import bcrypt from "bcrypt";

const CustomerSchema = z.object({
  Customer_ID: z.string(),
  Name: z.string(),
  Address_Line_1: z.string(),
  Address_Line_2: z.string().nullable(), // Allowing null values
  City: z.string(),
  Phone_Number: z.string(),
  Email: z.string().email(), // Ensuring valid email format
});

const OnlineTransactionSchema = z.object({
  senderAccount:z.string(),
  recieverAccount:z.string(),
  amount: z.number(),
  Description:z.string(),
  Branch_ID:z.string() ,
  Account:z.string()
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


export async function OnlineTransfer(formData: FormData){  
  console.log(formData);
  try{

    const {senderAccount, recieverAccount, amount, Description, Branch_ID } = OnlineTransactionSchema.parse({
      senderAccount:formData.get("account"),
      recieverAccount:formData.get("recipient_account"),
      amount:Number(formData.get("amount")),
      Description:formData.get("description"),
      Branch_ID:formData.get("Branch"),
      Account:formData.get("account")
    });

    console.log(formData.get("description"));
    const mysql = await connectToDatabase();
    const transfer_Query = `call FundTransfer(? , ? , ? , ? , ?);`;
    await mysql.query(transfer_Query , [
      senderAccount,
      recieverAccount,
      amount,
      Description,
      Branch_ID
    ]);

    return true;
  }catch(error){
    console.log(error as string);
    //return error as string ;
  }
}


export async function checkPassword(customer_id:string , password:string){
  //console.log(customer_id);
  //console.log(password);
  const mysql = await connectToDatabase();
  const [rows] : [any[],any] = await mysql.query(`SELECT Password 
                                                  FROM customer
                                                  WHERE Customer_ID = ?;` , [customer_id]);
  //console.log(rows[0].Password);
  const passwordsMatch = await bcrypt.compare(password,rows[0].Password );
  //console.log(passwordsMatch);
  // const passwordsMatch = await bcrypt.compare(password, rows[0].password);

  return passwordsMatch;
}

export async function newManualLoan(amount: number, interest: number, duration: number, employee_id: string, accountID: string){
  try{
  const mysql = await connectToDatabase();
  await mysql.query(
    `CALL insert_manual_loan(? , ? , ? , ? , ?);`,
    [amount,interest,duration,employee_id,accountID]
  );
  console.log(amount,interest,duration,employee_id,accountID);

  }catch(error){
    console.log(error);
  }

}

export async function acceptManualLoan(Loan_ID: string , status: string){
  try{
    const mysql = await connectToDatabase();
    await mysql.query(
      `call banka.update_loan_status(?, ?);`,
      [Loan_ID , status]
    );
    console.log(Loan_ID);
  
    }catch(error){
      console.log(error);
    }

}
  

