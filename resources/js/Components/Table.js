import React, { useMemo } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { BsArrowCounterclockwise } from "react-icons/bs";
import Swal from "sweetalert2";

const ReactTable = ({
    data,
    cols,
    arabicCols,
    editUrl,
    paginate,
    expTable,
    impTable,
    userTable,
    delTable,
    logs,
}) => {
    const columns = useMemo(
        () =>
            data[0]
                ? Object.keys(data[0])
                      .filter((key) => (cols.includes(key) ? key : null))
                      .map((key) => ({
                          Header: arabicCols[key],
                          accessor: key,
                      }))
                : [],
        [data, cols]
    );

    const HandelDelete = (id) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: userTable ? "سيتم حذف المستخدم " : "سيتم حذف الكتاب",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
        }).then((result) => {
            if (result.isConfirmed) {
                if (userTable) {
                    Inertia.delete(`/delete/${id}`);
                    Swal.fire("تم", "تم حذف المستخدم", "success");
                } else {
                    Inertia.delete(`/delete/${id}`);
                    Swal.fire("تم", "تم حذف الكتاب", "success");
                }
            }
        });
    };

    const forceDelete = (id) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "سيتم حذف الكتاب بشكل نهائي",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "نعم",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/trash/delete/${id}`);

                Swal.fire("تم", "تم حذف الكتاب", "success");
            }
        });
    };
    const handleRestore = (id) => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: " سيتم إستعادة الكتاب",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "نعم",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.put(`/trash/restore/${id}`);

                Swal.fire("تم", "لقد تم استرجاع الكتاب", "success");
            }
        });
    };

    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "edit",
                Header: "العمليات",
                Cell: ({ row }) => (
                    <span className="flex items-center gap-x-4 justify-center ">
                        {delTable ? (
                            <BsArrowCounterclockwise
                                onClick={() => handleRestore(row.values.id)}
                                className="bg-green-400 p-1  hover:bg-green-500 text-slate-200 w-8 h-8  rounded-md cursor-pointer "
                            />
                        ) : (
                            <Link
                                href={`${editUrl}/${row.values.id}`}
                                className="  rounded-md  text-muted"
                            >
                                <BiEdit className="bg-green-400 p-1  hover:bg-green-500 text-slate-200 w-8 h-8  rounded-md cursor-pointer " />
                            </Link>
                        )}
                        {(expTable || delTable || userTable) && (
                            <BiTrash
                                className="bg-red-400  hover:bg-red-500 p-1 text-slate-200 w-8 h-8 rounded-md cursor-pointer "
                                onClick={() =>
                                    delTable
                                        ? forceDelete(row.values.id)
                                        : HandelDelete(row.values.id)
                                }
                            />
                        )}
                    </span>
                ),
            },
        ]);
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        setPageSize,
        prepareRow,
        setGlobalFilter,
        state,
    } = useTable(
        { columns: columns, data: data },
        !logs && tableHooks,
        // useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { pageIndex, pageSize } = state;

    return (
        <div className="relative overflow-auto rounded-t-lg">
            {/* <GlobalFilter
                setGlobalFilter={setGlobalFilter}
                globalFilter={state.globalFilter}
            /> */}
            <table
                {...getTableProps()}
                className="rounded-t-lg overflow-x-auto mx-auto w-full text-center"
            >
                <thead
                    className={`
                bg-muted text-default capitalize
                ${
                    expTable &&
                    "bg-table-exp dark:bg-dark-bg dark:text-dark-text"
                }
                ${
                    impTable &&
                    "bg-table-imp dark:bg-dark-bg dark:text-dark-text"
                }
                ${
                    delTable &&
                    "bg-table-del dark:bg-dark-bg dark:text-dark-text"
                }
                ${
                    userTable &&
                    "bg-table-user dark:bg-dark-bg dark:text-dark-text"
                }
                `}
                >
                    {headerGroups.map((headerGroup, i) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={i}
                            className=""
                        >
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    className="p-2"
                                    key={column.id}
                                >
                                    <span className="p-2  flex justify-center items-center gap-x-2">
                                        {column.render("Header")}
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <span className="text-xs p-0">
                                                    &#x25BC;
                                                </span>
                                            ) : (
                                                <span className="text-xs p-0">
                                                    &#x25B2;
                                                </span>
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="overflow-y-auto" {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                key={i}
                                className={` text-center ${
                                    i % 2 === 0
                                        ? "bg-default dark:bg-dark-navlight dark:text-dark-text"
                                        : "bg-blend-darken dark:bg-dark-navdark dark:text-dark-text"
                                }  text-muted `}
                            >
                                {row.cells.map((cell, index) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="p-3  text-center"
                                            key={index}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {paginate && data.length > 10 && (
                <div className="max-w-2xl mt-8">
                    <div className="flex justify-between flex-row-reverse items-center">
                        <span>
                            صفحة{" "}
                            <strong>
                                {pageIndex + 1} من {pageOptions.length}
                            </strong>{" "}
                        </span>
                        <div className="flex gap-x-3">
                            <button
                                className="bg-primary-default hover:bg-primary-dark disabled:bg-default text-muted/90 p-2 rounded-lg"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                {"<<"}
                            </button>{" "}
                            <button
                                className="bg-primary-default  hover:bg-primary-dark disabled:bg-default text-muted/90 p-2 rounded-lg"
                                onClick={() => {
                                    previousPage();
                                }}
                                disabled={!canPreviousPage}
                            >
                                &#x21E8;
                            </button>
                            <button
                                disabled={!canNextPage}
                                className="bg-primary-default  hover:bg-primary-dark disabled:bg-default text-muted/90 p-2 rounded-lg"
                                onClick={() => {
                                    nextPage();
                                }}
                            >
                                &#x21E6;
                            </button>
                            <button
                                className="bg-primary-default  hover:bg-primary-dark disabled:bg-default text-muted/90 p-2 rounded-lg"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                {">>"}
                            </button>{" "}
                        </div>
                        <span>
                            انتقل الى الصفحة :{" "}
                            <input
                                className="appearance-none inline-block px-3 py-2  text-muted/90 rounded  leading-tight focus:outline-none focus:bg-default focus:border-muted"
                                type="number"
                                min={1}
                                max={pageOptions.length}
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value
                                        ? Number(e.target.value) - 1
                                        : 0;
                                    gotoPage(page);
                                }}
                                style={{ width: "50px" }}
                            />
                        </span>{" "}
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                            }}
                            className="appearance-none block py-2  text-muted/90 rounded  leading-tight focus:outline-none focus:bg-default focus:border-muted"
                        >
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    إعرض {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReactTable;
