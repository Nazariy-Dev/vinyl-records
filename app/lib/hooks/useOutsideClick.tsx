import { useEffect } from "react";

export default function useOutsideClick(ref: any, callback: any) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: Event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(event)
            }
        }
        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);
}