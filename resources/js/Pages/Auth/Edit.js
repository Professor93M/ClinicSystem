import React from "react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";
import Combo from "@/Components/Combo";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import Button from "@/Components/Button";

export default function Edit(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.user.name || "",
        email: props.user.email || "",
        role: props.user.role || "",
        password: "",
        password_confirmation: "",
        _method: "PUT",
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    let roles = [
        {
            name: "Admin",
            value: "1",
        },
        {
            name: "Doctor",
            value: "2",
        },
        {
            name: "Receptionist",
            value: "3",
        },
    ];

    !props.auth.user
        ? (roles = roles)
        : (roles = roles.filter((role) => role.value != "1"));

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(`/users/${props.user.id}`, data);
        // console.log(data);
    };

    // const users = props.users.map((user) => {
    //     return {
    //         value: user.id,
    //         name: user.name,
    //     };
    // });

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-center text-xl text-gray-800 leading-tight">
                    Edit Dr. {props.user.name}
                </h2>
            }
        >
            <Head title="Add Doctor" />

            <ValidationErrors errors={errors} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-md bg-white border-b first-letter:capitalize border-gray-200">
                            <form
                                className="max-w-md mx-auto  grid grid-cols-1 gap-x-4"
                                onSubmit={submit}
                            >
                                <div className="">
                                    <Label forInput="name" value="Name" />

                                    <Input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label forInput="email" value="Email" />

                                    <Input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <Label forInput="role" value="Role" />

                                    <Combo
                                        name="role"
                                        value={data.role}
                                        options={roles}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                        add={true}
                                        placeholder="Select Type"
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label
                                        forInput="password"
                                        value="Password"
                                    />

                                    <Input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        handleChange={onHandleChange}
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label
                                        forInput="password_confirmation"
                                        value="Confirm Password"
                                    />

                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button
                                        className="ml-4"
                                        processing={processing}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
