import "./popup.css";

interface Props {
  cancel?: any;
  confirm: any;
  type?: "Modal" | undefined;
  keywords: string;
}

export const Popup = (props: Props) => {
  const cancelPopup = props.cancel;
  const confirmFn = props.confirm;
  const keywords = props.keywords;
  const confirm = () => {
    confirmFn();
    const isConfirm = true;
    cancelPopup(isConfirm);
  };
  const cancel = () => {
    cancelPopup(false);
  };
  return (
    <div className="popup">
      <div className="popup-text">{keywords}</div>
      <div className="popup-buttons">
        <button onClick={confirm}>confirm</button>
        {props.type === "Modal" && <button onClick={cancel}>cancel</button>}
      </div>
    </div>
  );
};
