import beijing from '@/public/home/beijing.jpg';
import guiyang from '@/public/home/guiyang.jpg';
import dali1 from '@/public/home/dali1.jpg';
import dali2 from '@/public/home/dali2.jpg';
import xianggelila from '@/public/home/xianggelila.jpg';
import keep from '@/public/home/keep.jpeg';
import MyImage from '@/components/common/MyImage';

const Gallery = () => {
  return (
    <div className="relative columns-1 sm:columns-3 gap-8">
      <div className="relative aspect-w-1 aspect-h-1 ">
        <MyImage
          className="object-cover rounded-xl"
          src={guiyang}
          alt="在贵阳马拉松拍的照片，当时正在看表，表情狰狞就选择小黄脸"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
      </div>
      <div className="relative aspect-w-16 aspect-h-9 mt-8">
        <MyImage
          className="object-cover rounded-xl"
          src={dali2}
          alt="去大理玩的时候，看到一个女孩子看着洱海发呆 ，就随手拍了一张"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
      </div>
      <div className="relative aspect-w-16 aspect-h-9 mt-8">
        <MyImage
          className="object-cover rounded-xl"
          src={keep}
          alt="keep 中的记录"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
      </div>
      <div className="relative aspect-w-1 aspect-h-1 mt-8">
        <MyImage
          className="object-cover rounded-xl"
          src={dali1}
          alt="在大理早上看日出，当时误点延时摄影，刚好就拍到一只海燕飞过去了"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
      </div>
      <div className="relative aspect-w-1 aspect-h-1 mt-8 sm:mt-0">
        <MyImage
          className="object-cover rounded-xl"
          src={beijing}
          alt="2023年去北京出差时，和北京跑步的小伙伴在爬坡的时候被人抓拍的，这也太帅了"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
      </div>
      <div className="relative aspect-w-16 aspect-h-9 mt-8">
        <MyImage
          className="object-cover rounded-xl"
          src={xianggelila}
          alt="听说看到日照金山的人会幸运一整年"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-xl" />
      </div>
    </div>
  );
};

export default Gallery;
