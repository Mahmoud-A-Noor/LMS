import Link from "next/link";

export default function Unauthorized() {
    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen h-full flex items-center justify-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary-500">401</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Unauthorized Access</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">You do not have permission to access this page. </p>
                    <Link href="/login" className="inline-flex text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Login</Link>
                </div>   
            </div>
        </section>
    );
  }