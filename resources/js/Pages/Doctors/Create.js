import React from "react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Combo from "@/Components/Combo";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";

export default function Create(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        fullname: "",
        field: "",
        mobile: "",
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post("/doctors", data);
    };

    const users = props.users.map((user) => {
        return {
            value: user.id,
            name: user.name,
        };
    });

    console.log(users);

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Add Doctor" />

            <ValidationErrors errors={errors} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-md bg-white border-b first-letter:capitalize border-gray-200">
                            <form
                                onSubmit={submit}
                                className="max-w-md mx-auto  grid grid-cols-2 gap-x-4"
                            >
                                <div className="mt-4">
                                    <Label
                                        forInput="fullname"
                                        value="Fullname"
                                    />
                                    <Input
                                        type="text"
                                        name="fullname"
                                        value={data.fullname}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <Label forInput="mobile" value="Mobile" />

                                    <Input
                                        type="text"
                                        name="mobile"
                                        value={data.mobile}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div className="mt-4 col-span-2">
                                    <Label forInput="field" value="Field" />
                                    <Input
                                        type="text"
                                        name="field"
                                        value={data.field}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div className="mt-4 col-span-2">
                                    <Label
                                        forInput="doctors_id"
                                        value="Doctors user"
                                    />

                                    <Combo
                                        name="users_id"
                                        value={data.users_id}
                                        options={users}
                                        className="mt-1 block w-full rounded-md"
                                        handleChange={onHandleChange}
                                        required
                                        add={true}
                                        placeholder="Select doctor"
                                    />
                                </div>
                                <div className="mt-8 flex items-center col-span-2 justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        disabled={processing}
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
