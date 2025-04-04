
import React from "react";
import { MillionDollarMessage } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, MessageSquare, AlertCircle, Lightbulb, Puzzle, Target } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MillionDollarMessageCardProps {
  messages: MillionDollarMessage[];
}

const MessageSection = ({ title, content, icon }: { title: string; content: string; icon: React.ReactNode }) => (
  <div className="mb-4">
    <div className="flex items-center mb-2">
      {icon}
      <h4 className="text-md font-semibold ml-2 text-vbf-blue">{title}</h4>
    </div>
    <p className="ml-7 text-gray-700">{content}</p>
  </div>
);

const MillionDollarMessageCard: React.FC<MillionDollarMessageCardProps> = ({ messages }) => {
  return (
    <Card className="shadow-lg border-t-4 border-t-vbf-purple">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-vbf-purple mr-2" />
          <CardTitle className="text-xl font-bold">Million Dollar Messages</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {messages.map((message, idx) => (
            <AccordionItem key={idx} value={`message-${idx}`}>
              <AccordionTrigger className="text-lg font-medium py-4 hover:bg-gray-50 px-4 -mx-4 rounded-md">
                {message.headline}
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-2">
                <div className="bg-white rounded-lg space-y-4">
                  <MessageSection 
                    title="Problem" 
                    content={message.problem}
                    icon={<AlertCircle className="h-5 w-5 text-red-500" />}
                  />
                  
                  <MessageSection 
                    title="Solution" 
                    content={message.solution}
                    icon={<Lightbulb className="h-5 w-5 text-yellow-500" />}
                  />
                  
                  <MessageSection 
                    title="Differentiation" 
                    content={message.differentiation}
                    icon={<Puzzle className="h-5 w-5 text-blue-500" />}
                  />
                  
                  <MessageSection 
                    title="Call to Action" 
                    content={message.cta}
                    icon={<Target className="h-5 w-5 text-green-500" />}
                  />
                  
                  <div className="bg-gray-50 p-4 rounded-md mt-4">
                    <div className="flex items-center mb-2">
                      <MessageSquare className="h-5 w-5 text-vbf-purple" />
                      <h4 className="text-md font-semibold ml-2 text-vbf-purple">Why It Works</h4>
                    </div>
                    <p className="text-gray-700">{message.whyItWorks}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default MillionDollarMessageCard;
