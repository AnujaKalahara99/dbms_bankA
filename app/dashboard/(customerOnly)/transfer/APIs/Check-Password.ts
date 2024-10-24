// pages/api/check-password.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { checkPassword } from '@/app/lib/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { customer_id, password } = req.body;
  const result = await checkPassword(customer_id, password);
  res.json({ result });
}