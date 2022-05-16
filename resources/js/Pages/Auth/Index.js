import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import { Inertia } from "@inertiajs/inertia";

export default function Index(props) {
    const roles = ["admin", "doctor", "receptionist"];
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-center text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-md bg-white border-b first-letter:capitalize border-gray-200">
                            <div className="">
                                <Link
                                    href={"doctors/create"}
                                    className="mt-8 block w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add user
                                </Link>
                            </div>

                            <table className="w-full mt-4">
                                <thead>
                                    <tr className="text-md font-semibold text-center tracking-wide  text-gray-900 bg-gray-100 capitalize border-b border-gray-600">
                                        <th className="px-4 py-3">id</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Role</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {props.users.map((user, index) => (
                                        <tr
                                            key={index}
                                            className="text-gray-700 text-center"
                                        >
                                            <td className="px-4 py-3">
                                                {user.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                {roles[user.role - 1]}
                                            </td>
                                            <td className="px-4 py-3 flex gap-x-3 justify-center items-center">
                                                <Button
                                                    type="button"
                                                    handleClick={() =>
                                                        Inertia.get(
                                                            `/users/${user.id}/edit`
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
                                                            `/users/${user.id}`
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
