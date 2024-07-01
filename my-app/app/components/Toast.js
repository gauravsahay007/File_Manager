"use client";
import { useData } from "@/context/DataProvider";
import { useEffect } from "react";

function Toast({ msg }) {
    const { state, setState } = useData();

    useEffect(() => {
        const timer = setTimeout(() => {
            setState(prev => ({ ...prev, preview: false }));
        }, 2000);

        return () => clearTimeout(timer);
    }, [msg, setState]);

    return (
        <>
            {state.preview ? (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span>{msg}</span>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Toast;
