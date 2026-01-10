# Setting up Vercel Blob for Image Uploads

You have switched to **Vercel Blob** for handling image uploads. This is a robust solution for Next.js apps deployed on Vercel.

### Step 1: Create a Blob Database
1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Select your project.
3.  Click on the **Storage** tab.
4.  Click **Create Database** and select **Blob**.
5.  Give it a name (e.g., `pushpako-images`) and click **Create**.

### Step 2: Connect Environment Variables
1.  Once the Blob store is created, standard environment variables will be automatically added to your project **Production** and **Preview** environments.
2.  To run this **Locally**:
    *   In the Vercel Storage tab for your Blob store, find the section **"Connect to your local project"**.
    *   Pull the latest environment variables using Vercel CLI:
        ```bash
        vercel env pull .env.local
        ```
    *   **OR** Manually copy the `BLOB_READ_WRITE_TOKEN` from the dashboard and add it to your `.env.local` file:
        ```env
        BLOB_READ_WRITE_TOKEN=your_token_here
        ```

### Step 3: Verification
1.  Restart your local server (`npm run dev`).
2.  Upload an image using the "Create Blog" form.
3.  The image should upload successfully, and the URL will start with `https://public.blob.vercel-storage.com/...`.

### Troubleshooting
*   **Token Missing:** If you get an authentication error, double-check that `BLOB_READ_WRITE_TOKEN` is present in your `.env.local` file.
*   **CORS:** Vercel Blob handles CORS automatically for uploads from your own domain.
