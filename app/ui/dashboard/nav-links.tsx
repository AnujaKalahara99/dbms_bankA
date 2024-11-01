"use client";

import {
  UserIcon,
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  SquaresPlusIcon,
  BanknotesIcon,
  CalculatorIcon,
  ChartBarSquareIcon,
  ClipboardIcon,
  ClipboardDocumentIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "My Profile",
    href: "/dashboard/myprofile",
    icon: UserIcon,
    viewOnly: "customer",
  },
  {
    name: "Bank Accounts",
    href: "/dashboard/bankaccounts",
    icon: SquaresPlusIcon,
    viewOnly: "customer",
  },
  {
    name: "Online Transfer",
    href: "/dashboard/transfer",
    icon: BanknotesIcon,
    viewOnly: "customer",
  },
  {
    name: "Transactions",
    href: "/dashboard/transaction",
    icon: DocumentDuplicateIcon,
    viewOnly: "employee",
  },
  {
    name: "Customer Registration",
    href: "/dashboard/registerCustomer",
    icon: UserIcon,
    viewOnly: "employee",
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions_c",
    icon: DocumentDuplicateIcon,
    viewOnly: "customer",
  },
  {
    name: "Create Account",
    href: "/dashboard/createAccount",
    icon: SquaresPlusIcon,
    viewOnly: "employee",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: UserGroupIcon,
    viewOnly: "employee",
  },
  {
    name: "Employees",
    href: "/dashboard/employeeDetails",
    icon: UserGroupIcon,
    viewOnly: "manager",
  },
  {
    name: "Branch Report",
    href: "/dashboard/reports",
    icon: ChartBarSquareIcon,
    viewOnly: "manager",
  },
  {
    name: "LateLoan Report",
    href: "/dashboard/loanreport",
    icon: ChartBarSquareIcon,
    viewOnly: "manager",
  },
  {
    name: "Online Loan",
    href: "/dashboard/onlineLoan/view_loan",
    icon: ClockIcon,
    viewOnly: "customer",
  },
  {
    name: "Create Online Loan",
    href: "/dashboard/onlineLoan/create_loan",
    icon: ClockIcon,
    viewOnly: "customer",
  },
  {
    name: "FD List",
    href: "/dashboard/fd",
    icon: ClipboardIcon,
    viewOnly: "customer",
  },
  {
    name: "Create FD",
    href: "/dashboard/fd/newFD",
    icon: ClipboardDocumentIcon,
    viewOnly: "customer",
  },
  {
    name: "ATM/CDM",
    href: "/dashboard/atm",
    icon: CalculatorIcon,
    viewOnly: "customer",
  },
  {
    name: "Loan Application",
    href: "/dashboard/LoanApplication",
    icon: CurrencyDollarIcon,
    viewOnly: "employee",
  },
  {
    name: "Pending Loans",
    href: "/dashboard/PendingLoans", // i need to set loacation of pending loans wich is in Manageronly folder
    icon: ClockIcon,
    viewOnly: "manager",
  },
];

export default function NavLinks({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const view =
          user === undefined ||
          link.viewOnly === undefined ||
          (user.isCustomer && link.viewOnly === "customer") ||
          (user.isEmployee && link.viewOnly === "employee") ||
          (user.isManager && link.viewOnly === "employee") ||
          (user.isManager && link.viewOnly === "manager");
        return (
          view && (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          )
        );
      })}
    </>
  );
}

// export default async function NavLinks() {
//   const session = await auth();
//   const pathname = usePathname();

//   return (
//     <>
//       {links.map((link) => {
//         const LinkIcon = link.icon;
//         const view =
//           session?.user === undefined ||
//           link.viewOnly === undefined ||
//           (session.user.isCustomer && link.viewOnly === "customer") ||
//           (session.user.isEmployee && link.viewOnly === "employee") ||
//           (session.user.isManager && link.viewOnly === "employee") ||
//           (session.user.isManager && link.viewOnly === "manager");
//         return (
//           view && (
//             <Link
//               key={link.name}
//               href={link.href}
//               className={clsx(
//                 "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
//                 {
//                   "bg-sky-100 text-blue-600": pathname === link.href,
//                 }
//               )}
//             >
//               <LinkIcon className="w-6" />
//               <p className="hidden md:block">{link.name}</p>
//             </Link>
//           )
//         );
//       })}
//     </>
//   );
// }
