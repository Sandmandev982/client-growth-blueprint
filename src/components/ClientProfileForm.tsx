
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData } from "../types";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { BrainCircuit } from "lucide-react";

const formSchema = z.object({
  niche: z.string().min(2, { message: "Niche must be at least 2 characters." }),
  audience: z.string().min(2, { message: "Audience must be at least 2 characters." }),
  brandName: z.string().min(2, { message: "Brand name must be at least 2 characters." }),
  productOrService: z.string().min(2, { message: "Product/Service must be at least 2 characters." }),
  style: z.string().min(2, { message: "Style must be at least 2 characters." }),
  tone: z.string().min(2, { message: "Tone must be at least 2 characters." }),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to the data processing.",
  }),
});

interface ClientProfileFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const ClientProfileForm: React.FC<ClientProfileFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      niche: "",
      audience: "",
      brandName: "",
      productOrService: "",
      style: "professional",
      tone: "confident",
      gdprConsent: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <BrainCircuit className="h-6 w-6 text-vbf-purple mr-2" />
        <h2 className="text-2xl font-bold text-vbf-blue">Generate Your Ideal Client Profile</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="niche"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Niche</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Executive Coaching" {...field} />
                  </FormControl>
                  <FormDescription>
                    The specific industry or focus area of your business.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="audience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Small Business Owners" {...field} />
                  </FormControl>
                  <FormDescription>
                    Who you serve with your products or services.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Growth Accelerator" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your company or personal brand name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="productOrService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product/Service</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Business Strategy Program" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your main offering to your clients.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Communication Style</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Professional, Casual, Direct" {...field} />
                  </FormControl>
                  <FormDescription>
                    How you prefer to communicate with clients.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Tone</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Confident, Empathetic, Authoritative" {...field} />
                  </FormControl>
                  <FormDescription>
                    The emotional tone of your brand voice.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="gdprConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    GDPR Consent
                  </FormLabel>
                  <FormDescription>
                    I agree that my submitted data will be processed to generate marketing content. I understand that no personal data will be stored longer than necessary for this purpose.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-vbf-purple hover:bg-vbf-purple-light"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Client Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ClientProfileForm;
