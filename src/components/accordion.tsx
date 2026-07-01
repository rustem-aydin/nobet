import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

interface AccordionItemData {
  id: string
  title?: string // trigger verilmədikdə istifadə olunur
  content: React.ReactNode
  trigger?: React.ReactNode // opsional, verilsə trigger bu göstərilir
}

interface AccordionTempProps {
  items: AccordionItemData[]
  defaultValue?: string // açıq olan item-in id-si
  collapsible?: boolean
}

export function AccordionTemp({ items, defaultValue, collapsible = true }: AccordionTempProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Accordion
        type="single"
        defaultValue={defaultValue}
        collapsible={collapsible}
        className="w-full"
      >
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="last:border-b">
            <AccordionTrigger
              className={`
                text-left pl-6 md:pl-14 overflow-hidden
                text-foreground/20 duration-200 hover:no-underline
                cursor-pointer -space-y-6
                data-[state=open]:space-y-0 data-[state=open]:text-primarys
                [&>svg]:hidden
              `}
            >
              {item.trigger ?? (
                <div className="flex flex-1 items-start gap-4">
                  <p className="text-xs">{item.id}</p>
                  <h1 className="uppercase relative text-center text-3xl md:text-5xl">
                    {item.title}
                  </h1>
                </div>
              )}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground pb-6 pl-6 md:px-20">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
