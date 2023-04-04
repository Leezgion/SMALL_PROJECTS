import "./netError.css";

import Code from "./code.svg";

export const NetError = () => {
  return (
    <div className="netError">
      <label>
        Sorry, First you should probably try other network ways to continue ?!
      </label>
      <div className="painted-eggshell">
        <img
          src={Code}
          alt=""
          title="A virtual private network possible?"
          className="netError-img"
        />
        <a
          href="#"
          title="Ask the author for help ?!!!!
           Contact me by email ~"
        >
          <div className="mouse"></div>
        </a>
      </div>
    </div>
  );
};
