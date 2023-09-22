import BaseInput from "./Input";
import Checkbox from "./InputCheckbox";
import Date from "./InputDate";
import Email from "./InputEmail";
import Password from "./InputPassword";
import Phone from "./InputPhone";
import Select from "./InputSelect";
import Text from "./InputText";
import TextArea from "./InputTextArea";
import Url from "./InputUrl";

export default Object.assign(BaseInput, {
  Checkbox,
  Date,
  Email,
  Password,
  Phone,
  Select,
  Text,
  TextArea,
  Url,
});
