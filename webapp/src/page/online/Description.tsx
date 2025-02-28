import Body from 'src/components/typography/Body';
import H4 from 'src/components/typography/H4';

type DescriptionProps = {
  title: string;
  description: string;
};

const Description = ({ title, description }: DescriptionProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-0">
      <H4 className="!text-text-primary w-[144px]">{title}</H4>
      <Body className="flex-1">{description}</Body>
    </div>
  );
};

export default Description;
