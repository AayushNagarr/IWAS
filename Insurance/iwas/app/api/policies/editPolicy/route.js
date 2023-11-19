import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function PUT(request) {
    try {
        console.log("In put")
      const { policyId, policyName } = await request.json();
      console.log({ policyId, policyName });
      
      const client = await pool.connect();
      const insertQuery = `UPDATE policies SET policy_name = '${policyName}' WHERE policy_id = ${policyId} RETURNING *`;
      const  result  = await client.query(insertQuery);
      console.log("RESULT", result);
      const items = result.rows;
      console.log("RESULT", items);
      client.release();
  
      return NextResponse.json(items);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }
  
