import Body from 'src/components/typography/Body';
import H4 from 'src/components/typography/H4';

type DescriptionProps = {
  title: string;
  description: string;
};

const Description = ({ title, description }: DescriptionProps) => (
  <div className="flex flex-col gap-2 md:flex-row md:gap-0">
    <H4 className="w-[144px] !text-text-primary">{title}</H4>
    <Body className="flex-1">{description}</Body>
  </div>
);

export default Description;
