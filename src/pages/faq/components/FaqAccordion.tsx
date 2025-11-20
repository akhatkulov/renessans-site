import { memo } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { AccordionSkeleton } from "@/components/common/AccordionSkeleton";

interface AccordionItemType {
  title: string;
  content: string;
}

interface Props {
  items: AccordionItemType[];
  isLoading?: boolean;
}

const FaqAccordion = ({ items, isLoading = false }: Props) => {
  if (isLoading) {
    return <AccordionSkeleton />;
  }

  return (
    <Accordion type="single" collapsible className="space-y-3">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          value={`item-${idx}`}
          className="border border-slate-200 rounded-lg px-0 overflow-hidden"
        >
          <AccordionTrigger className="bg-white hover:bg-slate-50 p-5 rounded-lg hover:no-underline group [&[data-state=open]]:bg-indigo-50 [&[data-state=open]]:text-primary">
            <span className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors text-left">
              {item.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5 py-4 text-slate-600 bg-slate-50 border-t border-slate-200">
            <p className="leading-relaxed">{item.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default memo(FaqAccordion);
