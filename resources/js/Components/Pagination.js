import { Link } from "@inertiajs/inertia-react";
import React from "react";
import parse from "html-react-parser";
import Button from "./Button";
import { Inertia } from "@inertiajs/inertia";

const Pagination = ({ links }) => {
    const handleClick = (e, id) => {
        Inertia.get(id);
    };

    return (
        <div>
            <nav>
                <div className="inline-flex -space-x-px  gap-x-4">
                    {links.map((page, i) => {
                        return (
                            <Button
                                key={i}
                                disabled={!page.url}
                                primary={page.active}
                                className="
                                text-sm disabled:pointer-events-none font-medium px-2 py-1 text-muted bg-primary-default transition ease-in-out duration-150"
                                handleClick={(e) => handleClick(e, page.url)}
                            >
                                {parse(page.label)}
                            </Button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default Pagination;
