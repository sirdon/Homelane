import get from "./get.js";
import post from "./post.js";
import { editName, update, editPassword } from "./put.js";
import del from "./delete.js";
export default {
  get,
  post,
  put: { editName, update, editPassword },
  delete: del,
};
