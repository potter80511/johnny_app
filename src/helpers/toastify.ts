import { TypeOptions } from "react-toastify"
import { toast as toastify } from "react-toastify"

const toast = (message: string, type: TypeOptions = 'success') => {
  toastify(message, {
    position: "bottom-right",
    type
  });
}

export default toast
