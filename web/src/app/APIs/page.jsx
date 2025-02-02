import Link from "next/link";

export default function APIs() {
    return (
        <div>
            <h1>This is my APIs</h1>
            <Link href={/APIs/os}>Go to os</Link>
        </div>
    );
}