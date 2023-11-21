import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function PUT(request) {
  try {
    const { claimId } = await request.json();
    
    const client = await pool.connect();
    
    const updateQuery = `
      UPDATE claims 
      SET 
        claim_status = 'Rejected'
      WHERE claim_id = ${claimId}
      RETURNING *
    `;
    
    const result = await client.query(updateQuery);
    const items = result.rows;

    client.release();

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
