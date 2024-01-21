import { UnOrderedList } from '@/components/markdown';

const getEmploymentDays = () => {
  const startTime = new Date('06/20/2022');
  const diffTime = Date.now() - startTime.getTime();
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return days + 1;
};

const AboutMe = () => {
  const days = getEmploymentDays();
  return (
    <UnOrderedList>
      <li>
        <strong>师傅你是哪里的：</strong>湖南人，目前在上海字节跳动（always{' '}
        {days} 天 ），一年前无辣不欢，一年后只能微微辣😭。
      </li>
      <li>
        <strong>mbti：</strong>infj 绿👴，熟了小 e，不熟就是 iiiiiiii，
        <strong>能被 e 人带飞的 i 人</strong>。
      </li>
      <li>
        <strong>音乐🎵：</strong>
        年少喜欢徐良许嵩汪苏泷，以前听一乐，现在听起来：我是🤡。
      </li>
      <li>
        <strong>电影🎬：</strong>
        喜欢看豆瓣评分高的电影（不愿意花俩小时看烂片），豆瓣 TOP 250 榜单进度
        122 / 250。
      </li>
      <li>
        <strong>Code 💻：</strong>很喜欢写代码，代码洁癖 + 强迫症，喜欢逛
        github、reddit 等社区！！！。{' '}
      </li>
      <li>
        <strong>游戏🎮：</strong>
        王者荣耀玩了七年（高中开始玩），退役的国服（自封的，hhh）射手，会看 kpl
        比赛，主队：成都AG（逆子，看比赛很气人😡，每次说不看了但下次还是会看直播），他们终于在
        2023 世冠拿到了冠军🏆。
      </li>
      <li>
        <strong>阅读📖：</strong>
        阅读真的可以让一个人变得平静，忙里偷闲每天读一点点，起初读的心理学等书比较多，现在更喜欢读小说，目前在看：
        <strong>《平凡的世界》</strong>。
      </li>
      <li>
        <strong>新晋羽毛球🏸人：</strong>
        对羽毛球的热练（恋）期，但还是好菜，每周五下班固定打球，希望羽毛球技术快快快涨起来😄😄。
      </li>
      <li>
        <strong>跑步🏃狂热爱好者：</strong>
        已跑两坤（五）年，全马pb：2:55:57（
        <strong>厦门</strong>），半马pb：1:21:58（<strong>无锡</strong>
        ），更多细节可以看 ---{'>'} 你喜欢跑步🏃吗？ 。
        <UnOrderedList>
          <li>
            长远目标：六大满贯（先梦一梦）、每个省会城市跑一次马拉松（每个城市跑好像不太现实）。
          </li>
          <li>近期目标：达标马拉松国家二级运动员，全马：2:53:00。</li>
          <li>
            已经跑过的城市：长沙、洪江、张家界、贵阳、无锡、江阴、北京、苏州、湖州、池州、大理、香格里拉。
          </li>
        </UnOrderedList>
      </li>
    </UnOrderedList>
  );
};

export default AboutMe;
