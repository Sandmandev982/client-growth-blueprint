
## VBF Process App

**URL**: https://lovable.dev/projects/4296fda5-d9db-48fc-832b-b6ffae674ffa

VBF Process is a web application that helps users generate detailed, actionable client growth strategies using AI. The app guides users through a structured input form, then leverages OpenAI to create a personalized, seven-section Client Growth Blueprint. All user data and blueprints are securely stored and managed with Supabase, with full GDPR compliance.

## Who is this for?

Online course creators, coaches, and digital product businesses who want a clear, AI-generated roadmap for growing their client base.

## How does it work?

User Authentication: Users sign up or log in using Supabase Auth.

Profile Form: Users fill out a form describing their niche, audience, brand, product, style, and tone.

AI Blueprint Generation: The app sends the form data to OpenAI, which returns a structured Client Growth Blueprint with seven specific sections, including transformation statements, client avatars, pain points, action plans, and more.

Results Display: The generated blueprint is displayed in a readable, actionable format.

Export & Email: Users can enter their email and consent to receive a PDF export of their blueprint. All exports are handled securely, and user consent is required for data storage and email delivery.

## Key Features:

- Secure authentication and data storage (Supabase)
- AI-powered, structured blueprint generation (OpenAI GPT-4)
- GDPR-compliant consent and data handling
- PDF export and email delivery of results
- Modular, scalable architecture for future features (e.g., team collaboration, additional export formats)

## What's not included (yet):

- Invoicing, billing, or payment features
- Integrations with third-party CRMs
- Mobile app version
- Advanced analytics or AI automation beyond the core blueprint generation

## Why does this exist?
Most client growth tools are either too generic or too complex. This app provides a focused, AI-driven workflow that delivers immediate, actionable value-helping users clarify their messaging and client strategy in minutes, not weeks.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4296fda5-d9db-48fc-832b-b6ffae674ffa) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4296fda5-d9db-48fc-832b-b6ffae674ffa) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes it is!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
