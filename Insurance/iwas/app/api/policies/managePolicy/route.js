// pages/api/policies/managePolicy.js (or your actual path)
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  try {
    const { userId } = await request.json();
    const client = await pool.connect();
    const insertQuery = `SELECT * FROM policies WHERE user_id = ${userId} ORDER BY policy_id ASC;`;
    const result = await client.query(insertQuery);
    const items = result.rows;
    client.release();

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
