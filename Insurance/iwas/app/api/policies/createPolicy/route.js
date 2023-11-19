import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
    try {
      const { userId, policyName } = await request.json();
      console.log({ userId, policyName });
      
      const client = await pool.connect();
      const insertQuery = `INSERT INTO policies (user_id, policy_name) VALUES (${userId}, '${policyName}') RETURNING *`;
      const  result  = await client.query(insertQuery);
      const items = result.rows;
      client.release();
  
      return NextResponse.json(items);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }
  
