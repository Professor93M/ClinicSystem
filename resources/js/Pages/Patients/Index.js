import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props) {
    // console.log(props);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-center text-xl text-gray-800 leading-tight">
                    Patients
                </h2>
            }
        >
            <Head title="Patients" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-md bg-white border-b first-letter:capitalize border-gray-200">
                            <div className="">
                                {props.auth.user.role == 3 && (
                                    <Link
                                        href={"/patients/create"}
                                        className="mt-8 block w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add patient
                                    </Link>
                                )}
                            </div>
                            <table className="w-full mt-4">
                                <thead>
                                    <tr className="text-md font-semibold text-center tracking-wide  text-gray-900 bg-gray-100 capitalize border-b border-gray-600">
                                        <th className="px-4 py-3">id</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Doctor</th>
                                        <th className="px-4 py-3">Age</th>
                                        <th className="px-4 py-3">Mobile</th>
                                        <th className="px-4 py-3">Address</th>
                                        <th className="px-4 py-3">Disease</th>
                                        <th className="px-4 py-3">Note</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {props.patients.map((patient, index) => (
                                        <tr
                                            key={index}
                                            className="text-gray-700 text-center"
                                        >
                                            <td className="px-4 py-3">
                                                {patient.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.fullname}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.doctors.fullname}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.age}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.mobile}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.address}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.disease}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.note}
                                            </td>
                                            <td className="px-4 py-3 flex gap-x-3 justify-center items-center">
                                                <Button
                                                    type="button"
                                                    handleClick={() =>
                                                        Inertia.get(
                                                            `/patients/${patient.id}/edit`
                                                        )
                                                    }
                                                    className="block w-fit bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    handleClick={() =>
                                                        Inertia.delete(
                                                            `/patients/${patient.id}/`
                                                        )
                                                    }
                                                    className="block w-fit bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
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
