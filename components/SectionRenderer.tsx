import Text from './sections/Text';
import StepList from './sections/StepList';
import ImageSection from './sections/Image';
import List from './sections/List';
import Faq from './sections/Faq';
import Table from './sections/Table';

const map: Record<string, any> = {
  text: Text,
  'step-list': StepList,
  image: ImageSection,
  list: List,
  faq: Faq,
  table: Table,
};

export default function SectionRenderer({ section }: { section: any }) {
  const Cmp = map[section.type] || Text;
  return <Cmp {...section} />;
}
