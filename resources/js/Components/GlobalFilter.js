import React, { useState } from "react";
import { useAsyncDebounce } from "react-table/dist/react-table.development";
import regeneratorRuntime from "regenerator-runtime";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
    const [value, setValue] = useState(globalFilter);

    const handleChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 300);

    return (
        <input
            className="focus:border absolute left-0 -top-16 mt-1 w-1/4 focus:outline-none focus:border-slate-800 hover:outline-none hover:border hover:border-slate-800  border border-slate-800   text-slate-800/90 mx-auto rounded-lg p-2"
            type="text"
            value={value || ""}
            placeholder="إبحث"
            onChange={(e) => {
                setValue(e.target.value);
                handleChange(e.target.value);
            }}
        />
    );
};

export default GlobalFilter;
