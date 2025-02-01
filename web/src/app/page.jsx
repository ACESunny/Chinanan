import { Suspense } from "react";
import Loading from "./loading";

async function fetchData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

function DataComponent() {
  const data = fetchData(); // ใช้ Suspense ร่วมกับไลบรารีที่รองรับ
  return <div>{JSON.stringify(data)}</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent />
    </Suspense>
  );
}