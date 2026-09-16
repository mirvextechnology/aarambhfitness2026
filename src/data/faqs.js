/**
 * FAQS — categorised. Rendered as an animated accordion on the
 * Services page (and reusable anywhere via <Accordion />).
 */

export const faqCategories = [
  {
    id: 'membership',
    label: 'Membership',
    items: [
      {
        q: 'Do I need to book before my first visit?',
        a: 'Not for a visit, but a short consultation is recommended so we can understand your goal and current fitness before you start training. You can request one from the Consultation page.',
      },
      {
        q: 'What membership durations are available?',
        a: 'Monthly, quarterly, half-yearly and yearly options are available across the START, TRANSFORM and ELITE memberships. Exact pricing is shared on a call — use the Contact page or WhatsApp us.',
      },
      {
        q: 'Can I switch membership plans later?',
        a: 'Yes. Members can move between plans when their goal changes. Speak to the front desk and we will adjust the remaining balance.',
      },
      {
        q: 'What are the gym timings?',
        a: 'Timings are listed on the Contact page and are configurable there. Early morning and late evening slots are available on most days.',
      },
    ],
  },
  {
    id: 'personal-training',
    label: 'Personal Training',
    items: [
      {
        q: 'How is personal training different from normal gym training?',
        a: 'In personal training a single coach is with you for the whole session — writing the programme, correcting your form and tracking every set. Normal gym training uses floor support with a written plan.',
      },
      {
        q: 'Can I choose a male or female coach?',
        a: 'Yes. Coach preference is selected during booking. Male and female coaches are both available, and you can also choose "no preference".',
      },
      {
        q: 'How many sessions a week should I take?',
        a: 'Most people see steady progress with 3 to 5 coached sessions a week, depending on their goal, recovery and schedule. Your coach will set this after the first assessment.',
      },
      {
        q: 'Do personal training plans include diet guidance?',
        a: 'Yes, a general nutrition structure is included. This is guidance, not medical diet therapy — for medical conditions you should consult a doctor.',
      },
    ],
  },
  {
    id: 'home-fitness',
    label: 'Home Fitness',
    items: [
      {
        q: 'Which areas do home fitness coaches cover?',
        a: 'Home sessions are offered in Kaurihar and nearby areas of Prayagraj. Share your locality on the Consultation page and we will confirm coverage before booking.',
      },
      {
        q: 'Do I need equipment at home?',
        a: 'No. Programmes can be written completely equipment-free, or with basic items like a mat, resistance bands or a pair of dumbbells if you already own them.',
      },
      {
        q: 'Can I get a female coach for home sessions?',
        a: 'Yes. Female coaches are available for home fitness. Select your preference during booking and we will assign accordingly.',
      },
      {
        q: 'How long is a home session?',
        a: 'Usually 45 to 60 minutes, including warm-up, the main session and a short cool-down.',
      },
    ],
  },
  {
    id: 'diet',
    label: 'Diet',
    items: [
      {
        q: 'Will I get a strict diet chart?',
        a: 'You get a practical daily structure built around food you already cook at home — meal slots, portion guidance and simple swaps. It is designed to be followed, not endured.',
      },
      {
        q: 'Do I need to buy supplements?',
        a: 'No. Supplements are optional and are only discussed if they genuinely fit your goal. Whole food covers most needs.',
      },
      {
        q: 'I have a medical condition. Can I still get diet guidance?',
        a: 'For diabetes, thyroid, kidney, heart or any other medical condition, please consult your doctor first. Our guidance is general wellness support and is not a substitute for medical diet therapy.',
      },
    ],
  },
  {
    id: 'physiotherapy',
    label: 'Physiotherapy',
    items: [
      {
        q: 'What does physiotherapy support include?',
        a: 'Movement and posture assessment, mobility and flexibility work, guided exercise rehabilitation support, recovery guidance and a safe return-to-training progression.',
      },
      {
        q: 'Is this the same as hospital treatment?',
        a: 'No. Our physiotherapy support is provided by qualified professionals within their scope of practice. It is not a substitute for medical diagnosis or hospital treatment. Seek a doctor for acute pain, swelling or suspected injury.',
      },
      {
        q: 'Can I train with an old injury?',
        a: 'Often yes, with the right modifications. Get assessed first so the plan works around the injury rather than aggravating it.',
      },
    ],
  },
  {
    id: 'consultation',
    label: 'Consultation',
    items: [
      {
        q: 'Is the consultation booking confirmed instantly?',
        a: 'No. The Consultation page sends a request to our team. You will see a confirmation that the request was submitted, and our team will contact you to confirm the actual slot.',
      },
      {
        q: 'What happens in a consultation?',
        a: 'We discuss your goal, current fitness, schedule and any health limits, then review your movement. You leave with an honest starting point and a service recommendation.',
      },
      {
        q: 'Can the consultation happen over a call?',
        a: 'Yes. If you cannot visit in person, mention it in your requirements and we will arrange a call instead.',
      },
      {
        q: 'Is there any pressure to buy a plan?',
        a: 'No. The consultation exists to give you a clear direction. If nothing suits you right now, we will say so.',
      },
    ],
  },
  {
    id: 'general',
    label: 'General',
    items: [
      {
        q: 'Where is Aarambh Fitness located?',
        a: 'We are based in Kaurihar, Prayagraj, Uttar Pradesh. The full address and map are on the Contact page.',
      },
      {
        q: 'I have never trained before. Is that a problem?',
        a: 'Not at all. Most members start with no experience. Your first sessions focus on learning the movements before any weight is added.',
      },
      {
        q: 'Do you offer event security staffing?',
        a: 'Yes. We provide professional event and security staffing for weddings, private functions, corporate events and venues. Use the Contact page to share your event details.',
      },
      {
        q: 'How do I contact you quickly?',
        a: 'WhatsApp is the fastest way. The floating WhatsApp button is available on every page, or use the contact details on the Contact page.',
      },
    ],
  },
];

/** Flat list, useful for search-style filtering. */
export const allFaqs = faqCategories.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.id, categoryLabel: c.label }))
);

export default faqCategories;
