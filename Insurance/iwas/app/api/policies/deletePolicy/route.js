import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
    try {
        console.log("In deletePolicy")
      const { policyId } = await request.json();
      
      const client = await pool.connect();
      const insertQuery = `DELETE FROM policies WHERE policy_id = ${policyId} RETURNING *;`;
      const  result  = await client.query(insertQuery);
      console.log("After delete", result);
      console.log("RESULT", result);
      const items = result.rows;
      console.log("RESULT", items);
      client.release();
  
      return NextResponse.json(items);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }
  
