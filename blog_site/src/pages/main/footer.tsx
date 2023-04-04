import { AiOutlineZhihu, AiTwotoneMail } from "react-icons/ai";

import { SiGitbook } from "react-icons/si";
import { TfiYoutube } from "react-icons/tfi";
import { VscGithub } from "react-icons/vsc";

export const Footer = () => {
  return (
    <div className="main-document-footer">
      <div className="Link-Web">
        <a href="https://github.com/Leezgion" title="leezgion's Github">
          <VscGithub className="Author-icon" />
        </a>
        <a
          href="https://www.youtube.com/channel/UCDZjPPkBUrcU-vLTB-ltFeQ"
          title="leezgion's Youtube"
        >
          <TfiYoutube className="Author-icon" />
        </a>
        <a
          href="https://www.zhihu.com/people/lzz-12-11"
          title="leezgion's Zhihu"
        >
          <AiOutlineZhihu className="Author-icon" />
        </a>
        <a href="https://leezgions-notes.gitbook.io" title="leezgion's Gitbook">
          <SiGitbook className="Author-icon" />
        </a>
        <a href="#" title="leezgion@163.com">
          <AiTwotoneMail className="Author-icon" />
        </a>
      </div>
    </div>
  );
};
/**
 * @param {<a href="https://www.yuque.com/leezgion" title="leezgion's Yuque"><AiFillYuque className="Author-icon" /></a>} Yuque
 *
 */
