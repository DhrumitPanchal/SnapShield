import BackArrow from "./Backarrow";
import Exit from "./Exit";
import Home from "./Home";
import Info from "./Info";
import Lock from "./Lock";
import Qrcode from "./Qrcode";
import Settings from "./Settings";
import Tag from "./Tag";
import Unsafe from "./Unsafe";
import User from "./User";

const icons = {
  home: Home,
  qr: Qrcode,
  backArrow: BackArrow,
  lock: Lock,
  unsafe: Unsafe,
  user: User,
  tag: Tag,
  info: Info,
  setting: Settings,
  exit: Exit,
};

const Icon = ({ name, ...props }) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      height={props.size || 24}
      width={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={props.color}
      {...props}
    />
  );
};

export default Icon;
