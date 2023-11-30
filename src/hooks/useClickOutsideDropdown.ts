import { useEffect } from "react";

export const useClickOutsideDropdown = (
  modalRef: any,
  profileRef: any,
  callback: () => void,
  showModal: boolean,
) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        modalRef?.current &&
        showModal &&
        !modalRef?.current.contains(e.target) &&
        !profileRef?.current.contains(e.target)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, profileRef, callback, showModal]);
};
