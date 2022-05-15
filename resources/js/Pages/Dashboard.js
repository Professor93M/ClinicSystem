import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-md bg-white border-b first-letter:capitalize border-gray-200">
                            <h1 className="text-4xl">
                                welcome to our clinic dashboard
                            </h1>

                            <p className="mt-4 text-lg">
                                we are happy to give you the best service
                            </p>

                            <div className="flex gap-x-4">
                                <Link
                                    href={"/register"}
                                    className="mt-8 block w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add doctor
                                </Link>

                                <Link
                                    href={"/register"}
                                    className="mt-8 block w-fit bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add receptionist
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
