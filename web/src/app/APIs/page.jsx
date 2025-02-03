import Link from "next/link";

export default function APIs() {
    return (
        <div>
            <h1 class="p-5 m-10 text-center">This is my APIs</h1>
            <p>
                <Link href="/APIs/os">Go to os</Link>
            </p>
        </div>
    );
}