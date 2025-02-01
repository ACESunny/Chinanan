// app/api/items/route.js
import { NextResponse } from 'next/server';

const data = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
}));

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const pageSize = parseInt(searchParams.get('pageSize')) || 10;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = data.slice(start, end);

  return NextResponse.json({
    data: paginatedData,
    currentPage: page,
    totalPages: Math.ceil(data.length / pageSize),
  });
}
