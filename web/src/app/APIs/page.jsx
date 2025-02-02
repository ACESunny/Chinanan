import Link from "next/link";

export default function APIs() {
    return (
        <div>
            <h1>This is my APIs</h1>
            <p>
                <Link href="/APIs/os">Go to os</Link>
            </p>
        </div>
    );
}