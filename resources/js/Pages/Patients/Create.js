import React from "react";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Combo from "@/Components/Combo";
import Authenticated from "@/Layouts/Authenticated";

export default function Create(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        fullname: "",
        age: "",
        address: "",
        mobile: "",
        disease: "",
        note: "",
        doctors_id: "",
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
        post(route("create"));
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Register" />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div>
                    <Label forInput="fullname" value="fullname" />

                    <Input
                        type="text"
                        name="fullname"
                        value={data.fullname}
                        classname="mt-1 block w-full"
                        autoComplete="fullname"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label forInput="age" value="age" />
                    <Input
                        type="text"
                        name="age"
                        value={data.age}
                        className="mt-1 block w-full"
                        autoComplete="age"
                        handleChange={onHandleChange}
                        required
                    />
                </div>
                {/* <div className="mt-4">
                    <Label forInput="doctors_id" value="doctors_id" />

                    <Combo
                        name="text"
                        value={data.doctors_id}
                        options={props.doctors}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                        add={true}
                        placeholder="Select doctor"
                    />
                </div> */}

                <div className="mt-4">
                    <Label forInput="password" value="Password" />

                    <Input
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
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
                        required
                    />
                </div>
            </form>
        </Authenticated>
    );
}
