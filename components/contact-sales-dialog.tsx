'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface ContactSalesDialogProps {
  trigger?: React.ReactNode;
  onSubmit?: (formData: ContactFormData) => Promise<void>;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function ContactSalesDialog({ trigger, onSubmit }: ContactSalesDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [contactFormSubmitting, setContactFormSubmitting] = useState(false);

  const handleContactSales = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(contactForm);
      } else {
        // Default behavior: simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Contact form submitted:', contactForm);
      }

      setDialogOpen(false);
      setContactForm({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setContactFormSubmitting(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Sales</DialogTitle>
          <DialogDescription>
            Fill out the form below and our team will get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleContactSales} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name *</Label>
            <Input
              id="contact-name"
              placeholder="John Doe"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email *</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="john@company.com"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-company">Company</Label>
            <Input
              id="contact-company"
              placeholder="Acme Inc."
              value={contactForm.company}
              onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message *</Label>
            <Textarea
              id="contact-message"
              placeholder="Tell us about your needs..."
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              required
              rows={4}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setDialogOpen(false)}
              disabled={contactFormSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={contactFormSubmitting}
            >
              {contactFormSubmitting ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

