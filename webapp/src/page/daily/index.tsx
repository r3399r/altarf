import PicDraw from 'src/image/pic-draw.svg';
import PicShadow from 'src/image/pic-shadow.svg';

const Daily = () => (
  <div className="flex justify-center">
    <div className="mt-10 flex w-fit cursor-pointer flex-col items-center justify-center gap-10 sm:mt-20">
      <img src={PicDraw} />
      <img src={PicShadow} />
    </div>
  </div>
);

export default Daily;
