import BaseInput from "./Input";
import Email from "./InputEmail";
import Password from "./InputPassword";
import Phone from "./InputPhone";
import Text from "./InputText";

export default Object.assign(BaseInput, {
  Password,
  Text,
  Email,
  Phone,
});
