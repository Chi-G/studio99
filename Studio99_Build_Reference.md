# Studio99 Digital — Build Reference
*Maps every piece of copy from Temitope's content doc to the exact page/component it belongs in. Keep this open while building.*

---

## 1. Request a Service vs Register — The Core Difference

| | Register | Request a Service |
|---|---|---|
| **What it does** | Creates an account (identity only) | Submits an actual work request, tied to a client account |
| **Requires login?** | No — this IS the login creation step | Yes — must be logged in |
| **If user not logged in** | N/A | Redirect to Register/Login → after success, send them straight into the Request form (not back to homepage) |

**Flow rule:** Logged-in user clicks "Request a Service" → modal opens immediately. Logged-out user clicks it → Register/Login first → auto-continue into the form.

---

## 2. "Request a Service" Modal — Step by Step

### Step 1 — Select Service Type
Cards: Graphics Design | Video Editing | Website Development | Social Media Management

### Step 2 — Select Package
Show packages for the chosen service. If no fixed packages exist, show "Custom Quote" only and skip pricing.

### Step 3 — Project Details
- Project Title *(required)*
- Description *(required)*
- Deadline *(optional, date picker)*
- Budget Range *(optional dropdown)*

### Step 4 — Upload Reference Files *(optional)*
Drag-and-drop zone, "Skip this step" link.

### Step 5 — Review & Submit
Summary card with Edit links per section → Submit Request button.

**On submit, show (from content doc, Project Status — Pending):**
> "Your request has been successfully received and is currently awaiting review by our team."

→ Redirects to client dashboard, new request appears under **My Projects → Pending**.

---

## 3. Authentication Pages — Exact Copy

### Login Page
- **Heading:** Welcome Back to Studio99 Digital
- **Subheading:** Sign in to manage projects, track progress, communicate with our team, and access your deliverables—all in one place.
- **Button:** Sign In
- **Alt CTA:** Continue to Dashboard
- **Link:** Forgot your password?
- **Prompt:** Don't have an account? → Create an Account

### Register Page
- **Heading:** Create Your Studio99 Account
- **Subheading:** Join Studio99 Digital to request services, track projects, upload files, make payments, and collaborate with our team seamlessly.
- **Button:** Create Account
- **Alt CTA:** Get Started Today
- **Prompt:** Already have an account? → Sign In

### Email Verification
- **Message:** We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
- **Link:** Resend Verification Email

### Forgot Password
- **Heading:** Reset Your Password
- **Subheading:** Enter your email address below and we'll send you instructions to securely reset your password.
- **Button:** Send Reset Link
- **Success:** Password reset instructions have been sent to your email.

### Role Explanations (show during/after registration, or in a help tooltip)
- **Client:** Request services, track projects, upload files, manage payments, and communicate with Studio99 Digital from one central dashboard.
- **Team Member:** Access assigned projects, update progress, upload deliverables, and collaborate with clients and management.
- **Admin:** Manage users, projects, payments, team operations, and platform performance from the Admin Control Center.

### Empty/Error States
- **No Account Found:** No account was found with the provided details. Please check your information or create a new account.
- **Invalid Password:** The password entered is incorrect. Please try again.
- **Session Expired:** Your session has expired for security reasons. Please sign in again.
- **Account Verified:** Your account has been verified successfully. Welcome to Studio99 Digital.

### Security Message (footer of auth pages)
> Your information is encrypted and securely protected to ensure a safe and reliable experience on Studio99 Digital.
> **Secure. Reliable. Trusted.**

---

## 4. Client Dashboard — Page by Page

### Dashboard (Overview)
**First-time welcome:**
> Welcome to Studio99 Digital.
> We're excited to help bring your ideas to life. From project requests to final delivery, everything you need is available right here in your dashboard.
> Get started by submitting your first service request.

**Returning user welcome:**
> Welcome back, {Name}.
> Here's a quick overview of your projects, activities, and important updates.
> Let's keep building something great together.

**4 stat cards:**
| Card | Description |
|---|---|
| Active Projects | Track all projects currently being worked on by our team. Stay informed with real-time updates on progress and delivery timelines. |
| Completed Projects | Access your finished projects, deliverables, and downloadable files anytime from one secure location. |
| Pending Payments | View outstanding invoices and payment requests that require your attention. |
| Notifications | Stay updated on project activities, payments, approvals, deliveries, and important announcements. |

**Quick Actions row:**
| Action | Description |
|---|---|
| Request a Service | Need a new project? Submit a service request and our team will review your requirements and get started. |
| Upload Files | Share project materials, references, and documents to help us deliver exactly what you need. |
| View Projects | Monitor project progress, review updates, and track delivery status. |
| Contact Support | Have questions or need assistance? Our support team is available to help every step of the way. |

### My Projects
Filter tabs: All | Pending | In Progress | Review | Completed

**Status descriptions (show on each project card/detail view):**
| Status | Description |
|---|---|
| Pending | Your request has been successfully received and is currently awaiting review by our team. |
| In Progress | Your project is actively being worked on. Our team is focused on delivering quality results within the agreed timeline. |
| Review | Your project is undergoing quality checks and final review before delivery. |
| Completed | Your project has been completed successfully and is now available for download and access. |

**Empty states:**
- **No Active Projects:** Ready to bring your next idea to life? You don't have any active projects at the moment. Submit a service request and let's get started.
- **No Completed Projects:** Your completed projects and deliverables will appear here once they have been finalized and delivered.

### Payments
**Empty state:** Great news! You currently have no outstanding payments.

### Notifications
**Empty state:** You're all caught up. There are no new notifications at this time.

### Reassurance message (good for sidebar or dashboard footer)
> At Studio99 Digital, transparency is important to us. You'll receive updates throughout every stage of your project, ensuring you're always informed and in control.

### Footer message (every dashboard page)
> Need assistance? Our support team is ready to help. Reach out anytime and we'll be happy to assist you.

---

## 5. Team Dashboard — Page by Page

### Dashboard (Overview)
- Welcome message for team member (use Role Explanation: *"Access assigned projects, update progress, upload deliverables, and collaborate with clients and management."*)
- Stats: Assigned tasks count, In Progress count, Completed this week

### Assigned Tasks
Kanban board: To Do | In Progress | Review
Each card: client name, service type, deadline, "Upload Deliverable" button

### Upload Deliverables
Opens from a task card — upload final files, add notes, mark ready for client review → triggers status change to **Review**

### Progress Updates
Status update interface — changing status here is what triggers the client-facing status descriptions above (In Progress → Review → Completed)

**No payments, no analytics, no user management visible to this role.**

---

## 6. Admin Dashboard — Page by Page

### Dashboard (Overview)
KPI cards: Monthly Revenue | Active Projects | New Clients | Pending Payment Approvals
Recent activity feed

### Users
Manage clients and team members — create/edit/deactivate

### Projects
All requests across all clients. **Critical action:** "Assign to Team" — converts a Pending **request** into an active **Project** with an assigned team member. This is the Request → Project handoff point.

### Payments
View invoices + payment proofs (bank transfer screenshots). Approve/Reject buttons. Paystack transaction log.

### Portfolio
Add/edit/remove items shown on the public landing page.

### Content
Edit testimonials, pricing shown on the landing page — no code changes needed for routine updates.

### Analytics
Revenue trends, project completion rates, team productivity, client retention.

**Role Explanation to reference:** *"Manage users, projects, payments, team operations, and platform performance from the Admin Control Center."*

---

## 7. The Full Request → Delivery Workflow

```
1. Client submits "Request a Service" (5-step modal)
   → Status: Pending
   → Copy shown: "Your request has been successfully received
     and is currently awaiting review by our team."

2. Admin reviews in Projects page
   → Assigns to a team member (becomes an active Project)
   → May send an invoice first if payment required upfront
   → Status: In Progress
   → Copy shown: "Your project is actively being worked on..."

3. Team member sees it in Assigned Tasks
   → Updates progress, uploads deliverable
   → Status: Review
   → Copy shown: "Your project is undergoing quality checks
     and final review before delivery."

4. Admin or client reviews the deliverable
   → Approved → Status: Completed
   → Copy shown: "Your project has been completed successfully
     and is now available for download and access."
   → Needs changes → stays In Progress with a note
```

---

## 8. Landing Page Copy — Quick Reference

| Section | Copy |
|---|---|
| Hero Headline | Transform Your Ideas Into Exceptional Digital Experiences |
| Hero Subheadline | Studio99 Digital empowers businesses, organizations, professionals, and content creators with premium graphics design, video editing, website development, and social media management services—all in one place. |
| Primary CTA | Request a Service |
| Secondary CTA | View Portfolio |
| Final CTA Heading | Ready to take your brand to the next level? |
| Final CTA Sub | Partner with Studio99 Digital and experience creativity, innovation, and results—all in one platform. |
| Final CTA Button | 🚀 Start Your Project Today |

**Service CTAs (each service card):**
- Graphics Design → Get Started
- Video Editing → Request Video Editing
- Website Development → 💻 Build My Website
- Social Media Management → 📈 Manage My Social Media

---

## 9. Outstanding Content (Not Yet in Doc)

These were listed in the table of contents but not included in what you shared — flag with Temitope:
- Day 5: Service Request Copy (form-specific microcopy/placeholders)
- Day 6: Project Status Copy (may overlap with what's in Day 4 — confirm)
- Day 7: Subscription Copy
- Day 8: Payment Copy
- Day 9: Admin Dashboard Copy
- Day 10: Notifications & Emails
- Day 11: PWA Copy
- Day 12: Final Audit

You'll need these before the Payments, Subscriptions, and Admin pages can be fully copy-complete.
