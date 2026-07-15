// Web3Forms access key — read from the environment so it isn't committed to
// the repo. Note it is still public by design: NEXT_PUBLIC_* values are
// inlined into the client bundle, and the key only routes submissions to the
// owner's inbox. Rotatable at web3forms.com if spam ever appears.
//
// Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local (dev) and in the Vercel
// project's Environment Variables (production).
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

if (!accessKey) {
  // Fail the build rather than deploy a contact form that can't send.
  throw new Error(
    "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set — add it to .env.local (dev) or Vercel env settings (production)."
  );
}

export const WEB3FORMS_ACCESS_KEY = accessKey;

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
