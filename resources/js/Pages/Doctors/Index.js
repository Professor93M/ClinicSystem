import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Index(props) {
    // console.log(props);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Doctors
                </h2>
            }
        >
            <Head title="Patients" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-md bg-white border-b first-letter:capitalize border-gray-200">
                            <div className="">
                                <Link
                                    href={"doctors/create"}
                                    className="mt-8 block w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add doctor
                                </Link>
                            </div>
                            <table className="w-full text-center mt-8">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Field</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.doctors.map((doctor, index) => (
                                        <tr key={index}>
                                            <td>{doctor.id}</td>
                                            <td>{doctor.name}</td>
                                            <td>{doctor.mobile}</td>
                                            <td>{doctor.field}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
