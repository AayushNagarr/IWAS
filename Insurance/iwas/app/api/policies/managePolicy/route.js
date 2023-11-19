import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
    try {
      const { userId } = await request.json();
      console.log({ userId });
      
      const client = await pool.connect();
      const insertQuery = `SELECT * FROM policies where policies.user_id = ${userId} ORDER BY policies.policy_id ASC;`;
      const  result  = await client.query(insertQuery);
      const items = result.rows;
      console.log(items);
      client.release();
  
      return NextResponse.json(items);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }
  
